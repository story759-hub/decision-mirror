import React from 'react';
import Link from 'next/link';

export default function ArticleThirteen() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            성장형 마인드셋: <br/>실패를 결정의 끝이 아닌 과정으로 보는 법
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 교육 심리학 및 자기계발</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            똑같은 실수나 실패를 마주했을 때, 어떤 사람은 좌절하며 포기하고 어떤 사람은 이를 발판 삼아 다시 일어섭니다. 이 차이를 만드는 결정적인 요소는 지능이나 환경이 아닌 **'마인드셋(Mindset)'**에 있습니다. 스탠퍼드 대학교의 심리학자 캐럴 드웩 교수는 인간의 사고방식을 '고정형'과 '성장형' 두 가지로 정의했습니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 고정형 마인드셋 vs 성장형 마인드셋</h2>
          <p>
            자신의 능력이 태어날 때부터 정해져 있다고 믿는 것이 **고정형 마인드셋(Fixed Mindset)**입니다. 반면, 노력과 전략을 통해 지능과 능력을 계속해서 키울 수 있다고 믿는 것이 **성장형 마인드셋(Growth Mindset)**입니다. 
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>고정형:</strong> 실패를 자신의 무능함을 증명하는 사건으로 받아들여 도전을 피합니다.</li>
            <li><strong>성장형:</strong> 실패를 학습의 데이터로 여기며, 더 나은 방법을 찾기 위한 신호로 해석합니다.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 의사결정에서의 마인드셋 차이</h2>
          <p>
            성장형 마인드셋을 가진 사람은 의사결정을 내릴 때 결과에 대한 과도한 압박감을 덜어낼 수 있습니다. "이 결정이 틀리면 내 인생은 끝이야"가 아니라 "이 결정이 기대와 다른 결과를 가져오더라도 나는 무언가를 배울 것이고, 다음에는 더 나은 결정을 내릴 수 있어"라고 생각하기 때문입니다. 이러한 태도는 결정 마비를 방지하고 과감한 실행력을 부여합니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. '아직(Not Yet)'의 힘</h2>
          <p>
            드웩 교수는 '아직 아님'이라는 단어의 힘을 강조합니다. 지금 당장 결과가 나오지 않거나 판단이 서지 않는 상태를 '실패'로 규정짓는 대신, '아직 도달하지 못한 과정'으로 인식하는 것입니다. 이 작은 관점의 변화가 뇌의 인지 구조를 방어적인 상태에서 탐색적인 상태로 전환시킵니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "실패는 당신의 정체성이 아니라, 당신이 풀고 있는 퍼즐의 일부일 뿐입니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: 배움을 위한 선택을 하십시오</h2>
          <p>
            완벽한 결정을 내리려고 애쓰기보다, 당신을 성장시킬 수 있는 선택을 하십시오. 결과가 좋다면 그것대로 기쁜 일이고, 결과가 나쁘다면 당신은 더 강력한 '경험치'를 얻게 될 것입니다. 성장형 마인드셋으로 무장할 때 의사결정은 두려움이 아닌 성장을 위한 도구가 됩니다.
          </p>
          <p className="font-bold text-white">
            Clarity Room은 당신의 현재 마인드셋이 어디를 향하고 있는지 분석합니다. 당신의 고민 속에 숨겨진 고정형 사고의 패턴을 찾아내고, 이를 성장형 질문으로 전환할 수 있도록 구조화해 드립니다. 지금 당신의 한계를 배움의 기회로 바꿔보세요.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              성장형 사고로 전환하기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}