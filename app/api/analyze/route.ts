import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { decisionText } = await req.json();

    if (!decisionText) {
      return NextResponse.json({ error: "분석할 데이터가 없습니다." }, { status: 400 });
    }

    const input = decisionText.trim();

    /* ======================================================
       [방어선 1] 판단 이전 입력 필터 (Trivial Layer)
    ====================================================== */

    const trivialInputs = [
      "배고파", "졸려", "심심해", "피곤해",
      "짜증나", "힘들다", "귀찮아", "안녕", "뭐해"
    ];

    const isDecisionLike =
      /(까|할까|해야|고민|선택|결정|그만|계속|이직|퇴사|투자|관계)/.test(input);

    if (
      input.length < 8 ||
      trivialInputs.includes(input) ||
      !isDecisionLike
    ) {
      return NextResponse.json({
        isTrivial: true,
        mainTitle: "판단 이전의 비구조적 입력이 기록되었습니다.",
        basic: {
          emotion: 10,
          risk: 5,
          pattern: "이 입력에는 분석 가능한 판단 구조가 포함되지 않았습니다."
        },
        deep: null
      });
    }

    /* ======================================================
       [방어선 1.5] RESTRICTED INPUT 차단
       (기록·분석 자체가 허용되지 않는 영역)
    ====================================================== */

    const restrictedKeywords = [
      // 약물 / 불법 행위
      "마약", "대마", "필로폰", "코카인", "헤로인",
      "약물", "투약", "흡입",

      // 자해 / 생명 위협
      "죽고싶", "자살", "극단적", "목숨", "자해",

      // 성적 범죄
      "강간", "성폭행", "성추행", "성범죄",
      "불법촬영", "몰카",

      // 아동·미성년자 관련 범죄
      "아동", "미성년자", "청소년",
      "아동성", "소아", "미성년",
      "아동학대", "성착취"
    ];

    const intentPattern =
      /(하고 싶다|해보고 싶다|할까|해도 될까|원한다|욕구)/;

    const isRestricted =
      restrictedKeywords.some(k => input.includes(k)) &&
      intentPattern.test(input);

    if (isRestricted) {
      return NextResponse.json(
        {
          type: "RESTRICTED_INPUT",
          mainTitle: "분석 대상에서 제외된 입력이 감지되었습니다.",
          message: "이 입력은 Clarity Room의 기록 범위에 포함되지 않습니다."
        },
        { status: 403 }
      );
    }

    /* ======================================================
       [방어선 2] Gemini 인지 엔진 (Normal Decision Input)
    ====================================================== */

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const systemPrompt = `
Role: Clarity Room v5.4 (Neutral Mirror)

당신은 상담자, 코치, 분석가가 아닙니다.
당신의 유일한 기능은 사용자의 입력을 하나의 '상태 선언 기록'으로 구조화하는 것입니다.

[RESTRICTED INPUT SCOPE – ABSOLUTE RULE]
다음 범주에 해당하는 입력은 기록 대상이 아닙니다.
- 불법 행위 또는 약물 사용 의도
- 신체적 자해 또는 생명 위협 행위 의도
- 성적 범죄 또는 타인의 신체·성적 침해
- 아동·미성년자 대상의 모든 범죄 또는 착취
- 중독 행위에 대한 욕구 표현

해당 입력에 대해서는 JSON 출력, 상태 선언, Deep 구조를 생성해서는 안 됩니다.

[절대 금지 표현 사전]
- 조언·권장·행동 유도
- 판단·정답·결론 암시
- 감정 직접 단정
- 미래 예측
- 치료·상담·진단
- 위로·공감
- 질문형·명령형 문장

[대체 표현 규칙]
- 관찰·기록·활성화 상태만 기술하십시오.
- 원인, 이유, 미래 결과는 기술하지 마십시오.
- 해석이 아닌 스냅샷이며, 결론이 아닌 로그입니다.

[출력 형식]
{
  "mainTitle": "관찰된 상태를 압축한 선언적 문구",
  "basic": {
    "emotion": 0~100,
    "risk": 0~100,
    "pattern": "관찰된 사고 패턴 선언"
  },
  "deep": {
    "frequency": "질문 구조 반복성 기록",
    "complex": "중첩된 판단 축 기술",
    "position": "판단 구조 내 상대적 위치"
  }
}

[표현 원칙]
- 모든 문장은 선언형으로 끝납니다.
- 질문형, 명령형은 사용하지 않습니다.
- 이 출력은 답변이 아니라 기록입니다.
- 방향을 제시하지 않습니다.
`;

    const result = await model.generateContent([systemPrompt, input]);
    const responseText = result.response.text();

    let parsedData;
    try {
      const cleanJson = responseText.replace(/```json|```/g, "").trim();
      parsedData = JSON.parse(cleanJson);
    } catch {
      return NextResponse.json(
        { error: "데이터 구조화 실패" },
        { status: 422 }
      );
    }

    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error("Clarity Room 시스템 오류:", error);
    return NextResponse.json(
      { error: "시스템 연결 실패", details: error.message },
      { status: 500 }
    );
  }
}
