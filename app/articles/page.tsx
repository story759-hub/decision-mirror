import Link from 'next/link';

const articles = [
  { id: 1, title: "결정 장애를 극복하는 '70% 법칙'" },
  { id: 2, title: "선택의 역설: 왜 선택지가 많을수록 불행한가" },
  { id: 3, title: "매몰 비용 오류: 과거에 쏟은 시간이 발목을 잡을 때" },
  { id: 4, title: "제프 베이조스의 후회 최소화 프레임워크" },
  { id: 5, title: "번아웃과 결정력의 상관관계" },
  { id: 6, title: "메타인지 능력을 높이는 습관" },
  { id: 7, title: "브레인 덤프: 머릿속 쓰레기 비우기" },
  { id: 8, title: "감정과 이성을 분리하는 기술" },
  { id: 9, title: "이직 고민 시 반드시 체크할 3가지" },
  { id: 10, title: "인간관계 다이어트가 필요한 이유" },
  { id: 11, title: "디지털 디톡스와 맑은 정신" },
  { id: 12, title: "의사결정의 황금 시간대" },
  { id: 13, title: "성장형 마인드셋의 힘" },
  { id: 14, title: "Clarity Room 활용 가이드" },
  { id: 15, title: "혼란 속에서 답을 찾는 법" },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-12 tracking-tighter text-center">
          Cognitive Insights
        </h1>
        <div className="grid gap-4">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.id}`}
              className="group p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#5D5FEF] transition-all"
            >
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-mono text-sm">0{article.id}</span>
                <h2 className="text-lg font-bold text-slate-200 group-hover:text-white transition-colors">
                  {article.title}
                </h2>
                <span className="text-[#5D5FEF] opacity-0 group-hover:opacity-100 transition-all">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}