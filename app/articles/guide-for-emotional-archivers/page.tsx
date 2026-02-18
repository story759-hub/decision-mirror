'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Camera, 
  Heart, 
  Focus, 
  Sparkles, 
  ChevronRight,
  Music,
  Wind,
  Library,
  Zap
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "guide-for-emotional-archivers", 
  title: "감정의 기록자들을 위한 가이드: 당신의 셔터는 멈추지 않는다",
  category: "Special Guide",
  artNo: "16",
  // 17번 아티클로 연결되도록 수정
  nextId: "beyond-the-lens", 
  nextTitle: "렌즈 너머의 나: 카메라가 미처 담지 못한 진정한 자아를 찾는 법",
  charCount: "1,580",
  readTime: "15"
};

export default function ArticleSixteen() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    const saved = JSON.parse(localStorage.getItem('saved_articles') || '[]');
    setIsSaved(saved.includes(ARTICLE_INFO.id));

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: `Feeling Snap: ${ARTICLE_INFO.title}`,
      text: '기록의 기초를 넘어, 이제 당신만의 깊은 서사를 완성할 시간입니다.',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다!');
      }
    } catch (err) { console.log(err); }
  };

  const handleSave = () => {
    let saved = JSON.parse(localStorage.getItem('saved_articles') || '[]');
    if (isSaved) {
      saved = saved.filter((id: string) => id !== ARTICLE_INFO.id);
      setIsSaved(false);
    } else {
      saved.push(ARTICLE_INFO.id);
      setIsSaved(true);
      alert('관심 인사이트에 저장되었습니다.');
    }
    localStorage.setItem('saved_articles', JSON.stringify(saved));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0F1C] text-slate-900 dark:text-slate-200 font-sans pb-32 transition-colors duration-300 overflow-x-hidden">
      
      {/* 독서 프로그레스 바 */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-100 dark:bg-slate-800/50 z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-[#E91E63] to-[#880E4F] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-[#E91E63] transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Go to List
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-[#E91E63] transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-[#E91E63] scale-110' : 'text-slate-400 hover:text-[#E91E63]'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-[#E91E63]' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-md">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              감정의 기록자들을 위한 가이드: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-[#FF80AB]">기록의 습관이 예술이 될 때</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-[#E91E63] pl-6 py-2">
              "우리는 인생이라는 영화의 관객이 아닙니다. 직접 셔터를 누르고 프레임을 구성하는 감독이자 작가입니다."
            </p>

            <p className="break-keep">
              지금까지 우리는 감정의 조리개를 조절하는 법부터 관계의 구도를 잡는 법까지, 기록의 기술적 토대를 함께 닦아왔습니다. 이 가이드는 단순한 마무리가 아닙니다. 당신이 수집한 이 파편들을 어떻게 하나의 거대한 '인생의 결'로 다듬어 나갈지에 대한 **지속 가능한 아카이빙**의 선언입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24">1. 기록은 '답'이 아니라 '질문'입니다</h3>
            <p className="break-keep">
              기록이 한 장 한 장 쌓일수록 당신은 자신에 대해 더 정교하게 묻게 됩니다. 기록은 당신을 과거에 가두는 상자가 아니라, 더 넓은 시야를 열어주는 뷰파인더가 되어야 합니다. 이제부터는 단순히 현상을 기록하는 것을 넘어, 그 현상 이면에 숨겨진 **'본질적인 감정'**에 귀를 기울여야 할 때입니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
              <div className="p-8 rounded-[40px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <Focus className="text-[#E91E63] mb-4" size={28} />
                <h4 className="text-lg font-black mb-2">세밀한 관찰자</h4>
                <p className="text-sm text-slate-500 leading-relaxed italic">스쳐 지나가는 미세한 기쁨과 찰나의 슬픔을 놓치지 않는 예민한 감수성의 렌즈를 유지하세요.</p>
              </div>
              <div className="p-8 rounded-[40px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <Zap className="text-[#E91E63] mb-4" size={28} />
                <h4 className="text-lg font-black mb-2">새로운 장의 시작</h4>
                <p className="text-sm text-slate-500 leading-relaxed italic">기초가 완성되었다면 이제 고독, 성숙, 감사 등 더 깊은 차원의 감정 인화 단계를 준비하세요.</p>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-slate-900 to-[#1A1F2C] text-white p-12 md:p-16 my-20 rounded-[50px] shadow-2xl overflow-hidden text-center">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <p className="text-amber-400 text-sm font-black uppercase tracking-[0.4em] mb-6 relative z-10">Advanced Archiving</p>
               <p className="text-3xl md:text-5xl font-black leading-tight tracking-tighter relative z-10 break-keep">
                 "기초를 넘어, 이제 <br/>
                 <span className="text-[#E91E63] drop-shadow-[0_0_15px_rgba(233,30,99,0.5)]">심화된 감정의 이면</span>을 만날 시간입니다."
               </p>
               <Sparkles className="absolute bottom-8 right-8 text-white/20" size={60} />
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24">결론: 셔터 소리는 멈추지 않습니다</h3>
            <p className="break-keep">
              **Feeling Snap**의 여정은 여기서 멈추지 않습니다. 우리는 이제 더 깊고 은밀한 감정의 영역으로 나아갑니다. 혼자 있는 시간의 아름다움을 발견하는 법부터, 인생의 마지막 필름 한 장을 감사로 인화하는 법까지. 기록자 여러분, 당신의 뷰파인더를 다시 정렬하세요. 이제 진짜 심화 코스가 시작됩니다.
            </p>

            {/* 마지막 추천 음악 섹션 */}
            <div className="grid grid-cols-1 gap-6 mt-24">
              <div className="p-8 rounded-[40px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 text-slate-800 dark:text-white relative overflow-hidden group">
                <Music className="text-[#E91E63] mb-6 group-hover:rotate-12 transition-transform" size={32} />
                <p className="text-[#E91E63] font-black text-[10px] uppercase tracking-[0.2em] mb-4">Deepening Soundtrack</p>
                <div className="space-y-4 font-bold">
                   <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                     <span>Ryuichi Sakamoto - Merry Christmas Mr. Lawrence</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span>Olafur Arnalds - Saman</span>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 (17번으로 연결) */}
          <section className="mt-32 p-10 rounded-[50px] bg-[#E91E63] text-white group hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-20 group-hover:scale-110 transition-transform">
               <Camera size={200} />
            </div>
            <p className="text-[10px] font-black text-pink-200 uppercase tracking-[0.3em] mb-4 font-mono">Next Level: Identity</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block relative z-10">
              <h4 className="text-3xl font-black leading-tight group-hover:underline transition-all">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <p className="mt-4 text-pink-100 font-medium break-keep">
                기초 가이드를 마친 당신에게 제안하는 첫 번째 심화 주제. <br/>
                텅 빈 프레임 속에 홀로 남겨진 나를 마주하는 법에 관하여.
              </p>
              <div className="flex items-center gap-2 mt-8 text-white font-black text-sm">
                심화 인사이트 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <Heart className="text-[#E91E63] mx-auto mb-6" size={24} />
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">기초 가이드 시리즈(01-16) 완료.</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white font-mono">NEXT CHAPTER IS WAITING.</h3>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}