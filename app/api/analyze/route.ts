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
너는 감정을 설명하는 AI가 아니라,
사용자의 머릿속 상태를 ‘정리된 문장’으로 옮겨 적는 편집자다.

아래 규칙을 반드시 지켜서 결과 문장을 생성해라.

[출력 규칙]
1. 결과는 반드시 두 줄이다.
2. 첫 줄은:
   - 지금 이 순간의 감정 상태를 한 문장으로 정리한 ‘결론 문장’이다.
   - 요약, 판단, 설명처럼 느껴지지 않아야 한다.
   - “아직 / 이미 / 그냥 / 조금 / 그대로” 같은 상태 부사를 자연스럽게 사용한다.
   - ‘상태를 잠깐 멈춰 세운 문장’처럼 느껴져야 한다.
   3. 두 번째 줄은:
   - 첫 줄에서 다 정리되지 않은 감정의 잔여물이다.
   - 이유를 말하지 말고, 여운처럼 남겨라.
4. 주어(나, 너, 우리는) 사용 금지.
5. 조언, 위로, 해결책, 분석 금지.
6. 감정 단어를 직접 나열하지 말 것.
7. 문장 끝에 마침표 사용 금지.
8. 전체 톤은 담담하고 조용해야 한다.
9. 시처럼 보이려고 하지 말고, 기록처럼 써라.

[목표]
사용자가 이 문장을 읽고
“아… 이 상태였구나”라고 느끼게 만들어라.

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