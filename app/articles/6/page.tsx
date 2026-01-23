'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleSix() {
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
                Mental Health
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              아무것도 하기 싫을 때: <br/>번아웃이 보내는 뇌의 SOS 신호
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              분명 열심히 살고 싶고 해야 할 일도 산더미인데, 정작 몸과 마음이 천근만근 무거워 손하나 까딱하기 싫은 날이 있습니다. 이는 의지력의 문제가 아니라, 당신의 뇌가 과부하를 막기 위해 스스로 전원을 내리는 <strong>'번아웃(Burnout)'</strong> 증상일 확률이 높습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 뇌의 에너지가 고갈되었다는 증거</h3>
            <p className="break-keep">
              우리 뇌의 전두엽은 의사결정과 실행력을 담당합니다. 하지만 만성적인 스트레스와 휴식 없는 몰입은 전두엽을 지치게 만듭니다. 이때 우리 뇌는 생존을 위해 '최소 전력 모드'로 전환하며, 이것이 우리가 느끼는 <strong>'무기력증'</strong>으로 나타납니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 번아웃의 주요 신호 3가지</h3>
            <p className="break-keep">
              단순한 피로와 번아웃은 다릅니다. 다음 신호가 느껴진다면 즉시 멈춰야 합니다.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>정서적 고갈:</strong> 예전에는 즐겁던 일이 아무런 감흥을 주지 못합니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>냉소적인 태도:</strong> 주변 사람이나 업무에 대해 무관심해집니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>효능감 저하:</strong> "내가 잘할 수 있을까?"라는 자기 의심이 깊어집니다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. '진짜 휴식'을 위한 뇌 리셋 법</h3>
            <p className="break-keep">
              스마트폰을 보며 누워 있는 것은 뇌에게 휴식이 아닙니다. 하루 딱 1시간만이라도 모든 기기를 끄고 시각 정보를 차단하는 <strong>디지털 디톡스</strong>가 필요합니다. 멍하게 있는 시간을 의도적으로 만들어 뇌의 디폴트 모드 네트워크(DMN)를 정돈해야 합니다.
            </p>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "당신은 기계가 아닙니다. 가끔 멈추는 것은 <br/>퇴보가 아니라 다음 항해를 위한 정비 시간입니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              지금 아무것도 하기 싫다면, 그것은 당신이 그동안 누구보다 최선을 다해 달려왔다는 증거입니다. 자신을 채찍질하는 대신, 지금의 에너지가 몇 퍼센트 남았는지 솔직하게 대면해 보세요.
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 지금 당신의 무기력함의 깊이를 기록해 보세요. AI가 당신의 에너지를 회복할 수 있는 작은 첫걸음을 제안해 드립니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                지친 내 마음 진단하기 🔋
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}