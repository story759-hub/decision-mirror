'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleNine() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20 overflow-x-hidden">
      {/* 헤더 */}
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
              <span className="bg-amber-50 text-amber-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-amber-100">
                Slow Life & Mindfulness
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              마음의 셔터 스피드: <br/>느리게 감각할 때 비로소 찍히는 것들
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 07 • 7 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              스포츠 경기를 찍을 때 카메라는 8000분의 1초라는 아주 빠른 셔터 스피드를 사용합니다. 찰나를 얼려버리듯 고정하기 위해서죠. 우리의 일상도 이와 비슷합니다. 해야 할 일들, 쏟아지는 정보, 빠른 피드백 속에서 우리 마음의 셔터 스피드는 한계치까지 올라가 있습니다. 모든 것을 '처리'하느라 바쁘지만, 역설적이게도 그 어떤 순간도 마음속 깊이 '인화'되지 못하고 스쳐 지나갑니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 패스트 라이프의 저주: 흔적 없는 이미지</h3>
            <p className="break-keep">
              너무 빠른 셔터 스피드는 빛을 받아들일 시간을 충분히 주지 않습니다. 마찬가지로 너무 빠르게 사는 삶은 감정이 마음의 센서에 닿아 울림을 만들어낼 시간을 주지 않죠. 어제 점심에 무엇을 먹었는지, 오늘 아침 출근길에 어떤 기분이었는지 기억나지 않는 이유는 우리가 그 순간을 너무 '빨리' 찍고 넘어가 버렸기 때문입니다. 
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 장노출(Long Exposure): 잔상이 주는 아름다움</h3>
            <p className="break-keep">
              밤바다의 파도나 밤하늘의 별을 찍을 때는 셔터를 아주 오랫동안 열어둡니다. 그러면 눈동자에는 보이지 않던 빛의 흐름과 파도의 부드러운 질감이 사진에 담기죠. 우리 삶에도 이런 '장노출'의 시간이 필요합니다. 하나의 감정을 오랫동안 응시하고, 그 여운이 내 안에 충분히 머물다 가도록 셔터를 열어두는 연습 말입니다.
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>5분간의 조리개 개방:</strong> 커피 한 잔을 마실 때 스마트폰을 내려놓고 향과 온기에만 집중해 보세요. 감각의 조리개를 최대치로 여는 시간입니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>여운 기록법:</strong> 사건이 일어난 직후가 아니라, 한 걸음 뒤에서 그 감정의 '잔상'을 기록해 보세요. 훨씬 깊고 부드러운 색채가 담깁니다.</span>
              </li>
            </ul>

            <div className="bg-slate-50 border-l-4 border-amber-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "삶의 풍요로움은 얼마나 많은 사진을 찍었느냐가 아니라, <br/>얼마나 깊은 빛을 마음의 필름에 담았느냐로 결정됩니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap: 감정의 셔터를 늦추는 법</h3>
            <p className="break-keep">
              <strong>Feeling Snap</strong>에 기록을 남기는 행위 자체가 사실은 셔터 스피드를 늦추는 일입니다. "지금 내 기분이 어떠지?"라고 묻는 그 짧은 찰나가 폭주하던 일상의 속도에 브레이크를 걸어줍니다. 빠르게 소모되던 감정을 붙잡아 문장으로 옮기는 과정에서, 당신의 마음 센서에는 비로소 선명하고 따뜻한 빛의 궤적이 남기 시작합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 느리게 찍어야 더 선명해집니다</h3>
            <p className="break-keep">
              오늘 하루, 너무 많은 것을 '순삭'하며 지나치지는 않았나요? 잠시 멈춰 서서 마음의 셔터를 천천히 눌러보세요. 세상이 주는 아주 미세한 기쁨과 평온의 빛이 당신의 필름에 충분히 스며들 수 있도록 말이죠. 그렇게 찍힌 한 장의 스냅은 수천 장의 빠른 사진보다 훨씬 오랫동안 당신을 미소 짓게 할 것입니다.
            </p>
            
            <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Slow Tempo Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Chet Baker - I Get Along Without You Very Well (느린 호흡의 미학)</li>
                <li>• Olafur Arnalds - Saman (고요한 여운을 남기는 선율)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                천천히, 마음 인화하기 🕯️
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}