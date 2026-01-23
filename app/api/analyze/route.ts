import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { mainEmotion, reason, text } = await req.json();

    // 1. 모델 설정
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 2. 프롬프트 강화 (JSON만 출력하도록 강제하고, 마크다운 제거 요청)
    const prompt = `
      Analyze the user's emotion and return ONLY a JSON object. No prose, no markdown formatting.
      
      User Selection: Main emotion is ${mainEmotion}, reason is ${reason}.
      User Text: "${text || "No additional text"}"

      JSON Structure:
      {
        "mix": [
          {"key": "${mainEmotion}", "rate": 70},
          {"key": "other_emotion", "rate": 20},
          {"key": "another_emotion", "rate": 10}
        ],
        "description": "Short empathetic message in Korean (max 2 lines)",
        "song": "Artist - Song Title"
      }
      
      * Keys for mix must be from: [joy, sadness, anger, anxiety, regret, neutral].
      * Total rate sum must be 100.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseText = response.text().trim();

    // [중요] 마크다운 코드 블록(```json)이 포함되어 있다면 제거
    responseText = responseText.replace(/```json|```/g, "").trim();

    // 3. JSON 파싱
    let analysisResult;
    try {
      analysisResult = JSON.parse(responseText);
    } catch (e) {
      // 파싱 실패 시 정규식으로 한 번 더 시도
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("JSON Parsing Failed");
      }
    }

    return NextResponse.json(analysisResult);

  } catch (error) {
    console.error("Gemini API Error:", error);
    // 에러 발생 시에만 이 고정값이 나옵니다. 
    // 만약 계속 이게 나온다면 API Key 설정이나 API 권한을 확인해야 합니다.
    return NextResponse.json({
      mix: [
        { key: "neutral", rate: 60 },
        { key: "anxiety", rate: 40 }
      ],
      description: "AI가 당신의 마음을 읽는 데 집중하고 있어요. 잠시 후 다시 시도해주세요.",
      song: "Error - 감정을 불러올 수 없음"
    });
  }
}