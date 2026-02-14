'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleEleven() {
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
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
                Cognitive Psychology
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              기록이 기억을 지배할 때: <br/>왜 우리는 굳이 써야 하는가?
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 09 • 9 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              우리 뇌는 아주 효율적인 편집자입니다. 매 순간 쏟아지는 방대한 정보 중 극히 일부만을 선택해 저장하죠. 문제는 이 편집 과정이 객관적이지 않다는 것입니다. 우울할 때는 나쁜 기억만 골라내고, 불안할 때는 최악의 시나리오를 기억의 중심에 둡니다. **기록(Record)**은 이 편향된 편집자로부터 삶의 주도권을 되찾아오는 유일한 방법입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 휘발되는 감정을 박제하는 법</h3>
            <p className="break-keep">
              감정은 기체와 같아서 눈 깜짝할 사이에 흩어집니다. 하지만 그것을 문장으로 옮기는 순간, 감정은 고체 상태로 변합니다. 심리학자 제임스 페네베이커(James Pennebaker)는 고통스러운 감정을 글로 쓰는 것만으로도 면역 체계가 강화되고 심리적 외상이 치유된다는 것을 입증했습니다. 기록은 단순히 사실을 나열하는 것이 아니라, 내면의 혼란에 질서를 부여하는 '정신적 정리 정돈'입니다. 
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 외장 하드로서의 기록: 뇌의 여유 공간 확보</h3>
            <p className="break-keep">
              우리가 무언가를 잊지 않으려고 애쓰는 동안 뇌는 엄청난 에너지를 소모합니다. 기록은 이 기억의 부하를 외부 기기로 옮겨주는 작업입니다. 
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>자이가르닉 효과(Zeigarnik Effect) 해소:</strong> 미완결된 과제나 감정은 계속 뇌리를 맴돌지만, 기록이라는 마침표를 찍는 순간 뇌는 이를 '처리 완료'로 인식하고 휴식을 취합니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>객관화된 시선:</strong> 어제 쓴 글을 오늘 읽으면 마치 타인의 이야기를 읽는 듯한 거리감이 생깁니다. 이 '관찰자 시점'이 감정 과잉으로부터 우리를 구원합니다.</span>
              </li>
            </ul>

            <div className="bg-emerald-50 border-l-4 border-emerald-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "쓰지 않으면 당신의 기억은 왜곡되지만, <br/>기록하면 당신의 역사는 선명해집니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap: 찰나의 진심을 수집하기</h3>
            <p className="break-keep">
              거창한 일기가 아니어도 좋습니다. <strong>Feeling Snap</strong>에 남기는 한 줄의 감정, 한 장의 이미지 데이터는 훗날 당신이 길을 잃었을 때 돌아올 수 있는 '좌표'가 됩니다. "그때 참 힘들었지만, 그래도 이런 작은 기쁨이 있었지"라고 증명해주는 물리적 증거물을 확보하는 것이죠. 기록이 기억을 지배하게 하세요. 당신의 뇌가 멋대로 편집한 슬픈 기억 대신, 당신이 직접 수집한 진실된 순간들이 당신의 정체성이 되도록 말입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 기록은 자신을 사랑하는 가장 적극적인 방식</h3>
            <p className="break-keep">
              누군가를 사랑하면 그에 대해 더 많이 알고 싶고 기록하고 싶어지듯, 나 자신을 기록하는 행위는 곧 나에 대한 깊은 애정 고백입니다. 오늘 당신의 마음이 어떤 모양이었는지, 어떤 빛을 띠었는지 기록하는 것을 멈추지 마세요. 그 기록들이 모여 누구도 부정할 수 없는 단단한 '당신'이라는 세계를 구축할 것입니다.
            </p>
            
            <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Soundtrack for Reflection</p>
              <ul className="text-slate-600 text-base">
                <li>• Ludovico Einaudi - Nuvole Bianche (생각의 흐름을 돕는 선율)</li>
                <li>• Yiruma - River Flows In You (차분한 내면 탐색)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                오늘의 나를 박제하기 ✍️
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}