'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Feeling Snap 심리/감정 인사이트 목록
 * 실제 생성된 1번 ~ 16번 아티클의 주제와 카테고리를 정확히 반영했습니다.
 */
const articles = [
  { id: 1, category: "Essay", title: "가끔은 멈춰서야 보이는 것들: 셔터를 누르는 이유" },
  { id: 2, category: "Column", title: "무채색의 감정이 주는 위로: 선명하지 않아도 괜찮아" },
  { id: 3, category: "Anxiety", title: "불안이라는 이름의 흔들림: 초점을 맞추는 법" },
  { id: 4, category: "Joy", title: "찰나의 기쁨을 영원히 박제하는 기술: 긍정의 기록" },
  { id: 5, category: "Sadness", title: "슬픔의 현상소: 눈물이 마음을 씻어내는 과정" },
  { id: 6, category: "Anger", title: "붉은 노이즈, 분노: 온도를 낮추는 감정의 조리개" },
  // 7번부터는 생성된 최신 콘텐츠 반영
  { id: 7, category: "Social Psychology", title: "나만 뒤처지는 것 같을 때의 심리학: 모든 필름은 인화되는 속도가 다르다" },
  { id: 8, category: "Perfectionism", title: "완벽주의라는 필터: 때로는 노이즈가 삶을 아름답게 만든다" },
  { id: 9, category: "Mindfulness", title: "마음의 셔터 스피드: 느리게 감각할 때 비로소 찍히는 것들" },
  { id: 10, category: "Emotional Alchemy", title: "부정적 감정의 현상법: 슬픔도 선명한 하나의 색깔이다" },
  { id: 11, category: "Cognitive Psychology", title: "기록이 기억을 지배할 때: 왜 우리는 굳이 써야 하는가?" },
  { id: 12, category: "Relationship", title: "관계의 구도: 적당한 거리가 만드는 가장 선명한 순간" },
  { id: 13, category: "Well-being", title: "번아웃이라는 노출 오버: 다시 어둠이 필요할 때" },
  { id: 14, category: "Self-Compassion", title: "자기 위로의 스냅: 세상의 소음을 끄고 나에게 포커스를 맞추는 법" },
  { id: 15, category: "Masterpiece", title: "내 인생의 포트폴리오: 매 순간의 스냅이 모여 작품이 된다" },
  { id: 16, category: "Special Epilogue", title: "감정의 기록자들을 위한 가이드: 당신의 셔터는 멈추지 않는다" },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans pb-24">
      {/* 헤더 로고 */}
      <header className="max-w-xl mx-auto pt-14 pb-12 text-center">
        <Link href="/">
          <div className="inline-block cursor-pointer group">
            <h1 
              className="text-4xl font-black tracking-tighter flex justify-center items-center"
              style={{ WebkitTextStroke: '1.2px currentColor' }}
            >
              <span className="text-[#0F172A]" style={{ WebkitTextStrokeColor: '#0F172A' }}>Feeling</span>
              <span className="text-[#E91E63] ml-1" style={{ WebkitTextStrokeColor: '#E91E63' }}>Snap</span>
            </h1>
            <div className="h-1 w-0 group-hover:w-full bg-[#E91E63] transition-all duration-300 mx-auto mt-1" />
          </div>
        </Link>
        <p className="text-slate-400 font-bold mt-4 tracking-tight uppercase text-[10px] letter spacing-widest">
          Emotional & Cognitive Insights
        </p>
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
                  <span className={`font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                    article.id === 16 
                      ? "bg-slate-900 text-white border-slate-900" 
                      : "bg-white text-[#E91E63] border-pink-50"
                  }`}>
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
                  <span className="group-hover:text-slate-600 transition-colors">인사이트 읽어보기</span>
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300 text-[#E91E63]">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 하단 푸터 영역 */}
        <footer className="mt-20 text-center">
          <Link href="/">
            <button className="bg-[#1A1F2C] text-white px-10 py-5 rounded-[24px] font-bold text-lg hover:scale-105 transition-transform shadow-xl active:scale-95">
              홈으로 돌아가기
            </button>
          </Link>
          <p className="text-slate-300 text-xs mt-8 font-medium">© 2026 Feeling Snap. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}