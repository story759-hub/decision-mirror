'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  User, 
  Sparkles, 
  Fingerprint, 
  Aperture, 
  ChevronRight,
  Music,
  Camera,
  Layers
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "beyond-the-lens", 
  title: "렌즈 너머의 나: 카메라가 미처 담지 못한 진정한 자아를 찾는 법",
  category: "Identity",
  artNo: "17",
  nextId: "color-of-mind", 
  nextTitle: "마음의 채도: 당신의 하루는 어떤 색으로 인화되고 있나요?",
  charCount: "1,850",
  readTime: "22"
};

export default function ArticleSeventeen() {
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
      text: '카메라 렌즈는 당신의 외면을 찍지만, Feeling Snap은 당신의 영혼을 기록합니다.',
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
          className="h-full bg-gradient-to-r from-purple-400 to-indigo-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-purple-600 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-purple-600 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-purple-600 scale-110' : 'text-slate-400 hover:text-purple-600'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-purple-600' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-purple-100 dark:border-purple-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              렌즈 너머의 나: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 font-black">담지 못한 진정한 자아</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-purple-400 pl-6 py-2">
              "카메라는 보이는 것만을 기록하지만, 당신이라는 피사체는 보이지 않는 수만 겹의 층(Layer)으로 이루어져 있습니다."
            </p>

            <p className="break-keep">
              우리는 이미지의 시대를 살고 있습니다. 거울 속의 나보다 스마트폰 액정 속의 나에게 더 익숙해진 시대죠. 하지만 필터로 보정되고 잘 짜인 구도 속에 놓인 그 모습이 정말 '나'일까요? 우리는 종종 타인의 렌즈에 비친 자신의 모습을 진정한 자아라고 착각하곤 합니다. 하지만 사진의 프레임이 실제 풍경의 극히 일부분만을 잘라내듯, 이미지로 표현되는 당신 또한 당신의 거대한 우주 중 지극히 작은 조각일 뿐입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Fingerprint className="text-purple-500" size={32} />
              1. 프레임 밖의 진실: 보여주지 않은 아름다움
            </h3>
            <p className="break-keep">
              사진에서 가장 중요한 것은 무엇을 찍느냐만큼이나 무엇을 '제외하느냐'입니다. 우리가 SNS에 올리는 사진 한 장을 위해 수십 번의 셔터를 누르고, 지저분한 배경을 프레임 밖으로 밀어내듯, 우리 삶도 편집된 채 보여집니다. 하지만 정작 우리를 성장시키는 것은 그 프레임 밖에 놓인 지저분한 고군분투, 눈물 섞인 노력, 그리고 정돈되지 않은 감정들입니다. 
            </p>
            <p className="break-keep">
              진정한 자아는 완벽하게 세팅된 스튜디오가 아니라, 편집되지 않은 일상의 소란스러움 속에 존재합니다. Feeling Snap은 바로 그 '편집되지 않은 순간'들을 기록하기 위해 존재합니다. 멋진 풍경이 아니어도, 예쁜 표정이 아니어도 괜찮습니다. 프레임 너머에 있는 당신의 민낯이야말로 세상에 단 하나뿐인 오리지널 데이터이기 때문입니다.
            </p>

            <div className="bg-purple-50 dark:bg-purple-950/20 p-10 rounded-[40px] border border-purple-100 dark:border-purple-900/30 my-16 relative overflow-hidden">
              <Layers className="absolute -right-4 -top-4 text-purple-200/50 dark:text-purple-800/20" size={120} />
              <h4 className="text-xl font-black text-purple-800 dark:text-purple-400 mb-4">자아의 다중 레이어(Multi-Layer)</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                사진 편집 프로그램에는 수많은 레이어가 겹쳐져 하나의 이미지를 만듭니다. 당신도 마찬가지입니다. 누군가의 자녀, 직장인, 친구라는 사회적 레이어 아래에 숨겨진 '꿈꾸는 나', '아파하는 나', '침묵하는 나'의 레이어를 하나씩 분리해 보세요. 가장 아래쪽, 아무런 효과도 적용되지 않은 그 원본(Raw) 레이어에 집중할 때 진정한 위로가 시작됩니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Aperture className="text-purple-500" size={32} />
              2. 셔터를 누르는 주체가 되는 법
            </h3>
            <p className="break-keep">
              많은 사람이 인생이라는 카메라 앞에서 '피사체'로만 살아가려 합니다. 남들이 나를 어떻게 찍어줄지, 세상이라는 렌즈에 내가 어떻게 투영될지만을 고민하죠. 하지만 주체적인 삶이란 직접 카메라를 들고 자신의 삶을 바라보는 '작가'가 되는 것입니다.
            </p>
            <div className="space-y-4 my-8">
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center shrink-0 text-purple-600"><Camera size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>관찰자의 시선 확보:</strong> 나를 피사체가 아닌 관찰자로 포지셔닝하세요. "나는 지금 왜 이런 기분이 들까?"라고 질문하는 순간, 당신은 상황에 휘둘리는 피해자가 아니라 삶을 기록하는 작가가 됩니다.</p>
               </div>
               <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-4 border border-slate-100 dark:border-slate-800">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center shrink-0 text-purple-600"><Sparkles size={18}/></div>
                  <p className="text-base leading-relaxed"><strong>독창적인 노출값 설정:</strong> 세상의 기준(평균 노출)에 맞추지 마세요. 당신의 감정이 어둡다면 어두운 대로(Low Key), 밝다면 밝은 대로(High Key) 그 고유한 명도를 인정하는 것이 자아 존중의 시작입니다.</p>
               </div>
            </div>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <User className="text-purple-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "카메라는 당신의 피부를 찍지만, <br/>기록은 당신의 영혼을 인화합니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Sparkles className="text-purple-500" size={32} />
              3. Feeling Snap: 당신이라는 명작을 완성하는 데이터
            </h3>
            <p className="break-keep">
              우리는 완성된 사진만을 사랑하려 합니다. 하지만 명작은 수만 장의 파지(버려진 사진)와 시행착오 끝에 탄생합니다. Feeling Snap에 남기는 서툰 감정들, 흔들린 생각들은 결코 실패한 컷이 아닙니다. 그것들은 당신이라는 거대한 예술 작품을 구성하는 필수적인 에스키스(Sketch)입니다.
            </p>
            <p className="break-keep">
              누군가에게 보여주기 위한 '이미지'가 아니라, 오직 나만이 이해할 수 있는 '진실'을 수집하세요. 1년 뒤, 5년 뒤 당신이 쌓아온 이 기록들을 되돌아볼 때, 당신은 비로소 깨닫게 될 것입니다. 렌즈가 미처 담지 못했던 그 수많은 결핍과 흔들림이야말로 당신을 이토록 아름답게 빚어낸 빛의 흔적들이었음을 말입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 가장 완벽한 필터는 '정직함'입니다</h3>
            <p className="break-keep">
              어떤 화려한 보정 기술도 진심이 담긴 찰나의 표정을 이길 수 없습니다. 오늘 당신의 마음이 조금 흐리더라도, 혹은 초점이 빗나가 있더라도 괜찮습니다. 그 모습 그대로를 기록하는 용기가 당신을 프레임 밖의 진짜 세상으로 인도할 것입니다. 당신은 이미지보다 훨씬 크고, 렌즈보다 훨씬 깊은 존재니까요.
            </p>

            {/* 추천 사운드트랙 */}
            <div className="p-8 bg-purple-50 dark:bg-purple-900/40 rounded-[40px] border border-purple-100 dark:border-purple-800 space-y-6 mt-16">
              <div className="flex items-center gap-3 text-purple-600">
                <Music size={20} />
                <p className="font-black text-sm uppercase tracking-widest">Soundtrack for Identity</p>
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-base space-y-4 font-bold">
                <li className="flex justify-between items-center border-b border-purple-200 dark:border-purple-800 pb-2">
                  <span>Ryuichi Sakamoto - Merry Christmas Mr. Lawrence</span>
                  <span className="text-xs opacity-50 font-mono italic">자아의 심연을 탐험하는 정갈한 선율</span>
                </li>
                <li className="flex justify-between items-center border-b border-purple-200 dark:border-purple-800 pb-2">
                  <span>Coldplay - Fix You</span>
                  <span className="text-xs opacity-50 font-mono italic">부서진 조각들을 이어붙이는 빛의 위로</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-10 rounded-[50px] bg-gradient-to-br from-purple-600 to-indigo-700 text-white group hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
               <Aperture size={200} />
            </div>
            <p className="text-[10px] font-black text-purple-100/60 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block relative z-10">
              <h4 className="text-2xl font-black leading-tight group-hover:text-purple-100 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-6 text-white font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <Fingerprint className="mx-auto mb-6 text-purple-400" size={32} />
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">프레임 밖의 진짜 당신을 만날 시간입니다.</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">오늘의 당신은 어떤 레이어를 갖고 있나요?</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-purple-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(147,51,234,0.3)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              진정한 나를 기록하기 📸
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}