import React from 'react';
import Link from 'next/link';

export default function ArticleEight() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            감정과 이성을 분리하는 기술: <br/>'인지적 거리두기'의 힘
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 심리학 및 정서 조절</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            중요한 결정을 앞두고 불안이나 분노, 혹은 과도한 기대감에 휩싸여 본 적이 있나요? 감정은 우리 삶을 풍요롭게 하지만, 냉철한 판단이 필요한 순간에는 시야를 가리는 안개가 되기도 합니다. 심리학에서는 이를 해결하기 위해 **'인지적 거리두기(Cognitive Defusion)'**라는 강력한 도구를 제안합니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 감정과 나를 동일시하지 마십시오</h2>
          <p>
            우리는 흔히 "나는 화가 난다"라고 말합니다. 이는 '나'와 '화'를 하나로 묶는 표현입니다. 하지만 인지적 거리두기를 실천하는 사람은 **"내게 화라는 감정이 일어나고 있다는 것을 관찰하고 있다"**라고 생각합니다. 감정을 내가 아닌, 내 곁을 지나가는 구름처럼 바라보는 순간 감정의 압도적인 힘은 약해집니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 3인칭 관점의 마법</h2>
          <p>
            연구에 따르면, 자신의 문제를 마치 타인의 고민인 것처럼 3인칭 시점에서 바라볼 때 훨씬 현명한 해결책이 도출된다고 합니다. 이를 '솔로몬의 역설(Solomon's Paradox)'이라고 부릅니다. 
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>이름 부르기:</strong> "나는 왜 이럴까?" 대신 "[본인이름]은 왜 이런 감정을 느낄까?"라고 질문해 보세요.</li>
            <li><strong>비유하기:</strong> 현재의 복잡한 감정을 하나의 날씨나 풍경으로 묘사해 보십시오. 시각화는 이성적인 뇌를 활성화합니다.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. '사실'과 '해석'의 명확한 구분</h2>
          <p>
            우리를 괴롭히는 것은 발생한 사건(Fact) 그 자체보다, 그 사건에 덧입혀진 우리의 해석(Interpretation)인 경우가 많습니다. 인지적 거리두기는 덧칠해진 감정의 레이어를 하나씩 벗겨내고 핵심적인 사실만을 남기는 과정입니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "안경에 김이 서렸을 때 안경을 닦는 가장 좋은 방법은, 일단 안경을 벗어서 바라보는 것입니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: 거울을 투과해 본질을 보기</h2>
          <p>
            결정의 순간에 필요한 것은 뜨거운 열정이 아니라 차가운 정지 화면입니다. 자신의 상태를 객관적인 데이터로 치환하여 바라볼 수 있을 때, 우리는 비로소 감정의 노예가 아닌 삶의 주인으로서 선택할 수 있습니다.
          </p>
          <p className="font-bold text-white">
            Clarity Room은 당신의 감정과 이성을 분리하는 '중립적인 거울' 역할을 합니다. 당신이 입력한 주관적인 문장들을 선언적이고 구조적인 데이터로 변환함으로써, 인지적 거리두기를 즉각적으로 경험하게 돕습니다. 지금 당신의 안개 낀 생각을 명료하게 닦아내 보세요.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              객관적인 내 상태 관찰하기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}