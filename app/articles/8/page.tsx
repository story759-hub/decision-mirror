'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleEight() {
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
              <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-200">
                Perfectionism
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              완벽주의라는 필터: <br/>때로는 노이즈가 삶을 아름답게 만든다
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 06 • 8 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              최신형 스마트폰 카메라는 인공지능을 통해 사진의 잡티를 지우고, 피부를 매끄럽게 보정하며, 가장 완벽한 색감을 찾아줍니다. 하지만 역설적이게도 많은 사람들은 여전히 거친 입자가 살아있는 필름 사진이나 노이즈가 섞인 빈티지 카메라에 열광합니다. 왜일까요? 완벽함에는 '이야기'가 빠져 있기 때문입니다. 삶의 **완벽주의(Perfectionism)** 또한 이와 닮아 있습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 매끄러운 보정이 숨기는 것들</h3>
            <p className="break-keep">
              우리는 실수 없는 하루, 오점 없는 경력, 흐트러짐 없는 감정 상태를 지향하며 스스로에게 가혹한 필터를 들이댑니다. 하지만 심리학에서 말하는 건강한 적응은 완벽함이 아니라 '회복 탄력성'에 있습니다. 모든 잡티를 지워버린 얼굴이 평면적으로 보이듯, 고통과 실수를 모두 배제하려는 노력은 오히려 우리 삶의 입체감을 없애버립니다. 
            </p>
            <p className="break-keep">
              완벽주의라는 필터는 우리를 '좋아 보이는 상태'로 만들 수는 있지만, '살아있는 상태'로 만들지는 못합니다. 진짜 감정은 매끄러운 표면이 아니라, 예기치 못한 균열과 거친 질감 사이에서 피어납니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 노이즈: 살아있음의 증거</h3>
            <p className="break-keep">
              사진에서 노이즈(Noise)는 대개 빛이 부족한 환경에서 억지로 이미지를 만들어낼 때 발생합니다. 우리 삶의 노이즈도 마찬가지입니다. 우리가 한계에 부딪혔을 때, 부족한 자원 속에서도 무언가를 해내려 애쓸 때 '실수'와 '서투름'이라는 노이즈가 생깁니다. 
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>RAW 데이터 수용하기:</strong> 보정되지 않은 날 것 그대로의 감정을 인정해 보세요. 서투른 시작이 완벽한 포기보다 훨씬 가치 있는 데이터입니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>그레인(Grain) 효과로서의 실수:</strong> 사진에 일부러 거친 입자를 넣어 분위기를 살리듯, 당신의 작은 실수들은 훗날 삶의 '인간미'라는 멋진 텍스처가 될 것입니다.</span>
              </li>
            </ul>

            <div className="bg-slate-50 border-l-4 border-slate-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "완벽함은 마침표이지만, 불완전함은 이음표이다. <br/>그 틈이 있어야 비로소 다른 사람과 연결될 수 있다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap: 보정 없는 기록의 힘</h3>
            <p className="break-keep">
              기록을 망설이는 가장 큰 이유는 "멋진 문장을 써야 한다"는 완벽주의 때문입니다. <strong>Feeling Snap</strong>은 당신에게 세련된 필터를 요구하지 않습니다. 오히려 오늘 느낀 찌질함, 말로 다 못할 서운함, 정돈되지 않은 기쁨을 그대로 찍어내길 바랍니다. 그 거친 노이즈들이 모였을 때, 당신의 기록은 비로소 누구도 흉내 낼 수 없는 독보적인 '빈티지 명작'이 됩니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 셔터를 누르는 것을 두려워 마세요</h3>
            <p className="break-keep">
              빛이 부족해도, 구도가 엉망이어도 괜찮습니다. 중요한 것은 당신이 그 순간을 '기록하기로 선택했다'는 사실입니다. 완벽주의라는 무거운 필터를 한 꺼풀 벗겨내고, 오늘 당신 삶에 섞여 들어온 소중한 노이즈들을 사랑해 보세요. 그 서투른 흔적들이 모여 가장 당신다운 사진첩을 완성할 테니까요.
            </p>
            
            <div className="p-6 bg-slate-100/50 rounded-2xl border border-slate-200 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Aesthetic Lo-fi Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Jinsang - Affection (편안한 노이즈의 미학)</li>
                <li>• Nujabes - Luv(sic) Part 3 (서투름 속의 리듬)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                보정 없는 진솔한 기록하기 🎞️
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}