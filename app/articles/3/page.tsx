import React from 'react';
import Link from 'next/link';

export default function ArticleThree() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            매몰 비용 오류: <br/>과거에 쏟은 시간이 당신의 발목을 잡고 있다면
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 행동 경제학</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            "지금까지 부은 돈이 얼마인데...", "여기에 들인 시간이 아까워서 못 그만두겠어." 우리가 무언가를 포기해야 할 시점에 흔히 내뱉는 말들입니다. 하지만 심리학과 경제학에서는 이를 **'매몰 비용 오류(Sunk Cost Fallacy)'**라고 부르며, 합리적인 의사결정을 방해하는 가장 위험한 심리적 함정으로 규정합니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 매몰 비용(Sunk Cost)이란 무엇인가?</h2>
          <p>
            매몰 비용이란 이미 지출되어 어떤 방법을 써도 다시 회수할 수 없는 비용을 의미합니다. 돈, 시간, 감정적 에너지 등이 모두 포함됩니다. 합리적인 결정이라면 '미래에 얻을 이익'과 '추가로 들 비용'만을 계산해야 하지만, 인간은 본능적으로 **손실 회피(Loss Aversion)** 성향을 가지고 있어 이미 잃어버린 것에 집착하게 됩니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 콩코드 오류(Concorde Fallacy)</h2>
          <p>
            이 현상의 대표적인 사례는 초음속 여객기 '콩코드' 사업입니다. 영국과 프랑스 정부는 사업성이 없다는 사실을 중도에 깨달았음에도 불구하고, 이미 투입된 엄청난 예산이 아까워 사업을 강행했습니다. 결국 천문학적인 적자를 내고 나서야 멈췄습니다. 
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>주식 투자:</strong> 하락장에서도 "본전은 찾아야지"라며 매도하지 못하는 심리.</li>
            <li><strong>인간관계:</strong> 맞지 않는 상대임을 알면서도 "함께한 세월" 때문에 이별을 미루는 심리.</li>
            <li><strong>진로 결정:</strong> 전공이 적성에 맞지 않지만 "공부한 게 아까워서" 진로를 바꾸지 못하는 심리.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. 과거의 나로부터 독립하기</h2>
          <p>
            매몰 비용 오류에서 벗어나는 유일한 방법은 **'제로 베이스(Zero-base)'** 사고입니다. "만약 내가 오늘 이 일을 처음 시작한다면, 그래도 선택할 것인가?"라고 자문해 보십시오. 과거의 투자와 상관없이 현재 시점에서 미래 가치가 없다면, 과감히 '손절'하는 것이 가장 이익이 큰 결정입니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "합리적인 인간은 지나간 어제를 계산하지 않습니다. 오직 오늘 이후의 가치만을 계산합니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: 비워내야 채울 수 있습니다</h2>
          <p>
            머릿속이 복잡한 이유는 어쩌면 버려야 할 것을 버리지 못하고 있기 때문일지도 모릅니다. 아까운 마음이 드는 것은 인간의 당연한 본능이지만, 그 본능이 당신의 미래까지 망치게 두어서는 안 됩니다.
          </p>
          <p className="font-bold text-white">
            Clarity Room은 당신이 쥐고 있는 복잡한 감정 중 무엇이 '이미 지나간 비용'인지 냉정하게 비추어 줍니다. 지금 당신의 고민을 입력하고, 현재 유지하고 있는 상태의 밀도를 객관적으로 확인해 보세요.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              미련 없이 정리 시작하기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}