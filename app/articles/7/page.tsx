'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleSeven() {
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
                Self-Esteem
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              나만 뒤처지는 것 같을 때: <br/>'사회적 비교 이론'에서 벗어나기
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              SNS를 열면 나보다 잘나가는 사람들, 행복해 보이는 일상들이 쏟아집니다. 그 속에서 나의 평범한 일상은 초라해 보이고, 왠지 나만 뒤처지고 있다는 불안감이 엄습하곤 합니다. 이런 <strong>'열등감'</strong>은 어디에서 오는 것이며, 어떻게 하면 타인의 속도가 아닌 '나의 속도'를 회복할 수 있을까요?
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 왜 우리는 끊임없이 비교할까?</h3>
            <p className="break-keep">
              심리학자 레온 페스팅거의 <strong>'사회적 비교 이론'</strong>에 따르면, 인간은 자신의 능력을 평가할 객관적인 척도가 없을 때 타인과 자신을 비교함으로써 자신의 위치를 파악하려는 본능이 있습니다. 주로 나보다 뛰어난 사람과 비교하는 '상향 비교'를 통해 스스로를 괴롭히곤 하죠.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 하이라이트와 비하인드 씬</h3>
            <p className="break-keep">
              우리가 SNS에서 보는 모습은 그들의 삶 중 가장 빛나는 순간만을 편집한 '하이라이트'입니다. 반면, 내가 마주하는 나의 모습은 편집되지 않은 날 것 그대로의 '비하인드 씬'입니다. 타인의 화려한 무대 앞모습과 나의 어두운 무대 뒷모습을 비교하는 것은 애당초 공정하지 못한 게임입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 열등감을 성장의 동력으로</h3>
            <p className="break-keep">
              열등감 그 자체가 나쁜 것은 아닙니다. 심리학자 아들러는 열등감이 인간을 더 높은 단계로 나아가게 하는 핵심 동기라고 보았습니다. 중요한 것은 비교 대상을 <strong>'어제의 나'</strong>로 바꾸는 것입니다. 꽃마다 피는 시기가 다르듯, 당신의 계절은 아직 오지 않았을 뿐입니다.
            </p>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "타인의 속도에 맞추려다 당신의 보폭을 잃지 마세요. <br/>당신만의 템포가 가장 아름다운 리듬을 만듭니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              남들과 비교하며 작아진 마음이 든다면, 지금 그 감정을 그대로 적어보세요. 막연한 열등감은 내가 진짜 원하는 것이 무엇인지 알려주는 이정표가 됩니다.
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 당신의 솔직한 부러움과 질투를 기록해 보세요. AI가 당신의 고유한 가치를 발견하고 다시 자신감을 얻을 수 있도록 도와줄 것입니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                나만의 고유한 빛 찾기 ✨
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}