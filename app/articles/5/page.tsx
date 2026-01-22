import React from 'react';
import Link from 'next/link';

export default function ArticleFive() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            번아웃과 결정력: <br/>지친 뇌가 잘못된 선택을 내리는 과학적 이유
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 인지 심리학 및 멘탈케어</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            업무에 치이고 인간관계에 에너지를 쏟다 보면 어느 순간 손가락 하나 까딱하기 싫은 상태가 찾아옵니다. 바로 **'번아웃(Burnout)'**입니다. 하지만 번아웃의 가장 무서운 점은 단순히 의욕이 사라지는 것이 아니라, 우리의 **'의사결정 능력'**을 심각하게 훼손한다는 데 있습니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 결정 피로(Decision Fatigue)의 누적</h2>
          <p>
            인간의 의지력은 무한한 자원이 아닙니다. 마치 스마트폰 배터리처럼 하루 동안 쓸 수 있는 양이 정해져 있습니다. 아침부터 밤까지 수많은 선택을 거치며 배터리가 소진되면, 뇌는 에너지를 아끼기 위해 '가장 게으른 선택'을 하기 시작합니다. 이를 **결정 피로**라고 합니다. 번아웃 상태는 이 배터리 자체가 방전되어 충전되지 않는 상태와 같습니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 전두엽의 기능 저하와 충동적 선택</h2>
          <p>
            이성적 판단을 담당하는 뇌의 부위인 **전두엽**은 스트레스에 매우 취약합니다. 번아웃이 오면 전두엽의 활성도가 낮아지고, 대신 감정과 본능을 담당하는 편도체가 주도권을 잡게 됩니다. 
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>회피 전략:</strong> 중요한 결정을 뒤로 미루거나 외면합니다.</li>
            <li><strong>충동적 결정:</strong> 장기적인 이득보다 당장의 편안함을 주는 선택을 합니다.</li>
            <li><strong>인지적 유연성 상실:</strong> 새로운 대안을 생각하지 못하고 기존의 관성에만 매달립니다.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. 뇌를 쉬게 하는 '구조화'의 힘</h2>
          <p>
            번아웃 상태에서 중요한 결정을 내려야 한다면, 뇌에게 생으로 고민할 짐을 지워서는 안 됩니다. 뇌가 처리해야 할 정보를 **외부로 시각화**하고 구조화해야 합니다. 머릿속에 맴도는 막연한 불안을 텍스트로 옮기는 것만으로도 전두엽의 부담은 현저히 줄어듭니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "당신이 내린 최악의 선택은 능력이 부족해서가 아니라, 단지 뇌가 너무 지쳤기 때문일 수 있습니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: 판단하기 전에 비우십시오</h2>
          <p>
            오늘따라 모든 선택이 버겁게 느껴진다면, 그것은 당신의 의지가 약해서가 아니라 뇌가 보내는 휴식 신호입니다. 이럴 때는 억지로 답을 찾으려 하기보다, 현재의 혼란스러운 상태를 그대로 기록하고 객관화하는 과정이 먼저 필요합니다.
          </p>
          <p className="font-bold text-white">
            Clarity Room은 지친 당신의 뇌를 대신해 복잡한 생각의 밀도를 측정하고 구조를 잡아줍니다. 에너지를 소모하는 고민 대신, AI가 제안하는 선언적 스냅샷을 통해 현재 위치를 확인해 보세요.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              방전된 내 마음 진단하기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}