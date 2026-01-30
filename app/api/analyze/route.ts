import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

/* ================================
   🧠 Snap 문장 딱딱함 완화 로직
================================ */
const SOFT_ENDINGS: [string, string][] = [
  ["이다.", "같다."],
  ["있다.", "남아 있다."],
  ["없다.", "없는 편이다."],
  ["끝났다.", "여기까지다."],
  ["정해졌다.", "정해진 것 같다."],
  ["멈췄다.", "멈춰 있다."],
];

const HARD_ADVERBS: [string, string][] = [
  ["이미", "어느새"],
  ["완전히", "거의"],
  ["분명히", "조금은"],
  ["딱", "그쯤"],
];

const NOUN_SOFTEN: [string, string][] = [
  ["상태", "느낌"],
  ["지점", "쯤"],
  ["결과", "모양"],
  ["방향", "쪽"],
];

function softenSnapText(sentence: string): string {
  let result = sentence;

  const applySoft = (pairs: [string, string][], probability: number) => {
    pairs.forEach(([hard, soft]) => {
      if (result.includes(hard) && Math.random() < probability) {
        result = result.replace(hard, soft);
      }
    });
  };

  applySoft(SOFT_ENDINGS, 0.5);
  applySoft(HARD_ADVERBS, 0.3);
  applySoft(NOUN_SOFTEN, 0.3);

  return result;
}

/* ================================
   🧹 금지어 제거 (Reject ❌)
================================ */
const FORBIDDEN_REPLACEMENTS: [RegExp, string][] = [
  [/나\s?/g, ""],
  [/너\s?/g, ""],
  [/당신/g, ""],
  [/우리/g, ""],
  [/괜찮/g, "조용한"],
  [/힘내/g, ""],
  [/해요/g, "하다"],
  [/하세요/g, "한다"],
];

function sanitizeDescription(text: string): string {
  let result = text;
  FORBIDDEN_REPLACEMENTS.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });
  return result.trim();
}

/* ================================
   🧩 API Handler
================================ */
export async function POST(req: Request) {
  let requestData: any = {};

  try {
    requestData = await req.json();
    const { mainEmotion, reason, text } = requestData;

    if (!mainEmotion || !apiKey) {
      return NextResponse.json({ error: "Invalid Setup" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 1.0,
      },
    });

    const prompt = `
SYSTEM:
You are "Snap", an emotional observer.
First determine the tone internally, then write the sentence.

[TONE MODES]:
- dry: 담담, 거리감
- cynical: 기대가 어긋난 느낌
- neutral: 정보에 가까운 정지 상태

You MUST choose ONE tone internally and return it as "appliedTone".

[ABSOLUTE RULES]:
- description MUST be exactly 2 lines separated by \\n
- NO SUBJECTS (나, 너, 우리, 당신 금지)
- NO punctuation at the end (. ! ? 금지)
- Informal Korean (반말)
- Do not explain emotions directly
- Leave emotional space (미완 느낌)

[MIX RULES]:
- mix MUST contain exactly 3 emotions.
- key MUST be one of: joy, sadness, anger, anxiety, regret, neutral.
- label: AI should analyze the context and create a creative and poetic Korean emotional name (e.g., "흩어진 마음", "서늘한 기분", "남겨진 미련" 등).
- rate MUST sum to 100.

[SCARCITY RULES]:
- commonRate: realistic percentage (1~99, avoid round numbers)
- rateLabel MUST be exactly 2 lines:
  Line 1: "이 장면을 고른 사람은 n%야"
  Line 2: poetic observation

INPUT:
Emotion: ${mainEmotion}
Reason: ${reason}
Text: "${text}"

OUTPUT JSON:
{
  "appliedTone": "dry | cynical | neutral",
  "mix": [
    { "key": "joy | sadness | anger | anxiety | regret | neutral", "label": "Poetic Label", "rate": 50 },
    { "key": "joy | sadness | anger | anxiety | regret | neutral", "label": "Poetic Label", "rate": 30 },
    { "key": "joy | sadness | anger | anxiety | regret | neutral", "label": "Poetic Label", "rate": 20 }
  ],
  "commonRate": "n%",
  "rateLabel": "이 장면을 고른 사람은 n%야\\n관측 문장",
  "description": "첫 줄\\n둘째 줄",
  "song": "Artist - Title"
}
`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSON parse failed");

    let data = JSON.parse(jsonMatch[0]);

    /* ================================
       🧩 서버 보정 (Reject 없음)
    ================================ */
    data.description = sanitizeDescription(data.description);
    data.description = softenSnapText(data.description);

    if (!data.description.includes("\n")) {
      const mid = Math.floor(data.description.length / 2);
      data.description =
        data.description.slice(0, mid) + "\n" + data.description.slice(mid);
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("Snap API Error:", error);

    /* ================================
       🪂 안전한 Fallback
    ================================ */
    return NextResponse.json({
      appliedTone: "neutral",
      mix: [
        { key: requestData?.mainEmotion || "neutral", label: "남겨진 마음", rate: 60 },
        { key: "neutral", label: "정지된 장면", rate: 30 },
        { key: "anxiety", label: "미세한 떨림", rate: 10 },
      ],
      commonRate: "18%",
      rateLabel: "이 장면을 고른 사람은 18%야\n드물게 포착되는 주파수",
      description: "창밖은 이미 어둡고\n방은 아직 조용하다",
      song: "우효 - 민들레",
    });
  }
}