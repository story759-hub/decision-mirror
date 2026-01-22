import React from 'react';
import Link from 'next/link';

export default function ArticleSix() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            메타인지 능력을 높이는 습관: <br/>내가 무엇을 모르는지 아는 것의 힘
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 인지 심리학 및 학습 전략</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            상위 0.1%의 학생들과 평범한 학생들의 가장 큰 차이점은 무엇일까요? IQ나 기억력이 아닙니다. 정답은 바로 **'메타인지(Metacognition)'**입니다. 메타인지란 '자신의 생각에 대해 생각하는 능력', 즉 내가 무엇을 알고 무엇을 모르는지를 객관적으로 파악하는 인지 능력을 말합니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 왜 메타인지가 의사결정의 핵심인가?</h2>
          <p>
            우리는 종종 '자신감'과 '실력'을 착각합니다. 자신이 잘 모르는 분야임에도 불구하고 잘 안다고 착각할 때(더닝 크루거 효과), 치명적인 판단 실수가 발생합니다. 메타인지가 높은 사람은 자신의 인지적 한계를 인정하기 때문에, 부족한 정보를 보충하거나 타인의 조언을 수용하는 데 유연합니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 메타인지를 높이는 3가지 훈련법</h2>
          <p>
            메타인지는 타고나는 것이 아니라 후천적인 훈련으로 충분히 강화할 수 있습니다.
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>셀프 테스트와 설명하기:</strong> 누군가에게 설명할 수 없다면 그것은 모르는 것입니다. 배운 내용을 소리 내어 설명해 보십시오.</li>
            <li><strong>인지적 거리두기:</strong> 현재의 고민을 마치 남의 일인 것처럼 3인칭 시점에서 바라보는 연습을 하십시오.</li>
            <li><strong>기록하고 모니터링하기:</strong> 자신의 판단 과정과 결과를 글로 남겨 나중에 복기하십시오. 기록은 기억의 왜곡을 막아주는 가장 강력한 도구입니다.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. '안다'는 착각에서 벗어나는 법</h2>
          <p>
            머릿속에만 머무르는 지식은 파편화되어 있어 정확한 형체를 알기 어렵습니다. 하지만 생각을 밖으로 꺼내어 구조화(Structuring)하면, 논리의 빈틈이 선명하게 드러납니다. 이것이 바로 전문가들이 복잡한 문제일수록 화이트보드나 종이에 적으며 사고하는 이유입니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "메타인지의 시작은 '나는 생각보다 나를 잘 모른다'는 정직한 고백에서 시작됩니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: 당신의 생각을 객관화하십시오</h2>
          <p>
            메타인지 능력을 키우는 가장 빠른 방법은 내 생각의 '스냅샷'을 찍어보는 것입니다. 모호한 감정의 구름을 걷어내고, 현재 내 판단의 논리적 구조가 어떠한지 관찰할 때 우리는 비로소 지혜로운 결정을 내릴 수 있습니다.
          </p>
          <p className="font-bold text-white">
            Clarity Room은 당신의 메타인지 엔진을 활성화하도록 돕습니다. 당신의 고민을 입력하는 행위 자체가 이미 인지적 거리두기의 시작입니다. 지금 AI가 분석한 당신의 사고 패턴을 통해, 내가 놓치고 있던 인지적 사각지대를 확인해 보세요.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              내 생각의 메타데이터 확인하기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}