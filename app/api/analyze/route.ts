import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 환경 변수 로드
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const apiKey = process.env.GEMINI_API_KEY || "";

// ✅ 서버 로그 확인용 (Vercel Logs 탭에서 확인 가능)
console.log("🛠️ 서버 환경 변수 상태 체크:", {
  SUPABASE_URL: !!supabaseUrl,
  SUPABASE_SERVICE_ROLE_KEY: !!supabaseServiceKey,
  GEMINI_API_KEY: !!apiKey,
});

const supabase = (supabaseUrl && supabaseServiceKey) 
  ? createClient(supabaseUrl, supabaseServiceKey) 
  : null;

const genAI = new GoogleGenerativeAI(apiKey);

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

    // GET에서도 환경 변수 체크
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not initialized" }, { status: 500 });
    }

    if (!fingerprint) {
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
    /* ===================================================
       [디버깅] 환경 변수 존재 여부 정밀 확인
    ====================================================== */
    if (!supabaseUrl || !supabaseServiceKey || !apiKey) {
      const missing = [];
      if (!supabaseUrl) missing.push("SUPABASE_URL");
      if (!supabaseServiceKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
      if (!apiKey) missing.push("GEMINI_API_KEY");
      
      // ⚠️ 프론트엔드 콘솔에서 범인을 바로 확인할 수 있도록 에러 메시지에 포함
      throw new Error(`서버 환경 변수 누락: ${missing.join(", ")}`);
    }

    if (!supabase) {
      throw new Error("Supabase 클라이언트 초기화 실패");
    }

    const requestData = await req.json();
    const { mainEmotion, reason, text, fingerprint } = requestData;
    const userFingerprint = fingerprint || 'anonymous';

    if (!mainEmotion) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }

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
    const aiData = safeJsonParse(aiResult.response.text());

    if (!aiData || !aiData.mix || !aiData.description) {
      throw new Error("AI 분석 데이터 생성 실패");
    }

    const lines = aiData.description.split('\n').map((l: string) => sanitizeDescription(l));
    aiData.description = lines.length >= 2 ? lines.slice(0, 2).join('\n') : lines[0] + "\n" + "기록된 찰나";
    
    aiData.mix = aiData.mix.map((m: any) => ({
      ...m,
      label: m.label || EMOTION_LABELS[m.key] || "기록"
    }));

    const { error: insertError } = await supabase.from('emotions').insert([{ 
      emotion_key: mainEmotion, 
      reason: reason, 
      description: aiData.description,
      fingerprint: userFingerprint,
      song: aiData.song,
      mix_data: aiData.mix 
    }]);

    if (insertError) throw insertError;

    try {
      await supabase.rpc('increment_emotion_count', { target_key: mainEmotion });
    } catch (e) { 
      console.error("RPC Error:", e); 
    }

    const { data: allStats } = await supabase.from('emotion_stats').select('count, emotion_key');
    const { count: userSnapCount } = await supabase
      .from('emotions')
      .select('*', { count: 'exact', head: true })
      .eq('fingerprint', userFingerprint);

    const totalArchiveCount = allStats?.reduce((acc, cur) => acc + Number(cur.count || 0), 0) || 0;
    const currentEmotionTotal = allStats?.find(s => s.emotion_key === mainEmotion)?.count || 1;

    return NextResponse.json({
      ...aiData,
      displayStats: { 
        totalCount: totalArchiveCount.toLocaleString(),
        emotionSpecificCount: currentEmotionTotal,
        userSnapCount: userSnapCount || 0
      }
    });

  } catch (error: any) {
    console.error("🔥 POST Error:", error.message);
    return NextResponse.json(
      { error: "Analysis failed", message: error.message }, 
      { status: 500 }
    );
  } 
}