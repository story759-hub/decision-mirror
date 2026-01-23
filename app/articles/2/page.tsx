'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleTwo() {
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
        {/* 요청하신 경로와 문구 */}
        <Link href="/articles" className="text-[#E91E63] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>

        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-10">
            {/* 카테고리 태그 */}
            <div className="mb-4">
              <span className="bg-pink-50 text-[#E91E63] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-pink-100">
                Emotional Psychology
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              불안은 왜 나쁜 것만이 아닐까? <br/>'방어적 비관주의'의 힘
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              우리는 흔히 '불안'을 제거해야 할 부정적인 감정으로 생각합니다. 하지만 심리학자들은 불안이 인류의 생존을 도운 가장 핵심적인 감정이라고 말합니다. 특히 <strong>'방어적 비관주의(Defensive Pessimism)'</strong> 전략을 사용하는 사람들에게 불안은 최고의 성과를 내는 도구가 됩니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 최악을 상상하면 최고를 대비하게 된다</h3>
            <p className="break-keep">
              방어적 비관주의자들은 중요한 일을 앞두고 의도적으로 최악의 시나리오를 떠올립니다. "실수하면 어쩌지?", "준비한 게 안 나오면 어떡하지?" 같은 생각들이 이들을 괴롭히는 것처럼 보이지만, 사실 뇌는 이 불안을 해소하기 위해 <strong>'치밀한 대비'</strong>를 시작합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 불안이 실행력으로 바뀌는 순간</h3>
            <p className="break-keep">
              낙관주의자가 "잘 될 거야"라며 긴장을 늦출 때, 적당한 불안을 가진 사람은 예상치 못한 변수에 대비합니다. 
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>철저한 준비:</strong> 발생 가능한 오류를 미리 점검합니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>감정적 완충:</strong> 최악을 미리 상상했기에 실제 상황에서 덜 당황합니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>에너지 집중:</strong> 불안 에너지를 문제 해결에 쏟아붓습니다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 건강한 불안과 병적인 불안의 차이</h3>
            <p className="break-keep">
              중요한 것은 불안의 존재 자체가 아니라 <strong>'통제권'</strong>입니다. 불안에 압도당해 멈춰 서는 것이 아니라, 그 불안을 '체크리스트'로 바꿀 수 있다면 그것은 당신을 보호하는 강력한 갑옷이 됩니다.
            </p>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "불안은 당신이 그 일을 소중하게 생각하고 있다는 <br/>가장 확실한 증거입니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              지금 느끼는 불안이 괴롭다면, 그 불안이 당신에게 어떤 말을 하고 있는지 기록해 보세요. 불안의 이름을 불러주는 것만으로도 막연한 공포는 구체적인 과제로 변합니다.
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 지금 당신의 불안 지수를 확인하고, 이를 어떻게 긍정적인 에너지로 바꿀 수 있을지 AI의 조언을 들어보세요.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                나의 불안 기록하고 분석하기 🌀
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}