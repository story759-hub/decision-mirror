'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleTen() {
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
                Self-Understanding
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              내 감정의 이름을 부르면 사라지는 효과: <br/>'감정 명명하기(Affect Labeling)'
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              막연하게 기분이 나쁘거나 답답할 때, 우리는 그 감정에 압도당하기 쉽습니다. 하지만 그 모호한 덩어리에 <strong>"나는 지금 억울함을 느끼고 있어"</strong>라고 이름을 붙이는 순간, 신기하게도 감정의 소용돌이는 잦아들기 시작합니다. 이것이 바로 심리학에서 말하는 <strong>'감정 명명하기(Affect Labeling)'</strong>의 힘입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 뇌는 '이름'을 붙일 때 안심한다</h3>
            <p className="break-keep">
              UCLA 심리학과 연구팀에 따르면, 자신의 감정을 단어로 표현하는 순간 감정의 중추인 '편도체'의 활동은 줄어들고, 이성을 담당하는 '전전두피질'이 활성화됩니다. 막연한 공포가 구체적인 정보로 치환되면서, 뇌가 상황을 통제하고 있다고 판단하기 때문입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 감정 어휘력과 회복탄력성</h3>
            <p className="break-keep">
              단순히 '좋다'나 '나쁘다'가 아니라, '복잡미묘하다', '무력하다' 등 세밀한 감정 단어를 사용하는 사람일수록 스트레스 상황에서 더 빠르게 회복합니다. 감정을 세분화할수록 그에 맞는 적절한 대처법을 찾기 쉬워지기 때문입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 어떻게 이름을 붙여야 할까?</h3>
            <p className="break-keep">
              감정 명명하기는 누구나 할 수 있는 가장 쉬운 심리 치료법입니다.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>주어와 함께 말하기:</strong> "짜증 나" 대신 "나는 지금 일정이 꼬여서 짜증이 난 상태야"라고 문장으로 완성해 보세요.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>기록으로 남기기:</strong> 머릿속으로 생각만 하는 것보다 직접 쓰고 눈으로 확인하는 것이 뇌의 진정 효과를 극대화합니다.</span>
              </li>
            </ul>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "이름을 불러주기 전까지 그것은 다만 하나의 몸짓에 지나지 않았으나, <br/>이름을 불렀을 때 그것은 비로소 나에게로 와서 꽃이 되었다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              감정은 무시할수록 커지고, 마주할수록 작아집니다. 오늘 당신의 마음을 스쳐 간 무수한 감정들에게 제각기 이름을 지어주었나요?
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap은 당신이 감정의 이름을 더 정확하게 부를 수 있도록 돕습니다. 지금 당신의 마음을 한 줄의 문장으로 적어보세요. AI가 그 속에 숨겨진 감정의 이름들을 찾아드리고, 당신의 마음이 꽃으로 피어날 수 있게 도와드릴게요.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                내 감정의 이름 불러주기 🏷️
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}