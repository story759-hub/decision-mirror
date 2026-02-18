import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 환경변수 로드
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""; 
const apiKey = process.env.GEMINI_API_KEY || "";

// Supabase 클라이언트 초기화
const supabase = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    }) 
  : null;

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * 1차 백엔드 자체 필터링: 정규식 및 키워드 검사 강화
 */
function containsInappropriateContent(text: string): boolean {
  if (!text) return false;

  const forbiddenKeywords = [
    // 범죄 및 위험
    "살인", "자살", "마약", "폭행", "강간", "도박", "상해", "청부", 
    "필로폰", "대마초", "성폭력", "자해", "죽어라", "죽여", "코카인",
    "히로뽕", "자살예고", "살해", "성매매", "몰카",
    // 성적 단어 및 비속어
    "섹스", "자위", "포르노", "야동", "성인물", "보지", "자지", "성기", 
    "강간", "윤간", "조건만남", "페티쉬", "노출", "가슴", "엉덩이",
    "씨발", "병신", "개새끼", "좆", "꺼져", "미친년", "미친놈"
  ];
  
  // 1. 유니코드 정규화 및 특수문자/공백/숫자 제거 (우회 방지 강화)
  const normalizedText = text.normalize('NFC');
  const cleanedText = normalizedText.replace(/[^가-힣a-zA-Z]/g, "");
  
  // 2. 원본과 정제본 모두 검사
  return forbiddenKeywords.some(keyword => 
    normalizedText.includes(keyword) || cleanedText.includes(keyword)
  );
}

/**
 * 델타 값에 따른 상태 결정
 */
function getStatusByDelta(delta: number): string {
  if (delta >= 1.5) return "급변";
  if (delta >= 0.5) return "주의";
  if (delta <= -0.5) return "완화";
  return "안정";
}

/**
 * JSON 파싱 및 데이터 검증
 */
function validateAndParseAIResponse(text: string) {
  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    
    if (!parsed.description || !parsed.mix || !Array.isArray(parsed.mix)) {
      return null;
    }
    return parsed;
  } catch (e) {
    return null;
  }
}

/**
 * 불필요한 따옴표 등 정제
 */
