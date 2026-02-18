'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  ZapOff, 
  CloudRain, 
  Moon, 
  Camera, 
  ChevronRight,
  Music,
  BatteryLow,
  ThermometerSnowflake
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "red-noise-anger", 
  title: "붉은 노이즈, 분노: 온도를 낮추는 감정의 조리개",
  category: "Burnout & Recovery",
  artNo: "06",
  nextId: "psychology-of-feeling-behind", 
  nextTitle: "나만 뒤처지는 것 같을 때의 심리학",
  charCount: "1,750",
  readTime: "18"
};

export default function ArticleSix() {
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
      text: '번아웃은 나태함이 아니라 당신의 뇌가 보내는 긴급 구조 신호입니다.',
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
          className="h-full bg-gradient-to-r from-orange-400 to-rose-500 transition-all duration-150"
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
              번아웃: 무기력이 보내는 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600 font-black">뇌의 긴급 구조 신호(SOS)</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-orange-400 pl-6 py-2">
              "당신이 멈춘 것은 나태함 때문이 아니라, 마음의 센서가 타버리지 않도록 뇌가 긴급하게 내린 '강제 종료'입니다."
            </p>

            <p className="break-keep">
              고성능 카메라로 뜨거운 태양 아래에서 너무 오랫동안 연사 촬영을 하다 보면, 어느 순간 <strong>'Overheated(과열)'</strong> 경고와 함께 전원이 꺼져버리곤 합니다. 기계 스스로가 이미지 센서를 보호하기 위해 내리는 고육지책이죠. 우리 삶의 **번아웃(Burnout)** 또한 이와 본질적으로 같습니다. 어느 날 갑자기 찾아온 지독한 무기력은 당신이 의지가 부족해서가 아니라, 당신의 정서적 에너지가 바닥나 뇌가 긴급하게 내린 '강제 휴식' 명령입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <BatteryLow className="text-orange-500" size={32} />
              1. 열정이라는 이름의 과다 노출
            </h3>
            <p className="break-keep">
              심리학에서는 번아웃을 '에너지 고갈, 업무에 대한 거리감, 효율성 저하'의 상태로 정의합니다. 하지만 사진의 관점에서 보면 이는 **'과다 노출(Over-exposure)'** 상태에 가깝습니다. 우리는 종종 '열심히'라는 강렬한 조명 아래 스스로를 너무 오랫동안 세워둡니다. 완벽한 성과, 타인의 기대, 사회적 비교라는 조명은 우리 삶의 아름다운 디테일을 하얗게 날려버립니다(White-out). 
            </p>
            <p className="break-keep">
              번아웃은 이 과도한 빛에 노출된 뇌가 "더 이상은 아무런 감정도, 기억도 기록할 수 없어"라고 파업을 선언하는 것입니다. 이때 가장 위험한 행동은 무기력해진 자신을 자책하며 다시 억지로 전원을 켜려고 시도하는 것입니다. 열이 충분히 식지 않은 상태에서 다시 가동되는 기계는 결국 영구적인 손상을 입게 됩니다.
            </p>

            <div className="bg-orange-50 dark:bg-orange-950/20 p-10 rounded-[40px] border border-orange-100 dark:border-orange-900/30 my-16 relative overflow-hidden">
              <ZapOff className="absolute -right-4 -top-4 text-orange-200/50 dark:text-orange-800/20" size={120} />
              <h4 className="text-xl font-black text-orange-800 dark:text-orange-400 mb-4">냉각기 가이드: 뇌의 온도 낮추기</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                번아웃이 왔을 때 가장 먼저 해야 할 일은 '해상도 낮추기'입니다. 오늘 하루의 목표를 최소한으로 설정하세요. "양치질하기", "물 한 잔 마시기" 정도면 충분합니다. 뇌에 가해지는 처리 부하(Cognitive Load)를 줄여야 비로소 센서의 회복이 시작됩니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Moon className="text-orange-500" size={32} />
              2. 암실(Darkroom)의 시간: 회복의 미학
            </h3>
            <p className="break-keep">
              필름 사진이 온전한 형체를 갖추기 위해서는 반드시 어두운 암실에서의 시간이 필요합니다. 번아웃이 찾아왔을 때 우리에게 필요한 것도 바로 이 **'의도적인 어둠'**입니다. 아무것도 생산하지 않고, 누구의 기대도 충족시키지 않는 무위(無爲)의 시간이죠. 
            </p>
            <p className="break-keep">
              암실 속에서 필름이 서서히 상을 드러내듯, 우리 마음도 고요한 휴식 속에서만 회복의 에너지를 길어 올립니다. '저장하지 않는 순간'을 허용하세요. SNS를 끄고, 모든 것을 기록하고 의미 있게 만들려는 강박에서 벗어나야 합니다. 그냥 흘러가는 구름을 보거나 바람의 촉감을 느끼는 것, 그 목적 없는 시간이 당신의 심리적 센서를 다시 정렬해 줍니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <ThermometerSnowflake className="text-orange-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "번아웃은 당신이 실패한 것이 아니라, <br/>너무 멀리 왔기에 잠시 숨을 고르는 정거장에 도착한 것입니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Camera className="text-orange-500" size={32} />
              3. Feeling Snap: 희미한 빛부터 기록하기
            </h3>
            <p className="break-keep">
              번아웃 상태에서는 긴 글을 쓰거나 깊은 생각을 하는 것조차 큰 고통이 될 수 있습니다. 그럴 때는 **Feeling Snap**에 아주 작은 감각 하나만 남겨보세요. "차가운 공기가 시원하다", "방 안의 그림자가 어둡다" 같은 아주 짧은 물리적 관찰만으로도 충분합니다. 
            </p>
            <p className="break-keep">
              이러한 사소한 기록들은 뇌에게 "아직 감각 센서가 살아있다"는 신호를 보냅니다. 감정의 온도가 너무 높거나 낮을 때, 수치로 그 온도를 남겨보세요. 객관화된 수치는 막연한 무기력의 공포로부터 당신을 분리해 줍니다. 이 작은 스냅들이 모여 뇌 센서의 감도를 서서히 회복시키고, 다시 세상을 선명하게 바라볼 에너지를 만들어 줄 것입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 다시 선명해질 당신을 믿으세요</h3>
            <p className="break-keep">
              지금 무기력의 늪에 빠져 있다면, 그것은 당신이 그동안 누구보다 뜨겁게 살아왔다는 영광스러운 훈장과도 같습니다. 충분히 식히고, 충분히 어두워지세요. 암실의 시간이 지나면 당신의 삶이라는 필름에는 이전보다 훨씬 깊고 풍부한 계조(Gradation)의 사진이 인화될 것입니다. 당신의 셔터가 다시 경쾌하게 울릴 그날은 반드시 옵니다.
            </p>

            {/* 추천 사운드트랙 */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[40px] border border-slate-100 dark:border-slate-800 space-y-6 mt-16">
              <div className="flex items-center gap-3 text-orange-600">
                <Music size={20} />
                <p className="font-black text-sm uppercase tracking-widest">Soundtrack for Rest</p>
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-base space-y-4 font-bold">
                <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span>Max Richter - Sleep</span>
                  <span className="text-xs opacity-50 font-mono">뇌의 이완을 돕는 현대 자장가</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span>Sigur Rós - Untitled #1 (Vaka)</span>
                  <span className="text-xs opacity-50 font-mono">세상의 소음을 차단하는 선율</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-10 rounded-[50px] bg-[#1A1F2C] text-white group hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
               <CloudRain size={200} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block relative z-10">
              <h4 className="text-2xl font-black leading-tight group-hover:text-orange-400 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-6 text-white font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <BatteryLow className="mx-auto mb-6 text-orange-300" size={32} />
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">지친 마음을 위한 가장 따뜻한 휴식,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">지금은 잠시 전원을 꺼두어도 좋습니다.</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-orange-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(234,88,12,0.3)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              내 마음 쉬게 해주기 ☁️
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}