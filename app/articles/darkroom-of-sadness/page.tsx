'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Zap, 
  Sun, 
  Activity, 
  Sparkles, 
  ChevronRight,
  Music
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "darkroom-of-sadness", 
  title: "슬픔의 현상소: 눈물이 마음을 씻어내는 과정",
  category: "Happiness Science",
  artNo: "05",
  nextId: "red-noise-anger", 
  nextTitle: "붉은 노이즈, 분노: 온도를 낮추는 감정의 조리개",
  charCount: "1,480",
  readTime: "13"
};

export default function ArticleFive() {
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
      text: '쾌락과 행복 사이, 당신의 뇌는 지금 어떤 빛을 받고 있나요?',
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
          className="h-full bg-gradient-to-r from-emerald-400 to-green-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-green-600 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-green-600 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-[#E91E63] scale-110' : 'text-slate-400 hover:text-green-600'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-[#E91E63]' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-green-100 dark:border-green-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              도파민과 세로토닌: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600">쾌락의 플래시와 행복의 자연광</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-green-400 pl-6 py-2">
              "도파민은 '무엇을 얻었을 때' 오지만, 세로토닌은 '지금 이대로 괜찮을 때' 찾아옵니다."
            </p>

            <p className="break-keep">
              우리는 흔히 '기분 좋다'는 표현 하나로 모든 긍정적인 감정 상태를 뭉뚱그려 말하곤 합니다. 하지만 우리 뇌 과학의 관점에서 보면 행복의 색깔은 전혀 다른 두 종류의 화학 물질에 의해 결정됩니다. 바로 **도파민(Dopamine)**과 **세로토닌(Serotonin)**입니다. 사진에 비유하자면 도파민은 어둠을 한순간에 찢고 들어오는 강렬한 '플래시'이고, 세로토닌은 공간 전체를 포근하고 균일하게 감싸는 '오후의 자연광'과 같습니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24">1. 도파민: 더 강한 자극을 원하는 '하이라이트'</h3>
            <p className="break-keep">
              숏폼 영상을 끝없이 넘길 때, 배달 음식을 한 입 가득 넣을 때, 혹은 SNS 알림창에 빨간 숫자가 뜰 때 분비되는 도파민은 우리에게 즉각적이고 짜릿한 쾌락을 선사합니다. 뇌의 입장에서 도파민은 '보상'과 '성취'의 신호입니다. 하지만 도파민에는 치명적인 약점이 있습니다. 바로 '내성'과 '중독'입니다. 
            </p>
            <p className="break-keep">
              어두운 피사체에 너무 강한 플래시를 반복적으로 터뜨리면 화면의 디테일이 하얗게 날아가 버리는 '화이트아웃(Whiteout)' 현상이 발생하듯, 도파민에 과하게 노출된 뇌는 일상의 소소한 자극에는 반응하지 않는 '도파민 단절' 상태에 빠집니다. 더 자극적인 빛, 더 화려한 불꽃만을 갈구하게 되며 결국 빛이 사라진 뒤 찾아오는 어둠(공허함)은 더 깊어질 뿐입니다.
            </p>

            <div className="bg-green-50 dark:bg-green-950/20 p-10 rounded-[40px] border border-green-100 dark:border-green-900/30 my-16">
              <Zap className="text-green-500 mb-6" size={32} />
              <h4 className="text-xl font-black text-green-700 dark:text-green-400 mb-4">도파민 과다 노출 자가진단</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                스마트폰 없이 10분만 있어도 불안한가요? 혹은 평범한 식사나 산책이 지루하게만 느껴지나요? 그렇다면 당신의 마음 렌즈는 지금 과도한 도파민 플래시로 인해 감도를 잃어가고 있는지도 모릅니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">2. 세로토닌: 일상을 지탱하는 '적정 노출'</h3>
            <p className="break-keep">
              반면 세로토닌은 자극적이지 않습니다. 아침 햇살을 받으며 걷거나, 깊은 숨을 들이마시고 내쉴 때, 혹은 사랑하는 존재와 가만히 온기를 나눌 때 서서히 차오릅니다. 이는 사진에서 암부(Shadow)와 명부(Highlight)의 균형이 완벽하게 잡힌 상태와 같습니다. 화려하진 않지만 오래 보아도 눈이 피로하지 않고, 삶 전체에 안정감과 평온함을 부여합니다.
            </p>
            <p className="break-keep">
              지속 가능한 행복의 핵심은 바로 이 세로토닌의 '적정 노출'을 얼마나 잘 유지하느냐에 달려 있습니다. 세로토닌은 우리를 흥분시키지 않지만, 우리를 무너지지 않게 만듭니다. 외부의 보상이 없어도 "이대로 충분하다"는 안도감을 주는 이 화학 물질이야말로 우리가 Feeling Snap을 통해 기록해야 할 가장 소중한 빛의 조각입니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Sun className="text-green-500" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "쾌락은 소비하는 것이지만, <br/>평온은 축적하는 것입니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">3. Feeling Snap으로 행복의 밸런스 인화하기</h3>
            <p className="break-keep">
              지나치게 자극적인 현대 사회에서 우리의 뇌를 보호하는 방법은 의도적으로 '세로토닌 스냅'을 찍는 것입니다. **Feeling Snap**에 당신의 소소한 평온함을 문장으로 현상해 보세요. 거창한 성공담이나 강렬한 이벤트가 아니어도 좋습니다. "오늘 마신 차의 온기가 적당했다", "퇴근길 바람에 섞인 풀냄새가 좋았다"와 같은 기록들은 도파민으로 번쩍이는 당신의 마음 렌즈에 'ND 필터(빛의 양을 줄여주는 필터)' 역할을 해줄 것입니다.
            </p>
            <p className="break-keep">
              기록은 뇌의 주의(Attention)를 전환합니다. 자극을 쫓던 시선을 돌려 지금 여기 존재하는 정적인 평화를 응시하게 만듭니다. 이러한 기록이 습관이 될 때, 우리 뇌는 비로소 강렬한 플래시가 없어도 스스로 빛을 내는 법을 배우게 됩니다. 오늘 당신이 기록한 한 줄의 담백한 기분은, 내일의 당신이 거친 파도를 넘을 수 있게 해주는 가장 단단한 바탕색이 될 것입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 당신의 사진첩은 어떤 빛으로 가득한가요?</h3>
            <p className="break-keep">
              번쩍이는 플래시 뒤에 오는 공허함에 지쳐있다면, 이제는 은은한 자연광을 기록할 차례입니다. 화려하지 않아도 좋습니다. 자극적이지 않아도 괜찮습니다. 오늘 당신의 마음속에 머문 가장 평온한 순간을 찾아 Feeling Snap에 담아보세요. 그 한 장의 스냅이 모여 당신의 인생이라는 앨범은 어떤 폭풍우에도 흔들리지 않는 선명한 안정감을 갖게 될 것입니다.
            </p>

            {/* 감성 가이드 박스 */}
            <div className="grid grid-cols-1 gap-6 mt-24">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#064E3B] to-[#065F46] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400 blur-[100px] opacity-20"></div>
                <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                   Balance Practice
                </p>
                <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Activity size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">도파민 디톡스</p>
                       <p className="text-sm text-emerald-100/70 leading-relaxed">가장 강한 자극을 주는 앱 하나를 오늘 하루만 삭제하거나 숨겨보세요.</p>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Music size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">세로토닌 사운드트랙</p>
                       <p className="text-sm text-emerald-100/70 leading-relaxed">Jack Johnson의 곡들처럼 여유롭고 자연스러운 리듬에 몸을 맡겨보세요.</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-8 md:p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 group hover:border-green-500/30 transition-all cursor-pointer">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-green-600 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-4 text-green-600 font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">자극을 멈추고 평온에 초점을 맞출 때,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">은은한 일상의 행복 인화하기</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-slate-900 dark:bg-green-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(5,150,105,0.3)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              평온한 지금 기록하기 🌿
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}