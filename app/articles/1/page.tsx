'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleTwo() {
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
        {/* 요청하신 경로와 문구로 수정 */}
        <Link href="/articles" className="text-[#E91E63] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>

        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-10">
            <div className="mb-4">
              <span className="bg-pink-50 text-[#E91E63] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-pink-100">
                Decision Strategy
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              결정 장애를 극복하는 '70% 법칙': <br/>완벽한 타이밍보다 중요한 것
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 22 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              현대인들은 매일 수천 가지의 선택 앞에 놓입니다. 점심 메뉴와 같은 사소한 것부터 이직, 투자, 관계의 정리와 같은 중대한 결정까지, 우리의 뇌는 끊임없이 에너지를 소모합니다. 하지만 많은 이들이 '완벽한 선택'을 하려다 결국 아무것도 결정하지 못하는 <strong>'분석 마비(Analysis Paralysis)'</strong> 상태에 빠지곤 합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 아마존의 제프 베이조스가 강조한 70%의 힘</h3>
            <p className="break-keep">
              세계적인 기업 아마존의 창업자 제프 베이조스는 주주들에게 보내는 서신에서 의사결정의 속도에 대해 강조한 바 있습니다. 그는 <strong>"대부분의 결정은 당신이 원하는 정보의 약 70% 정도만 확보했을 때 내려져야 한다"</strong>고 말합니다. 만약 90% 이상의 정보를 기다린다면, 그 결정은 이미 늦었을 가능성이 높기 때문입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 왜 100%는 위험한가?</h3>
            <p className="break-keep">
              완벽한 정보를 수집하려는 시도는 두 가지 치명적인 기회비용을 발생시킵니다. 
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>속도의 상실:</strong> 시장이나 상황은 기다려주지 않습니다. 완벽을 기하는 동안 경쟁자가 먼저 움직이거나 상황이 변해버립니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>인지적 과부하:</strong> 정보가 많아질수록 뇌는 핵심을 놓치고 지엽적인 데이터에 매몰됩니다. 이는 오히려 잘못된 판단으로 이어질 확률을 높입니다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 틀린 결정을 내렸을 때의 복구 능력</h3>
            <p className="break-keep">
              70% 법칙의 핵심은 <strong>'가역성(Reversibility)'</strong>에 있습니다. 베이조스는 결정을 '돌이킬 수 없는 문(Type 1)'과 '언제든 돌아올 수 있는 문(Type 2)'으로 나눕니다. 우리가 일상에서 마주하는 대부분의 결정은 후자입니다. 70%의 정보로 빠르게 결정하고 실행한 뒤, 발생하는 피드백을 보고 수정하는 것이 100%의 정보를 기다리며 멈춰있는 것보다 훨씬 효율적입니다.
            </p>

            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "실행하지 않은 완벽한 계획보다, <br/>지금 실행하는 70%의 계획이 당신의 삶을 전진시킵니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              머릿속이 복잡해 결정을 내리지 못하고 있다면, 지금 당신이 쥐고 있는 정보가 몇 퍼센트인지 자문해 보십시오. 만약 절반 이상의 확신이 있다면, 일단 그 생각을 밖으로 꺼내어 구조화해야 합니다. 
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 지금 당신의 혼란을 기록하고, 객관적인 상태 선언을 확인해 보세요. 정리가 시작되는 순간, 결정은 쉬워집니다.
            </p>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                나의 혼란 정리하러 가기 ✨
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}