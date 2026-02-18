'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Timer, 
  Wind, 
  Sun, 
  Sparkles, 
  ChevronRight,
  Music,
  Coffee
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "mind-shutter-speed", 
  title: "마음의 셔터 스피드: 느리게 감각할 때 찍히는 것들",
  category: "Slow Life & Mindfulness",
  artNo: "09",
  nextId: "developing-negative-emotions", 
  nextTitle: "부정적 감정의 현상법: 슬픔도 선명한 색깔이다",
  charCount: "1,560",
  readTime: "15"
};

export default function ArticleNine() {
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
      text: '당신의 삶에 필요한 것은 더 빠른 속도가 아니라 더 긴 셔터 스피드입니다.',
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
          className="h-full bg-gradient-to-r from-orange-300 to-orange-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-orange-600 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-orange-600 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-[#E91E63] scale-110' : 'text-slate-400 hover:text-orange-600'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-[#E91E63]' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-orange-100 dark:border-orange-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              마음의 셔터 스피드: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-800">느리게 찍어야 선명해지는 삶</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-orange-400 pl-6 py-2">
              "삶의 풍요로움은 얼마나 많은 순간을 스쳐 갔느냐가 아니라, 얼마나 깊은 빛을 마음의 필름에 담았느냐로 결정됩니다."
            </p>

            <p className="break-keep">
              스포츠 경기를 포착할 때 카메라는 8,000분의 1초라는 아주 찰나의 셔터 스피드를 사용합니다. 격렬한 움직임을 박제하듯 고정하기 위해서죠. 현대인의 일상도 이와 비슷합니다. 끝없이 쏟아지는 업무 메시지, 휘발되는 정보, 즉각적인 피드백의 요구 속에서 우리 마음의 셔터 스피드는 늘 한계치까지 올라가 있습니다. 모든 것을 '처리'하고 '찍어내느라' 바쁘지만, 역설적이게도 그 어떤 순간도 마음속 깊이 '인화'되지 못한 채 픽셀 조각처럼 흩어지고 맙니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24">1. 패스트 라이프의 저주: 흔적 없는 이미지</h3>
            <p className="break-keep">
              너무 빠른 셔터 스피드는 렌즈를 통해 들어오는 빛을 충분히 수용할 시간을 주지 않습니다. 마찬가지로 너무 빠르게 질주하는 삶은 우리의 감정이 마음의 센서에 닿아 고유한 울림과 무늬를 만들어낼 틈을 허락하지 않습니다. 
            </p>
            <p className="break-keep">
              어제 먹은 점심의 맛이 기억나지 않고, 오늘 아침 출근길에 느꼈던 설렘이나 불안의 기원이 모호한 이유는 우리가 그 순간을 너무 '빨리' 찍고 넘어가 버렸기 때문입니다. 충분한 빛(감정)이 담기지 않은 삶은 노이즈가 가득하고 어둡습니다. 우리는 더 많은 경험을 갈구하지만, 정작 필요한 것은 경험의 양이 아니라 그 경험이 내 안에서 숙성될 수 있는 **'노출의 시간'**입니다.
            </p>

            <div className="bg-orange-50 dark:bg-orange-950/20 p-10 rounded-[40px] border border-orange-100 dark:border-orange-900/30 my-16">
              <Timer className="text-orange-500 mb-6" size={32} />
              <h4 className="text-xl font-black text-orange-800 dark:text-orange-400 mb-4">셔터를 열어두는 연습 (Long Exposure)</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                밤바다의 파도를 장노출로 찍으면 눈에는 보이지 않던 안개 같은 물결의 질감이 담깁니다. 우리 삶도 셔터(주의력)를 오랫동안 열어둘 때, 일상의 거친 표면 아래 숨겨진 평온한 진실이 모습을 드러냅니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">2. 장노출(Long Exposure): 잔상이 주는 아름다움</h3>
            <p className="break-keep">
              별의 궤적을 담기 위해 사진가는 몇 시간 동안 카메라를 고정하고 기다립니다. 우리 마음에도 이런 '기다림의 기록'이 필요합니다. 하나의 감정을 성급하게 결론짓지 않고 오랫동안 응시하는 연습 말입니다. 슬픔이 찾아왔을 때 그것을 즉시 지워야 할 오류로 치부하지 않고, 그 슬픔의 잔상이 내 삶의 구도를 어떻게 바꾸는지 가만히 지켜보는 것. 이것이 바로 마음의 장노출 촬영입니다.
            </p>
            <p className="break-keep">
              빠른 셔터로는 포착할 수 없는 '여운'과 '잔상'은 오직 시간을 들여 천천히 감각하는 이들에게만 허락되는 예술적 보상입니다. 효율성이라는 이름으로 감정의 셔터 스피드를 높이지 마세요. 가끔은 아무것도 하지 않은 채, 그저 흘러가는 마음의 풍경에 조리개를 활짝 열어두는 것만으로도 영혼은 깊게 정화됩니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Wind className="text-orange-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "가장 선명한 기억은 <br/>가장 느린 호흡에서 태어납니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">3. Feeling Snap: 일상의 속도에 거는 브레이크</h3>
            <p className="break-keep">
              **Feeling Snap**에 기록을 남기는 행위는 그 자체로 마음의 셔터 스피드를 늦추는 행위입니다. "지금 내 기분이 어떠지?"라고 스스로에게 묻는 10초의 시간은, 무섭게 폭주하던 일상의 관성에 브레이크를 걸어줍니다. 
            </p>
            <p className="break-keep">
              단순히 기분을 기록하는 것을 넘어, 그 기분이 내 몸의 어디를 통과하고 있는지, 어떤 색채를 띠고 있는지 문장으로 옮겨보세요. 빠르게 증발하던 감정을 텍스트라는 인화지에 고정하는 과정에서, 당신의 마음 센서에는 비로소 따뜻하고 선명한 빛의 궤적이 남기 시작합니다. 이렇게 쌓인 기록들은 당신이 삶을 '소비'하는 존재가 아니라 '창조'하는 기록자임을 증명해 줄 것입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 느리게 감각할 용기</h3>
            <p className="break-keep">
              오늘 하루, 너무 많은 장면을 '순간 삭제'하며 지나치지는 않았나요? 잠시 멈춰 서서 마음의 셔터를 천천히 눌러보세요. 세상이 당신에게 보내는 아주 미세한 기쁨과 평온의 파장이 당신의 필름에 충분히 스며들 수 있도록 말이죠. 그렇게 느린 호흡으로 찍힌 한 장의 스냅은, 수만 장의 빠른 사진보다 훨씬 오랫동안 당신의 삶을 지탱하는 따뜻한 배경이 되어줄 것입니다.
            </p>

            {/* 슬로우 라이프 연습 가이드 */}
            <div className="grid grid-cols-1 gap-6 mt-24">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-orange-900 to-[#1A1F2C] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 blur-[100px] opacity-20"></div>
                <p className="text-orange-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                   Mindful Shutter Practice
                </p>
                <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Coffee size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">5분간의 조리개 개방</p>
                       <p className="text-sm text-orange-100/70 leading-relaxed">커피를 마시는 동안 스마트폰을 완전히 가리고, 오직 입술에 닿는 온기와 향기에만 주의를 고정하세요.</p>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Sun size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">잔상 기록하기</p>
                       <p className="text-sm text-orange-100/70 leading-relaxed">가장 강렬했던 감정의 순간으로부터 1시간 뒤에 그 감정이 남긴 '잔상'의 모양을 기록해 보세요.</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-8 md:p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 group hover:border-orange-500/30 transition-all cursor-pointer">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-orange-600 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-4 text-orange-600 font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">속도를 늦추고 삶을 깊이 인화하고 싶을 때,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">마음의 셔터를 천천히 내리기</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-slate-900 dark:bg-orange-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(249,115,22,0.2)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              천천히 인화하기 🕯️
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}