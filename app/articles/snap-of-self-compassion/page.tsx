'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleFourteen() {
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
              <span className="bg-sky-50 text-sky-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-sky-100">
                Self-Compassion
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              자기 위로의 스냅: <br/>세상의 소음을 끄고 나에게 포커스를 맞추는 법
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 12 • 8 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              우리는 하루에도 수십 번씩 타인의 기대와 사회적 기준이라는 광각 렌즈로 스스로를 촬영합니다. "이 정도면 충분히 열심히 살고 있는 걸까?", "남들에 비해 내 모습이 초라해 보이지는 않을까?" 이런 질문들은 우리를 주인공이 아닌 관찰자로 전락시킵니다. 진정한 **자기 위로(Self-Compassion)**는 이 거추장스러운 렌즈를 내려놓고, 오직 나라는 존재 하나에만 초점을 맞추는 단렌즈를 꺼내는 것에서 시작됩니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 포커스(Focus): 비판이 아닌 관찰</h3>
            <p className="break-keep">
              카메라 렌즈의 초점을 맞출 때, 우리는 피사체를 '심판'하지 않습니다. 단지 그 형태가 뚜렷해질 때까지 조심스럽게 링을 돌릴 뿐이죠. 우리 자신을 대할 때도 그래야 합니다. "왜 이것밖에 못 했을까"라는 비판의 화살을 거두고, "지금 내가 지쳐 있구나", "지금 내 마음이 떨리고 있구나"라며 자신의 상태를 있는 그대로 '포착'하는 것이 위로의 첫 번째 단계입니다. 
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 피사계 심도: 주변을 흐리고 나를 돋보이게 하기</h3>
            <p className="break-keep">
              인물 사진의 핵심은 배경을 부드럽게 날리는 아웃포커싱입니다. 나를 위로해야 할 순간만큼은 타인의 시선, 미래에 대한 불안, 과거의 후회라는 어지러운 배경을 흐릿하게 처리해야 합니다.
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>나만을 위한 조리개 수치:</strong> 주변의 소음이 너무 크다면 조리개를 최대치로 개방하세요. 오직 지금 이 순간의 감각과 호흡에만 집중하는 것이 가장 강력한 위로가 됩니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>다정한 셀프 피드백:</strong> 사진을 찍은 후 좋은 점을 먼저 찾듯, 오늘 하루 당신이 견뎌낸 시간들 중 단 하나라도 칭찬할 구석을 찾아 기록해 보세요.</span>
              </li>
            </ul>

            <div className="bg-sky-50 border-l-4 border-sky-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "당신은 누군가의 배경이 되기 위해 태어난 것이 아닙니다. <br/>당신은 당신 인생이라는 모든 프레임에서 단 하나의 주인공입니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap: 나를 안아주는 기록</h3>
            <p className="break-keep">
              <strong>Feeling Snap</strong>에 남기는 다정한 한 줄은 세상 그 어떤 응원보다 강력합니다. 타인에게 보여주기 위한 기록이 아니라, 나중에 지치고 힘들 때 꺼내 볼 '미래의 나를 위한 선물'을 만든다고 생각하세요. "오늘 참 고생 많았어", "너의 속도는 틀리지 않았어"라고 적힌 데이터들은 당신의 마음속에 가장 선명하고 따스한 인화지로 남게 될 것입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 가장 소중한 피사체는 언제나 당신입니다</h3>
            <p className="break-keep">
              세상이 당신을 어떻게 평가하든, 당신의 렌즈만큼은 언제나 당신을 향한 다정함을 잃지 않아야 합니다. 오늘 밤, 잠들기 전 마음의 셔터를 조용히 눌러보세요. 거창한 성공이 없어도, 완벽한 하루가 아니어도 좋습니다. 존재 자체로 빛나는 당신이라는 피사체를 가장 아름답게 기록할 수 있는 사람은 오직 당신뿐이니까요.
            </p>
            
            <div className="p-6 bg-sky-50/50 rounded-2xl border border-sky-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Self-Care Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Sigur Rós - Hoppípolla (내면의 순수함을 깨우는 소리)</li>
                <li>• Lee Juck - 걱정말아요 그대 (따뜻한 위로의 선율)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                나를 위한 다정한 셔터 누르기 ✨
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}