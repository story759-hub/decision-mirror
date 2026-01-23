import { NextResponse } from 'next/server';



export async function POST(req: Request) {

  const { mainEmotion, reason, text } = await req.json();



  // 프롬프트 구성: AI에게 페르소나와 출력 형식을 지정합니다.

  const prompt = `

    사용자의 현재 주 감정은 "${mainEmotion}"이며, 상황은 "${reason}"입니다.

    추가 메시지: "${text}"

    

    위 데이터를 바탕으로 다음을 분석해서 JSON으로만 답변하세요:

    1. 주 감정을 포함한 상위 3가지 감정 믹스 비율 (합계 100%)

    2. 이 상황에 어울리는 짧은 위로/공감 문구 (2줄 이내)

    3. 어울리는 노래 1곡 (아티스트 - 제목)

    

    형식: { "mix": [{ "key": "joy", "rate": 70 }, ...], "description": "...", "song": "..." }

  `;



  try {

    // 실제 API 호출 (예시: OpenAI 사용 시)

    // const response = await fetch('https://api.openai.com/v1/chat/completions', { ... });

    // const data = await response.json();

    

    // 여기서는 연동 구조를 보여드리기 위해 표준화된 응답 포맷을 반환합니다.

    // 실제 연동 시 API 응답값을 파싱하여 넣으시면 됩니다.

    return NextResponse.json({

      mix: [

        { key: mainEmotion, rate: 75 },

        { key: 'anxiety', rate: 15 },

        { key: 'neutral', rate: 10 }

      ],

      description: `당신이 느낀 ${mainEmotion}의 무게를 AI가 분석했습니다. ${reason} 때문이라면 더더욱 마음을 돌봐야 할 때군요.`,

      song: "추천 곡 정보 (API 연동 시 자동 생성)"

    });

  } catch (error) {

    return NextResponse.json({ error: "분석 실패" }, { status: 500 });

  }

}

