import React from 'react';
import Link from 'next/link';

export default function ArticleTwo() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            선택의 역설: <br/>왜 선택지가 많을수록 우리는 더 불행해지는가?
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 심리학 및 인지 과학</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            우리는 자유로운 사회에 살고 있으며, 더 많은 선택권이 곧 더 큰 자유와 행복을 의미한다고 믿어왔습니다. 하지만 심리학자 배리 슈워츠(Barry Schwartz)는 그의 저서 **'선택의 역설(The Paradox of Choice)'**을 통해 이 통념을 정면으로 반박합니다. 선택지가 늘어날수록 우리의 만족감은 오히려 낮아진다는 것입니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 너무 많은 정보가 주는 '결정 마비'</h2>
          <p>
            마트의 잼 실험(The Jam Study)은 이 현상을 명확히 보여줍니다. 24종류의 잼을 진열했을 때보다 6종류의 잼을 진열했을 때 사람들은 실제로 구매할 확률이 10배나 높았습니다. 선택지가 너무 많으면 뇌는 정보를 처리하는 데 과부하가 걸리고, 결국 **'결정하지 않는 것'**을 선택하게 됩니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 기회비용에 대한 후회와 만족도 저하</h2>
          <p>
            수많은 선택지 중 하나를 골랐을 때, 우리는 포기한 나머지 수백 가지의 장점들을 떠올리게 됩니다. 이를 **'기회비용'**이라고 합니다. 
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>기대감의 상승:</strong> 선택지가 많으면 그중 어딘가에 '완벽한' 것이 있을 거라 기대하게 됩니다.</li>
            <li><strong>자기 비난:</strong> 결과가 나쁠 때, 선택지가 하나뿐이었다면 상황을 탓하겠지만 선택지가 많았다면 '내 선택'을 탓하게 됩니다.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. 극대화자(Maximizer) vs 만족자(Satisficer)</h2>
          <p>
            슈워츠는 사람을 두 부류로 나눕니다. 모든 선택지를 비교해 최고를 찾는 **'극대화자'**와 적당한 기준을 충족하면 결정을 내리는 **'만족자'**입니다. 연구 결과, 극대화자는 객관적으로 더 나은 선택을 할 확률은 높지만, 주관적인 행복도는 만족자보다 현저히 낮았습니다. 그들은 늘 "더 나은 것이 있지 않았을까?"라는 의문에 시달리기 때문입니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "진정한 행복은 무한한 선택권이 아니라, 불필요한 선택지를 걷어내고 본질에 집중할 때 찾아옵니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: 정보의 홍수에서 나를 지키는 법</h2>
          <p>
            오늘날 우리는 너무 많은 뉴스, SNS, 정보 속에서 매몰되어 있습니다. 뇌가 처리할 수 있는 용량을 초과한 정보는 오히려 독이 됩니다. 이럴 때일수록 의도적으로 정보의 양을 줄이고, 내 판단의 기준을 단순화하는 작업이 필요합니다.
          </p>
          <p className="font-bold text-white">
            Clarity Room은 당신의 복잡한 생각 중 핵심만을 남기고 나머지는 비워내도록 설계되었습니다. 지금 수만 가지의 선택지 속에서 길을 잃었다면, 당신의 우선순위를 선언적 문장으로 정리해 보세요.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              생각의 소음 줄이러 가기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}