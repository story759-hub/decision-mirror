'use client';

import React from 'react';
import Link from 'next/link';

// 우리가 앞서 작성한 실제 1~15번 주제로 업데이트했습니다.
const articles = [
  { id: 1, category: "Decision", title: "결정 장애를 극복하는 '70% 법칙'" },
  { id: 2, category: "Anxiety", title: "불안의 메커니즘: 왜 우리는 걱정하는가" },
  { id: 3, category: "Anger", title: "6초의 기적: 욱하는 화를 다스리는 뇌 과학" },
  { id: 4, category: "Sadness", title: "슬픔의 재발견: 마음을 치유하는 눈물" },
  { id: 5, category: "Happiness", title: "도파민과 세로토닌: 지속 가능한 행복" },
  { id: 6, category: "Burnout", title: "번아웃: 무기력이 보내는 뇌의 SOS 신호" },
  { id: 7, category: "Comparison", title: "나만 뒤처지는 것 같을 때의 심리학" },
  { id: 8, category: "Regret", title: "후회를 성장의 동력으로 바꾸는 법" },
  { id: 9, category: "Mindfulness", title: "마인드풀니스: 지금 이 순간의 평온" },
  { id: 10, category: "Labeling", title: "감정 명명하기: 이름을 부르면 사라지는 것들" },
  { id: 11, category: "Resilience", title: "회복탄력성: 고무줄 같은 마음 만들기" },
  { id: 12, category: "Gaslighting", title: "가스라이팅: 정서적 지배에서 벗어나기" },
  { id: 13, category: "Self-Compassion", title: "자존감보다 중요한 '자기 자비'의 힘" },
  { id: 14, category: "Pygmalion", title: "피그말리온 효과: 말이 씨가 되는 이유" },
  { id: 15, category: "Imposter", title: "가면 증후군: 성공해도 불안한 당신에게" },
  { id: 16, category: "Emotional Recovery", title: "상실의 70%는 애도입니다: 슬픔이 치유로 변하는 시간" },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans pb-24">
      {/* 헤더 로고 */}
      <header className="max-w-xl mx-auto pt-14 pb-12 text-center">
        <Link href="/">
          <h1 
            className="text-4xl font-black tracking-tighter flex justify-center items-center cursor-pointer"
            style={{ WebkitTextStroke: '1.2px currentColor' }}
          >
            <span className="text-[#0F172A]" style={{ WebkitTextStrokeColor: '#0F172A' }}>Feeling</span>
            <span className="text-[#E91E63] ml-1" style={{ WebkitTextStrokeColor: '#E91E63' }}>Snap</span>
          </h1>
        </Link>
        <p className="text-slate-400 font-bold mt-4 tracking-tight">Emotional & Cognitive Insights</p>
      </header>

      <div className="max-w-xl mx-auto px-6">
        <div className="grid gap-5">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.id}`}
              className="group relative p-8 rounded-[32px] bg-slate-50 border border-transparent hover:border-pink-100 hover:bg-white hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-300"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-[#E91E63] font-black text-xs uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-pink-50">
                    {article.category}
                  </span>
                  <span className="text-slate-300 font-mono text-xs font-bold">
                    {article.id < 10 ? `0${article.id}` : article.id}
                  </span>
                </div>
                
                <h2 className="text-xl font-black text-[#0F172A] mt-2 group-hover:text-[#E91E63] transition-colors leading-tight break-keep">
                  {article.title}
                </h2>
                
                <div className="flex items-center mt-4 text-slate-400 font-bold text-sm">
                  <span>더 읽어보기</span>
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300 text-[#E91E63]">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 하단 푸터 영역 */}
        <footer className="mt-20 text-center">
          <Link href="/">
            <button className="bg-[#1A1F2C] text-white px-10 py-5 rounded-[24px] font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              홈으로 돌아가기
            </button>
          </Link>
        </footer>
      </div>
    </div>
  );
}