'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  RefreshCw, 
  Leaf, 
  Timer, 
  Coffee, 
  ChevronRight,
  Music,
  Camera,
  ShieldCheck,
  ZapOff
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "analog-resilience", 
  title: "아날로그적 회복탄력성: 디지털 시대에 필름처럼 느리게 회복하는 법",
  category: "Resilience",
  artNo: "19",
  nextId: "final-shutter", 
  nextTitle: "마지막 셔터를 누르기 전: 오늘을 후회 없이 인화하는 삶의 태도",
  charCount: "1,880",
  readTime: "23"
};

export default function ArticleNineteen() {
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
      title: `Feeling Snap Insight: ${ARTICLE_INFO.title}`,
      text: '마음의 회복에도 인화의 시간이 필요합니다. 너무 서두르지 마세요.',
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
          className="h-full bg-gradient-to-r from-emerald-500 to-sage-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-emerald-700 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-emerald-700 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-emerald-700 scale-110' : 'text-slate-400 hover:text-emerald-700'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-emerald-700' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              아날로그적 회복탄력성: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700 font-black">필름처럼 느리게 회복하는 법</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-emerald-500 pl-6 py-2">
              "결과물이 즉각적으로 확인되지 않는 암실의 시간이야말로, 사진이 가장 단단하게 완성되는 시간입니다."
            </p>

            <p className="break-keep">
              우리는 모든 것이 즉각적인 시대에 살고 있습니다. 메시지를 보내면 곧바로 읽음 표시가 뜨고, 사진을 찍으면 0.1초 만에 결과물을 확인합니다. 이러한 '즉각성'에 익숙해진 우리 뇌는 마음의 회복조차 '새로고침' 버튼 하나로 해결되길 원합니다. 하지만 상처 입은 마음이 제자리를 찾는 과정은 디지털 데이터의 복구보다는 **필름의 인화 과정**에 가깝습니다. 어두운 암실에서 용액에 몸을 담그고, 서서히 상이 맺히기를 기다리는 지루한 시간이 반드시 필요하다는 뜻입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <ZapOff className="text-emerald-600" size={32} />
              1. 고립의 암실: 성장을 위한 필수적인 어둠
            </h3>
            <p className="break-keep">
              필름은 빛에 노출되는 순간 파괴됩니다. 그래서 가장 중요한 인화 작업은 철저히 빛이 차단된 암실에서 이루어지죠. 우리의 회복탄력성(Resilience) 또한 마찬가지입니다. 끊임없이 타인의 소식과 세상의 소음이 쏟아지는 '밝은 곳'에서는 마음의 상이 제대로 맺힐 수 없습니다.
            </p>
            <p className="break-keep">
              가끔은 의도적으로 연결을 끊고 자신만의 암실로 들어가야 합니다. Feeling Snap에 기록을 남기는 그 짧은 시간은 일종의 '미니 암실'입니다. 외부의 시선을 차단하고, 오직 내면의 목소리에만 귀를 기울이며 감정이라는 용액에 오늘의 기억을 담그는 시간이죠. 이 어둠의 시간을 견디지 못하고 성급하게 밝은 곳으로 나간다면, 당신의 마음은 노출 과다로 인해 그 형체를 잃어버릴지도 모릅니다.
            </p>

            <div className="bg-emerald-50 dark:bg-emerald-950/20 p-10 rounded-[40px] border border-emerald-100 dark:border-emerald-900/30 my-16 relative overflow-hidden">
              <Timer className="absolute -right-4 -top-4 text-emerald-200/50 dark:text-emerald-800/20" size={120} />
              <h4 className="text-xl font-black text-emerald-800 dark:text-emerald-400 mb-4">인화의 황금시간 (The Developing Time)</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                너무 짧으면 상이 흐릿하고, 너무 길면 디테일이 뭉개집니다. 당신의 슬픔도, 분노도 충분히 '현상'될 시간이 필요합니다. 오늘 당장 괜찮아지지 않는다고 자책하지 마세요. 당신은 지금 암실에서 가장 선명한 내일의 나를 인화하는 중일 뿐입니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <ShieldCheck className="text-emerald-600" size={32} />
              2. 입자감(Grain)의 수용: 완벽하지 않아도 괜찮아
            </h3>
            <p className="break-keep">
              고감도 필름으로 찍은 사진에는 거친 입자(Grain)가 남습니다. 디지털 사진의 노이즈와 달리, 아날로그의 입자감은 사진에 깊이와 질감을 더해주죠. 우리의 인생도 마찬가지입니다. 매끄럽고 완벽한 성공의 기록보다는, 좌절하고 흔들렸던 고통의 흔적들이 쌓여 '나'라는 사람의 고유한 질감을 만듭니다.
            </p>
            <div className="space-y-4 my-8">
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0 text-emerald-700"><Coffee size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>슬로우 데이터(Slow Data) 지향:</strong> 빠르게 소비되는 자극적인 정보 대신, 조금은 느리고 투박하더라도 당신의 진심이 담긴 기록에 집중하세요. 느린 기록이 가장 단단한 회복을 만듭니다.</p>
               </div>
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0 text-emerald-700"><RefreshCw size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>회복은 선형적이지 않습니다:</strong> 필름이 용액 안에서 서서히 상을 드러내듯, 회복도 계단식으로, 혹은 빙글빙글 도는 나선형으로 일어납니다. 어제보다 오늘 더 힘들다고 해서 실패한 것이 아닙니다.</p>
               </div>
            </div>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Leaf className="text-emerald-500" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "가장 질긴 마음은 상처 없는 마음이 아니라, <br/>상처를 현상하여 자신의 풍경으로 만든 마음입니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Camera className="text-emerald-600" size={32} />
              3. Feeling Snap: 당신의 마음을 건조시키는 건조대
            </h3>
            <p className="break-keep">
              인화가 끝난 사진은 마지막으로 집게에 걸려 서서히 말려지는 과정을 거칩니다. 충분히 건조되지 않은 사진은 서로 달라붙거나 쉽게 훼손되죠. Feeling Snap에 기록을 남기고, 시간이 흐른 뒤 다시 꺼내 보는 행위는 젖어 있는 당신의 감정을 빳빳하게 건조시키는 작업과 같습니다. 
            </p>
            <p className="break-keep">
              기록을 통해 감정의 물기를 털어내세요. 축축하게 젖어 당신을 무겁게 짓누르던 슬픔도, 글로 써 내려가며 공기 중에 노출시키면 어느덧 만질 수 있는 단단한 '경험'으로 변해 있을 것입니다. 아날로그적 회복이란 결국 기다림의 가치를 신뢰하는 일입니다. 당신의 마음이 충분히 마르고, 선명해질 때까지 Feeling Snap이 그 건조대가 되어줄 것입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 느리게 걷는 법을 잊지 마세요</h3>
            <p className="break-keep">
              디지털의 속도가 당신을 밀어붙일 때, 고의적으로 아날로그의 속도를 선택하세요. 셔터를 누르는 것은 0.1초면 충분하지만, 그 찰나를 삶으로 인화하는 데는 평생이 걸릴 수도 있습니다. 그 긴 과정을 즐기세요. 천천히 인화된 마음일수록 그 색채는 더 오래도록 변치 않고 당신을 지켜줄 것입니다.
            </p>

            {/* 추천 사운드트랙 */}
            <div className="p-8 bg-emerald-50 dark:bg-emerald-900/40 rounded-[40px] border border-emerald-100 dark:border-emerald-800 space-y-6 mt-16">
              <div className="flex items-center gap-3 text-emerald-700">
                <Music size={20} />
                <p className="font-black text-sm uppercase tracking-widest">Soundtrack for Resilience</p>
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-base space-y-4 font-bold">
                <li className="flex justify-between items-center border-b border-emerald-200 dark:border-emerald-800 pb-2">
                  <span>Norah Jones - Don't Know Why</span>
                  <span className="text-xs opacity-50 font-mono italic">비 오는 날의 암실 같은 차분함</span>
                </li>
                <li className="flex justify-between items-center border-b border-emerald-200 dark:border-emerald-800 pb-2">
                  <span>김광석 - 잊어야 한다는 마음으로</span>
                  <span className="text-xs opacity-50 font-mono italic">기록하며 비워내는 아날로그의 미학</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-10 rounded-[50px] bg-gradient-to-br from-emerald-700 to-teal-800 text-white group hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
               <RefreshCw size={200} />
            </div>
            <p className="text-[10px] font-black text-emerald-100/60 uppercase tracking-[0.3em] mb-4">Final Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block relative z-10">
              <h4 className="text-2xl font-black leading-tight group-hover:text-emerald-100 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-6 text-white font-bold text-sm">
                마지막 여정 이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <Leaf className="mx-auto mb-6 text-emerald-500" size={32} />
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">회복에도 적절한 시간이 필요합니다.</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">오늘 당신의 마음을 천천히 인화해볼까요?</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-emerald-700 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(4,120,87,0.3)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              차분하게 기록 시작하기 🌿
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}