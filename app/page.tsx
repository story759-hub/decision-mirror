'use client';

import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import Link from 'next/link';
import { Sparkles, Droplets, Flame, Tornado, Mail, Leaf, Play } from 'lucide-react';
import { Nanum_Pen_Script, Nanum_Myeongjo } from 'next/font/google';

const handwriting = Nanum_Pen_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const myeongjo = Nanum_Myeongjo({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

type Stage = 'pick' | 'resonate' | 'deep' | 'analyzing' | 'result';

const EMOTION_DATA: { [key: string]: any } = {
  joy: {
    label: "기쁨",
    icon: <Sparkles size={40} strokeWidth={1.2} className="text-yellow-500" />,
    color: "from-yellow-400 to-orange-400",
    bgColor: "bg-yellow-50/50",
    img: "/images/joy.png",
    resonate: "밝은 쪽으로 기울어진 상태",
    reasons: ['남아 있는 여운', '확인된 결과', '예상 밖의 보상', '잠깐의 고조', '충분한 여백']
  },
  sadness: {
    label: "슬픔",
    icon: <Droplets size={40} strokeWidth={1.2} className="text-blue-500" />,
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-50/50",
    img: "/images/sadness.png",
    resonate: "조용히 가라앉은 지점",
    reasons: ['마침표 이후', '지나간 장면', '불투명한 상태', '기대가 무너진 쪽']
  },
  anger: {
    label: "분노",
    icon: <Flame size={40} strokeWidth={1.2} className="text-red-500" />,
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50/50",
    img: "/images/anger.png",
    resonate: "온도가 올라간 채로",
    reasons: ['어긋난 상황', '반복된 방해', '넘어진 선', '참지 않기로 한 쪽']
  },
  anxiety: {
    label: "불안",
    icon: <Tornado size={40} strokeWidth={1.2} className="text-purple-500" />,
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50/50",
    img: "/images/anxiety.png",
    resonate: "아직 좌표가 없다",
    reasons: ['정해지지 않은 방향', '시선이 많은 자리', '예측 불가']
  },
  regret: {
    label: "미안",
    icon: <Mail size={40} strokeWidth={1.2} className="text-slate-500" />,
    color: "from-slate-500 to-slate-700",
    bgColor: "bg-slate-50/50",
    img: "/images/regret.png",
    resonate: "이미 지나간 쪽",
    reasons: ['전하지 못한 말', '늦은 인식', '돌릴 수 없는 선택']
  },
  neutral: {
    label: "평온",
    icon: <Leaf size={40} strokeWidth={1.2} className="text-emerald-500" />,
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-50/50",
    img: "/images/neutral.png",
    resonate: "특별한 흔들림 없음",
    reasons: ['정돈된 흐름', '방해 없는 정지', '평균선 위']
  }
};

export default function FeelingSnapFinal() {
  const [stage, setStage] = useState<Stage>('pick');
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [textInput, setTextInput] = useState('');
  const [resultData, setResultData] = useState<any>(null);
  const [stamp, setStamp] = useState({ date: '', time: '' });
  const [loadingText, setLoadingText] = useState('초점을 맞추는 중');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let fp = localStorage.getItem('snap_fp');
      if (!fp) {
        fp = 'fp_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('snap_fp', fp);
      }
    }
  }, []);

  useEffect(() => {
    if (stage === 'analyzing') {
      const now = new Date();
      setStamp({
        date: `${String(now.getFullYear()).slice(-2)}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`,
        time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      });

      const texts = ['조리개 값을 조정하는 중', '셔터를 누르는 찰나', '빛을 기록하는 중', '필름을 현상하는 중', '인화하는 중'];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 1700);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const openYouTubeSearch = (songTitle: string) => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(songTitle)}`;
    window.open(searchUrl, '_blank');
  };

  const handleFinalAnalyze = async () => {
    setStage('analyzing');
    const startTime = Date.now();
    const fingerprint = typeof window !== 'undefined' ? localStorage.getItem('snap_fp') : null;

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mainEmotion: selectedKey,
          reason: selectedReason,
          text: textInput || "특별한 설명 없음",
          fingerprint
        })
      });
      
      const aiData = await response.json();
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 4000 - elapsedTime);

      setTimeout(() => {
        const finalData = {
          ...aiData,
          mix: (Array.isArray(aiData?.mix) ? aiData.mix : []).map((m: any) => ({
            ...m,
            label: m.label || EMOTION_DATA[m.key]?.label || "기록된 마음",
            color: EMOTION_DATA[m.key]?.color || "from-slate-400 to-slate-500",
          })),
          mainEmotion: EMOTION_DATA[selectedKey] || EMOTION_DATA.neutral,
          subName: selectedReason || EMOTION_DATA[selectedKey]?.label || "순간의 기록",
        };
        setResultData(finalData);

        const history = JSON.parse(localStorage.getItem('snap_history') || '[]');
        localStorage.setItem('snap_history', JSON.stringify([{
          date: new Date().toISOString(),
          emotion: selectedKey,
          description: aiData.description
        }, ...history].slice(0, 20)));

        setStage('result');
      }, remainingTime);
    } catch (error) {
      console.error("분석 중 에러 발생:", error);
      setStage('deep');
    }
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: '#0d0d0d'
      });
      const link = document.createElement('a');
      link.download = `Snap_${stamp.date}_${stamp.time.replace(':', '')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { alert("이미지 저장 실패"); }
  };

  // ✅ 공유하기 기능 활성화 (Web Share API)
  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], 'feeling_snap.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Feeling Snap',
          text: '오늘 나의 순간을 기록했어요.',
        });
      } else {
        alert("이 브라우저에서는 공유를 지원하지 않아요. 이미지를 저장해서 공유해 주세요!");
      }
    } catch (err) {
      alert("공유 중 오류가 발생했습니다.");
    }
  };

  const ArticleSection = () => (
    <div className="pt-10 pb-10 space-y-5 animate-in fade-in duration-700">
      <div className="flex justify-between items-end px-1">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-[#E91E63] uppercase tracking-widest">Recommended</span>
          <h4 className="text-xl font-black text-slate-800 tracking-tighter">기록을 위한 아티클</h4>
        </div>
        <Link href="/articles">
          <span className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-nowrap">전체보기 +</span>
        </Link>
      </div>
      <div className="space-y-3">
        {[
          { id: 1, title: "가끔은 멈춰서야 보이는 것들", desc: "빠르게 지나가는 일상 속에서 셔터를 누르는 이유", tag: "Essay" },
          { id: 2, title: "무채색의 감정이 주는 위로", desc: "선명하지 않아도 괜찮은 우리의 기록 방식", tag: "Column" }
        ].map((post) => (
          <Link key={post.id} href={`/articles/${post.id}`}>
            <div className="group p-5 bg-[#F8FAFC] rounded-[32px] border border-slate-50 hover:border-slate-200 transition-all cursor-pointer mb-3">
              <span className="text-[9px] font-black bg-white px-2 py-0.5 rounded text-slate-400 uppercase tracking-tighter mb-2 inline-block">{post.tag}</span>
              <h5 className="font-bold text-slate-800 mb-1 group-hover:text-[#E91E63] transition-colors">{post.title}</h5>
              <p className="text-xs text-slate-400 font-medium">{post.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-10 overflow-x-hidden font-sans">
      <header className="max-w-xl mx-auto pt-10 pb-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter cursor-pointer flex justify-center items-center"
          onClick={() => window.location.reload()} style={{ WebkitTextStroke: '1.2px currentColor' }}>
          <span className="text-[#0F172A]">Feeling</span>
          <span className="text-[#E91E63] ml-1">Snap</span>
        </h1>
      </header>

      <main className="max-w-md mx-auto px-6">
        {stage === 'pick' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section className="mb-8 px-2 border-l-2 border-[#E91E63]/20 pl-4 text-left">
              <h2 className="text-sm font-black text-slate-800 tracking-tight mb-2 uppercase">Notice</h2>
              <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                Feeling Snap은 지금의 상태를 기록 문장으로 정리하는 도구입니다. 당신의 오늘을 보관하는 용도로만 사용해 주세요.
              </p>
            </section>
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2D3E50]">지금 순간을 찍어볼까.</h2>
              <p className="text-slate-400 text-base sm:text-lg font-medium">제일 먼저 생각나는 감정을 골라봐.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(EMOTION_DATA).map((key) => (
                <button key={key} onClick={() => { setSelectedKey(key); setStage('resonate'); }}
                  className={`${EMOTION_DATA[key].bgColor} p-8 sm:p-10 rounded-[32px] hover:scale-105 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center`}>
                  <div className="mb-3">{EMOTION_DATA[key].icon}</div>
                  <div className="font-bold text-lg sm:text-xl text-slate-700">{EMOTION_DATA[key].label}</div>
                </button>
              ))}
            </div>
            <ArticleSection />
          </div>
        )}

        {stage === 'resonate' && (
          <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 text-center">
            <div className="space-y-3 pt-6">
              <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-400 uppercase tracking-widest">Snap Point</span>
              <p className="text-xl sm:text-2xl font-bold text-slate-700 leading-relaxed italic">"{EMOTION_DATA[selectedKey].resonate}"</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {EMOTION_DATA[selectedKey].reasons.map((r: string) => (
                <button key={r} onClick={() => { setSelectedReason(r); setStage('deep'); }}
                  className="w-full py-4 sm:py-5 bg-white rounded-[24px] font-bold text-base sm:text-lg text-slate-500 border border-slate-100 shadow-sm active:bg-slate-50 transition-all">{r}</button>
              ))}
            </div>
          </div>
        )}

        {stage === 'deep' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="px-4 text-center text-slate-400 text-sm font-medium italic">같이 담겼으면 하는거 있어?</div>
            <textarea className="w-full h-48 sm:h-56 bg-[#F8FAFC] rounded-[32px] p-6 sm:p-8 text-lg sm:text-xl outline-none shadow-inner"
              value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="지금 순간을 좀 더 자세히 담아보자. 없으면 그냥 넘겨도 돼" />
            <button onClick={handleFinalAnalyze} className="w-full bg-[#1A1F2C] text-white py-5 sm:py-6 rounded-[24px] font-bold text-lg sm:text-xl shadow-xl active:scale-95 transition-all">SNAP 📷</button>
          </div>
        )}

        {stage === 'analyzing' && (
          <div className="py-32 text-center space-y-10 animate-in fade-in duration-1000">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-[#E91E63] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-black text-slate-800 tracking-tight">{loadingText}</p>
              <p className="text-sm font-medium text-slate-400 italic">지금의 장면을 차분히 기록하는 중이야</p>
            </div>
          </div>
        )}

        {stage === 'result' && resultData && (
          <div className="animate-in fade-in duration-1000 ease-in-out">
            <div ref={cardRef} className="relative w-full bg-[#0d0d0d] mb-12 shadow-2xl rounded-[2px] overflow-hidden" style={{ minHeight: '740px' }}>
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <img src={resultData.mainEmotion.img} alt="snap" className="w-full h-full object-cover opacity-50 saturate-[0.8] contrast-[1.1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start opacity-40">
                    <div className="text-[10px] font-mono tracking-widest text-white uppercase">{stamp.date} / {stamp.time}</div>
                    <div className="text-[10px] font-black tracking-tighter text-[#E91E63] italic">FEELING SNAP</div>
                  </div>
                  
                  <div className="text-left space-y-4 px-1">
                    <span className={`${myeongjo.className} text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase block`}>
                      {resultData.subName}
                    </span>
                    {/* ✅ 모바일 대응: text-3xl(작은모바일) ~ text-5xl(큰모바일) 유동적 크기 및 줄바꿈 최적화 */}
                    <p className={`${handwriting.className} text-[32px] sm:text-[44px] leading-[1.3] text-white/95 drop-shadow-2xl break-keep`}
                       style={{ wordBreak: 'keep-all', textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}>
                      {resultData.description.split('\n')[0]}
                    </p>
                  </div>
                  
                  <div className="text-[9px] font-mono text-white/20 tracking-[0.5em] text-center uppercase">Archive ID. {String(resultData.displayStats?.totalCount || 0).padStart(6, '0')}</div>
                </div>
              </div>

              <div className="p-8 sm:p-10 space-y-10 bg-[#0d0d0d] text-white/60">
                {resultData.description.split('\n')[1] && (
                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-[#E91E63]/30" />
                    <p className={`${myeongjo.className} text-[14px] sm:text-[15px] font-medium leading-relaxed italic opacity-80 pl-4 break-keep`}>
                      "{resultData.description.split('\n')[1]}"
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-end border-t border-white/5 pt-8">
                  <div className="space-y-4 text-left">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Emotion Mix</span>
                    <div className="flex gap-4">
                      {resultData.mix.slice(0, 3).map((item: any, index: number) => (
                        <div key={index} className="flex flex-col">
                          <span className="text-[7px] font-bold text-white/10 uppercase mb-1">{item.label}</span>
                          <span className="text-[11px] font-mono font-bold text-white/40">{item.rate}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Now Playing</span>
                    <div className="flex items-center justify-end gap-3 group cursor-pointer" onClick={() => openYouTubeSearch(resultData.song)}>
                      <div className="text-right max-w-[140px]">
                        <p className="text-[9px] font-medium text-white/20 group-hover:text-white transition-colors truncate">
                          {resultData.song.includes(' - ') ? resultData.song.split(' - ')[0] : 'Artist'}
                        </p>
                        <p className={`${myeongjo.className} text-[11px] sm:text-[12px] font-bold text-white/40 group-hover:text-[#E91E63] transition-colors truncate italic`}>
                          {resultData.song.includes(' - ') ? resultData.song.split(' - ')[1] : resultData.song}
                        </p>
                      </div>
                      <div className="p-2 bg-white/5 group-hover:bg-[#E91E63]/20 rounded-full transition-all border border-white/10 group-hover:border-[#E91E63]/30">
                        <Play size={10} className="text-[#E91E63] fill-[#E91E63]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-8 space-y-5">
              <button onClick={handleSaveImage} className="w-full py-5 bg-white text-black rounded-full font-black text-[14px] shadow-xl active:scale-95 transition-all">이 장면 앨범에 저장</button>
              <div className="flex justify-center gap-10 pb-12">
                <button onClick={() => window.location.reload()} className="text-[11px] font-bold text-slate-400 hover:text-slate-600">다시 기록</button>
                {/* ✅ 활성화된 공유 버튼 */}
                <button onClick={handleShare} className="text-[11px] font-bold text-[#E91E63] hover:opacity-70 transition-opacity">순간 공유하기</button>
              </div>
            </div>
            <ArticleSection />
          </div>
        )}
      </main>
    </div>
  );
}