'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleFive() {
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
                Happiness & Brain
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              도파민과 세로토닌의 차이: <br/>지속 가능한 행복을 찾는 법
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              우리는 기분이 좋을 때 흔히 "도파민 터진다"라는 표현을 씁니다. 하지만 우리가 느끼는 '기쁨'에는 두 가지 전혀 다른 얼굴이 있다는 사실을 아시나요? 강렬하지만 금방 사라지는 자극과 은은하지만 오래 지속되는 평온함, 이 두 사이의 균형을 이해하는 것이 행복의 핵심입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 도파민(Dopamine): 짜릿한 성취의 쾌락</h3>
            <p className="break-keep">
              도파민은 '보상'의 호르몬입니다. 무언가를 쟁취하거나, 새로운 자극을 받았을 때 분출됩니다. 에너지가 넘치고 흥분되는 기쁨을 주지만, 내성이 생겨 더 큰 자극을 원하게 만든다는 특징이 있습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 세로토닌(Serotonin): 은은한 존재의 행복</h3>
            <p className="break-keep">
              세로토닌은 '안정'의 호르몬입니다. 따뜻한 햇볕 아래 산책을 하거나, 감사함을 느낄 때 활성화됩니다. 평온하고 만족스러운 기쁨을 주며 중독성이 없고 몸과 마음의 면역력을 높여줍니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 행복의 골든 스코어 만드는 법</h3>
            <p className="break-keep">
              현대인들은 도파민 과잉의 시대에 살고 있습니다. 자극적인 쾌락 끝에 오는 무기력증을 막으려면 의도적으로 세로토닌의 비중을 높여야 합니다.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>느린 보상 즐기기:</strong> 즉각적인 자극 대신 독서나 요리 같은 긴 호흡의 활동하기.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>작은 감사의 기록:</strong> 오늘 하루 당연했던 것들 중 좋았던 점 3가지만 적어보기.</span>
              </li>
            </ul>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "행복은 자극의 강도가 아니라, <br/>평온함의 빈도에 달려 있습니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              지금 당신이 느끼는 기쁨이 쾌락에 가까운지, 평온에 가까운지 관찰해 보세요. 어떤 종류의 기쁨이든 그 순간을 온전히 만끽하는 것이 중요합니다.
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 오늘의 긍정적인 감정을 기록해 보세요. 기록하는 행위 자체가 뇌의 세로토닌 수치를 높여주며, 당신의 소중한 기쁨을 더 오래 머물게 도와줄 것입니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                오늘의 기쁨 스냅 찍기 ✨
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}