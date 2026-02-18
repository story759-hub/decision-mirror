'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  Image as ImageIcon, 
  Wind, 
  Focus, 
  Camera, 
  ChevronRight,
  Music,
  Heart,
  Eye
} from 'lucide-react';
import Link from 'next/link';

// 아티클 고유 정보 설정
const ARTICLE_INFO = {
  id: "things-seen-when-stopped", 
  title: "가끔은 멈춰서야 보이는 것들: 셔터를 누르는 이유",
  category: "Essay",
  artNo: "01",
  nextId: "comfort-in-monochrome-emotions", 
  nextTitle: "무채색의 감정이 주는 위로: 선명하지 않아도 괜찮아",
  charCount: "1,820",
  readTime: "20"
};

export default function ArticleOne() {
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
      text: '기록되지 않은 시간은 망각 속으로 사라지지만, 당신이 머물러 준 감정은 빛이 됩니다.',
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
          className="h-full bg-gradient-to-r from-[#E91E63] to-[#FF4D8D] transition-all duration-150"
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
              <span className="bg-pink-50 dark:bg-pink-950/30 text-[#E91E63] dark:text-[#FF4D8D] text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-pink-100 dark:border-pink-900/30">
                {ARTICLE_INFO.category}
              </span>
              <span className="text-slate-300 dark:text-slate-700 text-xs font-bold font-mono tracking-widest">ART NO. {ARTICLE_INFO.artNo}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] dark:text-white leading-[1.1] tracking-tighter break-keep">
              가끔은 멈춰서야 보이는 것들: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-rose-400 font-black">셔터를 누르는 삶의 기술</span>
            </h2>

            <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400 dark:text-slate-500 text-sm font-bold pt-2">
              <span className="flex items-center gap-1.5"><Clock size={16} /> {ARTICLE_INFO.readTime} min read</span>
              <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
              <span>{ARTICLE_INFO.charCount} Characters</span>
            </div>
          </header>

          <section className="space-y-12 text-[18px] md:text-[20px] leading-[1.9] text-slate-600 dark:text-slate-400 font-medium">
            
            <p className="break-keep font-bold text-slate-900 dark:text-slate-100 text-xl italic border-l-4 border-[#E91E63] pl-6 py-2">
              "바쁘게 달리는 기차 안에서는 풍경이 그저 긴 선으로 보일 뿐이지만, 기차에서 내려 발을 멈추면 비로소 한 송이 꽃의 꽃잎 결이 보입니다."
            </p>

            <p className="break-keep">
              우리는 너무 자주, 그리고 너무 빨리 걷습니다. 손목 위의 시계와 스마트폰 속의 일정표는 끊임없이 우리를 어딘가로 밀어냅니다. 효율과 속도가 미덕인 세상에서 멈춰 서는 것은 마치 뒤처지는 것 같은 공포를 주기도 하죠. 하지만 아침의 서두름이 점심의 분주함으로, 다시 저녁의 피로함으로 꼬리를 물고 이어지는 이 거대한 가속도 속에서, 정작 내가 지금 어떤 표정을 짓고 있는지, 내 마음의 날씨는 어떠한지 살펴볼 기회는 사라지고 맙니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Focus className="text-[#E91E63]" size={32} />
              1. 멈추지 않으면 결코 보이지 않는 것들
            </h3>
            <p className="break-keep">
              사진가가 피사체를 마주하며 조리개 값을 조정하고 초점을 맞추는 그 짧은 찰나, 세상의 시계는 잠시 멈춥니다. 그 정지된 시간 속에서 우리는 비로소 대상을 '관찰'하기 시작합니다. 길가에 핀 이름 모를 들꽃의 미세한 흔들림, 오후의 낮은 햇살이 벽면에 그어놓은 긴 그림자의 온도, 그리고 그 풍경을 바라보는 나의 복잡미묘한 마음의 결까지 말입니다.
            </p>
            <p className="break-keep">
              이것은 단순히 풍경을 보는 행위가 아닙니다. 외부를 향해있던 시선의 렌즈를 내면으로 돌리는 과정입니다. 멈추어 서서 셔터 위에 손가락을 올리는 순간, 우리는 비로소 '나'라는 주체로 돌아옵니다. 타인이 정해준 속도가 아니라, 오직 내가 감각하는 지금 이 순간의 해상도에 집중하게 되는 것이죠.
            </p>

            <div className="bg-pink-50 dark:bg-pink-950/20 p-10 rounded-[40px] border border-pink-100 dark:border-pink-900/30 my-16 relative overflow-hidden">
              <Wind className="absolute -right-4 -top-4 text-pink-200/50 dark:text-pink-800/20" size={120} />
              <h4 className="text-xl font-black text-[#E91E63] dark:text-[#FF4D8D] mb-4">일상의 조리개를 개방하는 법</h4>
              <p className="text-base leading-relaxed dark:text-slate-300 italic">
                너무 선명하게 살려고 애쓰지 마세요. 때로는 조리개를 활짝 열어(Open Aperture) 주변의 복잡한 소음들을 부드럽게 날려버려야 합니다. 오직 지금 당신의 심장박동과 손끝의 감각에만 초점을 맞추는 것, 그것이 가장 선명한 삶을 사는 비결입니다.
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <Heart className="text-[#E91E63]" size={32} />
              2. 셔터를 누르는 찰나의 정직한 용기
            </h3>
            <p className="break-keep">
              감정을 기록하기 위해 셔터를 누르는 데는 약간의 용기가 필요합니다. 우리는 흔히 행복하고 빛나는 순간만을 사진으로 남기고 싶어 하죠. 하지만 삶의 진짜 질감은 때로 슬픔, 무기력, 혹은 불안 같은 어두운 색조에서 더 선명하고 깊게 드러나기도 합니다.
            </p>
            <p className="break-keep">
              지금 내 마음이 조용히 가라앉아 있음을 인정하고, 그 차분한 그늘을 텍스트로 현상하는 순간, 그 감정은 더 이상 나를 휘두르는 괴물이 아닙니다. 그것은 내가 충분히 관찰하고 다독일 수 있는 하나의 **'정서적 장면'**이 됩니다. Feeling Snap에 당신의 어두운 감정을 기록하는 것은, 그 감정에게 자리를 내어주고 스스로를 긍정하는 가장 정직한 위로의 행위입니다.
            </p>

            <div className="relative border-y border-slate-100 dark:border-slate-800 py-12 my-16 text-center">
               <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-[#0A0F1C] px-4">
                 <Eye className="text-[#E91E63]" size={24} />
               </span>
               <p className="text-2xl md:text-3xl font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed">
                 "기록되지 않은 시간은 망각 속으로 사라지지만, <br/>당신이 머물러 준 감정의 순간은 빛이 되어 내일을 지킵니다."
               </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white mt-24 flex items-center gap-3">
              <ImageIcon className="text-[#E91E63]" size={32} />
              3. 인화된 마음이 미래의 나에게 보내는 편지
            </h3>
            <p className="break-keep">
              시간이 한참 흐른 뒤에 낡은 앨범을 꺼내 보는 것이 특별한 이유는, 사진이 그때의 공기, 냄새, 그리고 잊고 있던 미세한 감각들을 고스란히 소환하기 때문입니다. Feeling Snap을 통해 남긴 오늘의 짧은 스냅들은 훗날 지쳐있는 미래의 당신에게 가장 따뜻한 말을 걸어올 것입니다. 
            </p>
            <p className="break-keep">
              "그때 너는 이런 이유로 흔들렸지만, 동시에 그 흔들림마저 기록할 줄 아는 용감한 사람이었어"라고 말이죠. 기록은 과거를 묶어두는 사슬이 아니라, 미래를 지탱하는 뿌리가 됩니다. 매일 한 장의 마음 스냅을 찍는 일은, 그렇게 당신의 인생이라는 필름에 깊이와 계조를 더해가는 과정입니다.
            </p>

            <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white">결론: 당신만의 조리개를 열어두세요</h3>
            <p className="break-keep">
              세상이 정해준 표준 노출값에 당신의 삶을 맞추지 마세요. 가끔은 너무 밝게, 때로는 조금 어둡게 찍혀도 괜찮습니다. 당신만의 속도로 셔터를 누를 때, 비로소 인생이라는 긴 필름은 오직 당신만이 가질 수 있는 독보적인 색채로 채워지기 시작할 것입니다. 주저하지 말고 지금 이 순간, 당신의 마음을 향해 셔터를 누르세요.
            </p>

            {/* 추천 사운드트랙 */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[40px] border border-slate-100 dark:border-slate-800 space-y-6 mt-16">
              <div className="flex items-center gap-3 text-[#E91E63]">
                <Music size={20} />
                <p className="font-black text-sm uppercase tracking-widest">Today's Recommend Soundtrack</p>
              </div>
              <ul className="text-slate-600 dark:text-slate-400 text-base space-y-4 font-bold">
                <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span>Bill Evans - Peace Piece</span>
                  <span className="text-xs opacity-50 font-mono italic text-right">정지된 시간 속 평온을 주는 재즈</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span>어떤날 - 출발</span>
                  <span className="text-xs opacity-50 font-mono italic text-right">새로운 시선을 위한 담백한 선율</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 다음 아티클 추천 카드 */}
          <section className="mt-32 p-10 rounded-[50px] bg-[#1A1F2C] text-white group hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
            <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
               <Camera size={200} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Next Insight</p>
            <Link href={`/articles/${ARTICLE_INFO.nextId}`} className="block relative z-10">
              <h4 className="text-2xl font-black leading-tight group-hover:text-[#E91E63] transition-colors">
                {ARTICLE_INFO.nextTitle}
              </h4>
              <div className="flex items-center gap-2 mt-6 text-white font-bold text-sm">
                이어 읽기 <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </section>

          <footer className="mt-40 pt-16 border-t border-slate-100 dark:border-slate-800 text-center relative">
            <div className="mb-12">
               <Camera className="mx-auto mb-6 text-[#E91E63] opacity-50" size={32} />
               <p className="text-slate-400 dark:text-slate-600 text-sm font-medium mb-2">당신만의 소중한 감정의 찰나,</p>
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">지금 그 셔터를 눌러볼까요?</h3>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="w-full max-w-sm bg-[#E91E63] text-white py-6 rounded-[32px] font-black text-xl shadow-[0_20px_50px_rgba(233,30,99,0.3)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              지금 내 감정 기록하기 📷
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}