'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Palette, 
  Sun, 
  Droplets, 
  Wind, 
  ChevronRight,
  Music,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "color-of-mind", 
  title: "마음의 채도: 당신의 하루는 어떤 색으로 인화되고 있나요?",
  category: "Emotional Color",
  artNo: "18",
  nextId: "analog-resilience", 
  nextTitle: "아날로그적 회복탄력성: 디지털 시대에 필름처럼 느리게 회복하는 법",
  charCount: "1,820",
  readTime: "21"
};

export default function ArticleEighteen() {
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
      text: '감정에도 색깔이 있습니다. 오늘 당신의 마음은 어떤 채도를 띠고 있나요?',
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
          className="h-full bg-gradient-to-r from-orange-400 to-amber-600 transition-all duration-150"
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
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-orange-600 scale-110' : 'text-slate-400 hover:text-orange-600'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-orange-600' : ''} />
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
              마음의 채도: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 font-black">당신은 어떤 색으로 인화되나요?</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-orange-400 pl-6 py-2">
              "세상에 나쁜 색은 없습니다. 다만 그 색이 품은 채도와 명도가 우리의 오늘을 다르게 정의할 뿐입니다."
            </p>

            <p className="break-keep">
              우리는 종종 자신의 감정을 '좋음' 혹은 '나쁨'이라는 두 가지 필터로만 분류하려 합니다. 하지만 감정은 그렇게 단순한 이진법으로 이루어져 있지 않습니다. 마치 사진의 색감이 미세한 틴트(Tint) 조절 하나로 완전히 달라지듯, 우리의 마음도 수천 가지의 색채 스펙트럼 위를 부유합니다. 슬픔 안에도 짙은 네이비색의 절망이 있는가 하면, 비 온 뒤의 하늘 같은 투명한 연보라색 그리움이 있듯이 말입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Palette className="text-orange-500" size={32} />
              1. 무채색의 시간: 휴식이 필요한 신호
            </h3>
            <p className="break-keep">
              유난히 아무런 의욕도 없고, 세상이 회색빛 필터를 씌운 듯 덤덤하게 느껴지는 날이 있습니다. 우리는 보통 이런 상태를 '무기력'이라 부르며 경계하죠. 하지만 색채학적 관점에서 무채색은 모든 색이 섞여 있거나, 혹은 새로운 색을 받아들이기 위해 캔버스를 비워낸 상태를 의미합니다.
            </p>
            <p className="break-keep">
              감정의 채도가 낮아졌다는 것은 당신의 심리 에너지가 외부가 아닌 내면으로 침잠하고 있다는 신호입니다. 이때 억지로 밝은색을 칠하려 애쓰지 마세요. 무채색의 기록은 그 자체로 의미가 있습니다. Feeling Snap에 "오늘은 아무런 색이 느껴지지 않는다"고 적는 것만으로도, 당신은 이미 다음 색을 맞이할 준비를 마친 셈입니다.
            </p>

            <div className="bg-orange-50 dark:bg-orange-950/20 p-10 rounded-[40px] border border-orange-100 dark:border-orange-900/30 my-16 relative overflow-hidden">
              <Sun className="absolute -right-4 -top-4 text-orange-200/50 dark:text-orange-800/20" size={120} />
              <h4 className="text-xl font-black text-orange-800 dark:text-orange-400 mb-4">화이트 밸런스(White Balance) 맞추기</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                조명에 따라 하얀색이 다르게 보이듯, 상황에 따라 우리의 가치관도 흔들립니다. 지금 당신의 마음이 유난히 차갑게(Blue) 느껴진다면, 잠시 따뜻한 기록의 광원(Amber) 아래로 자신을 옮겨보세요. Feeling Snap에 적는 따뜻한 단어 하나가 당신의 정서적 화이트 밸런스를 맞춰줄 것입니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Droplets className="text-orange-500" size={32} />
              2. 감정의 채도를 높이는 법: 작은 기쁨의 수집
            </h3>
            <p className="break-keep">
              삶의 채도를 높이는 것은 거창한 성공이 아닙니다. 아주 미세하지만 선명한 '점' 하나를 찍는 일에서 시작되죠. 오후 4시의 햇살이 닿은 찻잔의 테두리, 퇴근길에 마주친 길고양이의 눈동자, 혹은 좋아하는 음악의 첫 소절 같은 것들 말입니다.
            </p>
            <div className="space-y-4 my-8">
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center shrink-0 text-orange-600"><Wind size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>대비(Contrast)를 활용하세요:</strong> 힘든 순간이 있었다면, 아주 작은 기쁨도 평소보다 훨씬 선명하게 다가옵니다. 그 극명한 대비의 순간을 놓치지 말고 Feeling Snap에 기록하세요. 고통이 배경이 될 때 기쁨은 비로소 주인공이 됩니다.</p>
               </div>
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center shrink-0 text-orange-600"><Sparkles size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>고유 색채 발견하기:</strong> 당신은 파스텔 톤의 온화한 사람인가요, 아니면 원색의 강렬한 에너지를 가진 사람인가요? 기록이 쌓이면 당신만의 '정서적 퍼스널 컬러'가 드러납니다.</p>
               </div>
            </div>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Camera className="text-orange-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "가장 아름다운 사진은 화려한 색이 아니라, <br/>가장 정직한 노출로 찍힌 사진입니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Layers className="text-orange-500" size={32} />
              3. Feeling Snap: 당신의 색을 잃지 않기 위한 현상소
            </h3>
            <p className="break-keep">
              디지털 데이터와 달리 우리의 감정은 기록하지 않으면 시간이 지남에 따라 바래(Fade) 버립니다. Feeling Snap은 그 휘발되기 쉬운 마음의 채도를 고정하는 '정서적 현상소'입니다. 오늘 당신이 남긴 한 줄의 문장은 훗날 당신의 삶이 무채색으로 느껴질 때, 다시 색을 입힐 수 있는 소중한 색상표(Color Chart)가 되어줄 것입니다.
            </p>
            <p className="break-keep">
              지금 당신의 마음이 어떤 색인지 모르겠다면, 그냥 느껴지는 대로 단어를 나열해 보세요. "노란색처럼 따스한 피로함", "검푸른 바다 같은 고요함". 그렇게 이름을 붙여주는 순간, 모호했던 감정은 당신이 제어할 수 있는 선명한 색채로 인화됩니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 당신의 모든 색은 정답입니다</h3>
            <p className="break-keep">
              인생이라는 거대한 갤러리에 단 한 가지 색의 사진만 걸려 있다면 얼마나 지루할까요? 때로는 우울의 푸른색이, 때로는 분노의 붉은색이, 또 때로는 평온의 초록색이 어우러질 때 비로소 당신이라는 사람의 입체적인 전람회가 완성됩니다. 오늘 당신이 마주한 그 색깔을 있는 그대로 환영해 주세요. 그 모든 채도가 당신을 완성하는 빛의 조각들입니다.
            </p>

            {/* 추천 사운드트랙 */}
            <div className="p-8 bg-orange-50 dark:bg-orange-900/40 rounded-[40px] border border-orange-100 dark:border-orange-800 space-y-6 mt-16">
              <div className="flex items-center gap-3 text-orange-600">
                <Music size={20} />
                <p className="font-black text-sm uppercase tracking-widest">Soundtrack for Color of Mind</p>
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-base space-y-4 font-bold">
                <li className="flex justify-between items-center border-b border-orange-200 dark:border-orange-800 pb-2">
                  <span>Chet Baker - I Get Along Without You Very Well</span>
                  <span className="text-xs opacity-50 font-mono italic">푸른 우울을 우아하게 녹여내는 재즈</span>
                </li>
                <li className="flex justify-between items-center border-b border-orange-200 dark:border-orange-800 pb-2">
                  <span>Joe Hisaishi - Summer</span>
                  <span className="text-xs opacity-50 font-mono italic">청량한 에너지를 채워주는 노란색 선율</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-10 rounded-[50px] bg-gradient-to-br from-orange-600 to-amber-700 text-white group hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
               <Sun size={200} />
            </div>
            <p className="text-[10px] font-black text-orange-100/60 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block relative z-10">
              <h4 className="text-2xl font-black leading-tight group-hover:text-orange-100 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-6 text-white font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <Palette className="mx-auto mb-6 text-orange-400" size={32} />
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">당신만의 팔레트를 완성할 시간입니다.</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">오늘 당신의 마음은 어떤 색인가요?</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-orange-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(234,144,16,0.3)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              내 마음의 채도 기록하기 🎨
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}