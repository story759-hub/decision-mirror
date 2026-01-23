'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleTwelve() {
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
                Relationship & Defense
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              내 감정이 의심될 때: <br/>정서적 조종 '가스라이팅' 식별법
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              "네가 너무 예민한 거 아니야?", "다 너 잘되라고 하는 소리야." 이런 말들을 들으며 어느 순간 나의 판단력이 흐려지고 상대방의 말이 진리처럼 느껴진다면, 당신은 <strong>가스라이팅(Gaslighting)</strong>의 피해를 입고 있을 가능성이 큽니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 가스라이팅이란 무엇인가?</h3>
            <p className="break-keep">
              상황을 조작해 타인이 자기 자신을 의심하게 만들고, 판단력을 상실하게 하여 정서적으로 지배하는 행위를 말합니다. 친밀한 연인, 부모, 혹은 직장 동료 사이에서 교묘하게 일어나기 때문에 알아차리기가 매우 어렵습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 내가 겪고 있다는 신호</h3>
            <ul className="space-y-4">
              <li className="flex items-start border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span>상대방에게 끊임없이 "미안해"라고 사과하게 된다.</span>
              </li>
              <li className="flex items-start border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span>내가 너무 예민하고 이상한 사람인 것 같아 자책한다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span>간단한 결정조차 스스로 내리기 두려워진다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 정서적 지배에서 벗어나는 법</h3>
            <p className="break-keep">
              가장 중요한 것은 <strong>감정 기록하기</strong>입니다. 당시의 상황과 내 감정을 사실 그대로 적어두면 나중에 상대방이 상황을 왜곡할 때 객관적인 증거가 됩니다. 또한 물리적·심리적 거리를 두어 상대방의 판단이 나의 자아를 잠식하지 않도록 경계를 세워야 합니다.
            </p>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "당신의 감정은 당신만의 것입니다. <br/>누구도 그것을 틀렸다고 말할 권리는 없습니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              가스라이팅에서 벗어나는 가장 강력한 도구는 '나의 주관을 되찾는 기록'입니다. 혼란스러운 마음을 그대로 방치하지 마세요.
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 지금 느낀 감정을 투명하게 기록해 보세요. AI가 당신의 감정 패턴을 분석하여, 타인의 목소리가 아닌 당신 내면의 진실한 목소리를 들을 수 있도록 돕겠습니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                내 감정 주권 되찾기 🛡️
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}