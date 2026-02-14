'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleSix() {
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
                Burnout & Recovery
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              번아웃: 무기력이 보내는 뇌의 SOS 신호 <br/>열기를 식혀야 선명해지는 삶의 화각
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 04 • 8 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              고성능 카메라로 뜨거운 태양 아래에서 너무 오랫동안 연사 촬영을 하다 보면, 어느 순간 'Overheated(과열)' 경고와 함께 전원이 꺼져버리곤 합니다. 센서를 보호하기 위해 기계 스스로가 내리는 강제 휴식이죠. 우리 삶의 **번아웃(Burnout)** 또한 이와 같습니다. 어느 날 갑자기 찾아온 무기력은 당신이 나태해서가 아니라, 당신의 마음 센서가 타버리지 않도록 뇌가 긴급하게 내린 '강제 종료' 신호입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 열정이라는 이름의 과다 노출</h3>
            <p className="break-keep">
              우리는 종종 '열심히'라는 조명 아래 스스로를 너무 오랫동안 세워둡니다. 완벽한 성과, 타인의 기대, 끊임없는 비교라는 강렬한 조명은 우리 삶의 디테일을 하얗게 날려버립니다(White-out). 번아웃은 이 과다한 빛에 지친 뇌가 "더 이상은 아무것도 기록할 수 없어"라고 선언하는 상태입니다. 이때 가장 위험한 것은 무기력해진 자신을 채찍질하며 다시 전원을 켜려고 시도하는 것입니다. 열이 식지 않은 상태에서 다시 돌리는 기계는 결국 영구적인 고장을 일으키기 때문입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 암실(Darkroom)의 시간: 회복을 위한 어둠</h3>
            <p className="break-keep">
              필름 사진이 형체를 갖추기 위해서는 반드시 어두운 암실에서의 시간이 필요합니다. 번아웃이 찾아왔을 때 우리에게 필요한 것도 바로 이 '의도적인 어둠'입니다. 아무것도 생산하지 않고, 누구의 기대도 충족시키지 않는 시간. 오직 자신의 호흡에만 집중하며 내면의 열기를 식히는 과정이죠. 
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>해상도 낮추기:</strong> 오늘 하루의 목표를 최소한으로 줄여보세요. "밥 먹기", "샤워하기" 정도면 충분합니다. 뇌에 가해지는 처리 부하를 줄여야 센서가 회복됩니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>저장하지 않는 순간:</strong> 모든 것을 의미 있게 만들려는 강박을 버리세요. 그냥 흘러가는 구름을 보듯, 목적 없는 시간을 허용해야 합니다.</span>
              </li>
            </ul>

            <div className="bg-slate-50 border-l-4 border-orange-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "번아웃은 당신이 멈춘 것이 아니라, <br/>너무 멀리 왔기에 잠시 숨을 고르는 정거장에 도착한 것입니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap: 희미한 빛부터 기록하기</h3>
            <p className="break-keep">
              번아웃 상태에서는 긴 글을 쓰거나 깊은 생각을 하는 것조차 고통스러울 수 있습니다. 그럴 때는 <strong>Feeling Snap</strong>에 아주 작은 감각 하나만 남겨보세요. "차가운 물 촉감이 좋다", "방 안의 그림자가 길다" 같은 아주 짧은 관찰만으로도 충분합니다. 이 작은 스냅들이 모여 뇌 센서의 감도를 서서히 회복시키고, 다시 세상을 선명하게 바라볼 에너지를 만들어 줄 것입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 다시 켜질 당신을 믿으세요</h3>
            <p className="break-keep">
              지금 무기력의 늪에 빠져 있다면, 그것은 당신이 그만큼 뜨겁게 살아왔다는 훈장과도 같습니다. 충분히 식히고, 충분히 어두워지세요. 암실의 시간이 지나면 당신의 삶이라는 필름에는 이전보다 훨씬 깊고 풍부한 계조의 사진이 인화될 것입니다.
            </p>
            
            <div className="p-6 bg-orange-50/50 rounded-2xl border border-orange-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Soundtrack for Rest</p>
              <ul className="text-slate-600 text-base">
                <li>• Max Richter - Sleep (뇌의 이완을 돕는 현대 자장가)</li>
                <li>• Sigur Rós - Untitled #1 (Vaka) (세상의 소음을 차단하는 신비로운 선율)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                지친 내 마음 쉬게 해주기 ☁️
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}