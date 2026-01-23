'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleEleven() {
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
                Mental Resilience
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              역경을 딛고 일어서는 힘: <br/>고무줄 같은 '회복탄력성' 기르기
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              살다 보면 누구나 예기치 못한 실패나 상처를 마주합니다. 어떤 사람은 작은 시련에도 깊이 무너지지만, 어떤 사람은 큰 폭풍우가 지나간 뒤에도 금방 제자리를 찾습니다. 이 차이를 만드는 결정적인 요인이 바로 <strong>'회복탄력성(Resilience)'</strong>입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 마음의 근육, 회복탄력성</h3>
            <p className="break-keep">
              회복탄력성은 단순히 고통을 참아내는 인내심이 아닙니다. 원래의 상태로 되돌아오는 힘, 혹은 시련을 겪은 뒤 이전보다 더 단단하게 성장하는 능력을 말합니다. 심리학자들은 이를 '마음의 근육'이라 부르며, 신체 근육처럼 훈련을 통해 충분히 키울 수 있다고 강조합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 회복탄력성이 높은 사람들의 특징</h3>
            <ul className="space-y-4">
              <li className="flex items-start border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>낙관적 해석:</strong> 나쁜 일을 '일시적'이고 '특수한' 상황으로 받아들입니다.</span>
              </li>
              <li className="flex items-start border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>감정 조절력:</strong> 부정적인 감정에 지나치게 함몰되지 않고 자신을 인지합니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>지지 자원 활용:</strong> 힘들 때 도움을 청할 수 있는 심리적 안전망이 있습니다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 회복탄력성을 키우는 습관</h3>
            <p className="break-keep">
              매일 지킬 수 있는 아주 작은 목표를 달성해 뇌에 성취감을 공급하세요. 또한, 친구에게 하듯 자신에게 따뜻한 말을 건네는 <strong>자기 자비(Self-compassion)</strong> 실천과 감사 일기 기록은 뇌의 긍정 회로를 활성화하는 데 매우 효과적입니다.
            </p>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "부러질지언정 휘어지지 않는 대나무보다, <br/>유연하게 휘어졌다 돌아오는 고무줄이 더 강합니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              오늘 당신이 겪은 힘든 일도 결국 지나가는 과정입니다. 그 과정에서 느낀 감정을 피하지 말고 그대로 직면해 보세요. 
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 힘든 마음을 쏟아내는 것 자체가 회복의 시작입니다. AI가 당신의 감정 회복을 돕는 심리 가이드를 제공하며, 당신의 마음 근육이 자라날 수 있도록 함께하겠습니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                내 마음의 탄력 회복하기 🩹
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}