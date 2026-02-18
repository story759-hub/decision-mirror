'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Database, 
  Brain, 
  PenTool, 
  Zap, 
  ChevronRight,
  Music,
  History,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "when-records-rule-memories", 
  title: "기록이 기억을 지배할 때: 왜 써야 하는가?",
  category: "Cognitive Psychology",
  artNo: "11",
  nextId: "composition-of-relationships", 
  nextTitle: "관계의 구도: 적당한 거리가 만드는 선명함",
  charCount: "1,750",
  readTime: "18"
};

export default function ArticleEleven() {
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
      text: '기록은 왜곡된 기억으로부터 당신의 역사를 지키는 유일한 방법입니다.',
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
          className="h-full bg-gradient-to-r from-emerald-400 to-teal-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-emerald-600 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-emerald-600 scale-110' : 'text-slate-400 hover:text-emerald-600'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-emerald-600' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              기록이 기억을 지배할 때: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 font-black">왜 우리는 굳이 써야 하는가?</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-emerald-400 pl-6 py-2">
              "우리 뇌는 효율적인 편집자이지만, 결코 객관적인 역사가는 아닙니다. 기록만이 왜곡된 기억으로부터 진실을 구합니다."
            </p>

            <p className="break-keep">
              인간의 뇌는 매 순간 쏟아지는 방대한 정보 속에서 생존에 필요한 데이터만을 골라내는 아주 효율적인 편집자입니다. 하지만 문제는 이 편집 시스템이 감정에 의해 심하게 오염된다는 점입니다. 우울할 때는 무채색의 기억만을 편집실에 남겨두고, 불안할 때는 아직 일어나지 않은 최악의 시나리오를 기억의 중심부(하이라이트)에 배치합니다. **기록(Record)**은 이 편향된 편집자로부터 삶의 주도권을 되찾아와 나만의 원본 데이터를 보존하는 유일한 방법입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <PenTool className="text-emerald-500" size={32} />
              1. 휘발되는 감정을 고체로 만드는 '박제'의 미학
            </h3>
            <p className="break-keep">
              감정은 기체와 같아서 찰나의 순간에 흩어지고 변형됩니다. 아침의 분노가 오후의 무기력으로 변할 때, 우리는 아침에 왜 그토록 화가 났었는지 그 본질을 잊곤 하죠. 하지만 그것을 문장으로 옮기는 순간, 기체 상태의 감정은 텍스트라는 단단한 고체로 변합니다. 
            </p>
            <p className="break-keep">
              심리학자 **제임스 페네베이커(James Pennebaker)**는 '표현적 쓰기(Expressive Writing)' 실험을 통해 고통스러운 감정을 글로 쓰는 것만으로도 신체의 면역 체계가 강화되고 심리적 외상이 유의미하게 치유된다는 것을 입증했습니다. 기록은 단순히 과거를 나열하는 행위가 아닙니다. 내면의 무질서한 혼란에 논리라는 질서를 부여하고, 엉킨 실타래를 풀어내어 '정신적 정리 정돈'을 완료하는 고도의 치유 작업입니다.
            </p>

            <div className="bg-emerald-50 dark:bg-emerald-950/20 p-10 rounded-[40px] border border-emerald-100 dark:border-emerald-900/30 my-16 relative overflow-hidden">
              <Brain className="absolute -right-4 -top-4 text-emerald-200/50 dark:text-emerald-800/20" size={120} />
              <h4 className="text-xl font-black text-emerald-800 dark:text-emerald-400 mb-4">자이가르닉 효과 해소하기</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                뇌는 미완결된 과제를 끝내기 전까지 계속해서 에너지를 소모하며 기억의 상단에 띄워둡니다. 이를 '자이가르닉 효과'라고 합니다. 하지만 Feeling Snap에 한 줄의 기록이라는 마침표를 찍는 순간, 우리 뇌는 비로소 이를 '처리 완료된 데이터'로 인식하고 불필요한 연산 가동을 멈추며 진정한 휴식을 취하게 됩니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Database className="text-emerald-500" size={32} />
              2. 외장 하드로서의 기록: 뇌의 여유 공간 확보
            </h3>
            <p className="break-keep">
              무언가를 잊지 않으려고 애쓰는 동안 우리 뇌의 작업 기억(Working Memory) 용량은 바닥을 드러냅니다. 기록은 이 과부하된 기억의 짐을 Feeling Snap이라는 외부 저장 기기로 안전하게 옮겨주는 백업 작업입니다. 이 과정은 우리에게 두 가지 결정적인 선물을 줍니다.
            </p>
            <div className="space-y-4 my-8">
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0 text-emerald-600"><Zap size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>인지적 효율성:</strong> 기억의 부담을 덜어낸 뇌는 현재 마주한 문제에 더 창의적이고 몰입감 있게 대응할 수 있는 여유 공간(Slack)을 확보하게 됩니다.</p>
               </div>
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center shrink-0 text-emerald-600"><ShieldCheck size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>관찰자 시점의 획득:</strong> 기록된 글을 다시 읽을 때 우리는 비로소 '관찰자'가 됩니다. 이 심리적 거리감은 감정의 소용돌이에서 빠져나와 나를 객관적으로 분석할 수 있는 메타인지를 활성화합니다.</p>
               </div>
            </div>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <History className="text-emerald-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "쓰지 않으면 당신의 기억은 감정에 의해 왜곡되지만, <br/>기록하면 당신의 역사는 진실 앞에 선명해집니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <PenTool className="text-emerald-500" size={32} />
              3. Feeling Snap: 찰나의 진심을 수집하는 좌표
            </h3>
            <p className="break-keep">
              거창한 문학적 서술이 아니어도 좋습니다. Feeling Snap에 남기는 세 단어, 혹은 한 장의 이미지 데이터는 훗날 당신이 정체성의 혼란을 겪을 때 돌아올 수 있는 가장 정확한 '정서적 좌표'가 됩니다. 뇌가 멋대로 편집해버린 슬픈 기억의 결말 대신, 당신이 직접 채집한 당시의 진실된 순간들이 당신의 진짜 모습이 되도록 하세요.
            </p>
            <p className="break-keep">
              기록은 나 자신을 사랑하는 가장 적극적이고 지적인 방식입니다. 오늘 당신의 마음이 어떤 모양이었는지, 어떤 조리개 값으로 세상을 바라보았는지 기록하는 일을 멈추지 마세요. 그 데이터들이 모여 누구도 흔들 수 없는 단단한 '당신'이라는 세계를 구축할 것입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 기록하는 인간은 길을 잃지 않는다</h3>
            <p className="break-keep">
              우리는 기록함으로써 비로소 우리 삶의 작가(Author)가 됩니다. 기억에 휘둘리는 수동적인 존재에서 벗어나, 내 삶의 장면을 선택하고 의미를 부여하는 주체적인 존재로 거듭나는 것이죠. 오늘 당신의 하루를 Feeling Snap에 박제해 보세요. 그것은 당신의 과거를 가두는 감옥이 아니라, 당신의 미래를 자유롭게 할 가장 강력한 데이터가 될 것입니다.
            </p>

            {/* 추천 사운드트랙 */}
            <div className="p-8 bg-emerald-50 dark:bg-emerald-900/40 rounded-[40px] border border-emerald-100 dark:border-emerald-800 space-y-6 mt-16">
              <div className="flex items-center gap-3 text-emerald-600">
                <Music size={20} />
                <p className="font-black text-sm uppercase tracking-widest">Soundtrack for Reflection</p>
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-base space-y-4 font-bold">
                <li className="flex justify-between items-center border-b border-emerald-200 dark:border-emerald-800 pb-2">
                  <span>Ludovico Einaudi - Nuvole Bianche</span>
                  <span className="text-xs opacity-50 font-mono italic">생각의 흐름을 돕는 투명한 선율</span>
                </li>
                <li className="flex justify-between items-center border-b border-emerald-200 dark:border-emerald-800 pb-2">
                  <span>Max Richter - Dream 3</span>
                  <span className="text-xs opacity-50 font-mono italic">깊은 내면 탐색을 위한 미니멀리즘</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-10 rounded-[50px] bg-gradient-to-br from-emerald-600 to-teal-700 text-white group hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
               <History size={200} />
            </div>
            <p className="text-[10px] font-black text-emerald-100/60 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block relative z-10">
              <h4 className="text-2xl font-black leading-tight group-hover:text-emerald-100 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-6 text-white font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <PenTool className="mx-auto mb-6 text-emerald-400" size={32} />
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">기록은 기억을 이기는 유일한 힘입니다.</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">오늘의 당신을 선명하게 남겨보세요.</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-emerald-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              오늘의 나를 박제하기 ✍️
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}