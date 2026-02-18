'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Thermometer, 
  Brain, 
  HeartHandshake, 
  Sparkles, 
  Lightbulb,
  Compass
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "mind-temperature", 
  title: "마음의 온도를 지키는 기술: 왜 기록이 최고의 심리적 방열판인가",
  category: "Psychology & Mental Health",
  artNo: "07",
  charCount: "1,620",
  readTime: "16"
};

export default function MindsetArticle() {
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
      text: '지금 당신의 마음 온도는 몇 도인가요? 기록으로 평온을 찾아보세요.',
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
          className="h-full bg-gradient-to-r from-[#E91E63] to-rose-400 transition-all duration-150"
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
              <span className="bg-rose-50 dark:bg-rose-950/30 text-[#E91E63] dark:text-rose-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-rose-100 dark:border-rose-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              마음의 온도를 지키는 기술: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-rose-600">왜 기록이 심리적 방열판인가</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-[#E91E63] pl-6 py-2">
              "체온은 1도만 변해도 몸에 비상이 걸리지만, 감정의 온도가 끓어넘치거나 얼어붙을 때 우리는 너무 자주 방관하곤 합니다."
            </p>

            <p className="break-keep">
              우리는 기온이 영하로 떨어지면 두꺼운 코트를 꺼내 입고, 영상 30도가 넘어가면 에어컨을 켭니다. 신체의 항상성을 유지하기 위해 외부 환경에 기민하게 반응하는 것이죠. 하지만 우리 내면의 **'감정 온도'**에 대해서는 얼마나 민감하게 반응하고 있나요? 심리학적 관점에서 인간의 정서에도 건강을 유지하기 위한 '적정 온도'가 존재합니다. 너무 뜨거운 분노는 나 자신을 태워버리고, 너무 차가운 무력감은 삶의 동력을 얼려버립니다.
            </p>

            <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-xl flex flex-col items-center justify-center text-center my-16 space-y-4">
               <Thermometer size={48} className="text-[#E91E63] animate-pulse" />
               <p className="text-xl font-black italic">"감정을 기록하는 것은 뜨거워진 뇌에 <br/> 냉각수를 주입하는 것과 같습니다."</p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Brain className="text-[#E91E63]" size={32} />
              1. 감정 명명의 뇌과학적 원리
            </h3>
            <p className="break-keep">
              우리가 극심한 스트레스를 느낄 때, 뇌의 '편도체(Amygdala)'는 비상벨을 울리며 과열되기 시작합니다. 이때 감정의 정체를 파악하지 못하면 뇌는 계속 비상 상태를 유지하며 스트레스 호르몬을 내뿜습니다. 하지만 "나는 지금 무시당했다는 느낌 때문에 화가 난다"라고 감정을 구체적인 단어로 정의(Labeling)하는 순간, 놀라운 일이 일어납니다. 
            </p>
            <p className="break-keep">
              이성적 사고를 담당하는 **'전두엽'**이 활성화되면서 편도체의 과잉 반응을 억제하기 시작하는 것이죠. 기록은 주관적인 감정의 폭풍 속에 있던 나를 '객관적인 관찰자'의 위치로 강제로 옮겨 놓습니다. 텍스트로 옮겨진 감정은 더 이상 나를 지배하는 주인이 아니라, 내가 관리하고 통제할 수 있는 '데이터'가 됩니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Sparkles className="text-[#E91E63]" size={32} />
              2. 기록이 만드는 '예측 가능한 평온'
            </h3>
            <p className="break-keep">
              감정 기록이 아카이브로 쌓이면 우리는 자신의 '정서적 패턴'을 발견하게 됩니다. 기상청이 매일의 날씨를 기록해 태풍을 예보하듯, 우리도 자신의 취약 시간대를 예측할 수 있게 됩니다. "나는 매주 목요일 오후가 되면 유독 온도가 차가워지는구나"라는 패턴을 인지하면, 그 시간에 따뜻한 차를 마시거나 가벼운 산책을 하는 등의 '심리적 방한 대책'을 세울 수 있습니다.
            </p>

            <div className="bg-rose-50 dark:bg-rose-950/20 p-10 rounded-[40px] border border-rose-100 dark:border-rose-900/30 my-16 relative overflow-hidden">
              <Lightbulb className="absolute -right-4 -top-4 text-rose-200/50 dark:text-rose-800/20" size={120} />
              <h4 className="text-xl font-black text-[#E91E63] mb-4">Feeling Snap Tip: 감정의 시각화</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                기록을 할 때 단순히 '슬프다'라고 하기보다 '영하 5도의 슬픔' 혹은 '80도의 분노'처럼 숫자로 환산해 보세요. 추상적인 고통이 구체적인 수치로 변하는 순간, 마음은 그것을 해결 가능한 문제로 인식하기 시작합니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white flex items-center gap-3">
              <HeartHandshake className="text-[#E91E63]" size={32} />
              3. 부정적인 감정을 '승화'시키는 법
            </h3>
            <p className="break-keep">
              부정적인 감정을 외면하거나 억누르면, 그 감정들은 마음 깊은 곳에서 고여 썩기 마련입니다. **Feeling Snap**을 통해 그늘진 감정을 포착하는 것은 그 감정을 내 삶의 일부로 인정하고 수용하는 과정입니다. 
            </p>
            <p className="break-keep">
              "지금 내 마음이 영하 10도구나. 춥지만 괜찮아, 곧 따뜻해질 거야"라고 인정하는 태도는 정서적 회복탄력성(Resilience)의 핵심입니다. 기록된 슬픔은 더 이상 나를 갉아먹는 괴물이 아니라, 내가 지나온 성장의 거름이 됩니다. 나중에 기록을 돌아볼 때, "이토록 추운 겨울도 나는 잘 지나왔구나"라는 강력한 자기 효능감을 얻게 될 것입니다.
            </p>

            <div className="pt-16 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-6">마치며: 기록은 당신의 북극성입니다</h4>
              <p className="break-keep">
                기록되지 않은 하루는 무채색의 파편으로 남지만, 기록된 하루는 고유한 온도를 지닌 역사가 됩니다. 오늘 당신이 남긴 짧은 문장 하나가 시간이 흘러 당신이 길을 잃었을 때 든든한 이정표가 되어줄 것입니다. 마음의 온도는 고정된 것이 아니며, 외부 자극에 흔들리는 것이 당연합니다. 중요한 것은 그 변화에 휘둘리는 것이 아니라, 변화를 인지하고 조절할 줄 아는 '기록하는 자의 여유'를 갖는 것입니다.
              </p>
            </div>

            {/* 실천 가이드 박스 */}
            <div className="p-8 rounded-[40px] bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 mt-16">
              <Compass className="text-[#E91E63] mb-4" size={24} />
              <p className="font-bold text-slate-900 dark:text-white text-lg mb-2">오늘의 온도 체크리스트</p>
              <ul className="text-sm space-y-3 text-slate-500 dark:text-slate-400">
                <li className="flex items-center gap-2">• 지금 이 순간 느껴지는 주된 감정에 '이름' 붙이기</li>
                <li className="flex items-center gap-2">• 그 감정의 온도를 -50도에서 100도 사이로 표현하기</li>
                <li className="flex items-center gap-2">• 감정이 이 온도에 도달하게 만든 '빛(원인)' 기록하기</li>
              </ul>
            </div>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">당신의 정서적 항상성을 위해,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">지금 당신의 온도를 기록해보세요</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-slate-900 dark:bg-rose-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(233,30,99,0.2)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              감정 온도 스냅하기 📸
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}