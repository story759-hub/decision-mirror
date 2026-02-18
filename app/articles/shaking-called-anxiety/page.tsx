'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Target, 
  Wind, 
  Focus, 
  Zap, 
  ChevronRight,
  Music,
  Anchor,
  Move
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "shaking-called-anxiety", 
  title: "불안이라는 이름의 흔들림: 초점을 맞추는 법",
  category: "Anxiety",
  artNo: "03",
  nextId: "capturing-fleeting-joy", // 다음 아티클 ID (상황에 맞게 조정)
  nextTitle: "찰나의 기쁨을 영원히 박제하는 기술: 긍정의 기록",
  charCount: "1,720",
  readTime: "18"
};

export default function ArticleThree() {
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
      text: '흔들리는 마음은 당신이 더 빛나는 곳으로 가고 싶어 한다는 증거입니다.',
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
          className="h-full bg-gradient-to-r from-blue-400 to-indigo-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-blue-600 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-blue-600 scale-110' : 'text-slate-400 hover:text-blue-600'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-blue-600' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-blue-100 dark:border-blue-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              불안이라는 이름의 흔들림: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 font-black">희미한 일상 속에서 초점 찾기</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-blue-400 pl-6 py-2">
              "카메라가 흔들리는 것은 셔터 스피드가 부족하기 때문이지 기계의 고장이 아닙니다. 당신의 불안 또한 그렇습니다."
            </p>

            <p className="break-keep">
              카메라를 들고 인생의 소중한 찰나를 포착하려 할 때, 우리를 가장 당혹스럽게 만드는 것은 결정적인 순간 화면이 뿌옇게 흐려지는 **'핸드 블러(Hand Blur)'** 현상입니다. 거창한 실수가 아닙니다. 단지 손끝의 아주 미세한 떨림이 렌즈를 통과해 이미지 전체의 선예도를 무너뜨릴 뿐이죠. 우리 삶의 **불안(Anxiety)** 역시 이와 놀랍도록 닮아 있습니다. 미래에 대한 아주 작은 걱정들이 마음이라는 렌즈를 흔들고, 결국 지금 이 순간 내가 누려야 할 선명한 일상을 뿌연 안개 속으로 밀어 넣어버립니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Zap className="text-blue-500" size={32} />
              1. 불안은 '고장'이 아니라 '자기보호 반응'입니다
            </h3>
            <p className="break-keep">
              심리학적으로 불안은 인간이 진화 과정에서 살아남기 위해 터득한 가장 강력한 방어 기제 중 하나입니다. 많은 이들이 불안을 느끼면 스스로의 마음이 나약하거나 고장 났다고 자책합니다. 하지만 카메라는 빛이 부족한 저조도 환경(어두운 미래)에서 셔터 스피드를 확보하지 못해 흔들리는 것일 뿐, 기계 자체의 결함이 아닙니다. 
            </p>
            <p className="break-keep">
              불안 또한 마찬가지입니다. 당신의 뇌는 지금 불확실한 미래라는 위험을 감지하고, 당신을 보호하기 위해 모든 신경을 곤두세우고 있는 것입니다. 불안을 '없애야 할 적'으로 규정하고 억누르는 순간, 역설적으로 마음의 떨림은 더 심해집니다. 대신 "아, 지금 내 마음의 셔터 스피드가 확보되지 않을 만큼 상황이 불투명하구나"라고 객관적으로 인지해 보세요. 흔들림을 인정하는 그 찰나가 초점을 다시 맞추는 첫 번째 단계입니다.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-10 rounded-[40px] border border-blue-100 dark:border-blue-900/30 my-16 relative overflow-hidden">
              <Move className="absolute -right-4 -top-4 text-blue-200/50 dark:text-blue-800/20" size={120} />
              <h4 className="text-xl font-black text-blue-800 dark:text-blue-400 mb-4">흔들림 방지 가이드: 삼각대 세우기</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                사진사가 흔들림을 막기 위해 삼각대를 사용하듯, 불안한 마음을 고정할 '심리적 지지대'가 필요합니다. 그것은 거창한 것이 아닙니다. 규칙적인 수면, 따뜻한 차 한 잔, 혹은 10분의 산책처럼 당신의 일상을 지탱하는 아주 사소하고 반복적인 루틴들이 당신의 마음을 바닥에 단단히 고정해 줍니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Focus className="text-blue-500" size={32} />
              2. 초점 거리를 '현재'로 조정하는 기술
            </h3>
            <p className="break-keep">
              불안이 우리를 잠식할 때, 우리의 마음 렌즈는 대개 아주 먼 미래(망원 렌즈)에 가 있거나 이미 지나간 과거(역광)의 그림자에 머물러 있습니다. 아직 일어나지 않은 1년 뒤의 일을 억지로 당겨 찍으려니 핸드 블러가 배가 되는 것이죠. 이때 우리에게 필요한 기술은 초점 거리를 **'지금 당장(Close-up)'**으로 당기는 것입니다.
            </p>
            <div className="space-y-4 my-8">
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center shrink-0 text-blue-600">1</div>
                  <p className="text-base leading-relaxed"><strong>수동 초점(Manual Focus):</strong> 막연한 걱정이 몰려올 때, 지금 당장 내 손에 닿는 구체적인 촉각에 집중하세요. 커피의 온도, 키보드의 반발력 같은 감각들이 마음의 닻이 됩니다.</p>
               </div>
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center shrink-0 text-blue-600">2</div>
                  <p className="text-base leading-relaxed"><strong>조리개 열기(Open Aperture):</strong> 완벽해야 한다는 강박을 버리고 조리개를 활짝 열어보세요. "실수해도 괜찮다"는 허용의 빛을 받아들일 때, 비로소 경직된 마음이 풀리고 화면이 선명해집니다.</p>
               </div>
            </div>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Wind className="text-blue-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "불안은 당신의 앞길이 어둡기 때문이 아니라, <br/>당신이 그만큼 더 밝은 곳으로 나아가고 싶어 하기 때문입니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Anchor className="text-blue-500" size={32} />
              3. Feeling Snap: 흔들림을 기록으로 현상하기
            </h3>
            <p className="break-keep">
              예술 사진 중에는 의도적인 흔들림을 통해 대상의 생동감과 에너지를 표현하는 기법이 있습니다. 우리의 불안했던 시간 또한 마찬가지입니다. 나중에 돌아본 당신의 기록들 중에서 가장 가치 있는 것은 매끄럽고 완벽한 날의 기록이 아니라, 불안 속에서도 한 걸음을 떼려 노력했던 '흔들리는 기록'들일 것입니다.
            </p>
            <p className="break-keep">
              지금 마음이 요동친다면 **Feeling Snap**을 켜고 그 혼란을 그대로 텍스트로 옮겨보세요. 머릿속에만 머물던 뿌연 불안을 문장이라는 형태로 '현상'하는 과정에서, 당신의 뇌는 상황을 통제 가능한 것으로 인식하기 시작합니다. 흐릿했던 삶의 초점이 타인의 기대나 알 수 없는 미래가 아닌, 오직 '지금 여기'의 당신에게로 맞춰지는 마법 같은 경험을 하게 될 것입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 다시 셔터를 누를 용기</h3>
            <p className="break-keep">
              불안은 당신의 인생이라는 필름에 깊이감을 더해주는 그림자입니다. 빛이 강할수록 그림자가 짙어지듯, 당신이 더 멋진 성취와 행복을 갈망할수록 불안의 그림자도 짙어질 수밖에 없습니다. 그러니 떨림을 두려워하지 마세요. 숨을 한 번 크게 들이마시고, 지금 이 순간 당신의 앞에 놓인 풍경에 초점을 맞추세요. 당신의 인생 셔터는 여전히 가장 아름다운 장면을 포착할 준비가 되어 있습니다.
            </p>

            {/* 추천 사운드트랙 */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[40px] border border-slate-100 dark:border-slate-800 space-y-6 mt-16">
              <div className="flex items-center gap-3 text-blue-600">
                <Music size={20} />
                <p className="font-black text-sm uppercase tracking-widest">Focus Aid Soundtrack</p>
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-base space-y-4 font-bold">
                <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span>Olafur Arnalds - Saman</span>
                  <span className="text-xs opacity-50 font-mono italic">평온한 리듬의 회복</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span>이루마 - River Flows In You</span>
                  <span className="text-xs opacity-50 font-mono italic">흐르는 마음의 안정</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-10 rounded-[50px] bg-gradient-to-br from-blue-600 to-indigo-700 text-white group hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
               <Target size={200} />
            </div>
            <p className="text-[10px] font-black text-blue-100/60 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block relative z-10">
              <h4 className="text-2xl font-black leading-tight group-hover:text-blue-100 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-6 text-white font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <Anchor className="mx-auto mb-6 text-blue-400" size={32} />
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">흔들림을 멈추고 현재를 선명하게,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">지금 당신의 마음을 고정해보세요.</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-blue-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              흔들리는 마음 고정하기 ⚓
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}