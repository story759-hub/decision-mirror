'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Layers, 
  Film, 
  ZapOff, 
  Sparkles, 
  ChevronRight,
  Music,
  Heart
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "filter-of-perfectionism", 
  title: "완벽주의라는 필터: 때로는 노이즈가 아름답다",
  category: "Perfectionism",
  artNo: "08",
  nextId: "mind-shutter-speed", 
  nextTitle: "마음의 셔터 스피드: 느리게 감각할 때 찍히는 것들",
  charCount: "1,540",
  readTime: "14"
};

export default function ArticleEight() {
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
      text: '완벽하지 않아도 괜찮아요. 당신의 노이즈는 살아있음의 증거입니다.',
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
          className="h-full bg-gradient-to-r from-amber-200 to-amber-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-amber-600 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-amber-600 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-[#E91E63] scale-110' : 'text-slate-400 hover:text-amber-600'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-[#E91E63]' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-amber-100 dark:border-amber-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              완벽주의라는 필터: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">노이즈가 만드는 삶의 질감</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-amber-400 pl-6 py-2">
              "완벽함은 마침표이지만, 불완전함은 이음표입니다. 그 틈이 있어야 비로소 타인의 마음과 연결될 수 있습니다."
            </p>

            <p className="break-keep">
              최신형 스마트폰 카메라는 인공지능을 통해 사진의 잡티를 지우고, 피부를 매끈하게 보정하며, 가장 이상적인 채도를 찾아줍니다. 하지만 역설적이게도 수많은 사람들은 여전히 거친 입자가 살아있는 필름 사진이나 노이즈가 가득 섞인 빈티지 카메라에 열광하곤 하죠. 왜 우리는 그토록 '불완전한 시각'을 그리워할까요? 그 답은 간단합니다. 매끄러운 완벽함에는 '이야기'와 '시간의 숨결'이 생략되어 있기 때문입니다. 삶의 **완벽주의(Perfectionism)** 또한 이와 놀랍도록 닮아 있습니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24">1. 과도한 보정이 숨기는 생명력</h3>
            <p className="break-keep">
              우리는 실수 없는 하루, 오점 없는 경력, 흐트러짐 없는 감정 상태를 지향하며 스스로에게 가혹한 필터를 들이댑니다. 하지만 심리학에서 말하는 건강한 적응은 완벽함이 아니라 '회복 탄력성'에 기반합니다. 모든 잡티를 지워버린 얼굴이 평면적이고 생경하게 보이듯, 고통과 실수를 모두 배제하려는 노력은 오히려 우리 삶의 입체감을 소거해버립니다. 
            </p>
            <p className="break-keep">
              완벽주의라는 필터는 우리를 '좋아 보이는 상태'로 박제할 수는 있지만, 진짜로 '살아있는 상태'로 만들지는 못합니다. 인간미 넘치는 매력은 매끄러운 표면이 아니라, 예기치 못한 균열과 거친 질감 사이에서 피어나는 법입니다. 당신의 서투름은 교정 대상이 아니라, 당신이라는 고유한 피사체를 설명하는 핵심 디테일입니다.
            </p>

            <div className="bg-amber-50 dark:bg-amber-950/20 p-10 rounded-[40px] border border-amber-100 dark:border-amber-900/30 my-16">
              <Layers className="text-amber-500 mb-6" size={32} />
              <h4 className="text-xl font-black text-amber-700 dark:text-amber-400 mb-4">완벽주의 필터를 벗겨낼 때 생기는 일</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                성공한 모습만 기록하려 하면 '기록'은 숙제가 되지만, 실수와 좌절을 있는 그대로 담기 시작하면 '기록'은 비로소 성장이 됩니다. 오늘 당신의 일기에 노이즈를 허락해 보세요.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">2. 노이즈: 한계를 넘어서는 순간의 흔적</h3>
            <p className="break-keep">
              사진에서 노이즈(Noise)는 대개 빛이 턱없이 부족한 환경에서 억지로 이미지를 만들어낼 때 발생합니다. 우리 삶의 노이즈도 마찬가지입니다. 우리가 역량의 한계에 부딪혔을 때, 부족한 자원 속에서도 무언가를 끝내 해내려 애쓸 때 '실수'와 '서투름'이라는 노이즈가 남습니다. 
            </p>
            <p className="break-keep">
              따라서 노이즈는 실패의 증거가 아니라, 당신이 그만큼 어둠 속에서도 셔터를 누르려 애썼다는 '투쟁의 훈장'입니다. 사진에 일부러 거친 그레인(Grain) 입자를 넣어 고유한 분위기를 살리듯, 당신의 작은 결점들은 훗날 삶의 '인간미'라는 멋진 텍스처로 현상될 것입니다. RAW 데이터처럼 보정되지 않은 날 것 그대로의 감정을 수용할 때, 당신의 서사는 비로소 독보적인 깊이를 가집니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Film className="text-amber-500" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "가장 당신다운 색깔은 <br/>완벽한 보정 너머에 있습니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">3. Feeling Snap: 보정 없는 진솔한 인화</h3>
            <p className="break-keep">
              기록을 망설이는 가장 큰 이유는 "멋진 문장을 써야 한다"는 완벽주의의 압박 때문입니다. 하지만 **Feeling Snap**은 당신에게 세련된 필터를 요구하지 않습니다. 오히려 오늘 느낀 찌질함, 말로 다 설명 못 할 서운함, 정돈되지 않은 날 것의 기쁨을 그대로 인화하기를 바랍니다. 
            </p>
            <p className="break-keep">
              그 거친 노이즈들이 쌓였을 때, 당신의 사진첩은 비로소 누구도 흉내 낼 수 없는 '빈티지 명작'이 됩니다. 기록은 예쁘게 꾸미는 것이 아니라, 있는 그대로를 '직면'하는 용기입니다. 완벽주의라는 무거운 필터를 한 꺼풀 벗겨내고, 오늘 당신 삶에 섞여 들어온 소중한 노이즈들을 사랑해 보세요. 그 서투른 흔적들이 모여 가장 진실된 '나'를 완성할 테니까요.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 셔터를 누르는 용기</h3>
            <p className="break-keep">
              빛이 부족해도, 구도가 조금 엉망이어도 괜찮습니다. 중요한 것은 당신이 그 찰나를 '기록하기로 선택했다'는 주체적인 사실입니다. 완벽한 한 장을 위해 셔터를 아끼는 사람보다, 수만 장의 노이즈 섞인 사진 속에서 삶의 진실을 발견하는 사람이 훨씬 더 풍요로운 인생을 삽니다. 오늘 당신의 투박한 기록 한 줄이, 훗날 당신을 가장 따뜻하게 안아줄 스냅 사진이 될 것임을 믿으세요.
            </p>

            {/* 감성 가이드 박스 */}
            <div className="grid grid-cols-1 gap-6 mt-24">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-amber-900 to-[#0F172A] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 blur-[100px] opacity-20"></div>
                <p className="text-amber-400 font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                   Lo-fi Living Practice
                </p>
                <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><ZapOff size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">'대충'의 미학</p>
                       <p className="text-sm text-amber-100/70 leading-relaxed">오늘 하루 중 가장 잘하고 싶은 일 하나를 의도적으로 80%의 힘으로만 해보세요.</p>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Music size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">빈티지 사운드트랙</p>
                       <p className="text-sm text-amber-100/70 leading-relaxed">LP 특유의 지지직거리는 소리가 섞인 로파이(Lo-fi) 음악을 들으며 마음을 이완하세요.</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-8 md:p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 group hover:border-amber-500/30 transition-all cursor-pointer">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-amber-600 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-4 text-amber-600 font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">보정 없이 진솔한 당신의 오늘을 위해,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">날 것 그대로의 나 기록하기</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-slate-900 dark:bg-amber-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(245,158,11,0.2)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              투박하게 기록하기 🎞️
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}