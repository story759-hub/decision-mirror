import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// API 키가 없으면 실행 자체가 안 되도록 체크
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 });
  }

  try {
    const { mainEmotion, reason, text } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 1. AI에게 JSON 포맷을 강제로 주입하는 프롬프트
    const prompt = `
      You are an expert psychological analyzer. 
      Based on the following data, provide a nuanced emotional mix analysis.

      [User Data]
      - Chosen Category: ${mainEmotion}
      - Specific Context: ${reason}
      - Personal Story: "${text || "None"}"

      [Instructions]
      - Analyze the percentage of 3 related emotions (total 100%).
      - Emotions must be from: [joy, sadness, anger, anxiety, regret, neutral].
      - Write a 2-line empathetic message in Korean.
      - Recommend a real Korean or Global song (Artist - Title).
      - RETURN ONLY RAW JSON. NO MARKDOWN. NO BACKTICKS.

      [Output Format]
      {"mix": [{"key": "emotion1", "rate": 70}, {"key": "emotion2", "rate": 20}, {"key": "emotion3", "rate": 10}], "description": "...", "song": "..."}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text().trim();

    // 2. [핵심] 모든 노이즈 제거 (마크다운 코드 블록 등)
    // 앞뒤에 붙은 ```json 이나 ``` 등 텍스트를 정규식으로 제거합니다.
    const cleanJsonString = responseText.replace(/```json|```/g, "").trim();

    // 3. JSON 파싱 및 유효성 검사
    let analysisResult;
    try {
      analysisResult = JSON.parse(cleanJsonString);
    } catch (parseError) {
      // 만약 파싱이 실패하면 텍스트 안에서 { } 내용만 추출 시도
      const jsonMatch = cleanJsonString.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("JSON_EXTRACTION_FAILED");
      }
    }

    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    
    // 실패 시에도 화면이 깨지지 않게 '가장 근사한' 동적 기본값 반환
    return NextResponse.json({
      mix: [
        { key: "neutral", rate: 70 },
        { key: "joy", rate: 30 }
      ],
      description: "당신의 마음을 깊게 들여다보는 중이에요. 잠시 후 다시 확인해볼까요?",
      song: "이루마 - Kiss The Rain"
    });
  }
}