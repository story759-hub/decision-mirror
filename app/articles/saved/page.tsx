'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark, ArrowLeft, Camera } from 'lucide-react';
import Link from 'next/link';

// 전체 아티클 데이터 (메인 페이지의 데이터와 동일하게 유지)
const ALL_ARTICLES = [
  { id: "things-seen-when-stopped", title: "가끔은 멈춰서야 보이는 것들", artNo: "01", category: "Essay" },
  { id: "comfort-in-monochrome-emotions", title: "무채색의 감정이 주는 위로", artNo: "02", category: "Column" },
  { id: "shaking-called-anxiety", title: "불안이라는 이름의 흔들림", artNo: "03", category: "Anxiety" },
  { id: "capturing-fleeting-joy", title: "찰나의 기쁨을 영원히 박제하는 기술", artNo: "04", category: "Joy" },
  { id: "darkroom-of-sadness", title: "슬픔의 현상소", artNo: "05", category: "Sadness" },
  { id: "red-noise-anger", title: "붉은 노이즈, 분노", artNo: "06", category: "Anger" },
  { id: "psychology-of-feeling-behind", title: "나만 뒤처지는 것 같을 때의 심리학", artNo: "07", category: "Social Psychology" },
  { id: "filter-of-perfectionism", title: "완벽주의라는 필터", artNo: "08", category: "Perfectionism" },
  { id: "mind-shutter-speed", title: "마음의 셔터 스피드", artNo: "09", category: "Mindfulness" },
  { id: "developing-negative-emotions", title: "부정적 감정의 현상법", artNo: "10", category: "Emotional Alchemy" },
  { id: "when-records-rule-memories", title: "기록이 기억을 지배할 때", artNo: "11", category: "Cognitive Psychology" },
  { id: "composition-of-relationships", title: "관계의 구도", artNo: "12", category: "Relationship" },
  { id: "burnout-overexposure", title: "번아웃이라는 노출 오버", artNo: "13", category: "Well-being" },
  { id: "snap-of-self-compassion", title: "자기 위로의 스냅", artNo: "14", category: "Self-Compassion" },
  { id: "portfolio-of-my-life", title: "내 인생의 포트폴리오", artNo: "15", category: "Masterpiece" },
  { id: "guide-for-emotional-archivers", title: "감정의 기록자들을 위한 최종 가이드", artNo: "16", category: "Special Epilogue" },
  { id: "beyond-the-lens", title: "렌즈 너머의 나", artNo: "17", category: "Identity" },
  { id: "color-of-mind", title: "마음의 채도", artNo: "18", category: "Emotional Color" },
  { id: "analog-resilience", title: "아날로그적 회복탄력성", artNo: "19", category: "Resilience" },
  { id: "final-shutter", title: "마지막 셔터를 누르기 전", artNo: "20", category: "Life Philosophy" }
];

export default function SavedArticlesPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const saved = JSON.parse(localStorage.getItem('saved_articles') || '[]');
    setSavedIds(saved);
  }, []);

  const savedArticles = ALL_ARTICLES.filter(article => savedIds.includes(article.id));

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C] p-6 pt-20">
      <div className="max-w-xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 mb-8 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>돌아가기</span>
        </button>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark className="text-[#E91E63] fill-[#E91E63]" size={24} />
            <h1 className="text-3xl font-black dark:text-white">Saved Insights</h1>
          </div>
          <p className="text-slate-500">당신이 머물렀던 소중한 감정의 기록들입니다.</p>
        </header>

        {savedArticles.length > 0 ? (
          <div className="grid gap-4">
            {savedArticles.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`}>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[24px] border border-slate-100 dark:border-slate-800 hover:scale-[1.02] transition-all shadow-sm">
                  <span className="text-[10px] font-black text-[#E91E63] uppercase tracking-widest">{article.category}</span>
                  <h3 className="text-lg font-black mt-1 dark:text-white">{article.title}</h3>
                  <p className="text-slate-400 text-xs mt-4 font-mono">ART NO. {article.artNo}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
            <Camera className="mx-auto mb-4 text-slate-300" size={48} />
            <p className="text-slate-500 font-medium">아직 저장된 인사이트가 없습니다.</p>
            <Link href="/articles" className="text-[#E91E63] text-sm font-bold mt-4 inline-block underline">인사이트 보러가기</Link>
          </div>
        )}
      </div>
    </div>
  );
}