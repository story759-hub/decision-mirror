import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ 1. 외부 설정 (싱글톤)
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
    if (start === -1 || end === -1) throw new Error("JSON_NOT_FOUND");
    const jsonStr = cleaned.slice(start, end + 1);
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("AI Response Parsing Failed. Raw Text:", text);
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
   🧩 API Handler
================================ */
export async function POST(req: Request) {
  let requestData: any = {};

  try {
    if (!supabase || !apiKey) {
      throw new Error("서버 환경 변수가 설정되지 않았습니다.");
    }

    requestData = await req.json();
    const { mainEmotion, reason, text, fingerprint } = requestData;

    if (!mainEmotion) {
      return NextResponse.json({ error: "Invalid Request" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: { 
        responseMimeType: "application/json", 
        temperature: 0.9 // 유동적인 묘사를 위해 온도를 살짝 높임
      },
    });

    // ✅ [강화] 레이블 유동화 및 노래 추천 지침
    const prompt = `
SYSTEM: 당신은 사용자의 찰나의 마음을 포착하여 '감정 인덱스'와 '음악'으로 기록하는 사진작가입니다.

[출력 지침]
1. 'mix': 고정된 단어를 쓰지 마세요. 현재 상황(Reason, Text)을 바탕으로 각 감정 요소의 성질을 은유적인 짧은 문구로 표현하세요. (예: "가라앉은 침묵", "희미한 기대", "차가운 공기" 등)
2. 'song': 상황에 완벽히 어울리는 실제 아티스트와 곡을 선정하세요. 반드시 "아티스트 - 곡 제목" 형식을 지키세요.
3. 'description': 마침표 없이 담담하게 두 줄로 작성하세요. 주어는 생략합니다.

OUTPUT JSON FORMAT:
{
  "appliedTone": "poetic | calm | cold",
  "mix": [
    { "key": "${mainEmotion}", "label": "상황에 맞는 감성적 표현", "rate": 70 },
    { "key": "neutral", "label": "상황에 맞는 감성적 표현", "rate": 30 }
  ],
  "commonRate": "15%",
  "rateLabel": "이 장면을 고른 사람은 15%야\\n관측 문장",
  "description": "감성적인 첫 줄\\n감성적인 둘째 줄",
  "song": "Artist - Title"
}

INPUT: Emotion: ${mainEmotion} | Reason: ${reason} | Text: "${text}"
`;

    const aiResult = await model.generateContent(prompt);
    const rawText = aiResult.response.text();
    let data = safeJsonParse(rawText);

    if (!data || !data.description) {
      throw new Error("DATA_PROCESSING_ERROR");
    }

    // mix 배열 방어 및 레이블 검증
    if (!Array.isArray(data.mix)) {
      data.mix = [
        { key: mainEmotion, label: "기록된 마음", rate: 100 },
        { key: "neutral", label: "정지된 장면", rate: 0 }
      ];
    }

    // 텍스트 보정
    data.description = softenSnapText(sanitizeDescription(data.description));
    if (!data.description.includes("\n")) {
      const mid = Math.floor(data.description.length / 2);
      data.description = data.description.slice(0, mid) + "\n" + data.description.slice(mid);
    }

    // ✅ 비동기 저장
    supabase.from('snaps').insert([{ 
      emotion_key: mainEmotion, 
      reason: reason, 
      description: data.description,
      user_fingerprint: fingerprint || 'anonymous'
    }]).then(({ error }) => {
      if (error) console.error("DB Insert Error:", error.message);
    });

    data.displayStats = { totalCount: "1,240" };
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("🔥 Snap API Critical Error:", error.message);
    return NextResponse.json({
      appliedTone: "neutral",
      mix: [
        { key: "neutral", label: "남겨진 마음", rate: 70 },
        { key: "neutral", label: "조용한 정리", rate: 30 }
      ],
      commonRate: "18%",
      rateLabel: "이 장면을 고른 사람은 18%야\n관측 문장",
      description: "창밖은 이미 어둡고\n방은 아직 조용하다",
      song: "우효 - 민들레",
      displayStats: { totalCount: "1,240" }
    });
  }
}