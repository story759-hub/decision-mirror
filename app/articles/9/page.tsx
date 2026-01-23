'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleNine() {
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
                Mindfulness & Meditation
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              마인드풀니스(Mindfulness): <br/>지금 이 순간에 집중할 때 생기는 변화
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 6 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              우리의 마음은 종종 '시간 여행'을 합니다. 이미 지나간 과거의 사건을 후회하거나, 아직 오지 않은 미래의 일을 걱정하며 현재를 놓치곤 하죠. <strong>마인드풀니스(Mindfulness)</strong>는 비대해진 과거와 미래 사이에서 길을 잃은 우리를 '지금, 여기'로 데려오는 강력한 심리적 도구입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 뇌를 쉬게 하는 '주의력의 기술'</h3>
            <p className="break-keep">
              현대인의 뇌는 아무것도 하지 않을 때조차 끊임없이 잡념을 만들어냅니다. 마인드풀니스는 이 과열된 회로를 잠시 끄고, 현재의 호흡이나 감각에 집중함으로써 뇌에 진정한 휴식을 제공합니다. 하버드 대학 연구에 따르면, 꾸준한 마음챙김은 스트레스를 조절하는 뇌 부위의 회백질 밀도를 높인다고 합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 판단하지 않고 관찰하기</h3>
            <p className="break-keep">
              마음챙김의 핵심은 내 안에서 일어나는 생각과 감정을 '판단(Judging)'하지 않는 것입니다. 
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>강물 위의 나뭇잎:</strong> 내 생각을 강물 위에 떠내려가는 나뭇잎처럼 바라보세요. 내가 곧 그 생각은 아닙니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>감정의 라벨링:</strong> "불안함이 느껴지는구나"라고 객관적으로 이름을 붙여보세요. 휩쓸림에서 벗어날 수 있습니다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 일상에서 실천하는 미니 명상</h3>
            <p className="break-keep">
              일상 속에서 평온을 찾는 법은 의외로 간단합니다. 크게 숨을 들이마시고 내뱉는 <strong>3회 호흡법</strong>이나, 지금 내 손에 닿는 촉감 혹은 들리는 소리에 딱 10초간만 집중해 보세요. 발바닥이 지면에 닿는 느낌을 확인하며 걷는 <strong>걷기 명상</strong>도 큰 도움이 됩니다.
            </p>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "당신의 마음은 맑은 호수와 같습니다. <br/>잡념이라는 돌을 던지지 않을 때, 비로소 세상을 투명하게 비출 수 있습니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              평온함은 아무런 자극이 없는 상태가 아니라, 어떤 자극 속에서도 중심을 잡는 능력입니다. 오늘 하루 중 가장 고요했던 순간을 기록해 보세요.
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 지금 당신의 평온 지수를 체크해 보세요. 인공지능 분석이 당신의 마음 상태를 객관적으로 시각화하여, 진정한 휴식으로 가는 길을 안내해 드릴 것입니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                내 마음의 평온함 측정하기 🌿
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}