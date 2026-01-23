'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleThree() {
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
                Brain Science
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              6초의 기적: 욱하는 화를 다스리는 <br/>뇌 과학적 메커니즘
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 6 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              누구나 한 번쯤은 울컥하는 감정을 참지 못해 후회할 말을 내뱉거나 행동한 적이 있을 것입니다. 분노는 불꽃처럼 순식간에 타오르지만, 그 짧은 찰나를 다스리는 것만으로도 우리는 수많은 갈등과 자책에서 벗어날 수 있습니다. 뇌 과학이 증명하는 분노 조절의 핵심은 바로 <strong>'6초'</strong>에 있습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 감정의 뇌 vs 이성의 뇌</h3>
            <p className="break-keep">
              우리가 분노를 느낄 때, 뇌의 편도체(Amygdala)는 비상경보를 울립니다. 이는 생존을 위한 본능적인 반응이지만, 동시에 이성적인 판단을 담당하는 전두엽(Prefrontal Cortex)의 기능을 일시적으로 마비시킵니다. 이를 심리학에서는 <strong>'편도체 납치(Amygdala Hijack)'</strong>라고 부릅니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 왜 하필 '6초'인가?</h3>
            <p className="break-keep">
              편도체가 발화하여 온몸에 분노 호르몬을 뿌리고, 다시 전두엽이 상황을 파악하여 제어력을 회복하는 데 걸리는 최소한의 시간이 바로 6초입니다. 
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>초기 2초:</strong> 강렬한 감정 에너지가 분출되는 시점입니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>중간 2초:</strong> 심장 박동이 빨라지고 신체적 반응이 정점에 달합니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>마지막 2초:</strong> 전두엽이 활성화되며 "이게 정말 화낼 일인가?"라고 묻기 시작합니다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 6초를 벌어주는 실전 기술</h3>
            <p className="break-keep">
              화가 치밀어 오를 때 단순히 참으려고 하면 오히려 역효과가 날 수 있습니다. 대신 뇌의 주의를 다른 곳으로 돌리는 전략이 필요합니다.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>숫자 세기:</strong> 1부터 6까지 천천히 숫자를 세며 호흡합니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>객관적 묘사:</strong> "나는 지금 화가 났다"라고 자신의 상태를 제3자처럼 관찰합니다.</span>
              </li>
            </ul>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "분노는 다른 사람에게 던지려고 뜨거운 석탄을 손에 쥐는 것과 같습니다. <br/>결국 화상을 입는 것은 자기 자신입니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              분노는 무조건 나쁜 것이 아닙니다. 하지만 조절되지 않은 분노는 당신의 에너지를 갉아먹습니다. 욱하는 순간이 찾아온다면, 바로 대응하기보다 그 마음을 짧게라도 기록해 보세요. 
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              지금 Feeling Snap에 당신의 답답한 마음을 쏟아내 보세요. AI 분석이 당신의 감정 온도를 낮춰주고, 전두엽이 다시 명확한 판단을 내릴 수 있도록 도와줄 것입니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                내 감정 온도 낮추러 가기 🌡️
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}