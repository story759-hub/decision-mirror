'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Users, 
  Aperture, 
  Layers, 
  Sparkles, 
  ChevronRight,
  Music,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "psychology-of-feeling-behind", 
  title: "나만 뒤처지는 것 같을 때의 심리학",
  category: "Social Psychology",
  artNo: "07",
  nextId: "filter-of-perfectionism", 
  nextTitle: "완벽주의라는 필터: 때로는 노이즈가 아름답다",
  charCount: "1,680",
  readTime: "17"
};

export default function ArticleSeven() {
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
      text: '타인의 하이라이트와 나의 비하인드 씬을 비교하지 마세요.',
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
          className="h-full bg-gradient-to-r from-indigo-400 to-indigo-700 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* 플로팅 네비게이션 */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 px-6 py-3 rounded-full shadow-xl flex justify-between items-center">
          <button 
            onClick={() => router.push('/articles')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Insights
          </button>
          <div className="flex gap-5 items-center">
            <button onClick={handleShare} className="text-slate-400 hover:text-indigo-600 transition-colors p-1">
              <Share2 size={18}/>
            </button>
            <button onClick={handleSave} className={`transition-all p-1 ${isSaved ? 'text-[#E91E63] scale-110' : 'text-slate-400 hover:text-indigo-600'}`}>
              <Bookmark size={18} className={isSaved ? 'fill-[#E91E63]' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 pt-32">
        <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          <header className="mb-20 space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-indigo-100 dark:border-indigo-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              나만 뒤처지는 것 같을 때의 심리학: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-800 font-black">모든 필름은 인화 속도가 다르다</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-indigo-400 pl-6 py-2">
              "인생은 경주가 아니라 전시다. 누가 먼저 도착하느냐보다, 어떤 질감의 시간을 채워 넣느냐가 더 중요하다."
            </p>

            <p className="break-keep">
              SNS를 열면 타인의 삶은 언제나 눈부신 하이라이트 릴처럼 빛납니다. 누군가의 승진, 누군가의 결혼, 성공적인 재테크나 화려한 여행 사진들. 그 틈바구니에서 나의 지극히 평범한 일상을 바라보면, 마치 초점이 나간 실패작처럼 느껴질 때가 있습니다. 심리학에서는 이를 **'사회적 비교 이론(Social Comparison Theory)'**이라 부릅니다. 우리는 무의식중에 타인의 연출된 '베스트 컷'을 나의 다듬어지지 않은 '내면'과 비교하며 스스로를 깎아내리곤 합니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <EyeOff className="text-indigo-500" size={32} />
              1. 하이라이트와 비하인드 씬의 오류
            </h3>
            <p className="break-keep">
              우리가 보는 타인의 모습은 수백 장의 파지(破紙) 중 가장 선명하게 나온 단 한 장의 사진입니다. 하지만 내가 경험하는 나의 삶은 편집되지 않은 날 것 그대로의 '비하인드 씬'과 수많은 'NG 장면'의 연속이죠. 남의 잘 정돈된 포트폴리오와 나의 어지러운 작업실을 비교하는 것은 애초에 공정하지 못한 게임입니다. 
            </p>
            <p className="break-keep">
              사진에서 배경을 흐릿하게 날리는 '아웃포커싱' 기법은 주인공을 돋보이게 하지만, 삶에서 타인에게만 과도하게 초점을 맞추는 아웃포커싱은 정작 주인공인 나 자신을 흐릿한 배경으로 전락시킵니다. 지금 당신의 렌즈가 타인의 성취만을 쫓고 있지는 않은지, 뷰파인더를 점검해야 할 때입니다.
            </p>

            <div className="bg-indigo-50 dark:bg-indigo-950/20 p-10 rounded-[40px] border border-indigo-100 dark:border-indigo-900/30 my-16">
              <Aperture className="text-indigo-500 mb-6" size={32} />
              <h4 className="text-xl font-black text-indigo-800 dark:text-indigo-400 mb-4">현상액 속의 비밀</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                이미지가 떠오르는 속도는 필름의 종류와 현상액의 온도에 따라 모두 다릅니다. 어떤 것은 1분 만에 나타나지만, 어떤 필름은 10분이 지나서야 비로소 깊이 있는 계조를 드러내죠. 당신이라는 필름이 아직 백지라면, 그것은 뒤처진 것이 아니라 '깊은 색'을 머금기 위해 더 긴 인화 시간을 보내는 중일뿐입니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">2. 나만의 '계조'를 찾는 기록법</h3>
            <p className="break-keep">
              사진에서 '계조(Gradation)'는 가장 밝은 곳부터 가장 어두운 곳까지 이어지는 단계적인 농도 차이를 말합니다. 풍부한 계조를 가진 사진이 입체적이듯, 우리 삶도 밝은 성취(High-light)뿐만 아니라 어두운 고민과 실패(Shadow)가 조화를 이룰 때 비로소 깊이 있는 명작이 됩니다. 
            </p>
            <p className="break-keep">
              타인의 선명한 원색에 눈 돌리지 마세요. 대신 당신의 어둠이 얼마나 부드러운지, 당신의 그림자가 얼마나 긴 서사를 품고 있는지 관찰하세요. **Feeling Snap**에 "불안함 80%, 조바심 20%"라고 솔직하게 기록하는 행위는, 비교의 렌즈를 닦아내고 '지금 여기'의 나에게 초점을 맞추는 가장 강력한 심리적 도구가 됩니다. 기록되는 순간, 감정은 나를 지배하는 폭풍이 아니라 분석 가능한 '데이터'가 됩니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Users className="text-indigo-400" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "타인의 속도는 <br/>나의 도착 시간을 결정하지 않습니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">3. Feeling Snap: 비교 대신 관찰하기</h3>
            <p className="break-keep">
              뒤처지는 기분이 들 때, 억지로 긍정적인 마음을 먹으려 애쓰지 마세요. 그저 Feeling Snap을 켜고 지금의 '조바심'을 한 장의 스냅으로 남기세요. 내가 왜 뒤처진다고 느끼는지, 그 비교의 대상은 누구인지 글로 적어 내려가다 보면 깨닫게 됩니다. 내가 부러워했던 것은 타인의 '성취'가 아니라, 타인이 가진 '확신'이었다는 사실을 말이죠.
            </p>
            <p className="break-keep">
              기록은 외부로 향해있던 시선을 내부로 돌려줍니다. 매일 쌓이는 당신의 기록은 당신이 누구보다 성실하게 자신만의 속도를 지켜내고 있다는 가장 확실한 증거입니다. 남들이 100미터 달리기를 할 때 당신이 숲길을 산책하고 있다면, 당신은 늦은 게 아니라 '다른 풍경'을 보고 있는 것입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 당신의 현상기는 여전히 작동 중입니다</h3>
            <p className="break-keep">
              조급해하지 마세요. 당신이라는 필름은 지금 가장 풍부한 색채를 머금기 위해 현상액 속에서 기다리는 중일 뿐입니다. 타인의 화려한 필터에 현혹되지 않고 오직 당신만의 명도와 채도를 믿을 때, 세상에 단 한 장뿐인 명작이 탄생합니다. 당신의 셔터는 오늘도 당신만의 진실된 순간을 찍을 준비가 되어 있습니다.
            </p>

            {/* 실천 가이드 */}
            <div className="grid grid-cols-1 gap-6 mt-24">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-indigo-900 to-[#1A1F2C] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 blur-[100px] opacity-20"></div>
                <p className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                   Mindful Focus Practice
                </p>
                <div className="space-y-6">
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Aperture size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">비교 렌즈 닦아내기</p>
                       <p className="text-sm text-indigo-100/70 leading-relaxed">질투가 날 때 "그는 그고, 나는 나다"라고 세 번 소리 내어 말해보세요. 뇌의 연합영역이 타인과 나를 분리하기 시작합니다.</p>
                     </div>
                   </div>
                   <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Layers size={18}/></div>
                     <div>
                       <p className="font-bold text-lg">비하인드 씬 기록법</p>
                       <p className="text-sm text-indigo-100/70 leading-relaxed">오늘 가장 보잘것없다고 느껴졌던 'NG 장면' 하나를 기록하세요. 그것이 훗날 당신의 인간미 넘치는 포트폴리오의 핵심이 됩니다.</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-8 md:p-10 rounded-[40px] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 group hover:border-indigo-500/30 transition-all cursor-pointer">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-4 text-indigo-600 font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">남들의 속도가 아닌 당신의 리듬으로,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">오늘의 나를 있는 그대로 인화하기</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-slate-900 dark:bg-indigo-600 text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(79,70,229,0.2)] hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 mx-auto"
            >
              나만의 속도로 기록하기 🎞️
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}