'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark } from 'lucide-react'; // 아이콘 추가

export const articles = [
  { artNo: "01", id: "things-seen-when-stopped", category: "Essay", title: "가끔은 멈춰서야 보이는 것들: 셔터를 누르는 이유" },
  { artNo: "02", id: "comfort-in-monochrome-emotions", category: "Column", title: "무채색의 감정이 주는 위로: 선명하지 않아도 괜찮아" },
  { artNo: "03", id: "shaking-called-anxiety", category: "Anxiety", title: "불안이라는 이름의 흔들림: 초점을 맞추는 법" },
  { artNo: "04", id: "capturing-fleeting-joy", category: "Joy", title: "찰나의 기쁨을 영원히 박제하는 기술: 긍정의 기록" },
  { artNo: "05", id: "darkroom-of-sadness", category: "Sadness", title: "슬픔의 현상소: 눈물이 마음을 씻어내는 과정" },
  { artNo: "06", id: "red-noise-anger", category: "Anger", title: "붉은 노이즈, 분노: 온도를 낮추는 감정의 조리개" },
  { artNo: "07", id: "psychology-of-feeling-behind", category: "Social Psychology", title: "나만 뒤처지는 것 같을 때의 심리학" },
  { artNo: "08", id: "filter-of-perfectionism", category: "Perfectionism", title: "완벽주의라는 필터: 때로는 노이즈가 아름답다" },
  { artNo: "09", id: "mind-shutter-speed", category: "Mindfulness", title: "마음의 셔터 스피드: 느리게 감각할 때 찍히는 것들" },
  { artNo: "10", id: "developing-negative-emotions", category: "Emotional Alchemy", title: "부정적 감정의 현상법: 슬픔도 선명한 색깔이다" },
  { artNo: "11", id: "when-records-rule-memories", category: "Cognitive Psychology", title: "기록이 기억을 지배할 때: 왜 써야 하는가?" },
  { artNo: "12", id: "composition-of-relationships", category: "Relationship", title: "관계의 구도: 적당한 거리가 만드는 선명함" },
  { artNo: "13", id: "burnout-overexposure", category: "Well-being", title: "번아웃이라는 노출 오버: 다시 어둠이 필요할 때" },
  { artNo: "14", id: "snap-of-self-compassion", category: "Self-Compassion", title: "자기 위로의 스냅: 나에게 포커스를 맞추는 법" },
  { artNo: "15", id: "portfolio-of-my-life", category: "Masterpiece", title: "내 인생의 포트폴리오: 매 순간이 작품이 된다" },
  { artNo: "16", id: "guide-for-emotional-archivers", category: "Special Epilogue", title: "감정의 기록자들을 위한 최종 가이드" },
  { artNo: "17", id: "beyond-the-lens", category: "Identity", title: "렌즈 너머의 나: 카메라가 미처 담지 못한 진정한 자아를 찾는 법" },
  { artNo: "18", id: "color-of-mind", category: "Emotional Color", title: "마음의 채도: 당신의 하루는 어떤 색으로 인화되고 있나요?" },
  { artNo: "19", id: "analog-resilience", category: "Resilience", title: "아날로그적 회복탄력성: 디지털 시대에 필름처럼 느리게 회복하는 법" },
  { artNo: "20", id: "final-shutter", category: "Life Philosophy", title: "마지막 셔터를 누르기 전: 오늘을 후회 없이 인화하는 삶의 태도" }
];

export default function ArticlesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0F1C] text-[#0F172A] dark:text-slate-200 font-sans pb-24 transition-colors duration-300">
      
      {/* 헤더 섹션 */}
      <header className="max-w-xl mx-auto pt-14 pb-12 px-6">
        <div className="flex justify-between items-start">
          {/* 로고 영역 */}
          <Link href="/">
            <div className="inline-block cursor-pointer group">
              <h1 
                className="text-4xl font-black tracking-tighter flex items-center"
                style={{ WebkitTextStroke: '1.2px currentColor' }}
              >
                <span className="text-[#0F172A] dark:text-white">Feeling</span>
                <span className="text-[#E91E63] ml-1">Snap</span>
              </h1>
              <div className="h-1 w-0 group-hover:w-full bg-[#E91E63] transition-all duration-300 mt-1" />
            </div>
          </Link>

          {/* ⭐ 새로 추가된 저장됨 버튼 */}
{/* app/articles/page.tsx 상단 버튼 부분 */}
<Link href="/articles/saved" className="cursor-pointer">
  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-pink-200 transition-all group">
    <Bookmark size={18} className="text-[#E91E63] fill-[#E91E63]" />
    <span className="text-sm font-black text-slate-600 dark:text-slate-400">Saved</span>
  </div>
</Link>        </div>
        
        <p className="text-slate-400 dark:text-slate-500 font-bold mt-6 tracking-tight uppercase text-[10px] spacing-widest">
          Emotional & Cognitive Insights
        </p>
      </header>

      <div className="max-w-xl mx-auto px-6">
        <div className="grid gap-5">
          {articles.map((article) => (
            <Link 
              key={article.id} 
              href={`/articles/${article.id}`}
              className="group relative p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900/40 border border-transparent dark:border-slate-800/50 hover:border-pink-100 dark:hover:border-pink-900/30 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-pink-100/50 dark:hover:shadow-pink-900/10 transition-all duration-300"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className={`font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                    article.artNo === "16" || article.artNo === "20"
                      ? "bg-slate-900 dark:bg-[#E91E63] text-white border-slate-900 dark:border-[#E91E63]" 
                      : "bg-white dark:bg-slate-800 text-[#E91E63] border-pink-50 dark:border-slate-700"
                  }`}>
                    {article.category}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700 font-mono text-xs font-bold">
                    ART NO. {article.artNo}
                  </span>
                </div>
                
                <h2 className="text-xl font-black text-[#0F172A] dark:text-slate-100 mt-2 group-hover:text-[#E91E63] transition-colors leading-tight break-keep">
                  {article.title}
                </h2>
                
                <div className="flex items-center mt-4 text-slate-400 dark:text-slate-500 font-bold text-sm">
                  <span className="group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">인사이트 읽어보기</span>
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300 text-[#E91E63]">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-20 text-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-[#1A1F2C] dark:bg-[#E91E63] text-white px-10 py-5 rounded-[24px] font-bold text-lg hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            홈으로 돌아가기
          </button>
          <p className="text-slate-300 dark:text-slate-700 text-xs mt-8 font-medium">© 2026 Feeling Snap. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}