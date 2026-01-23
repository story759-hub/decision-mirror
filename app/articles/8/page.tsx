'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleEight() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20 overflow-x-hidden">
      {/* 메인 로고 디자인 유지 */}
      <header className="max-w-xl mx-auto pt-14 pb-8 text-center border-b border-slate-50">
        <Link href="/">
          <h1 
            className="text-4xl font-black tracking-tighter flex justify-center items-center cursor-pointer" 
            style={{ WebkitTextStroke: '1.2px currentColor' }}
          >
            <span className="text-[#0F172A]" style={{ WebkitTextStrokeColor: '#0F172A' }}>Feeling</span>
            <span className="text-[#E91E63] ml-1" style={{ WebkitTextStrokeColor: '#E91E63' }}>Snap</span>
          </h1>
        </Link>
      </header>

      <main className="max-w-xl mx-auto px-6 py-12">
        {/* 수정된 목록 경로와 문구 */}
        <Link href="/articles" className="text-[#E91E63] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>

        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-10">
            {/* 카테고리 태그 */}
            <div className="mb-4">
              <span className="bg-pink-50 text-[#E91E63] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-pink-100">
                Cognitive Psychology
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              과거에 갇힌 당신에게: <br/>후회를 성장의 동력으로 바꾸는 법
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              "그때 다른 선택을 했더라면 어땠을까?" 우리는 이미 지나간 과거의 갈림길을 돌아보며 끊임없이 자책하곤 합니다. 심리학에서는 이를 <strong>'반사실적 사고(Counterfactual Thinking)'</strong>라고 부릅니다. 하지만 이 후회라는 감정은 제대로 사용하기만 하면 미래를 바꾸는 가장 강력한 나침반이 될 수 있습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 후회는 '더 나은 미래'를 원하는 뇌의 신호</h3>
            <p className="break-keep">
              아무런 희망이 없는 사람은 후회하지 않습니다. 후회한다는 것은 당신에게 더 잘해내고 싶은 욕구가 남아있다는 증거입니다. 뇌는 후회를 통해 과거의 실수를 복기하고, 다음에 유사한 상황에서 똑같은 실수를 반복하지 않도록 우리를 훈련시킵니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 자책(Self-Blame)과 성찰(Reflection)의 차이</h3>
            <p className="break-keep">
              후회와 자책을 구분하는 것이 고통에서 벗어나는 첫걸음입니다.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>자책:</strong> "나는 왜 그랬을까?"라며 화살을 '자아'로 돌립니다. 이는 에너지를 고갈시킵니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>성찰:</strong> "어떤 판단이 잘못되었나?"라며 화살을 '시스템'으로 돌립니다. 이는 변화를 만듭니다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 후회를 성장의 자산으로 만드는 법</h3>
            <p className="break-keep">
              과거의 망령에서 벗어나려면 "만약 ~했다면(If only)"을 <strong>"다음에는 ~하겠다(Next time)"</strong>로 문장을 바꿔보세요. 그때의 나는 그럴 수밖에 없었음을 인정하고, 그 결과에서 딱 한 가지만 배울 점을 찾아 미래로 시선을 돌려야 합니다.
            </p>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "후회는 과거를 고치는 도구가 아니라, <br/>미래를 설계하는 데이터입니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              과거의 선택 때문에 잠 못 이루고 있다면, 그 미련의 덩어리를 밖으로 꺼내어 기록해 보세요. 머릿속에만 머무는 후회는 괴물이 되지만, 텍스트로 정리된 후회는 단순한 에러 메시지일 뿐입니다.
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              지금 Feeling Snap에서 당신의 후회를 텍스트로 선언해 보세요. AI 분석을 통해 과거의 미련을 털어내고, 오늘부터 다시 시작할 수 있는 용기를 얻으시길 바랍니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                미련 털어내고 다시 시작하기 🚀
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}