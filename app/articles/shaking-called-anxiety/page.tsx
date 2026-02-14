'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleThree() {
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
              <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-blue-100">
                Anxiety
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              불안이라는 이름의 흔들림: <br/>희미한 일상 속에서 초점을 맞추는 법
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 01 • 7 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              카메라를 들고 중요한 순간을 포착하려 할 때, 가장 당혹스러운 경험은 셔터를 누르려는 찰나 화면이 뿌옇게 흐려지는 '핸드 블러(Hand Blur)' 현상입니다. 손끝의 아주 작은 떨림이 렌즈를 통과해 이미지 전체를 무너뜨리죠. 우리 삶의 **불안(Anxiety)** 역시 이와 닮아 있습니다. 미래에 대한 작은 걱정이 마음이라는 렌즈를 흔들고, 결국 지금 이 순간의 선명한 풍경을 흐릿하게 만들어버립니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 불안은 '고장'이 아니라 '반응'입니다</h3>
            <p className="break-keep">
              많은 이들이 불안을 느끼면 스스로의 마음이 고장 났다고 생각합니다. 하지만 카메라는 빛이 부족한 곳(어두운 미래)에서 셔터 스피드를 확보하지 못해 흔들리는 것일 뿐, 기계 자체의 결함이 아닙니다. 불안 또한 마찬가지입니다. 당신의 뇌는 지금 위험을 감지하고, 당신을 보호하기 위해 모든 신경을 곤두세우고 있는 것입니다. 
            </p>
            <p className="break-keep">
              불안을 '없애야 할 적'으로 규정하는 순간, 마음의 떨림은 더 심해집니다. 대신 "아, 지금 내 마음의 셔터 스피드가 확보되지 않을 만큼 상황이 불투명하구나"라고 객관적으로 인지해 보세요. 흔들림을 인정하는 것이 초점을 맞추는 첫 번째 단계입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 초점 거리를 '현재'로 조정하기</h3>
            <p className="break-keep">
              불안이 우리를 지배할 때, 우리의 마음은 대개 아주 먼 미래(망원 렌즈)에 가 있거나 이미 지나간 과거(역광)에 머물러 있습니다. 멀리 있는 것을 억지로 당겨 찍으려니 흔들림이 배가 되는 것이죠. 
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>수동 초점(Manual Focus):</strong> 막연한 걱정이 몰려올 때, 지금 당장 내 손에 닿는 구체적인 작업에 집중해 보세요. 커피를 마시는 감각, 키보드를 두드리는 소리 같은 사소한 것들이 마음의 지지대가 됩니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>조리개 열기:</strong> 완벽해야 한다는 강박을 버리고 조리개를 활짝 열어보세요. 빛을 더 많이 받아들이듯, "실수해도 괜찮다"는 허용의 마음을 가질 때 화면은 다시 선명해집니다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 흔들린 사진도 하나의 작품이 됩니다</h3>
            <p className="break-keep">
              모든 사진이 칼날처럼 날카로울 필요는 없습니다. 때로는 의도적인 흔들림이 사진에 역동성을 부여하듯, 우리의 불안했던 시간 또한 삶의 생동감을 증명하는 기록이 됩니다. Feeling Snap에 기록된 당신의 흔들리는 문장들은, 당신이 그만큼 삶을 진지하게 대하고 있으며 더 나은 미래를 갈망하고 있다는 뜨거운 증거입니다.
            </p>

            <div className="bg-slate-50 border-l-4 border-blue-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "불안은 당신의 앞길이 어둡기 때문이 아니라, <br/>당신이 그만큼 빛나는 곳으로 가고 싶어 하기 때문에 생기는 그림자입니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 다시 셔터를 누를 힘</h3>
            <p className="break-keep">
              지금 마음이 흔들리고 있다면 잠시 숨을 고르고 <strong>Feeling Snap</strong>을 켜보세요. 당신의 혼란스러운 마음을 텍스트로 현상하는 과정에서, 흐릿했던 삶의 초점이 서서히 현재의 당신에게로 맞춰지는 것을 느낄 수 있을 것입니다. 
            </p>
            
            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Focus Aid Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Olafur Arnalds - Saman (평온한 리듬의 회복)</li>
                <li>• 이루마 - River Flows In You (흐르는 마음의 안정)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                흔들리는 마음 고정하기 ⚓
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}