'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Layout, 
  Layers, 
  Palette, 
  Sparkles, 
  ChevronRight,
  Music,
  Frame,
  History
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "portfolio-of-my-life", 
  title: "내 인생의 포트폴리오: 매 순간이 작품이 된다",
  category: "Life as a Masterpiece",
  artNo: "15",
  nextId: "guide-for-emotional-archivers", 
  nextTitle: "감정의 기록자들을 위한 최종 가이드",
  charCount: "1,720",
  readTime: "18"
};

export default function ArticleFifteen() {
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
      text: '당신의 사소한 기록들이 모여 하나의 위대한 포트폴리오가 됩니다.',
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
          className="h-full bg-gradient-to-r from-slate-800 to-black dark:from-slate-400 dark:to-white transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Portfolio List
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-black transition-colors p-1">
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
              <span className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              내 인생의 포트폴리오: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900 dark:from-slate-300 dark:to-white">모든 찰나가 예술이 되는 순간</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-slate-900 dark:border-white pl-6 py-2">
              "한 거장의 포트폴리오는 수만 번의 셔터질 끝에 남은 단 몇 장의 정수로 완성됩니다. 당신의 기록 또한 그렇습니다."
            </p>

            <p className="break-keep">
              위대한 사진가들에게 그들의 대표작이 어떻게 탄생했느냐고 물으면, 그것은 어느 날 갑자기 하늘에서 떨어진 행운이 아니라고 입을 모아 말합니다. 수만 번의 무의미해 보이던 셔터질, 인화되기도 전에 버려진 수천 장의 파지, 그리고 아무도 주목하지 않던 평범한 일상의 편린들이 켜켜이 쌓여 비로소 하나의 **'포트폴리오'**가 완성되는 것이죠. 
            </p>
            <p className="break-keep">
              오늘 당신이 **Feeling Snap**에 남긴 사소한 감정 한 조각, 짧은 문장 하나는 그 자체로는 아주 미미해 보일지 모릅니다. 하지만 이 점들이 선으로 연결되고 면을 채우는 순간, 당신이라는 거대하고 입체적인 예술 작품이 그 모습을 드러내기 시작합니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Layers className="text-slate-400" size={28} />
              1. 점들을 연결하기(Connecting the Dots)
            </h3>
            <p className="break-keep">
              스티브 잡스는 "미래를 내다보며 점을 연결할 수는 없다. 오직 과거를 뒤돌아볼 때만 점들을 연결할 수 있다"고 역설했습니다. 우리가 기록하는 매 순간의 감정 스냅들은 인생이라는 거대한 인화지 위에 찍히는 '점'들입니다. 
            </p>
            <p className="break-keep">
              슬텄던 날의 차가운 파란색 기록, 환희에 찼던 따뜻한 노란색 기록, 지루함에 몸부림치던 무채색의 기록들이 충분히 아카이빙되었을 때, 비로소 우리는 내 인생이 어떤 방향으로 흐르고 있는지, 내가 어떤 고유한 색깔을 가진 사람인지 깨닫게 됩니다. 기록은 파편화된 경험을 하나의 유기적인 '서사'로 통합하는 유일한 길입니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
              <div className="p-8 rounded-[40px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <History className="text-slate-900 dark:text-white mb-4" size={28} />
                <h4 className="text-lg font-black mb-2">기록의 아카이빙</h4>
                <p className="text-sm text-slate-500 leading-relaxed italic">고통의 기록이야말로 훗날 당신을 가장 빛나게 할 '결정적 순간'의 재료가 됩니다.</p>
              </div>
              <div className="p-8 rounded-[40px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <Palette className="text-slate-900 dark:text-white mb-4" size={28} />
                <h4 className="text-lg font-black mb-2">일관성의 발견</h4>
                <p className="text-sm text-slate-500 leading-relaxed italic">반복되는 감정 패턴 속에서 당신 영혼만의 독특한 '화풍(Style)'을 발견하게 될 것입니다.</p>
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Frame className="text-slate-400" size={28} />
              2. 큐레이션: 내 삶의 의미를 편집하는 힘
            </h3>
            <p className="break-keep">
              포트폴리오를 만드는 과정에서 셔터를 누르는 것만큼이나 중요한 작업은 바로 '편집(Curation)'입니다. 하지만 편집을 하려면 우선 풍부한 '재료'가 준비되어 있어야 합니다. 기록이 없는 삶은 복기할 수 없는 체보와 같으며, 편집할 영상 소스가 없는 영화와 같습니다. 
            </p>
            <p className="break-keep">
              Feeling Snap에 쌓인 데이터들은 당신이 세상을 살아내며 남긴 빛의 궤적입니다. 우리는 이 기록들을 통해 내 인생이라는 영화에서 어떤 장면을 강조하고, 어떤 장면을 뒤로 보낼지 결정할 수 있습니다. 슬픔을 기쁨으로 보정하라는 뜻이 아닙니다. 슬픔조차도 '성장'이라는 카테고리 안에 배치할 수 있는 안목을 갖게 된다는 뜻입니다. 기록하는 자만이 자기 삶의 주도적인 편집자가 될 수 있습니다.
            </p>

            <div className="bg-slate-900 text-white p-12 md:p-16 my-20 rounded-[50px] shadow-2xl relative overflow-hidden text-center">
               <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30"></div>
               <p className="text-slate-400 text-sm font-black uppercase tracking-[0.4em] mb-6 relative z-10">Eternal Archiving</p>
               <p className="text-2xl md:text-3xl font-black leading-tight tracking-tighter relative z-10 break-keep">
                 "당신의 인생은 아직 인화되지 않은 <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-white drop-shadow-sm">무한한 가능성의 필름통</span>입니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">3. Feeling Snap: 당신만의 비밀 갤러리</h3>
            <p className="break-keep">
              우리가 이 서비스를 설계한 궁극적인 목적은 단순히 감정 수치를 분석하는 것이 아니었습니다. 당신이 자기 자신을 한 명의 예술가처럼 깊이 관찰하고, 당신에게 주어진 단 한 번뿐인 인생을 세상에서 가장 소중한 예술 작품처럼 대하기를 바랐기 때문입니다. 
            </p>
            <p className="break-keep">
              Feeling Snap의 데이터는 단순한 숫자의 나열이 아닙니다. 그것은 당신이 매일의 풍파를 견디며 남긴 유일무이한 서사이며, 훗날 당신의 후손들에게나 미래의 당신 자신에게 보여줄 수 있는 가장 진실한 포트폴리오입니다. 그 누구도 대신 써줄 수 없는 이 위대한 작품의 작가는 오직 당신뿐입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 셔터 소리는 계속되어야 합니다</h3>
            <p className="break-keep">
              인생이라는 포트폴리오에는 완성이 없습니다. 우리가 숨 쉬고, 느끼고, 사랑하는 한 새로운 페이지는 계속해서 추가될 것입니다. 때로는 초점이 심하게 빗나가고, 노출이 맞지 않아 형체를 알아볼 수 없는 날도 있겠죠. 하지만 그 모든 실패작과 NG 컷들조차 당신의 포트폴리오를 구성하는 숭고한 자산입니다. 
            </p>
            <p className="break-keep">
              오늘 당신의 마음을 찍는 것을 멈추지 마세요. 훗날 당신이 인생의 황혼에서 이 사진첩을 넘겨볼 때, 모든 페이지가 타인의 시선이 아닌 당신다운 진솔함과 용기로 빛나고 있기를 진심으로 응원합니다.
            </p>

            {/* 추천 사운드트랙 */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[40px] border border-slate-100 dark:border-slate-800 space-y-6 mt-16">
              <div className="flex items-center gap-3">
                <Music className="text-slate-900 dark:text-white" size={20} />
                <p className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest">Portfolio Soundtrack</p>
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-base space-y-4">
                <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span>Claude Debussy - Clair de Lune</span>
                  <span className="text-xs font-mono opacity-50 italic">삶의 모든 순간을 비추는 달빛</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span>Joe Hisaishi - Summer</span>
                  <span className="text-xs font-mono opacity-50 italic">새로운 페이지를 여는 설렘</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 (에필로그로 연결) */}
          <section className="mt-32 p-10 rounded-[50px] bg-slate-900 text-white group hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
               <Sparkles size={200} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">The Last Chapter</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block relative z-10">
              <h4 className="text-2xl font-black leading-tight group-hover:text-slate-300 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-6 text-white font-bold text-sm">
                대단원의 막을 내리며 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center">
            <div className="mb-12">
               <Layout className="mx-auto mb-6 text-slate-300" size={32} />
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">당신의 인생은 그 자체로 하나의 전시회입니다.</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">다음 작품을 기록할 준비가 되셨나요?</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-black dark:bg-white text-white dark:text-black py-6 rounded-[32px] font-black text-xl shadow-2xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              새로운 스냅 인화하기 🎞️
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}