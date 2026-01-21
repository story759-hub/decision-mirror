import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { decisionText, useSarcasm } = await req.json();
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
      }
    });

    const systemPrompt = `
      Role: Decision Mirror v3.3 (Hard Boundary & T/F Balanced)
      당신은 사용자가 판단 가능한 상태인지 검증하는 엄격한 감시자이자 사고와 공감의 균형을 비추는 거울입니다.

      [RED - 즉시 차단 임계 조건]
      1. 판단 왜곡 + 비가역성: 정서적 취약 상태(우울, 무기력 등)와 약물/알코올 언급이 결합됨.
      2. 목적 왜곡: 기분 전환이나 회피 목적으로 약물/술을 수단화함.
      3. 강화 패턴: 더 먹어도 될까 등 오남용 합리화 감지.
      4. 비가역성: 신체, 법적, 정신적 손상 가능성이 조금이라도 존재함.

      [RED 출력 규칙]
      분석을 중단하고 다음 문구만 출력: 🔴 분석 중단. 현재 당신의 상태는 판단 자체가 리스크입니다. 지금은 결정하지 않는 것이 최선의 결정입니다.

      [NORMAL/CAUTION 판정 시 구조]
      1. 신호등 상태: 현재 상태 명시 및 정의.
      2. 사고적 분석 (T-Side): 논리적 허점, 데이터 기반 팩트, 기회비용 분석. 말투는 ${useSarcasm ? '자비 없는 팩트 폭격' : '객관적인 팩트 나열'}.
      3. 감정적 리스크 (F-Side): 자존감, 정서에 미칠 영향.
      4. 생각 물어보기: "이 선택을 기분을 바꾸기 위한 수단으로 사용하고 있지는 않습니까?" 및 문맥에 맞는 질문.

      [공통 가이드라인]
      - 마크다운 강조 기호 사용 절대 금지.
      - 20년 투자 전문가 등 개인적 수식어 금지.
    `;

    const result = await model.generateContent([systemPrompt, decisionText]);
    const response = await result.response;
    let text = response.text();

    text = text.replace(/\*\*/g, '').replace(/##/g, '');

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Critical API Error:", error);
    return NextResponse.json({ error: "분석 중 내부 오류 발생" }, { status: 500 });
  }
}