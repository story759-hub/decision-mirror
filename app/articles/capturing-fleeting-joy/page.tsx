'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Heart, 
  Coffee, 
  Sparkles, 
  ChevronRight,
  Sun
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정 (수동 데이터 입력)
const ARTICLE_INFO = {
  id: "capturing-fleeting-joy", 
  title: "찰나의 기쁨을 영원히 박제하는 기술: 긍정의 기록",
  category: "Joy & Positivity",
  artNo: "04",
  nextId: "darkroom-of-sadness", 
  nextTitle: "슬픔의 현상소: 눈물이 마음을 씻어내는 과정",
  charCount: "1,450",
  readTime: "12"
};

export default function ArticleFour() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. 초기화 및 스크롤 핸들링
  useEffect(() => {
    setMounted(true);
    
    // 저장 상태 확인
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

  // 2. 공유 기능
  const handleShare = async () => {
    const shareData = {
      title: `Feeling Snap: ${ARTICLE_INFO.title}`,
      text: '오늘 당신의 기쁨을 박제해보세요.',
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

  // 3. 저장 기능
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
          className="h-full bg-gradient-to-r from-yellow-400 to-[#E91E63] transition-all duration-150"
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
            Insights
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
              <span className="bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-yellow-100 dark:border-yellow-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              찰나의 기쁨을 영원히 박제하는 기술: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-[#E91E63]">행복의 유통기한을 늘리는 법</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-yellow-400 pl-6 py-2">
              "행복은 나비와 같습니다. 움켜쥐려 하면 날아가지만, 고요히 기록할 때 당신의 곁에 박제됩니다."
            </p>

            <p className="break-keep">
              우리는 흔히 행복이 거대한 성취나 특별한 사건으로부터 온다고 믿습니다. 하지만 삶을 지탱하는 진짜 에너지는 일상의 틈새에 스며있는 '찰나의 기쁨'들입니다. 퇴근길 차창 밖으로 번지는 귤빛 노출, 낯선 이가 건넨 따뜻한 배려, 혹은 오래된 외투 주머니에서 우연히 발견한 지폐 한 장 같은 것들 말이죠. 문제는 이러한 기쁨들이 놀라울 정도로 휘발성이 강하다는 점입니다. 슬픔은 마음 한구석에 끈적하게 달라붙어 좀처럼 떨어지지 않지만, 기쁨은 향수처럼 공기 중으로 금세 증발해 버립니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24">1. 진화의 역설: 왜 기쁨은 슬픔보다 짧을까?</h3>
            <p className="break-keep">
              우리의 뇌는 수만 년간 '생존'이라는 절대 명제에 따라 진화해 왔습니다. 원시 시대의 인류에게 위험 신호(공포, 불안, 슬픔)는 즉각적인 대응이 필요한 생존 정보였기에 뇌는 이를 장기 기억 저장소에 깊이 각인시키도록 설계되었습니다. 반면, 평온함이나 기쁨은 '현재 안전함'을 의미할 뿐, 생존에 긴박한 정보가 아니었습니다. 
            </p>
            <p className="break-keep">
              이러한 부정 편향(Negativity Bias) 때문에 우리는 하루 중 9번의 좋은 일이 있어도 1번의 불쾌한 경험에 온 신경을 빼앗깁니다. 의도적인 기록, 즉 **'기쁨의 박제'**가 필요한 이유가 바로 여기에 있습니다. 우리가 의식적으로 기쁨의 순간을 포착하고 기록하지 않는다면, 우리 인생의 앨범은 자연스럽게 회색빛 기억들로만 채워질 수밖에 없습니다.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-10 rounded-[40px] border border-yellow-100 dark:border-yellow-900/30 my-16">
              <Sun className="text-yellow-500 mb-6" size={32} />
              <h4 className="text-xl font-black text-yellow-700 dark:text-yellow-400 mb-4">행복의 유통기한을 늘리는 '장노출' 기록법</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                기쁨을 문장으로 옮기는 과정은 카메라의 셔터 스피드를 늦추는 것과 같습니다. 짧은 빛을 길게 받아들여 선명한 이미지를 만들듯, 감정을 글로 적는 시간 동안 우리 뇌는 그 기쁨을 재경험(Rewiring)하며 신경 회로를 강화합니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">2. 감정 스냅의 기술: 오감을 동원한 인화</h3>
            <p className="break-keep">
              기쁨을 더 오래 보존하고 싶다면 기록에 '질감'을 부여해야 합니다. 단순히 "오늘 점심은 맛있었다"라고 적는 것은 해상도가 낮은 썸네일과 같습니다. 대신 "갓 구운 빵의 고소한 온기가 손바닥을 타고 전해질 때, 비로소 주말이 시작되었음을 느꼈다"라고 적어보세요. 시각, 청각, 후각, 촉각을 동원한 기록은 훗날 그 글을 읽는 것만으로도 당시의 감정을 즉각적으로 소환(Recall)하는 강력한 트리거가 됩니다.
            </p>
            <p className="break-keep">
              또한, 나만의 '기쁨 패턴'을 분석하는 것도 중요합니다. Feeling Snap에 기록이 쌓이다 보면 내가 어떤 환경에서, 어떤 사람과, 어떤 사소한 행동을 할 때 가장 높은 만족도를 느끼는지 데이터가 보입니다. 그것이 바로 당신의 심리적 골든 아워입니다. 이 데이터를 기반으로 우리는 더 자주 기쁨을 설계하고 배치할 수 있게 됩니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Sparkles className="text-yellow-500" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "기록되지 않은 기쁨은 잊히지만, <br/>박제된 기쁨은 내일의 나를 구원하는 에너지가 됩니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">3. 미래의 나를 위한 '감정 구호물자'</h3>
            <p className="break-keep">
              오늘 당신이 남기는 한 줄의 긍정 스냅은 사실 오늘을 위한 것이 아닙니다. 그것은 언젠가 마음이 지독하게 흐리고 무거운 날, 당신이 꺼내 볼 수 있는 '감정의 비축분'입니다. 인생에는 반드시 겨울이 찾아옵니다. 모든 일이 뜻대로 되지 않고 스스로가 초라해 보일 때, Feeling Snap 보관함에 저장된 빛나는 조각들을 꺼내 보세요. 
            </p>
            <p className="break-keep">
              "맞아, 나에게는 이런 햇살 같은 순간들이 있었지", "나는 이런 작은 것에도 웃을 수 있는 사람이었지"라는 자각은 폭풍우 속에서도 다시 중심을 잡게 하는 닻(Anchor)이 되어줍니다. 긍정의 기록은 자기 기만이 아닙니다. 오히려 우리 삶에 존재하는 수많은 진실 중, 그동안 소외되었던 '빛의 진실'을 다시 복원하는 숭고한 작업입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 당신의 셔터는 지금 어디를 향하고 있나요?</h3>
            <p className="break-keep">
              행복은 도달해야 할 목적지가 아니라, 여정 중에 마주치는 풍경을 어떻게 바라보느냐의 문제입니다. 지금 이 글을 읽으며 떠오르는 아주 작은 기분 좋음이 있다면 망설이지 말고 셔터를 누르세요. 거창한 문장이 아니어도 좋습니다. 당신이 그 짧은 감정에 머물러 준 그 찰나의 순간이, 당신의 무채색 하루를 완전히 다른 색으로 인화해 줄 것입니다. 
            </p>
            <p className="break-keep">
              오늘 밤, 잠들기 전 Feeling Snap을 열고 당신의 하루에서 가장 밝았던 부분을 단 1%라도 기록해 보세요. 박제된 기쁨들이 모여 당신의 인생이라는 앨범은 점점 더 찬란한 빛으로 가득 차게 될 것입니다.
            </p>

            {/* 감성 가이드 박스 */}
            <div className="grid grid-cols-1 gap-6 mt-24">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#1A1F2C] to-[#0A0F1C] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 blur-[100px] opacity-20"></div>
                <p className="text-yellow-500 font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                   Joyful Mood Practice
                </p>
                <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Coffee size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">오감 스캐닝</p>
                       <p className="text-sm text-slate-400 leading-relaxed">지금 이 순간 느껴지는 기분 좋은 촉감이나 향기를 한 단어로 메모해 보세요.</p>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Heart size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">감정 플레이리스트</p>
                       <p className="text-sm text-slate-400 leading-relaxed">기쁨을 기록할 때 Joe Hisaishi의 'Summer' 같은 경쾌한 곡을 곁들여 보세요.</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-8 md:p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 group hover:border-yellow-500/30 transition-all cursor-pointer">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-yellow-600 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-4 text-yellow-600 font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">당신의 오늘은 어떤 색으로 기억될까요?</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">찰나의 기쁨을 박제해보세요</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-[#1A1F2C] dark:bg-yellow-500 text-white dark:text-[#1A1F2C] py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(234,179,8,0.3)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              오늘의 기쁨 박제하기 ✨
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}