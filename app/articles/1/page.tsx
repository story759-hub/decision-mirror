'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleOne() {
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
        <Link href="/articles" className="text-[#E91E63] font-bold mb-8 inline-block hover:underline">
          ← 인사이트 목록으로 돌아가기
        </Link>

        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-10">
            <div className="mb-4">
              <span className="bg-pink-50 text-[#E91E63] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-pink-100">
                Essay
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              가끔은 멈춰서야 보이는 것들: <br/>빠르게 지나가는 일상 속에서 셔터를 누르는 이유
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 30 • 6 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              우리는 너무 자주, 그리고 너무 빨리 걷는다. 손목 위의 시계와 스마트폰 속의 일정표는 끊임없이 우리를 어딘가로 밀어낸다. 아침의 서두름은 점심의 분주함으로, 다시 저녁의 피로함으로 꼬리를 물고 이어진다. 그렇게 속도에 몸을 맡기다 보면, 정작 내가 지금 어떤 표정을 짓고 있는지조차 잊게 됩니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 멈추지 않으면 보이지 않는 것들</h3>
            <p className="break-keep">
              조리개 값을 조정하고 초점을 맞추는 짧은 시간 동안, 우리는 비로소 대상을 마주합니다. 길가에 핀 이름 모를 들꽃, 오후의 낮은 햇살이 그어놓은 긴 그림자, 그리고 그 풍경을 바라보는 나의 복잡미묘한 마음까지. 바쁘게 달리는 기차 안에서는 풍경이 그저 긴 선으로 보일 뿐이지만, 기차에서 내려 발을 멈추면 비로소 한 송이 꽃의 꽃잎 결이 보이기 시작합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 셔터를 누르는 찰나의 용기</h3>
            <p className="break-keep">
              감정을 기록하기 위해 셔터를 누르는 데는 약간의 용기가 필요합니다. 우리는 흔히 행복한 순간만을 남기고 싶어 하지만, 삶의 진짜 질감은 때로 슬픔이나 불안 같은 어두운 색조에서 더 선명하게 드러나기도 합니다. 지금 내 마음이 조용히 가라앉아 있음을 인정하고 기록하는 순간, 그 감정은 나를 휘두르는 괴물이 아니라 내가 관찰할 수 있는 하나의 '장면'이 됩니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 인화된 마음이 주는 위로</h3>
            <p className="break-keep">
              시간이 흐른 뒤에 꺼내 보는 사진이 특별한 이유는, 그때의 공기와 감각을 고스란히 소환하기 때문입니다. <strong>Feeling Snap</strong>을 통해 남긴 오늘의 기록은 훗날 우리에게 말을 걸 것입니다. "그때 너는 이런 이유로 흔들렸지만, 동시에 스스로를 다독일 줄 아는 사람이었어"라고 말이죠.
            </p>

            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "기록되지 않은 시간은 망각 속으로 사라지지만, <br/>당신이 머물러 준 감정의 순간은 빛이 되어 당신을 지킵니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 당신만의 조리개를 열어두세요</h3>
            <p className="break-keep">
              세상이 정해준 속도가 아니라 당신만의 속도로 셔터를 누를 때, 비로소 인생이라는 긴 필름은 당신만의 색채로 채워지기 시작할 것입니다. 주저하지 말고 지금 이 순간의 당신을 기록해 보세요.
            </p>
            
            <div className="p-6 bg-pink-50/50 rounded-2xl border border-pink-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Today's Recommend Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Bill Evans - Peace Piece</li>
                <li>• 어떤날 - 출발</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                지금 내 감정 기록하기 📷
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}