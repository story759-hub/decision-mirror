'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleThirteen() {
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
              <span className="bg-orange-50 text-orange-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-orange-100">
                Well-being & Burnout
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              번아웃이라는 노출 오버: <br/>다시 어둠이 필요할 때
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 11 • 9 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              사진에서 '노출 오버(Overexposure)'란 필요 이상으로 너무 많은 빛이 필름이나 센서에 도달해 이미지가 하얗게 날아가 버리는 현상을 말합니다. 우리 삶의 **번아웃(Burnout)**이 이와 같습니다. 너무 많은 열정, 너무 많은 책임감, 너무 많은 '나를 드러내야 한다는 강박'으로 인해 우리 안의 에너지가 하얗게 소진되어 버리는 것이죠. 더 이상 색감도, 질감도 느껴지지 않는 무감각의 상태, 그것이 번아웃입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 과도한 빛이 망가뜨린 이미지</h3>
            <p className="break-keep">
              번아웃은 단순히 피곤한 것과는 다릅니다. 몸은 지쳤는데 정신은 끊임없이 무언가를 해야 한다는 강박에 시달리고, 작은 일에도 쉽게 짜증이 나며, 즐거웠던 일도 더 이상 즐겁지 않게 됩니다. 이는 마치 강렬한 햇볕 아래서 모든 것이 빛바래고 형태를 잃는 것처럼, 내 안의 모든 감각과 열정이 타버린 상태입니다. 우리는 이 지점에서 의도적으로 '빛을 거부하는 행위'가 필요합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 어둠의 미학: 현상과 재충전의 시간</h3>
            <p className="break-keep">
              사진을 현상하는 암실은 빛 한 점 없는 어둠 속에서 이루어집니다. 외부의 빛으로부터 완전히 차단되어야만 필름 속 잠재된 이미지가 온전히 발현될 수 있기 때문입니다. 
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>도파민 단식(Dopamine Fasting):</strong> 스마트폰, SNS, 새로운 자극으로부터 잠시 거리를 두세요. 뇌를 재부팅하는 암실의 시간입니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>감정의 암부 수용:</strong> 무기력함, 짜증, 슬픔과 같은 감정들을 애써 외면하지 말고, 암실 속에서 필름을 들여다보듯 차분히 느껴보세요. 그것이 회복의 시작입니다.</span>
              </li>
            </ul>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "너무 많은 빛은 눈을 멀게 하고, <br/>너무 많은 열정은 마음을 태웁니다. <br/>때로는 어둠 속에서 쉬어야 비로소 진정한 빛을 볼 수 있습니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap: 번아웃의 신호를 기록하기</h3>
            <p className="break-keep">
              아무것도 하고 싶지 않은 무기력한 날, **Feeling Snap**에 "오늘은 노출 오버 상태"라고 솔직하게 기록해 보세요. 부정적인 감정을 외면하지 않고 이름을 붙여주는 것만으로도 그것은 더 이상 무자비한 괴물이 아닌, '관리 가능한 현상'이 됩니다. 번아웃은 경고 신호입니다. 잠시 셔터를 닫고 암실로 들어가 자신을 돌봐야 할 때임을 알려주는 것이죠.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 빛과 어둠의 조화가 필요한 순간</h3>
            <p className="break-keep">
              가장 좋은 사진은 밝은 부분과 어두운 부분이 조화롭게 어우러질 때 탄생합니다. 당신의 삶도 마찬가지입니다. 빛나는 열정만큼이나, 고요한 어둠 속에서 자신을 회복하는 시간이 반드시 필요합니다. 번아웃은 당신의 삶이 '재조정'의 시간을 간절히 원하고 있다는 신호입니다. 오늘 하루, 당신만의 암실로 들어가 온전히 자신에게 집중하는 시간을 선물해 주세요.
            </p>
            
            <div className="p-6 bg-orange-50/50 rounded-2xl border border-orange-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Restorative Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Max Richter - On the Nature of Daylight (깊은 휴식과 치유)</li>
                <li>• Brian Eno - Music For Airports (고요한 회복의 시간)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                고요한 암실로 들어가기 🧘‍♀️
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}