function sanitizeDescription(text: string): string {
  if (!text) return "";
  return text.replace(/["'‘“’”]/g, "").trim();
}

/**
 * 재시도 로직을 포함한 AI 생성 함수
 */
async function generateWithRetry(model: any, prompt: string, retries = 1) {
  for (let i = 0; i <= retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      if (!result.response || result.response.promptFeedback?.blockReason) {
        throw new Error("SAFETY_BLOCKED");
      }
      return result;
    } catch (error: any) {
      if (error.message?.includes("429") && i < retries) {
        await new Promise(res => setTimeout(res, 2000));
        continue;
      }
      throw error;
    }
  }
}

/**
 * GET: 과거 기록 조회
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fingerprint = searchParams.get('fp');
    const user_id = searchParams.get('user_id');

    if (!supabase) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });

    let query = supabase.from('emotions').select('*');

    if (user_id && user_id !== 'null' && user_id !== 'undefined') {
      query = query.eq('user_id', user_id);
    } else if (fingerprint) {
      query = query.eq('fingerprint', fingerprint);
    } else {
      return NextResponse.json([]);
    }

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (error: any) {
    return NextResponse.json({ error: "조회 실패" }, { status: 500 });
  }
}

/**
 * POST: 감정 분석 및 이중 필터링 저장
 */
export async function POST(req: Request) {
  try {
    if (!supabase || !apiKey) {
      return NextResponse.json({ error: "서버 설정이 올바르지 않습니다." }, { status: 500 });
    }

    const requestData = await req.json();
    const { mainEmotion, tags, text, fingerprint, intensity, user_id } = requestData;
    
    const userFingerprint = fingerprint || 'anonymous';
    const finalUserId = user_id || null;
    const rawIntensity = Number(intensity) || 3;
    let userMessage = text?.trim() || "";

    if (!mainEmotion) {
      return NextResponse.json({ error: "필수 데이터 누락" }, { status: 400 });
    }

    // [1차 필터링 수행]
    if (userMessage !== "" && containsInappropriateContent(userMessage)) {
      userMessage = ""; // 부적절한 경우 빈 값으로 처리하여 AI에 전달 및 DB 저장
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
      ],
      generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
    });

    const getPrompt = (msg: string) => `
      페르소나: 당신은 사용자의 마음을 사진처럼 찍어내는 심리 상담가이자 공감 능력이 뛰어난 시인입니다.
      
      [데이터]
      - 핵심 감정: ${mainEmotion}
      - 농도: ${rawIntensity}/5
      - 태그: ${tags?.join(", ") || "없음"}
      - 사용자 메시지: ${msg ? `"${msg}"` : "없음"}

      [지시]
      1. 메시지가 있다면 그 맥락을 읽고 깊이 공감하는 내용을 "description"의 첫 줄에 반영하세요.
      2. 메시지가 없거나 부적절하다면 감정과 태그 기반으로 보편적인 위로를 작성하세요.
      3. 절대 성적이거나 폭력적이거나 부적절한 언어를 사용하지 마세요.
      4. "description"은 최대 2줄(줄바꿈, 최대 75자 미만 \\n 포함).
      5. "song"은 어울리는 실제 노래(가수 - 제목).
      6. "mix"는 전체 감정 비율 합 100 (stable, joy, expect, tired, stress, anger, sadness, anxiety 중 선택).
      
      결과 형식(JSON):
      { 
        "description": "문장", 
        "song": "가수 - 제목", 
        "mix": [{"key": "감정키", "rate": 수치}, ...], 
        "ai_tag": "상태 요약" 
      }
    `;
    
    let aiResult;
    try {
      aiResult = await generateWithRetry(model, getPrompt(userMessage));
    } catch (error: any) {
      if (error.message?.includes("SAFETY") || error.message?.includes("blocked")) {
        aiResult = await generateWithRetry(model, getPrompt(""));
        userMessage = ""; 
      } else {
        throw error;
      }
    }

    const aiData = validateAndParseAIResponse(aiResult.response.text());
    if (!aiData) return NextResponse.json({ error: "분석 품질 부적합" }, { status: 422 });

    const lines = aiData.description.split('\n').map((l: string) => sanitizeDescription(l));
    aiData.description = lines.length >= 2 ? lines.slice(0, 2).join('\n') : lines[0] + "\n조용히 머무는 마음";

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    let historyQuery = supabase.from('emotions').select('intensity');
    if (finalUserId) {
      historyQuery = historyQuery.eq('user_id', finalUserId);
    } else {
      historyQuery = historyQuery.eq('fingerprint', userFingerprint);
    }

    const { data: pastLogs } = await historyQuery.gte('created_at', thirtyDaysAgo.toISOString());
    const avg7d = pastLogs && pastLogs.length > 0 
      ? pastLogs.reduce((acc, cur) => acc + (cur.intensity || 0), 0) / pastLogs.length 
      : rawIntensity;

    const deltaIntensity = Number((rawIntensity - avg7d).toFixed(2));

    const { data: insertedEmotion, error: insertError } = await supabase
      .from('emotions')
      .insert([{ 
        user_id: finalUserId,
        emotion_key: mainEmotion, 
        tags: tags || [],
        description: aiData.description,
        reason: userMessage, // 필터링된 메시지 저장
        fingerprint: userFingerprint,
        song: aiData.song,
        mix_data: aiData.mix,
        intensity: rawIntensity
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    await supabase.from('analysis').insert([{
      snap_id: insertedEmotion.id,
      fingerprint: userFingerprint,
      user_id: finalUserId,
      intensity_normalized: rawIntensity * 20,
      delta_7d: deltaIntensity,
      status: getStatusByDelta(deltaIntensity),
      emotion_tag: aiData.ai_tag || '미분류'
    }]);

    return NextResponse.json({
      ...aiData,
      id: insertedEmotion.id,
      emotion_key: insertedEmotion.emotion_key,
      reason: userMessage, // 프론트엔드에 필터링 결과 전달
      analysis: { delta: deltaIntensity, status: getStatusByDelta(deltaIntensity), tag: aiData.ai_tag }
    });

  } catch (error: any) {
    console.error("🔥 POST API Error:", error.message);
    return NextResponse.json({ error: "서버 처리 중 오류가 발생했습니다." }, { status: 500 });
  } 
}

/**
 * DELETE: 본인 기록 삭제
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const fp = searchParams.get('fp');
    const user_id = searchParams.get('user_id');

    if (!supabase) return NextResponse.json({ error: "DB 연결 실패" }, { status: 500 });
    if (!id) return NextResponse.json({ error: "삭제할 ID가 필요합니다." }, { status: 400 });

    let query = supabase.from('emotions').delete().eq('id', id);

    if (user_id && user_id !== 'null' && user_id !== 'undefined') {
      query = query.or(`user_id.eq."${user_id}",fingerprint.eq."${fp}"`);
    } else {
      query = query.eq('fingerprint', fp);
    }

    const { error } = await query;
    if (error) throw error;

    return NextResponse.json({ message: "성공적으로 삭제되었습니다." });
  } catch (error: any) {
    return NextResponse.json({ error: "삭제 중 오류가 발생했습니다." }, { status: 500 });
  }
}