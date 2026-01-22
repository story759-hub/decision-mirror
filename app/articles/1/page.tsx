import React from 'react';
import Link from 'next/link';

export default function ArticleOne() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            결정 장애를 극복하는 '70% 법칙': <br/>완벽한 타이밍보다 중요한 것
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 의사결정 전략</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            현대인들은 매일 수천 가지의 선택 앞에 놓입니다. 점심 메뉴와 같은 사소한 것부터 이직, 투자, 관계의 정리와 같은 중대한 결정까지, 우리의 뇌는 끊임없이 에너지를 소모합니다. 하지만 많은 이들이 '완벽한 선택'을 하려다 결국 아무것도 결정하지 못하는 **'분석 마비(Analysis Paralysis)'** 상태에 빠지곤 합니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 아마존의 제프 베이조스가 강조한 70%의 힘</h2>
          <p>
            세계적인 기업 아마존의 창업자 제프 베이조스는 주주들에게 보내는 서신에서 의사결정의 속도에 대해 강조한 바 있습니다. 그는 **"대부분의 결정은 당신이 원하는 정보의 약 70% 정도만 확보했을 때 내려져야 한다"**고 말합니다. 만약 90% 이상의 정보를 기다린다면, 그 결정은 이미 늦었을 가능성이 높기 때문입니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 왜 100%는 위험한가?</h2>
          <p>
            완벽한 정보를 수집하려는 시도는 두 가지 치명적인 기회비용을 발생시킵니다. 
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>속도의 상실:</strong> 시장이나 상황은 기다려주지 않습니다. 완벽을 기하는 동안 경쟁자가 먼저 움직이거나 상황이 변해버립니다.</li>
            <li><strong>인지적 과부하:</strong> 정보가 많아질수록 뇌는 핵심을 놓치고 지엽적인 데이터에 매몰됩니다. 이는 오히려 잘못된 판단으로 이어질 확률을 높입니다.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. 틀린 결정을 내렸을 때의 복구 능력</h2>
          <p>
            70% 법칙의 핵심은 **'가역성(Reversibility)'**에 있습니다. 베이조스는 결정을 '돌이킬 수 없는 문(Type 1)'과 '언제든 돌아올 수 있는 문(Type 2)'으로 나눕니다. 우리가 일상에서 마주하는 대부분의 결정은 후자입니다. 70%의 정보로 빠르게 결정하고 실행한 뒤, 발생하는 피드백을 보고 수정하는 것이 100%의 정보를 기다리며 멈춰있는 것보다 훨씬 효율적입니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "실행하지 않은 완벽한 계획보다, 지금 실행하는 70%의 계획이 당신의 삶을 전진시킵니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: Clarity Room의 제언</h2>
          <p>
            머릿속이 복잡해 결정을 내리지 못하고 있다면, 지금 당신이 쥐고 있는 정보가 몇 퍼센트인지 자문해 보십시오. 만약 절반 이상의 확신이 있다면, 일단 그 생각을 밖으로 꺼내어 구조화해야 합니다. 
          </p>
          <p className="font-bold text-white">
            지금 바로 Clarity Room의 분석 엔진을 통해 당신의 혼란을 텍스트로 기록하고, 객관적인 상태 선언을 확인해 보세요. 정리가 시작되는 순간, 결정은 쉬워집니다.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              나의 혼란 정리하러 가기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}