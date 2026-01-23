import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// 1. API 키 확인 및 설정
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { mainEmotion, reason, text } = await req.json();

    // 2. 모델 설정 (Gemini 1.5 Flash - 빠르고 효율적)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. AI에게 전달할 페르소나와 제약 사항 (Prompt Engineering)
    const prompt = `
      당신은 심리학자이자 음악 큐레이터입니다. 사용자의 입력을 바탕으로 감정 분석 스냅샷을 만드세요.
      
      [입력 데이터]
      - 주 감정 그룹: ${mainEmotion}
      - 선택한 구체적 상황: ${reason}
      - 사용자의 추가 텍스트: "${text || "내용 없음"}"

      [응답 규칙 - 엄격히 준수]
      1. 반드시 JSON 형식으로만 응답하세요.
      2. 'mix' 배열에는 입력된 '${mainEmotion}'을 포함해 연관된 감정 3개를 점수(합계 100)로 만드세요.
      3. 감정 키워드는 반드시 [joy, sadness, anger, anxiety, regret, neutral] 중에서만 선택하세요.
      4. 'description'은 사용자에게 직접 말을 거는 듯한 따뜻한 위로 문장(2줄 이내)으로 작성하세요.
      5. 'song'은 이 감정에 어울리는 실제 존재하는 노래(가수 - 제목)를 추천하세요.

      [응답 형식 예시]
      {
        "mix": [
          {"key": "joy", "rate": 75},
          {"key": "anxiety", "rate": 15},
          {"key": "neutral", "rate": 10}
        ],
        "description": "정말 고생 많으셨어요. 당신의 노력이 결실을 맺는 순간이군요.",
        "song": "아이유 - Love wins all"
      }
    `;

    // 4. Gemini 실행
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    // 5. JSON 추출 (AI가 마크다운 형식을 섞어 보낼 경우 대비)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid AI Response");
    
    const analysisResult = JSON.parse(jsonMatch[0]);

    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error("Gemini API Error:", error);
    // 에러 발생 시 사용자 경험을 위해 기본값 반환
    return NextResponse.json({
      mix: [{ key: "neutral", rate: 100 }],
      description: "당신의 마음을 읽는 중 잠시 숨을 고르고 있어요. 다시 한번 시도해볼까요?",
      song: "잔나비 - 주저하는 연인들을 위해"
    }, { status: 200 });
  }
}