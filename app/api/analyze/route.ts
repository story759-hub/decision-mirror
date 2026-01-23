import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: Request) {
  try {
    const { mainEmotion, reason, text } = await req.json();
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Analyze: Emotion=${mainEmotion}, Reason=${reason}, Story="${text}". 
    Return JSON: {"mix": [{"key": "${mainEmotion}", "rate": 80}, {"key": "neutral", "rate": 20}], "description": "Short Korean text", "song": "Artist - Song"}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // JSON 파싱 전 정제 및 에러 방지
    try {
      const data = JSON.parse(responseText.replace(/```json|```/g, "").trim());
      return NextResponse.json(data);
    } catch (e) {
      // 파싱 실패 시 기본 데이터 반환
      return NextResponse.json({
        mix: [{ key: mainEmotion, rate: 100 }],
        description: "마음을 분석 중입니다. 잠시만 기다려 주세요.",
        song: "추천 곡을 불러오는 중"
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "API Error" }, { status: 500 });
  }
}