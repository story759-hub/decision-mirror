'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Heart, 
  Sparkles, 
  Maximize, 
  Focus, 
  ChevronRight,
  Music,
  Smile,
  Eye
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "snap-of-self-compassion", 
  title: "자기 위로의 스냅: 나에게 포커스를 맞추는 법",
  category: "Self-Compassion",
  artNo: "14",
  nextId: "portfolio-of-my-life", 
  nextTitle: "내 인생의 포트폴리오: 매 순간이 작품이 된다",
  charCount: "1,780",
  readTime: "19"
};

export default function ArticleFourteen() {
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
      text: '당신은 당신 인생이라는 모든 프레임에서 단 하나의 주인공입니다.',
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
          className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-sky-600 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-sky-600 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-sky-600 scale-110' : 'text-slate-400 hover:text-sky-600'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-sky-600' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-sky-100 dark:border-sky-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              자기 위로의 스냅: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-700 font-black">세상의 소음을 끄는 단렌즈</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-sky-400 pl-6 py-2">
              "타인을 비추던 광각 렌즈를 거두고, 오직 당신이라는 본질에만 집중하는 단렌즈를 꺼내야 할 시간입니다."
            </p>

            <p className="break-keep">
              우리는 하루에도 수십 번씩 타인의 기대와 사회적 기준이라는 무거운 '광각 렌즈'로 스스로를 촬영합니다. 렌즈에 걸리는 풍경이 너무 많아질수록, 정작 주인공이어야 할 '나'는 배경 속에 묻혀버립니다. "남들은 벌써 저만큼 가 있는데", "내가 지금 충분히 잘하고 있는 걸까?"라는 질문들은 우리를 인생의 주인공이 아닌, 타인의 삶을 관찰하고 평가하는 방관자로 전락시킵니다. 진정한 **자기 위로(Self-Compassion)**는 이 거추장스러운 광각의 풍경을 과감히 날려버리고, 오직 나라는 존재 하나에만 깊게 초점을 맞추는 것에서 시작됩니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Focus className="text-sky-500" size={32} />
              1. 포커스(Focus): 비판이 아닌 관찰의 미학
            </h3>
            <p className="break-keep">
              카메라 렌즈의 초점을 맞출 때, 우리는 피사체를 '심판'하지 않습니다. 피사체가 못생겼다고 비난하거나 왜 거기 있느냐고 따지지 않죠. 그저 그 형태가 선명해질 때까지 조심스럽게 초점 링을 돌릴 뿐입니다. 우리 자신을 대하는 방식도 이와 같아야 합니다. "왜 이것밖에 못 했어?"라는 날 선 비판의 셔터를 누르기 전에, "지금 내가 많이 지쳐 있구나", "지금 내 마음이 불안해서 흔들리고 있구나"라며 자신의 상태를 있는 그대로 **'포착(Capture)'**하세요. 관찰은 비판보다 훨씬 따스하며, 그 자체로 치유의 시작이 됩니다.
            </p>

            <div className="bg-sky-50 dark:bg-sky-950/20 p-10 rounded-[40px] border border-sky-100 dark:border-sky-900/30 my-16 relative overflow-hidden">
              <Maximize className="absolute -right-4 -top-4 text-sky-200/50 dark:text-sky-800/20" size={120} />
              <h4 className="text-xl font-black text-sky-800 dark:text-sky-400 mb-4">자기 위로의 아웃포커싱 기술</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                인물 사진의 백미는 배경을 부드럽게 날리는 것입니다. 주변의 소음이 너무 크다면 마음의 조리개를 최대치(f/1.4)로 개방하세요. 타인의 시선, 어제의 후회, 내일의 불안이라는 배경을 뿌옇게 흐릿하게 처리하고, 오직 '지금 이 순간의 나'라는 피사체에만 모든 광량을 집중시키는 연습이 필요합니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Eye className="text-sky-500" size={32} />
              2. 피사계 심도: 나를 돋보이게 하는 다정함
            </h3>
            <p className="break-keep">
              자기 위로는 자신을 응석받이로 만드는 것이 아닙니다. 오히려 나를 가장 공정하게 바라보는 일입니다. 우리는 타인의 실수에는 관대하면서도 자신의 작은 흠집에는 현미경을 들이댑니다. 이제 그 렌즈를 바꾸어야 합니다. 
            </p>
            <div className="space-y-4 my-8">
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4">
                  <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center shrink-0 text-sky-600"><Sparkles size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>다정한 셀프 피드백:</strong> 사진을 찍은 후 좋은 점을 먼저 골라내듯, 오늘 당신이 견뎌낸 시간 속에서 칭찬할 구석을 단 하나라도 찾아 Feeling Snap에 기록하세요. "오늘 제시간에 일어난 나, 참 대견해" 같은 사소함이 강력한 위로가 됩니다.</p>
               </div>
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4">
                  <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 rounded-full flex items-center justify-center shrink-0 text-sky-600"><Heart size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>심리적 노이즈 억제:</strong> 세상이 던지는 평가라는 디지털 노이즈를 과감히 차단하세요. 당신의 가치는 타인의 셔터 속도가 아닌, 당신이 간직한 고유한 명도와 채도에 의해 결정됩니다.</p>
               </div>
            </div>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Sparkles className="text-sky-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "당신은 누군가의 배경이 되기 위해 태어난 것이 아닙니다. <br/>인생이라는 모든 프레임에서 당신은 유일한 주인공입니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Smile className="text-sky-500" size={32} />
              3. Feeling Snap: 미래의 나를 위한 선물
            </h3>
            <p className="break-keep">
              <strong>Feeling Snap</strong>에 남기는 다정한 문장들은 단순한 데이터가 아닙니다. 그것은 훗날 당신이 다시 길을 잃거나 지쳤을 때 꺼내 볼 '미래의 나를 위한 인화지'입니다. 타인에게 보여주기 위한 화려한 보정은 필요 없습니다. 날 것 그대로의 감정을 인정하고, 그 감정을 가진 자신을 안아주는 기록을 남기세요.
            </p>
            <p className="break-keep">
              "오늘 밤의 너는 충분히 아름다워", "너의 속도는 절대 틀리지 않았어"라고 적힌 짧은 기록들이 쌓여 당신의 마음속에 가장 단단한 자존감의 앨범을 형성할 것입니다. 스스로를 위로할 줄 아는 사람은 타인의 셔터 소리에 휘둘리지 않습니다. 자신의 내면에 흐르는 빛의 양을 스스로 조절할 수 있기 때문입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 가장 소중한 피사체는 언제나 당신입니다</h3>
            <p className="break-keep">
              세상이 당신을 어떻게 인화하든, 당신의 렌즈만큼은 언제나 당신을 향한 다정함을 잃지 않아야 합니다. 오늘 밤, 잠들기 전 마음의 셔터를 조용히 눌러보세요. 거창한 성공이 없어도, 완벽한 하루가 아니어도 좋습니다. 존재 자체로 빛을 내뿜는 당신이라는 피사체를 가장 아름답게 기록하고 위로할 수 있는 사람은 오직 당신뿐이니까요.
            </p>

            {/* 추천 사운드트랙 */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[40px] border border-slate-100 dark:border-slate-800 space-y-6 mt-16">
              <div className="flex items-center gap-3 text-sky-600">
                <Music size={20} />
                <p className="font-black text-sm uppercase tracking-widest">Self-Care Soundtrack</p>
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-base space-y-4 font-bold">
                <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span>Sigur Rós - Hoppípolla</span>
                  <span className="text-xs opacity-50 font-mono italic text-right">내면의 순수함을 깨우는 웅장한 위로</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span>이적 - 걱정말아요 그대</span>
                  <span className="text-xs opacity-50 font-mono italic text-right">지나간 어제를 보듬는 따뜻한 선율</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-10 rounded-[50px] bg-[#1A1F2C] text-white group hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
               <Eye size={200} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block relative z-10">
              <h4 className="text-2xl font-black leading-tight group-hover:text-sky-400 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-6 text-white font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <Heart className="mx-auto mb-6 text-sky-400" size={32} />
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">누구보다 소중한 나를 위해,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">오늘의 나에게 다정한 말을 건네보세요.</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-sky-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(2,132,199,0.3)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              나를 위한 다정한 셔터 누르기 ✨
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}