import React from 'react';
import Link from 'next/link';

const articles = [
  { id: 1, title: "결정 장애를 극복하는 '70% 법칙'", desc: "완벽한 타이밍보다 중요한 것은 빠른 의사결정입니다." },
  { id: 2, title: "선택의 역설(The Paradox of Choice)", desc: "왜 선택지가 많을수록 우리는 더 불행해질까요?" },
  { id: 3, title: "매몰 비용 오류에서 벗어나는 법", desc: "과거에 쏟은 시간이 현재의 발목을 잡고 있다면." },
  { id: 4, title: "제프 베이조스의 후회 최소화 프레임워크", desc: "성공한 리더들의 결정 방식에는 공통점이 있습니다." },
  { id: 5, title: "번아웃이 의사결정에 미치는 영향", desc: "지친 뇌는 가장 쉬운 길만 선택하려 합니다." },
  { id: 6, title: "메타인지 능력을 높이는 일상적 습관", desc: "내가 무엇을 모르는지 아는 것이 시작입니다." },
  { id: 7, title: "브레인 덤프: 머릿속 쓰레기를 비우는 기술", desc: "복잡한 생각을 텍스트로 옮기면 정리가 시작됩니다." },
  { id: 8, title: "감정과 이성을 분리하는 인지적 거리두기", desc: "객관적으로 나를 관찰하는 '거울'의 역할." },
  { id: 9, title: "이직 고민 시 반드시 체크해야 할 리스트", desc: "단순한 불만인지, 성장을 위한 갈증인지 구분하세요." },
  { id: 10, title: "인간관계 다이어트가 필요한 이유", desc: "나를 갉아먹는 관계로부터 나를 지키는 법." },
  { id: 11, title: "디지털 디톡스와 맑은 정신 유지하기", desc: "과잉 정보 시대, 뇌에 휴식을 주는 전략." },
  { id: 12, title: "새벽과 저녁, 당신의 결정 황금 시간대는?", desc: "생체 리듬에 따른 의사결정 효율성 분석." },
  { id: 13, title: "성장형 마인드셋의 힘", desc: "실패를 결정의 끝이 아닌 과정으로 보는 법." },
  { id: 14, title: "인지 구조화 도구 Clarity Room 활용 가이드", desc: "AI를 활용해 생각의 타래를 푸는 방법." },
  { id: 15, title: "혼란 속에서 답을 찾는 인지 심리학", desc: "답이 없어도 정리가 되면 길은 보입니다." },
];

export default function ArticleList() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-8">
      <div className="max-w-4xl mx-auto py-10">
        <header className="mb-12">
          <Link href="/" className="text-[#5D5FEF] font-bold mb-4 inline-block">← Back to Analysis</Link>
          <h1 className="text-4xl font-black tracking-tighter">Cognitive Insights</h1>
          <p className="text-slate-500 mt-2 font-medium">의사결정과 인지 구조화를 위한 가이드</p>
        </header>

        <div className="grid gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-[#5D5FEF] transition-colors cursor-pointer">
              <h2 className="text-xl font-bold mb-2">{article.id}. {article.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{article.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}