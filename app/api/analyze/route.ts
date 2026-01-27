import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  let requestData: any = {};

  try {
    requestData = await req.json();
    const { mainEmotion, reason, text } = requestData;

    if (!mainEmotion || !apiKey) {
      return NextResponse.json({ error: "Invalid Setup" }, { status: 400 });
    }

    // 1. 모델 설정 (2.0-flash 유지)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: { 
        // 힌트일 뿐이지만 설정은 유지합니다.
        responseMimeType: "application/json",
        temperature: 0.7 
      }
    });

// 2. AI에게 전달할 강화된 프롬프트 (3가지 감정 믹스 + 2문장 답변)
const prompt = `
      SYSTEM: You are "Snap", a quiet, warm, and deeply empathetic friend sitting right next to the user.
      Respond ONLY with valid JSON. No markdown, no explanations.

      SNAP'S ABSOLUTE RULES:
      1. Use warm, informal Korean (반말).
      2. No advice, no questions, no solutions, no judgments. 
      3. Respond with EXACTLY TWO SHORT SENTENCES. (Total under 60 characters).
      4. Just acknowledge and echo the feeling with deep empathy.
      5.IMPORTANT:
      Do NOT comfort.
      Do NOT encourage.
      Do NOT motivate.
      Just describe the user's emotional state as if you are speaking for them.

      EMOTION TONE GUIDE:
      - joy: Light, slightly playful. ("오늘 네 기분처럼 날씨도 참 좋다. 이런 날은 오래 기억해도 돼.")
      - sadness: Low, slow, fading out. ("말 안 해도, 무거운 날이란 건 느껴져. 잠시 여기 기대서 숨을 골라도 좋아.")
      - anger: Raw, honest, blunt but supportive. ("그럴만했어. 억지로 참을 필요까지는 없었을지도 몰라.")
      - anxiety: Quiet, breathing pace. ("지금은 생각이 조금 앞서 있네. 천천히 걸어도 길은 잃지 않으니까 괜찮아.")
      - neutral: Observer, calm, simple. ("고요한 공기가 나쁘지 않은 것 같아. 아무 일 없던 하루도, 충분히 귀한 법이지.")
      - regret: Accepting, organizing. ("이미 느꼈다는 것만으로도 충분해. 너무 오래 머물지는 않았으면 좋겠다.")

      RULES:
      1. EMOTION MIX (MUST PROVIDE 3 ELEMENTS): 
         - Must return exactly 3 unique emotion objects in the "mix" array.
         - "key": Must be one of [joy, sadness, anger, anxiety, neutral, regret].
         - "label": A specific Korean emotion word (e.g., '벅참', '먹먹함', '울컥함', '홀가분').
      2. DYNAMIC RATES: Total sum of "rate" must be exactly 100.
      3. MUSIC: "Artist - Title" format.

      INPUT:
      Main Emotion: ${mainEmotion}
      Reason: ${reason}
      Text: "${text}"

      OUTPUT FORMAT:
      {
        "mix": [
          { "key": "${mainEmotion}", "label": "감정1", "rate": 60 },
          { "key": "neutral", "label": "감정2", "rate": 25 },
          { "key": "joy", "label": "감정3", "rate": 15 }
        ],
        "description": "Snap의 다정한 두 문장.",
        "song": "Artist - Title"
      }
    `;
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    
    // 디버깅을 위한 로그 (해결책 6 적용)
    console.log("RAW GEMINI RESPONSE:", rawText);

    // 3. 파싱 방어 로직 (해결책 2 적용: 정규식 추출)
    let data;
    try {
      // 텍스트 중 { } 중괄호로 둘러싸인 부분만 추출하여 파싱
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");
      
      data = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("JSON 파싱 실패, Fallback 실행:", e);
      throw new Error("Parsing Failed");
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error("최종 API 에러:", error);
    
    // 4. 어떤 상황에서도 서비스는 돌아가야 함 (Fallback)
    const fallbackEmotion = requestData?.mainEmotion || 'neutral';
    return NextResponse.json({
      mix: [
        { key: fallbackEmotion, rate: 75 },
        { key: "neutral", rate: 15 },
        { key: "joy", rate: 10 }
      ],
      description: "당신의 마음을 소중하게 읽어내고 있습니다. 지금은 잠시 분석이 지연되어 기본적인 위로를 전해드려요.",
      song: "아이유 - 밤편지"
    });
  }
}