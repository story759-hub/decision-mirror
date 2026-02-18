'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Heart, 
  Coffee, 
  ShieldAlert, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "burnout-overexposure", 
  title: "번아웃이라는 노출 오버: 다시 어둠이 필요할 때",
  category: "Well-being",
  artNo: "13",
  nextId: "snap-of-self-compassion", 
  nextTitle: "자기 위로의 스냅: 나에게 포커스를 맞추는 법"
};

export default function ArticleThirteen() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. 초기화 및 상태 확인
  useEffect(() => {
    setMounted(true);
    
    // 저장 상태 확인
    const saved = JSON.parse(localStorage.getItem('saved_articles') || '[]');
    setIsSaved(saved.includes(ARTICLE_INFO.id));

    // 스크롤 프로그레스 계산
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. 공유 기능 (Web Share API)
  const handleShare = async () => {
    const shareData = {
      title: `Feeling Snap: ${ARTICLE_INFO.title}`,
      text: '오늘 당신의 마음을 인화해보세요.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } catch (err) {
      console.log('공유 실패:', err);
    }
  };

  // 3. 저장 기능 (LocalStorage)
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
          className="h-full bg-gradient-to-r from-orange-400 to-[#E91E63] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex justify-between items-center">
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
              <span className="bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-orange-100 dark:border-orange-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              번아웃이라는 노출 오버: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-[#E91E63]">다시 어둠이 필요할 때</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> 12 min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>1,420 Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-[#E91E63] pl-6 py-2">
              "사진에서 '노출 오버'란 필요 이상의 빛으로 이미지가 하얗게 날아가는 현상입니다. 우리 삶의 번아웃도 이와 같습니다."
            </p>

            <p className="break-keep">
              사진 미학에서 <strong className="text-slate-900 dark:text-white font-black">'노출 오버(Overexposure)'</strong>는 단순한 기술적 실수 그 이상의 의미를 갖습니다. 센서가 받아들일 수 있는 한계치를 넘어서는 과도한 빛이 쏟아져 들어올 때, 피사체의 고유한 색감과 디테일은 형체도 없이 하얗게 타버리고 맙니다. 웅장한 설산의 능선도, 사랑하는 이의 눈동자 속 깊은 빛깔도 노출 오버 앞에서는 그저 의미 없는 백색 소음으로 전락합니다. 현대인의 번아웃은 바로 이 지점에서 시작됩니다. 우리는 너무 오랫동안 자아를 세상이라는 강렬한 조명 아래 무방비로 노출해왔습니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24">1. 성과 사회가 강요하는 셔터의 무한 개방</h3>
            <p className="break-keep">
              우리는 끊임없이 '셔터를 열어두라'고 강요받는 사회에 살고 있습니다. SNS를 통해 사생활의 구석구석을 전시하고, 업무용 메신저를 통해 24시간 세상과 연결되어 있으며, 끊임없이 자기계발이라는 명목하에 내면의 에너지를 밖으로 발산합니다. 심리학자 한병철은 이를 '피로사회'라 정의하며, 우리가 스스로를 착취하는 가해자이자 동시에 피해자가 되었다고 진단합니다. 조리개를 끝까지 열어둔 채 한낮의 사막을 걷는 카메라처럼, 우리 정신의 센서는 과부하가 걸려 비명을 지르고 있습니다.
            </p>
            <p className="break-keep">
              디테일이 사라진 삶은 평평해지고 무미건조해집니다. 열정이었던 것은 어느덧 짜증이 되고, 타인을 향한 공감이었던 것은 냉소와 무관심으로 변질됩니다. 이는 당신의 의지가 약해서가 아닙니다. 단지 당신이라는 필름이 받아들일 수 있는 빛의 양을 초과했을 뿐입니다. 이제는 강제로라도 셔터를 닫고 어둠을 확보해야 할 시간입니다.
            </p>

            <div className="bg-orange-50 dark:bg-orange-950/20 p-10 rounded-[40px] border border-orange-100 dark:border-orange-900/30 my-16">
              <ShieldAlert className="text-orange-500 mb-6" size={32} />
              <h4 className="text-xl font-black text-orange-600 dark:text-orange-400 mb-4">당신의 데이터가 하얗게 날아가고 있나요?</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                번아웃의 전조 증상은 '무감각'입니다. 슬픈 영화를 봐도 눈물이 나지 않고, 맛있는 음식을 먹어도 기쁨이 없으며, 오직 '쉬고 싶다'는 생각뿐이라면 당신의 인생이라는 필름은 지금 노출 오버 상태입니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">2. 암실의 철학: 비워야 비로소 인화되는 것들</h3>
            <p className="break-keep">
              아날로그 사진의 황금기에 '암실'은 가장 고요하고도 신성한 공간이었습니다. 그곳은 모든 외부의 자극(빛)을 완벽히 차단한 후에야, 필름 속에 잠들어 있던 보이지 않는 잠재상이 비로소 선명한 형상을 갖추는 곳이기 때문입니다. 번아웃을 극복하는 유일한 방법은 역설적이게도 '아무것도 하지 않는 어둠'으로 들어가는 것입니다. 
            </p>
            <p className="break-keep">
              뇌과학적으로도 우리 뇌는 '디폴트 모드 네트워크(DMN)' 상태, 즉 아무런 목적 지향적 행위를 하지 않고 멍하게 있을 때 가장 활발하게 자신을 정리하고 회복합니다. 의도적인 고립, 의도적인 단절, 의도적인 침묵은 우리 삶의 조리개를 다시 적정 수준으로 되돌리는 가장 강력한 도구입니다. 어둠 속에서만 우리는 내가 무엇을 찍고 싶었는지, 어떤 색을 내고 싶었는지를 다시 기억해낼 수 있습니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Sparkles className="text-[#E91E63]" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "어둠은 빛의 부재가 아니라, <br/>새로운 빛을 준비하는 가장 고요한 에너지입니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">3. Feeling Snap이 제안하는 '암부(Shadow)의 기록'</h3>
            <p className="break-keep">
              기록은 반드시 찬란하고 긍정적이어야 할 필요가 없습니다. Feeling Snap은 당신에게 가장 어두운 순간의 스냅을 권합니다. 번아웃이 찾아온 날, 화려한 풍경 사진 대신 당신의 그림자, 혹은 텅 빈 방 안의 고요함을 찍어보세요. 그리고 그 아래에 단 한 문장만 적으십시오. "오늘 나는 셔터를 닫기로 했다." 
            </p>
            <p className="break-keep">
              억지로 긍정을 쥐어짜는 행위는 노출 오버된 사진에 화이트를 더 덧칠하는 것과 같습니다. 대신, 자신의 무기력함과 지친 상태를 있는 그대로 '블랙'으로 기록할 때, 우리 마음의 현상액은 비로소 건강하게 작동하기 시작합니다. 슬픔과 피로에도 선명한 색깔이 있다는 것을 인정하는 순간, 회복의 첫 번째 프레임이 인화됩니다. 어두운 부분(Shadow)이 있어야만 밝은 부분(Highlight)이 빛을 발하는 사진의 원리를 믿으세요.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 다시 선명한 색을 찾기 위하여</h3>
            <p className="break-keep">
              완벽한 사진은 암부와 명부의 완벽한 밸런스에서 나옵니다. 만약 당신이 지금 번아웃의 백색 소음 속에 갇혀 있다면, 그것은 당신이 빛을 사랑하지 않아서가 아니라 너무 열렬히 사랑했기 때문임을 기억하십시오. 이제는 조리개를 조이고, ISO를 낮추며, 내면의 고요한 암실로 들어갈 시간입니다. 
            </p>
            <p className="break-keep">
              당신이 충분히 어둠 속에서 머문다면, 머지않아 세상의 디테일들은 다시금 선명한 색채를 띠며 당신의 렌즈 앞으로 다가올 것입니다. 오늘 하루, 당신의 지친 영혼에 '노출 부족'의 시간을 기꺼이 허락해 주십시오. 그 칠흑 같은 고요함 속에서 당신만의 진짜 인생 샷이 준비되고 있습니다. Feeling Snap은 당신이 다시 셔터를 누르고 싶어질 그 순간까지 이 고요한 암실에서 함께 기다리겠습니다.
            </p>

            {/* 감성 가이드 박스 */}
            <div className="grid grid-cols-1 gap-6 mt-24">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#1A1F2C] to-[#0A0F1C] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E91E63] blur-[100px] opacity-20"></div>
                <p className="text-[#E91E63] font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                   Mindset Practice
                </p>
                <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Coffee size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">무선택의 시간</p>
                       <p className="text-sm text-slate-400 leading-relaxed">하루 15분, 아무런 정보도 입력하지 않고 오직 호흡의 리듬에만 집중해보세요.</p>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Heart size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">자기 연민의 인화</p>
                       <p className="text-sm text-slate-400 leading-relaxed">부족한 내 모습을 필름의 노이즈처럼 자연스러운 일부로 받아들여 보세요.</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-8 md:p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 group hover:border-[#E91E63]/30 transition-all cursor-pointer">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-[#E91E63] transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-4 text-[#E91E63] font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          {/* 하단 푸터 및 CTA */}
          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">당신은 지금 회복의 암실에 있나요?</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">오늘의 감정을 인화해보세요</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-[#1A1F2C] dark:bg-[#E91E63] text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(233,30,99,0.3)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              고요한 암실로 들어가기 🧘‍♀️
            </button>
            <div className="mt-16 flex justify-center gap-8 text-[11px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em]">
               <span>Silence</span>
               <span>Focus</span>
               <span>Develop</span>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}