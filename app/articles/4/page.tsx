'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleFour() {
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
                Emotional Healing
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              슬픔의 재발견: 마음을 치유하는 <br/>'눈물의 정화 작용'
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 6 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              우리는 흔히 슬픔을 '약함'의 상징으로 여깁니다. 그래서 슬픈 감정이 차오를 때 억지로 웃거나 바쁘게 움직여 감정을 외면하곤 하죠. 하지만 심리학에서는 슬픔을 억누르는 것이 오히려 심리적 내상을 깊게 만든다고 경고합니다. 슬픔은 억제의 대상이 아니라 <strong>'충분히 겪어내야 할 과정'</strong>입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 카타르시스: 정서적 배설의 필요성</h3>
            <p className="break-keep">
              아리스토텔레스가 언급한 '카타르시스'는 비극을 보며 슬픔을 쏟아낼 때 느끼는 해방감을 의미합니다. 우리 뇌는 슬픈 감정을 눈물이나 언어로 배출할 때 스트레스 호르몬인 코르티솔 수치를 낮춥니다. 실제로 감정적으로 흘리는 눈물에는 독소와 스트레스 완화 물질이 포함되어 있다는 연구 결과도 있습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 슬픔의 5단계 이해하기</h3>
            <p className="break-keep">
              정신과 의사 엘리자베스 퀴블러 로스는 상실로 인한 슬픔이 5가지 단계를 거친다고 말합니다.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start italic border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>부정 & 분노:</strong> 현실을 거부하고 "왜 나에게만?"이라는 질문을 던집니다.</span>
              </li>
              <li className="flex items-start italic border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>타협 & 우울:</strong> 무력감을 느끼며 모든 것이 무의미해 보입니다.</span>
              </li>
              <li className="flex items-start italic">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>수용:</strong> 비로소 현실을 인정하고 나아갈 준비를 합니다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 건강하게 슬퍼하는 방법</h3>
            <p className="break-keep">
              마음의 무게를 덜어내기 위해서는 감정을 글로 적는 행위(Journaling)가 뇌가 슬픔을 정리하는 데 큰 도움을 줍니다. 또한 방해받지 않고 마음껏 울 수 있는 시간과 장소를 자신에게 허락하세요.
            </p>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "겨울이 가야 봄이 오듯, <br/>슬픔을 충분히 통과한 마음만이 진정한 평온을 맞이할 수 있습니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              슬픔은 당신이 무언가를 깊이 사랑했고, 소중히 여겼다는 증거입니다. 그 마음을 억지로 지우려 하지 마세요. 대신 그 결을 하나하나 어루만져 주어야 합니다.
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              지금 Feeling Snap에서 당신의 무거운 마음을 털어놓으세요. 당신의 슬픔을 함께 분석하고, 그 감정이 건강한 회복으로 이어질 수 있도록 따뜻한 위로를 건네겠습니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                내 마음의 무게 덜어내기 💧
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}