'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Flame, 
  Sun, 
  Stars, 
  Heart, 
  ChevronRight,
  Music,
  Camera,
  Infinity,
  Award
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "final-shutter", 
  title: "마지막 셔터를 누르기 전: 오늘을 후회 없이 인화하는 삶의 태도",
  category: "Life Philosophy",
  artNo: "20",
  nextId: "intro", // 다시 처음으로 혹은 메인으로
  nextTitle: "처음으로 돌아가기: 당신의 새로운 기록을 시작하며",
  charCount: "1,980",
  readTime: "25"
};

export default function ArticleTwenty() {
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
      title: `Feeling Snap Final Insight: ${ARTICLE_INFO.title}`,
      text: '당신의 인생이라는 사진첩, 그 마지막 페이지에는 무엇이 남을까요?',
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
    <div className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-200 font-sans pb-32 transition-colors duration-300 overflow-x-hidden">
      
      {/* 독서 프로그레스 바 (골드 그라데이션) */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-100 dark:bg-white/10 z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-200 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 px-6 py-3 rounded-full shadow-2xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-amber-500 hover:text-amber-600 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Final Insight
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-amber-500 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-amber-500 scale-110' : 'text-slate-400 hover:text-amber-500'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-amber-500' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-amber-100 dark:border-amber-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">SERIES FINALE</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              마지막 셔터를 누르기 전: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600 font-black">오늘을 후회 없이 인화하는 법</span>
            </h2>

            <div className="flex items-center justify-center gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>The Last Chapter</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-amber-500 pl-6 py-2">
              "결국 우리에게 남는 것은 얼마나 대단한 일을 했느냐가 아니라, 얼마나 많은 순간을 '진심으로' 기록했느냐입니다."
            </p>

            <p className="break-keep">
              사진가들에게 '마지막 남은 한 장의 필름'은 특별한 무게를 갖습니다. 더 이상 되돌릴 수 없기에 가장 신중하게 셔터를 누르게 되죠. 우리의 삶 또한 이와 다르지 않습니다. 매일 아침 우리에게는 24시간이라는 한정된 필름이 주어지고, 우리는 각자의 선택에 따라 그 필름을 채워나갑니다. Feeling Snap의 마지막 인사이트는 바로 이 질문에서 시작합니다. **"당신의 인생이라는 사진첩, 그 마지막 페이지에는 어떤 순간이 인화되어 있기를 원하나요?"**
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Flame className="text-amber-500" size={32} />
              1. 카르페 디엠(Carpe Diem): 셔터를 아끼지 마세요
            </h3>
            <p className="break-keep">
              후회 없는 삶을 사는 사람들의 공통점은 '완벽한 순간'을 기다리지 않는다는 것입니다. 많은 이들이 "나중에 성공하면", "나중에 여유가 생기면"이라며 행복의 셔터를 뒤로 미룹니다. 하지만 안타깝게도 인생이라는 카메라는 기다려주지 않습니다. 
            </p>
            <p className="break-keep">
              진정한 기록의 가치는 화려한 시상대 위가 아니라, 오늘 아침 마신 커피의 온기, 사랑하는 사람의 무심한 미소, 실패 후 털고 일어나는 무거운 발걸음 속에 있습니다. Feeling Snap에 남기는 평범한 일상의 한 줄은 미래의 당신에게 보내는 가장 따뜻한 구조신호이자 선물입니다. 셔터를 아끼지 마세요. 기록되지 않은 순간은 영원히 인화되지 못하고 어둠 속에 묻히게 됩니다.
            </p>

            <div className="bg-amber-50 dark:bg-amber-950/10 p-10 rounded-[40px] border border-amber-100 dark:border-amber-900/30 my-16 relative overflow-hidden">
              <Award className="absolute -right-4 -top-4 text-amber-200/50 dark:text-amber-800/10" size={120} />
              <h4 className="text-xl font-black text-amber-800 dark:text-amber-400 mb-4">당신의 인생은 그 자체로 명작(Masterpiece)</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                명작은 결점 없는 완벽함으로 완성되는 것이 아니라, 작가의 고유한 시선이 얼마나 정직하게 담겼느냐로 결정됩니다. 당신의 상처, 서툰 도전, 흔들리는 감정들은 사진의 거친 입자(Grain)처럼 당신의 인생을 더욱 가치 있고 입체적으로 만들어줄 것입니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Infinity className="text-amber-500" size={32} />
              2. 유한함이 주는 선물: 시간의 조리개를 조일 때
            </h3>
            <p className="break-keep">
              시간이 무한하다면 기록은 의미를 잃을 것입니다. 우리가 무언가를 기록하려 애쓰는 근본적인 이유는 삶이 '단 한 번뿐'이기 때문입니다. 심리학에서는 이를 **'소멸의 자각'**이라고 부르며, 이것이 오히려 현재에 대한 몰입과 의미를 극대화한다고 말합니다.
            </p>
            <div className="space-y-4 my-8">
               <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl flex gap-4 border border-slate-100 dark:border-white/10">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center shrink-0 text-amber-600"><Sun size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>오늘의 노출값 설정:</strong> 오늘 하루, 당신의 마음은 빛으로 가득했나요, 아니면 그늘 속에 있었나요? 어떤 상태였든 그 노출값을 그대로 인정하는 것이 후회 없는 인화의 첫 걸음입니다.</p>
               </div>
               <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl flex gap-4 border border-slate-100 dark:border-white/10">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center shrink-0 text-amber-600"><Heart size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>사랑에 초점을 맞추기:</strong> 결국 사진첩에 가장 오래 머무는 것은 '내가 무엇을 미워했는가'가 아니라 '내가 무엇을 사랑했는가'에 대한 기록입니다. 초점을 사랑에 맞추세요.</p>
               </div>
            </div>

            <div className="relative border-y border-slate-100 dark:border-white/10 py-16 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#050505] px-4">
                 <Stars className="text-amber-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-amber-100 leading-relaxed">
                 "가장 아름다운 사진은 <br/>
                 마지막 순간에 미소 지으며 되돌아볼 수 있는 <br/>
                 당신의 정직한 하루들입니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Camera className="text-amber-500" size={32} />
              3. Feeling Snap: 당신의 영원한 큐레이터
            </h3>
            <p className="break-keep">
              지난 20개의 인사이트를 통해 우리는 감정의 근육을 키우고, 기록의 기술을 배우며, 자아의 심연을 탐험했습니다. 이 모든 여정의 끝에서 Feeling Snap이 당신에게 전하고 싶은 단 하나의 진심은 이것입니다. **"당신의 기록은 결코 사라지지 않는 당신의 존재 증명"**이라는 사실입니다.
            </p>
            <p className="break-keep">
              세상은 당신의 결과물만을 보겠지만, Feeling Snap은 당신이 그 결과물을 만들기 위해 보냈던 수많은 '찰나의 진심'들을 기억합니다. 당신이 마지막 셔터를 누르는 그날, 이 앱 속에 차곡차곡 쌓인 스냅들이 당신에게 다가와 속삭일 것입니다. "당신은 참으로 치열하게 느꼈고, 아름답게 기록했으며, 후회 없이 살았다"고 말이죠.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 다시, 첫 장을 넘기며</h3>
            <p className="break-keep">
              하나의 시리즈가 끝났다는 것은 새로운 사진첩의 첫 장을 열 때가 되었다는 뜻이기도 합니다. 지금까지의 통찰을 지침 삼아, 이제는 당신만의 독창적인 프레임으로 세상을 담아보세요. 당신의 렌즈는 그 누구보다 깊고, 당신의 인화지는 그 무엇보다 단단합니다. 오늘, 지금 이 순간, 당신의 진심을 Snap 하세요.
            </p>

            {/* 피날레 사운드트랙 */}
            <div className="p-8 bg-amber-50 dark:bg-amber-900/20 rounded-[40px] border border-amber-100 dark:border-amber-800 space-y-6 mt-16">
              <div className="flex items-center gap-3 text-amber-600">
                <Music size={20} />
                <p className="font-black text-sm uppercase tracking-widest">Grand Finale Soundtrack</p>
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-base space-y-4 font-bold">
                <li className="flex justify-between items-center border-b border-amber-200 dark:border-amber-800 pb-2">
                  <span>Ennio Morricone - Cinema Paradiso</span>
                  <span className="text-xs opacity-50 font-mono italic">인생이라는 영화를 회상하는 선율</span>
                </li>
                <li className="flex justify-between items-center border-b border-amber-200 dark:border-amber-800 pb-2">
                  <span>Frank Sinatra - My Way</span>
                  <span className="text-xs opacity-50 font-mono italic">나만의 길을 기록해온 자의 당당함</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 메인으로 돌아가기 카드 */}
          <section className="mt-32 p-10 rounded-[50px] bg-gradient-to-br from-slate-900 to-black text-white group hover:shadow-[0_0_50px_rgba(251,191,36,0.2)] transition-all cursor-pointer overflow-hidden relative border border-amber-500/30">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
               <Infinity size={200} className="text-amber-500" />
            </div>
            <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4">The Journey Continues</p>
            <Link href="/" className="block relative z-10">
              <h4 className="text-2xl font-black leading-tight group-hover:text-amber-400 transition-colors">
                인사이트 여정을 마치며, <br/>다시 기록의 바다로
              </h4>
              <div className="flex items-center gap-2 mt-6 text-amber-500 font-bold text-sm">
                메인 화면으로 이동 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-white/10 text-center relative">
            <div className="mb-12">
               <Award className="mx-auto mb-6 text-amber-500 animate-pulse" size={48} />
               <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mb-2">당신이라는 위대한 작가의 다음 장을 응원합니다.</p>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">준비되셨나요? 당신의 셔터를 믿으세요.</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(245,158,11,0.3)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              새로운 기록 시작하기 ✨
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}