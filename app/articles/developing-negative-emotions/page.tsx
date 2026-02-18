'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Moon, 
  Aperture, 
  Palette, 
  Sparkles, 
  ChevronRight,
  Music,
  Ghost
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "developing-negative-emotions", 
  title: "부정적 감정의 현상법: 슬픔도 선명한 색깔이다",
  category: "Emotional Alchemy",
  artNo: "10",
  nextId: "when-records-rule-memories", 
  nextTitle: "기록이 기억을 지배할 때: 왜 써야 하는가?",
  charCount: "1,520",
  readTime: "14"
};

export default function ArticleTen() {
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
      text: '당신의 어둠은 결함이 아니라 깊이입니다.',
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
          className="h-full bg-gradient-to-r from-slate-400 to-slate-900 dark:from-slate-600 dark:to-white transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1">
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
              <span className="bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-300 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-slate-700 dark:border-slate-600">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              부정적 감정의 현상법: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-800 dark:from-slate-400 dark:to-slate-100">슬픔은 지워야 할 노이즈가 아니다</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-slate-900 dark:border-slate-200 pl-6 py-2">
              "그림자가 없는 사진은 평면적입니다. 삶의 입체감은 우리가 '부정적'이라 부르는 어두운 계조에서 태어납니다."
            </p>

            <p className="break-keep">
              우리는 강박적으로 '밝은 면'만을 전시하려 애쓰는 시대에 살고 있습니다. SNS의 필터는 슬픔을 지우고, 사회적 시선은 우울을 결함으로 취급하곤 하죠. 하지만 사진학의 기본 원리로 돌아가 봅시다. 화면 전체가 완벽하게 하얀색(Pure White)으로만 가득 찬 사진을 우리는 '정보가 유실된 사진'이라고 부릅니다. 사물의 형태를 정의하고, 공간에 깊이감을 부여하며, 눈부신 하이라이트를 더욱 돋보이게 만드는 것은 다름 아닌 **'그림자(Shadow)'**입니다. 
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24">1. 어둠이 빛의 존재를 증명한다</h3>
            <p className="break-keep">
              기쁨이 빛이라면 슬픔은 그 기쁨의 경계를 빚어내는 어둠입니다. 극심한 우울을 경험해 본 사람만이 일상의 작은 평온함이 얼마나 찬란한 농도를 가졌는지 감각할 수 있습니다. 자신의 마음이 어둡다고 해서 억지로 노출 값을 올리려 애쓰지 마세요. 그 짙은 그림자는 당신의 영혼이 그만큼 깊고 입체적인 질감을 가지고 있다는 증거입니다. 어둠을 긍정하는 것은 빛을 갈구하는 것보다 훨씬 더 고차원적인 감정의 연금술입니다.
            </p>

            <div className="bg-slate-900 text-white dark:bg-slate-800/50 p-10 rounded-[40px] border border-slate-800 my-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-[80px]"></div>
              <Moon className="text-slate-400 mb-6" size={32} />
              <h4 className="text-xl font-black mb-4 tracking-tight">슬픔의 '계조(Gradient)' 관찰하기</h4>
              <p className="text-base leading-relaxed text-slate-400 italic">
                슬픔은 단일한 색이 아닙니다. 어떤 날은 창백한 청색이고, 어떤 날은 묵직한 차콜색이며, 어떤 날은 빛 바랜 세피아 톤이기도 합니다. 자신의 우울에 이름을 붙이고 그 농도를 세밀하게 관찰할 때, 감정은 통제 불능의 괴물에서 탐구의 대상인 '피사체'로 변모합니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">2. 감정의 암실: 현상을 거부하지 않는 용기</h3>
            <p className="break-keep">
              과거 필름 사진 시대에 사진은 반드시 '암실'이라는 어두운 공간을 통과해야만 세상 밖으로 나올 수 있었습니다. 부정적인 감정이 찾아온 시기는 당신이라는 필름이 가장 선명한 이미지를 얻기 위해 차가운 현상액 속에서 자신을 담그고 있는 '암실의 시간'과 같습니다. 
            </p>
            <p className="break-keep">
              이 과정을 회피하고 빛으로만 도망치려 한다면, 당신의 삶은 현상되지 않은 필름처럼 미완의 상태로 남을 뿐입니다. 분노, 상실감, 좌절을 있는 그대로 대면하는 것은 고통스럽지만, 그 고통의 약품이 씻겨 내려간 뒤에야 비로소 당신 삶의 진실된 구도가 드러납니다. **Feeling Snap**은 바로 이 어두운 암실에서 당신의 손을 잡아주는 안전한 기록 장치입니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Aperture className="text-slate-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "가장 어두운 그림자를 가진 사진이 <br/>때로는 가장 많은 진실을 말해줍니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">3. Feeling Snap: 어둠 속에서도 셔터를 누르는 법</h3>
            <p className="break-keep">
              기분이 최악일 때 감정을 기록하는 것은 일종의 '장노출 촬영'과 같습니다. 빛이 부족한 곳에서 셔터를 오래 열어두면 평소에 보이지 않던 별의 궤적이나 밤의 흐름이 찍히듯, 우울의 터널 속에서 내뱉는 텍스트는 당신 내면의 가장 깊은 본질을 포착합니다. 
            </p>
            <p className="break-keep">
              기록된 슬픔은 더 이상 내면을 갉아먹는 유령이 아닙니다. 그것은 텍스트라는 종이에 고정된 하나의 '현상된 데이터'가 됩니다. 슬픔을 객관적인 피사체로 분리하여 관찰하는 순간, 뇌는 그 감정을 막연한 공포가 아닌 '통과해 온 역사'로 분류하기 시작합니다. 우울한 기분을 인화지에 옮기듯 하나씩 적어 내려가 보세요. 그 조각들이 모여 훗날 당신의 인생 앨범에서 가장 묵직하고 아름다운 흑백 페이지를 장식할 것입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 당신의 모든 노출을 사랑하세요</h3>
            <p className="break-keep">
              인생이라는 거대한 작업실에는 원색의 기쁨도, 채도 낮은 슬픔도 모두 귀한 재료입니다. 오늘 당신의 마음이 조금 어둡고 가라앉아 있다면, 그것은 당신이 그만큼 깊고 철학적인 이야기를 써 내려가고 있다는 증거입니다. 그 어두운 색깔조차 당신만이 낼 수 있는 고유한 필터임을 잊지 마세요. 있는 그대로의 자신을 현상하십시오. 빛과 어둠이 조화롭게 어우러진 그 지점에서, 당신이라는 존재는 비로소 완벽한 구도를 갖추게 됩니다.
            </p>

            {/* 감성 가이드 박스 */}
            <div className="grid grid-cols-1 gap-6 mt-24">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#1A1F2C] dark:to-[#0A0F1C] text-slate-800 dark:text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-400 blur-[100px] opacity-20"></div>
                <p className="text-slate-500 dark:text-slate-400 font-black text-xs uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                   Shadow Practice
                </p>
                <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-slate-800/10 dark:bg-white/10 flex items-center justify-center shrink-0"><Palette size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">오늘의 '어둠' 명명하기</p>
                       <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">슬픔의 이름을 구체적으로 지어보세요. (예: 짙은 해질녘의 우울, 바다 밑바닥의 침묵)</p>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-slate-800/10 dark:bg-white/10 flex items-center justify-center shrink-0"><Ghost size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">심연과의 대화</p>
                       <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Adele이나 Radiohead의 곡들처럼 묵직한 공백이 있는 음악과 함께 기록을 남겨보세요.</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-8 md:p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 group hover:border-slate-400 transition-all cursor-pointer">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-slate-600 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-4 text-slate-600 dark:text-slate-400 font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">어둠을 통과해야 비로소 보이는 빛깔들,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">있는 그대로의 나 현상하기</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-[32px] font-black text-xl shadow-2xl hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              차분하게 현상하기 🌑
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}