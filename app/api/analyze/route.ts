import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ 1. 환경 변수 및 싱글톤 설정
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const apiKey = process.env.GEMINI_API_KEY || "";

const supabase = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : null;

const genAI = new GoogleGenerativeAI(apiKey);

/* ================================
   🧠 유틸리티 & 안전 장치
================================ */

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

const SOFT_ENDINGS: [string, string][] = [
  ["이다.", "같다."], ["있다.", "남아 있다."], ["없다.", "없는 편이다."],
  ["끝났다.", "여기까지다."], ["정해졌다.", "정해진 것 같다."], ["멈췄다.", "멈춰 있다."],
];

function softenSnapText(sentence: string): string {
  if (!sentence) return "";
  let result = sentence;
  SOFT_ENDINGS.forEach(([hard, soft]) => {
    if (result.includes(hard) && Math.random() < 0.5) {
      result = result.replace(hard, soft);
    }
  });
  return result;
}

function sanitizeDescription(text: string): string {
  if (!text) return "";
  return text
    .replace(/나\s?|너\s?|당신|우리/g, "")
    .replace(/해요/g, "하다")
    .replace(/하세요/g, "한다")
    .trim();
}

/* ================================
   🧩 API Handlers
================================ */

/**
 * 🟢 GET: 특정 사용자의 지난 기록들 가져오기
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fingerprint = searchParams.get('fp');

    if (!supabase || !fingerprint) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('snaps')
      .select('*')
      .eq('user_fingerprint', fingerprint)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("🔥 History GET Error:", error.message);
    return NextResponse.json([], { status: 500 });
  }
}

/**
 * 🟢 POST: 새로운 감정 분석 및 저장
 */
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

    // --- [Step 1] DB 작업: 카운트 증가 및 통계 조회 ---
    await supabase.rpc('increment_emotion_count', { target_key: mainEmotion });

    const { data: allStats } = await supabase.from('emotion_stats').select('*');
    const { count: userSnapCount } = await supabase
      .from('snaps')
      .select('*', { count: 'exact', head: true })
      .eq('user_fingerprint', userFingerprint);

    const totalArchiveCount = allStats?.reduce((acc, cur) => acc + Number(cur.total_count), 0) || 0;
    const currentEmotionTotal = allStats?.find(s => s.emotion_key === mainEmotion)?.total_count || 1;

    // --- [Step 2] Gemini AI 분석 ---
    let data: any = null;

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
      });

      const { data: userHistory } = await supabase
        .from('snaps')
        .select('emotion_key')
        .eq('user_fingerprint', userFingerprint)
        .order('created_at', { ascending: false })
        .limit(3);

      const recentEmotions = userHistory?.map(h => h.emotion_key).join(', ') || '첫 기록';

      const prompt = `
        SYSTEM: 사용자의 찰나를 기록하는 사진작가입니다. 
        USER HISTORY: 최근 감정 기록: [${recentEmotions}]
        [출력 지침]
        1. 'mix': 상황에 맞는 은유적 감정 레이블 2개 생성.
        2. 'song': 실제 "아티스트 - 곡 제목" 추천.
        3. 'description': 담담한 문체로 두 줄 작성 (마침표, 쉼표, 따옴표 등 생략).
        Emotion: ${mainEmotion} | Reason: ${reason} | Text: "${text}"
      `;

      const aiResult = await model.generateContent(prompt);
      data = safeJsonParse(aiResult.response.text());
      if (!data) throw new Error("AI_PARSE_ERROR");

    } catch (aiError: any) {
      console.error("⚠️ AI Fallback Mode:", aiError.message);
      data = {
        mix: [
          { key: mainEmotion, label: "말하지 못한 마음", rate: 75 },
          { key: "neutral", label: "고요한 공기", rate: 25 }
        ],
        description: "선명하지 않아도 괜찮은\n지금 이대로의 충분한 기록",
        song: "아이유 - 마음"
      };
    }

    // --- [Step 3] 최종 데이터 가공 및 저장 ---
    data.description = softenSnapText(sanitizeDescription(data.description));
    
    if (!data.description.includes("\n")) {
      const mid = Math.floor(data.description.length / 2);
      data.description = data.description.slice(0, mid) + "\n" + data.description.slice(mid);
    }

    // DB에 최종 결과 저장
    await supabase.from('snaps').insert([{ 
      emotion_key: mainEmotion, 
      reason: reason, 
      description: data.description,
      user_fingerprint: userFingerprint
    }]);

    // 실시간 통계 주입
    data.displayStats = { 
      totalCount: (totalArchiveCount + 1).toLocaleString(), // 방금 추가된 것 포함
      emotionSpecificCount: currentEmotionTotal,
      userSnapCount: (userSnapCount || 0) + 1
    };

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("🔥 Critical Error:", error.message);
    return NextResponse.json({
      mix: [{ key: "neutral", label: "정지된 장면", rate: 100 }],
      description: "잠시 후 다시 기록해 주세요\n마음은 소중히 보관 중입니다",
      song: "Feeling Snap - Recording...",
      displayStats: { totalCount: "1,200+", emotionSpecificCount: 0, userSnapCount: 1 }
    }, { status: 200 });
  }
}