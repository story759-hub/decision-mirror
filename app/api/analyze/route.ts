import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const apiKey = process.env.GEMINI_API_KEY || "";

// ✅ 어떤 변수가 비어있는지 로그로 확인 (보안을 위해 값은 출력하지 않음)
console.log("변수 체크:", {
  url: !!supabaseUrl,
  key: !!supabaseServiceKey,
  gemini: !!apiKey
});

if (!supabaseUrl || !supabaseServiceKey || !apiKey) {
  // 어떤 변수가 누락되었는지 에러 메시지에 명시
  const missing = [];
  if (!supabaseUrl) missing.push("SUPABASE_URL");
  if (!supabaseServiceKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!apiKey) missing.push("GEMINI_API_KEY");
  
  throw new Error(`서버 환경 변수 누락: ${missing.join(", ")}`);
}
const supabase = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : null;

const genAI = new GoogleGenerativeAI(apiKey);

// 감정 키와 라벨 매핑 (서버측 보강용)
const EMOTION_LABELS: { [key: string]: string } = {
  joy: "기쁨",
  sadness: "슬픔",
  anger: "분노",
  anxiety: "불안",
  regret: "미안",
  neutral: "평온"
};

function safeJsonParse(text: string) {
  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    const jsonStr = cleaned.slice(start, end + 1);
    return JSON.parse(jsonStr);
  } catch (e) {
    return null;
  }
}

/**
 * ✅ 문장 부호 제거 및 정제 (줄바꿈 \n 은 보존해야 함)
 */
function sanitizeDescription(text: string): string {
  if (!text) return "";
  return text
    .replace(/["'‘“’”]/g, "") 
    .replace(/[.?!]/g, "")    
    .replace(/나\s?|너\s?|당신|우리/g, "") 
    .replace(/해요/g, "하다")
    .replace(/하세요/g, "한다")
    .trim();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fingerprint = searchParams.get('fp');

    if (!supabase || !fingerprint) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('emotions')
      .select('*')
      .eq('fingerprint', fingerprint)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  } catch (error: any) {
    console.error("🔥 History GET Error:", error.message);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!supabase || !apiKey) {
      throw new Error("서버 환경 변수가 설정되지 않았습니다.");
    }

    const requestData = await req.json();
    const { mainEmotion, reason, text, fingerprint } = requestData;
    const userFingerprint = fingerprint || 'anonymous';

    if (!mainEmotion) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }

    /* ===================================================
       [Step 1] Gemini AI 분석 (먼저 수행)
       분석이 실패하면 여기서 Error를 던져 이후 과정을 중단함
    ====================================================== */
    let aiData: any = null;
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
    });

    const prompt = `
      SYSTEM: 사용자의 감정을 기록하는 사진작가입니다.
      [지침]
      1. 'description': 담담하고 은유적인 짧은 문장 2개를 생성하되 반드시 중간에 줄바꿈(\\n)을 포함할 것. 문장 부호 절대 금지.
      2. 'mix': 감정 레이블 3개와 비율(rate). 예시: [{"key": "joy", "label": "기쁨", "rate": 70}, ...]
      3. 'song': 아티스트 - 곡 제목.
      
      Input: 감정=${mainEmotion}, 이유=${reason}, 본문="${text}"
    `;

    const aiResult = await model.generateContent(prompt);
    aiData = safeJsonParse(aiResult.response.text());

    // AI 데이터가 비정상적이면 에러를 발생시켜 catch 블록으로 보냄 (저장 방지)
    if (!aiData || !aiData.mix || !aiData.description) {
      throw new Error("AI 분석 데이터 생성 실패");
    }

    /* ===================================================
       [Step 2] 데이터 정제 (Sanitize)
    ====================================================== */
    const lines = aiData.description.split('\n').map((l: string) => sanitizeDescription(l));
    aiData.description = lines.length >= 2 ? lines.slice(0, 2).join('\n') : lines[0] + "\n" + "기록된 찰나";
    
    aiData.mix = aiData.mix.map((m: any) => ({
      ...m,
      label: m.label || EMOTION_LABELS[m.key] || "기록"
    }));

    /* ===================================================
       [Step 3] DB 저장 및 통계 업데이트 (AI 성공 시에만 실행)
    ====================================================== */
    // 1. 메인 기록 저장
    const { error: insertError } = await supabase.from('emotions').insert([{ 
      emotion_key: mainEmotion, 
      reason: reason, 
      description: aiData.description,
      fingerprint: userFingerprint,
      song: aiData.song,
      mix_data: aiData.mix 
    }]);

    if (insertError) throw insertError; // 저장 실패 시 중단

    // 2. 통계 카운트 업데이트 (RPC 호출)
    try {
      await supabase.rpc('increment_emotion_count', { target_key: mainEmotion });
    } catch (e) { 
      console.error("RPC Error:", e); 
      // 통계 업데이트 실패는 기록 저장만큼 치명적이지 않으므로 진행 가능하지만, 
      // 엄격하게 하려면 여기서도 throw 가능
    }

    // 3. 최신 통계 데이터 가져오기
    const { data: allStats } = await supabase.from('emotion_stats').select('count, emotion_key');
    const { count: userSnapCount } = await supabase
      .from('emotions')
      .select('*', { count: 'exact', head: true })
      .eq('fingerprint', userFingerprint);

    const totalArchiveCount = allStats?.reduce((acc, cur) => acc + Number(cur.count || 0), 0) || 0;
    const currentEmotionTotal = allStats?.find(s => s.emotion_key === mainEmotion)?.count || 1;

    // 최종 응답
    return NextResponse.json({
      ...aiData,
      displayStats: { 
        totalCount: totalArchiveCount.toLocaleString(),
        emotionSpecificCount: currentEmotionTotal,
        userSnapCount: userSnapCount || 0
      }
    });

  } catch (error: any) {
    console.error("🔥 POST Error (저장되지 않음):", error.message);
    // 에러 발생 시 500 에러와 함께 실패 메시지 반환. 
    // 이 경우 프론트엔드는 stage를 'pick'으로 돌리거나 에러 UI를 보여주게 됨.
    return NextResponse.json(
      { error: "Analysis failed", message: error.message }, 
      { status: 500 }
    );
  } 
}