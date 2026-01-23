'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleFifteen() {
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
                Psychology & Career
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              성공해도 불안한 당신에게: <br/>'가면 증후군' 탈출하기
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              성과를 내고 인정을 받아도 "이건 다 운이었어", "곧 실력이 없다는 게 들통날 거야"라고 걱정하고 있나요? 그렇다면 당신은 <strong>가면 증후군(Imposter Syndrome)</strong>을 겪고 있는 것입니다. 놀랍게도 미셸 오바마, 엠마 왓슨 같은 인물들도 이 감정을 고백한 바 있습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 왜 나를 '사기꾼'처럼 느낄까?</h3>
            <p className="break-keep">
              가면 증후군은 완벽주의적 성향이 강한 사람들에게 주로 나타납니다. 자신의 실제 모습과 이상적인 모습 사이의 간극을 '거짓말'로 치부해버리는 것이죠. 이것은 당신이 무능해서가 아니라, 오히려 더 높은 기준을 가진 사람이라는 반증이기도 합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 가면을 벗는 법</h3>
            <ul className="space-y-4">
              <li className="flex items-start border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>객관적 사실 나열:</strong> 운이 아닌 당신이 직접 노력했던 데이터(시간, 결과물)를 시각화하세요.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>공유하기:</strong> 이 감정을 밖으로 꺼내는 순간, 많은 사람이 같은 고민을 하고 있음을 알게 되고 공포는 줄어듭니다.</span>
              </li>
            </ul>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "당신은 자격이 있기에 그 자리에 있는 것입니다. <br/>운도 실력의 일부라는 말을 믿으세요."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              당신이 이룬 성취는 우연이 아닙니다. 스스로를 속이고 있다는 불안감이 엄습할 때, 그 감정의 실체를 기록해 보세요.
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 지금의 불안함을 기록해 보세요. AI가 당신의 성취를 객관적으로 분석하여 당신이 얼마나 충분한 사람인지 다시 확인시켜 줄 것입니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                가짜 나에서 벗어나기 🎭
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}