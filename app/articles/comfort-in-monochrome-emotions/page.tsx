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
        <Link href="articles" className="text-[#E91E63] font-bold mb-8 inline-block hover:underline">
          ← 인사이트 목록으로 돌아가기
        </Link>

        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-10">
            <div className="mb-4">
              <span className="bg-slate-50 text-slate-500 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-100">
                Column
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              무채색의 감정이 주는 위로: <br/>선명하지 않아도 괜찮은 우리의 기록 방식
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 31 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              우리는 흔히 '감정'이라고 하면 빨간색의 열정, 노란색의 기쁨, 파란색의 슬픔 같은 선명한 원색을 떠올리곤 합니다. 하지만 우리의 실제 삶을 채우고 있는 마음의 색깔은 그보다 훨씬 흐릿하고 모호한 '무채색'에 가까울 때가 많습니다. 기쁜 것도 아니고 슬픈 것도 아닌, 그저 그런 상태. <strong>Feeling Snap</strong>은 바로 이 지점에 주목합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 정의할 수 없는 마음의 가치</h3>
            <p className="break-keep">
              현대 심리학에서는 자신의 감정을 세밀하게 단어로 정의하는 능력을 '감정 입자도(Emotional Granularity)'라고 부릅니다. 하지만 때로는 어떤 단어로도 설명되지 않는 '멍함'이나 '가라앉음' 자체가 가장 정직한 상태일 수 있습니다. 선명한 이름표를 붙이지 못한다고 해서 그 마음이 가치 없는 것은 아닙니다. 오히려 이름 붙지 않은 감정들 속에 우리의 가장 깊은 진심이 숨어있기도 합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 낮은 채도의 순간이 주는 안정감</h3>
            <p className="break-keep">
              강렬한 감정은 에너지를 소모하게 만듭니다. 반면, 무채색의 평온함이나 담담한 상태는 우리의 마음이 다음 여정을 위해 에너지를 비축하고 있다는 증거이기도 합니다. 폭풍우가 지나간 뒤의 회색빛 하늘이 주는 묘한 안도감처럼, 우리의 마음도 때로는 낮은 채도의 구간을 지날 때 비로소 진정한 휴식을 얻습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 기록은 해석이 아니라 '현상'이다</h3>
            <p className="break-keep">
              사진을 인화(현상)할 때, 빛이 부족하면 부족한 대로 그늘진 이미지가 만들어집니다. 우리의 감정 기록도 마찬가지여야 합니다. 억지로 밝기를 올리거나 채도를 높여 '행복한 척' 기록할 필요가 없습니다. <strong>지금 이 순간의 노이즈와 흔들림까지 그대로 담아내는 것</strong>, 그것이 가장 나다운 기록 방식입니다.
            </p>

            <div className="bg-slate-50 border-l-4 border-slate-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "선명하지 않아도 괜찮습니다. <br/>흐릿한 오늘의 기록이 훗날 당신의 가장 편안한 쉼표가 될 테니까요."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 있는 그대로의 셔터를 누르세요</h3>
            <p className="break-keep">
              오늘 당신의 마음이 어떤 색인지 모르겠다면, 그냥 그 모호함을 스냅으로 남겨보세요. Feeling Snap의 무채색 필터는 당신의 그 막연함을 '불안'이 아닌 '평온한 정지'로 기록해 줄 것입니다.
            </p>
            
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Recommended Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Ryuichi Sakamoto - Merry Christmas Mr. Lawrence</li>
                <li>• Chet Baker - I Get Along Without You Very Well</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                담담한 나의 지금 기록하기 🌿
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}