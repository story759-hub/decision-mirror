'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Wind, 
  Layers, 
  Camera, 
  Sparkles, 
  ChevronRight,
  Music
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "comfort-in-monochrome-emotions", 
  title: "무채색의 감정이 주는 위로: 선명하지 않아도 괜찮아",
  category: "Mindset",
  artNo: "02",
  nextId: "shaking-called-anxiety", 
  nextTitle: "불안이라는 이름의 흔들림: 초점을 맞추는 법",
  charCount: "1,380",
  readTime: "11"
};

export default function ArticleTwo() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 초기화 및 상태 관리
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

  // 공유 기능
  const handleShare = async () => {
    const shareData = {
      title: `Feeling Snap: ${ARTICLE_INFO.title}`,
      text: '선명하지 않아도 괜찮은 오늘의 기록.',
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

  // 저장 기능
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
          className="h-full bg-gradient-to-r from-slate-400 to-slate-900 dark:from-slate-600 dark:to-white transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1">
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
              <span className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-300 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-slate-100 dark:border-slate-700">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              무채색의 감정이 주는 위로: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-800 dark:from-slate-400 dark:to-slate-100">선명하지 않아도 괜찮은 이유</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-slate-400 pl-6 py-2">
              "컬러 사진이 세상의 겉모습을 보여준다면, 흑백 사진은 사물의 본질과 그림자를 드러냅니다."
            </p>

            <p className="break-keep">
              우리는 강렬한 자극의 시대에 살고 있습니다. SNS 피드는 원색의 화려한 성공과 자극적인 슬픔, 선명한 분노로 가득 차 있습니다. 이러한 환경 속에서 우리는 무의식중에 '선명하지 않은 감정'은 가치가 없거나, 혹은 해결해야 할 문제라고 치부해 버리곤 합니다. 하지만 우리의 내면을 가만히 들여다보십시오. 기쁜 것도 아니고 슬픈 것도 아닌, 그저 그런 상태, 모호하고 뿌연 안개 같은 기분들이 우리 삶의 더 많은 면적을 차지하고 있지 않나요?
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24">1. 감정 입자도와 모호함의 가치</h3>
            <p className="break-keep">
              심리학자 리사 펠드먼 배럿은 자신의 감정을 세밀한 단어로 구분하는 능력을 '감정 입자도(Emotional Granularity)'라고 명명했습니다. 물론 내 마음을 정확히 정의하는 것은 중요합니다. 하지만 때로는 어떤 단어로도 포착되지 않는 '무채색의 정서' 자체가 가장 정직한 상태일 때가 있습니다. 
            </p>
            <p className="break-keep">
              정의할 수 없다는 것은 틀린 것이 아니라, 아직 현상되지 않은 필름처럼 무한한 가능성을 품고 있다는 뜻이기도 합니다. Feeling Snap은 당신에게 억지로 감정의 이름표를 붙이라고 강요하지 않습니다. 이름 붙지 않은 채 흐릿하게 일렁이는 그 마음 자체를 하나의 스냅으로 존중합니다.
            </p>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 my-16">
              <Wind className="text-slate-400 mb-6" size={32} />
              <h4 className="text-xl font-black text-slate-700 dark:text-slate-300 mb-4">낮은 채도의 구간이 필요한 이유</h4>
              <p className="text-base leading-relaxed dark:text-slate-400 italic">
                폭풍우가 지나간 뒤의 회색빛 하늘이 묘한 안정감을 주듯, 우리의 마음도 낮은 채도의 구간을 지날 때 진정한 휴식을 얻습니다. 강렬한 색채(감정)는 필연적으로 에너지를 소모시키기 때문입니다. 무채색은 정지가 아니라, 다음 도약을 위한 '비축'의 시간입니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">2. 흑백 사진이 주는 미학적 위로</h3>
            <p className="break-keep">
              사진 미학에서 흑백은 색채라는 정보의 간섭을 제거하고 피사체의 선(Line), 형태(Shape), 그리고 빛과 그림자의 대비(Contrast)에 집중하게 만듭니다. 우리 마음도 마찬가지입니다. '기쁘다', '슬프다'는 선명한 색깔을 잠시 걷어내면, 그동안 보이지 않았던 내 마음의 골격과 그림자가 보이기 시작합니다. 
            </p>
            <p className="break-keep">
              담담하고 무덤덤한 상태에서 우리는 비로소 객관적으로 자신을 바라볼 수 있습니다. 억지로 행복한 척 고채도의 필터를 씌우지 마세요. 있는 그대로의 노이즈와 흔들림, 그리고 빛이 부족해 거칠어진 입자들까지도 당신의 소중한 일부입니다. Feeling Snap의 기록은 해석이 아니라 '현상'이어야 합니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Camera className="text-slate-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "가장 진실된 기록은 <br/>색을 더하는 것이 아니라, <br/>거짓된 색을 덜어내는 과정에서 태어납니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">3. 무채색 스냅: 담담한 기록의 힘</h3>
            <p className="break-keep">
              Feeling Snap에 담담한 기록을 남겨보세요. 특별한 사건이 없어도, 대단한 깨달음이 없어도 좋습니다. "오늘은 그저 그런 날이었다", "마음이 조금 가라앉아 있다"는 짧은 기록은 훗날 당신의 인생 앨범에서 가장 편안한 '쉼표'가 되어줄 것입니다. 
            </p>
            <p className="break-keep">
              선명한 감정들은 시간이 지나면 그 맥락이 희미해지기 쉽지만, 무채색의 기록은 당시의 분위기와 공기를 그대로 보존합니다. 마치 오래된 흑백 사진이 세월이 흘러도 변치 않는 깊이를 갖는 것과 같습니다. 오늘 당신의 마음이 어떤 색인지 모르겠다면, 그냥 그 모호함을 사랑해 주세요. 그 모호함이야말로 당신이 가장 평화롭게 쉬고 있다는 증거일지도 모릅니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 있는 그대로의 셔터를 누르세요</h3>
            <p className="break-keep">
              완벽한 사진을 찍으려 노력하지 마세요. 우리 삶은 때로 초점이 맞지 않고, 조명이 어둡기도 합니다. 하지만 그 모든 결함이 모여 '나'라는 고유한 작품을 만듭니다. 지금 당신의 마음이 무채색이라면, 그 고요하고 담백한 상태를 기꺼이 즐기시길 바랍니다. Feeling Snap은 당신의 모든 명도와 채도를 응원합니다.
            </p>

            {/* 감성 가이드 박스 */}
            <div className="grid grid-cols-1 gap-6 mt-24">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#1A1F2C] dark:to-[#0A0F1C] text-slate-800 dark:text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-400 blur-[100px] opacity-20"></div>
                <p className="text-slate-500 dark:text-slate-400 font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                   Monochrome Practice
                </p>
                <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-slate-800/10 dark:bg-white/10 flex items-center justify-center shrink-0"><Layers size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">무감각 수용하기</p>
                       <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">아무런 느낌이 없는 상태를 '공허함'이 아닌 '평온함'으로 재정의해 보세요.</p>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-slate-800/10 dark:bg-white/10 flex items-center justify-center shrink-0"><Music size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">적막의 사운드트랙</p>
                       <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">류이치 사카모토의 피아노 곡처럼 여백이 많은 음악을 감상하며 기록해 보세요.</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-8 md:p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 group hover:border-slate-400 transition-all cursor-pointer">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-slate-600 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-4 text-slate-600 dark:text-slate-400 font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">선명하지 않아도 괜찮은 오늘,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">담담한 나의 지금 기록하기</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-[32px] font-black text-xl shadow-2xl hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              차분하게 기록하기 🌿
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}