'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Heart, 
  Users, 
  Focus, 
  Sparkles, 
  ChevronRight,
  Music
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "composition-of-relationships", 
  title: "관계의 구도: 적당한 거리가 만드는 선명함",
  category: "Relationship",
  artNo: "12",
  nextId: "burnout-overexposure", 
  nextTitle: "번아웃이라는 노출 오버: 다시 어둠이 필요할 때",
  charCount: "1,410",
  readTime: "12"
};

export default function ArticleTwelve() {
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
      text: '적당한 거리가 만드는 관계의 아름다움.',
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
          className="h-full bg-gradient-to-r from-rose-400 to-[#E91E63] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-rose-500 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-rose-500 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-[#E91E63] scale-110' : 'text-slate-400 hover:text-rose-500'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-[#E91E63]' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-rose-100 dark:border-rose-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              관계의 구도: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-[#E91E63]">가장 선명한 순간의 거리</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-rose-400 pl-6 py-2">
              "피사체에 너무 가까이 다가가면 초점은 무너집니다. 사람과 사람 사이에도 '최단 초점 거리'가 필요합니다."
            </p>

            <p className="break-keep">
              카메라 렌즈에는 **'최단 초점 거리'**라는 물리적 한계가 존재합니다. 렌즈가 피사체에 너무 바짝 다가가는 순간, 정교하게 설계된 유리알들은 초점을 잡지 못하고 방황하며 결국 화면 전체를 뿌연 안개처럼 흐려버리고 맙니다. 인간관계 역시 이와 놀랍도록 닮아 있습니다. 우리는 흔히 사랑할수록, 친밀할수록 더 가까이 밀착해야 한다고 믿지만, 실상은 너무 가까워지는 그 지점에서 관계의 해상도가 급격히 떨어지곤 합니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24">1. 클로즈업의 함정: 잡티만 보이는 시선</h3>
            <p className="break-keep">
              누군가에게 과도하게 밀착될 때, 우리는 상대의 전체적인 인품과 삶의 궤적 대신 아주 사소한 단점이라는 '잡티'에만 시선을 고정하게 됩니다. 매크로 렌즈로 피부를 촬영하면 보이지 않던 모공이 거대하게 드러나듯, 적당한 여백이 사라진 관계에서는 상대의 사소한 습관이나 실수가 견딜 수 없는 결함으로 다가오기 마련입니다. 
            </p>
            <p className="break-keep">
              또한 밀착된 관계에서는 '나'라는 주체의 수평이 무너집니다. 상대의 감정 기복이 곧 나의 기복이 되고, 상대의 그림자가 나의 시야 전체를 가려버리죠. 관계의 숨통을 틔워주는 것은 무조건적인 가까움이 아니라, 한 걸음 뒤로 물러나 상대를 하나의 독립된 풍경으로 바라볼 수 있는 '여백의 구도'입니다.
            </p>

            <div className="bg-rose-50 dark:bg-rose-950/20 p-10 rounded-[40px] border border-rose-100 dark:border-rose-900/30 my-16">
              <Focus className="text-rose-500 mb-6" size={32} />
              <h4 className="text-xl font-black text-rose-700 dark:text-rose-400 mb-4">당신의 관계는 지금 '핀트'가 맞나요?</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                갈등은 대개 '거리 조절 실패'에서 옵니다. 상대가 나의 기대를 채워주지 않는다면, 그것은 상대의 잘못이 아니라 내가 너무 가까이 다가가 그 사람의 전신(Full Shot)을 보지 못하고 있기 때문일지도 모릅니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">2. 황금 분할: 나와 타인의 조화로운 배치</h3>
            <p className="break-keep">
              사진학의 '황금 분할(Rule of Thirds)'은 피사체를 화면 정중앙이 아닌 선상에 배치할 때 가장 안정감 있고 풍성한 이야기를 만든다고 가르칩니다. 관계에서도 마찬가지입니다. 내 삶의 프레임 한가운데에 타인을 세워두지 마세요. 나를 중심에 두면서도, 타인이 자신만의 고유한 배경 속에서 빛날 수 있도록 적절한 위치를 내어주는 지혜가 필요합니다.
            </p>
            <p className="break-keep">
              이러한 '건강한 경계(Boundaries)'는 단절이 아닙니다. 오히려 상대를 가장 오랫동안, 그리고 가장 선명하게 관찰하고 존중할 수 있는 '최적의 관람 거리'를 확보하는 행위입니다. 상대의 과거와 환경을 있는 그대로의 '배경 풍경'으로 인정할 때, 비로소 관계의 디테일은 살아나고 불필요한 노이즈는 사라집니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Sparkles className="text-rose-500" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "가장 아름다운 풍경은 <br/>언제나 한 걸음 뒤에서 시작됩니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">3. Feeling Snap: 관계의 온도와 수평 조절</h3>
            <p className="break-keep">
              대인관계에서 피로감을 느낀다면, 잠시 **Feeling Snap**을 켜고 현재 당신이 맺고 있는 관계의 구도를 점검해 보세요. 내가 너무 그 사람의 초점에만 매몰되어 내 삶의 수평을 잃어버리지는 않았는지, 혹은 반대로 너무 무관심하여 피사체를 프레임 밖으로 방치하고 있지는 않은지 말입니다. 
            </p>
            <p className="break-keep">
              나의 감정 상태를 정기적으로 기록하는 것만으로도 뜨겁게 과열된 관계의 센서를 식힐 수 있습니다. 기록은 주관적인 감정의 소용돌이에서 벗어나 '관찰자'의 시점을 갖게 해주기 때문입니다. 다시금 선명하고 따뜻한 구도를 찾아갈 수 있는 힘은, 역설적이게도 잠시 그 관계로부터 눈을 떼고 나 자신의 내면을 기록할 때 생겨납니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 각자의 빛을 존중하는 거리</h3>
            <p className="break-keep">
              밤하늘의 별들이 아름다운 이유는 서로 아득히 멀리 떨어져 각자의 자리를 지키고 있기 때문입니다. 만약 별들이 너무 가까이 뭉쳐 있었다면, 우리는 밤하늘의 그 장엄한 질서를 결코 보지 못했을 것입니다. 우리도 마찬가지입니다. 각자의 고유한 영혼이 숨 쉴 수 있는 그 '적당한 거리'를 허락하십시오. 
            </p>
            <p className="break-keep">
              너무 가까워 서로를 할퀴지 않고, 너무 멀어 차갑게 식지 않는 그 지점에서 당신의 인간관계는 가장 선명하고 따뜻한 스냅으로 인화될 것입니다. 오늘 당신의 렌즈 앞에 있는 소중한 사람을 위해, 기꺼이 한 걸음 물러나 주는 여백의 사랑을 실천해 보세요.
            </p>

            {/* 감성 가이드 박스 */}
            <div className="grid grid-cols-1 gap-6 mt-24">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#1A1F2C] to-[#0A0F1C] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500 blur-[100px] opacity-20"></div>
                <p className="text-rose-500 font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                   Harmony Practice
                </p>
                <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Users size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">관계의 환기</p>
                       <p className="text-sm text-slate-400 leading-relaxed">일주일에 하루는 '나만의 프레임'을 위해 타인과의 연락을 최소화해 보세요.</p>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Music size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">조화의 사운드트랙</p>
                       <p className="text-sm text-slate-400 leading-relaxed">Kings of Convenience의 곡들처럼 잔잔하고 편안한 선율과 함께 구도를 정리해 보세요.</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-8 md:p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 group hover:border-rose-500/30 transition-all cursor-pointer">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-rose-600 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-4 text-rose-600 font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">가장 선명하게 사랑하는 방법,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">건강한 거리 유지하며 기록하기</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-slate-900 dark:bg-rose-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(225,29,72,0.3)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              조화롭게 기록하기 🌷
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}