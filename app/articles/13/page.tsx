'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleThirteen() {
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
                Self-Love & Psychology
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              자존감보다 중요한 '자기 자비': <br/>자신에게 친절해지는 연습
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 4 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              우리는 흔히 '자존감을 높여야 한다'는 압박 속에 삽니다. 하지만 자존감은 타인과의 비교나 성취에 따라 끊임없이 흔들리기 마련입니다. 심리학자 크리스틴 네프는 그 대안으로 <strong>'자기 자비(Self-Compassion)'</strong>를 제안합니다. 이는 잘났을 때만 사랑하는 것이 아니라, 힘들고 실수했을 때의 나를 따뜻하게 안아주는 능력입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 자기 자비의 3요소</h3>
            <ul className="space-y-4">
              <li className="flex items-start border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>자기 친절(Self-Kindness):</strong> 실수를 저질렀을 때 비난 대신 따뜻한 위로를 건네는 것.</span>
              </li>
              <li className="flex items-start border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>보편적 인류애(Common Humanity):</strong> 고통은 나만 겪는 것이 아니라 인간이라면 누구나 겪는 과정임을 이해하는 것.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>마음챙김(Mindfulness):</strong> 감정을 과장하거나 억압하지 않고 있는 그대로 관찰하는 것.</span>
              </li>
            </ul>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "당신이 가장 친한 친구에게 결코 하지 않을 비난을, <br/>왜 당신 자신에게는 하고 있나요?"
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              오늘 당신의 실수를 비난의 화살로 바꾸지 마세요. 마음의 상처를 돌보는 일은 나약함이 아니라 가장 큰 용기입니다.
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 오늘 당신의 실수를 기록해 보세요. AI가 비난 대신 따뜻한 공감의 시선으로 당신의 하루를 재해석해 드릴 것입니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                나에게 친절해지기 🤍
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}