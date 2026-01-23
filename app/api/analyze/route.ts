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

    // 2. ONLY JSON 강제 프롬프트 (해결책 1 적용)
    const prompt = `
      SYSTEM: You are a JSON generator. Respond ONLY with valid JSON. 
      No markdown, no backticks, no explanations.

      INPUT:
      Main Emotion: ${mainEmotion}
      Reason: ${reason}
      Text: "${text}"

      OUTPUT FORMAT (Strictly JSON, Language: Korean):
      {
        "mix": [
          { "key": "${mainEmotion}", "rate": 70 },
          { "key": "neutral", "rate": 20 },
          { "key": "joy", "rate": 10 }
        ],
        "description": "공감과 위로의 메시지 2문장",
        "song": "가수 - 제목"
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