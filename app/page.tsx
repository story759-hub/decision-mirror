'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import Link from 'next/link';

type Stage = 'pick' | 'resonate' | 'deep' | 'analyzing' | 'result';

const EMOTION_DATA: { [key: string]: any } = {
  joy: { 
    label: "기쁨", 
    icon: "✨", 
    color: "from-yellow-400 to-orange-400", 
    bgColor: "bg-yellow-50", 
    img: "/images/joy.png", 
    resonate: "기분 좋은 파동이 여기까지 느껴져.", 
    reasons: ['원하던 목표나 성취', '뜻밖의 행운과 보상', '사랑하는 이와 함께', '인정받고 칭찬받음', '충분한 휴식과 여유', '설레는 새로운 계획'] 
  },
  sadness: { 
    label: "슬픔", 
    icon: "💧", 
    color: "from-blue-400 to-indigo-500", 
    bgColor: "bg-blue-50", 
    img: "/images/sadness.png", 
    resonate: "조금은 울적해도 돼. 나 여기 있어.", 
    reasons: ['관계의 서운함, 이별', '자책과 깊은 후회', '이유 없는 우울함', '기대했던 일의 실패', '외로움과 고립감', '몸과 마음의 번아웃'] 
  },
  anger: { 
    label: "분노", 
    icon: "🔥", 
    color: "from-red-500 to-rose-600", 
    bgColor: "bg-red-50", 
    img: "/images/anger.png", 
    resonate: "마음속 불꽃이 많이 뜨거웠겠네.", 
    reasons: ['부당한 대우, 억울함', '무례한 태도에 노출', '반복되는 실수, 방해', '뜻대로 안 되는 상황', '자신에 대한 실망', '무책임한 행동들'] 
  },
  anxiety: { 
    label: "불안", 
    icon: "🌀", 
    color: "from-purple-500 to-indigo-600", 
    bgColor: "bg-purple-50", 
    img: "/images/anxiety.png", 
    resonate: "떨리는 마음도 너의 일부일 뿐이야.", 
    reasons: ['막연한 미래 걱정', '중요한 평가, 일정', '주변의 시선, 부담', '낯선 환경과 적응', '선택 앞의 망설임', '경제적인 현실 고민'] 
  },
  regret: { 
    label: "미안", 
    icon: "✉️", 
    color: "from-slate-500 to-slate-700", 
    bgColor: "bg-slate-50", 
    img: "/images/regret.png", 
    resonate: "그때의 넌 그게 최선이었을 거야.", 
    reasons: ['하지 못한 말, 행동', '상대에게 준 상처', '약속을 못지킴', '과거 잘못된 선택', '시간낭비한 기분', '챙기지 못한 마음'] 
  },
  neutral: { 
    label: "평온", 
    icon: "🌿", 
    color: "from-emerald-400 to-teal-500", 
    bgColor: "bg-emerald-50", 
    img: "/images/neutral.png", 
    resonate: "고요한 지금 이 순간이 참 좋다.", 
    reasons: ['무사히 보낸 하루', '방해 없는 휴식', '정돈된 공간, 일상', '뭔가에 몰입한 시간', '단순 평화로운 상태', '충분한 잠과 회복'] 
  }
};

export default function FeelingSnapV2() {
  const [stage, setStage] = useState<Stage>('pick');
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [textInput, setTextInput] = useState('');
  const [resultData, setResultData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const openYouTubeSearch = (songTitle: string) => {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(songTitle)}`;
    window.open(searchUrl, '_blank');
  };

  const handleFinalAnalyze = async () => {
    setStage('analyzing');
    const start = Date.now();
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mainEmotion: selectedKey, reason: selectedReason, text: textInput })
      });
      
      const aiData = await response.json();
      const wait = Math.max(0, 4000 - (Date.now() - start)); // Snap은 너무 오래 기다리게 하지 않습니다.

      setTimeout(() => {
        if (aiData) {
          setResultData({
            mix: aiData.mix || [{ key: selectedKey, rate: 100 }],
            description: aiData.description,
            song: aiData.song || "당신을 위한 추천 곡",
            mainEmotion: EMOTION_DATA[selectedKey],
            subName: selectedReason || EMOTION_DATA[selectedKey].label,
            globalShare: {
              sameEmotion: Math.floor(Math.random() * 15) + 10,
              totalSnaps: (Math.floor(Math.random() * 500) + 1240).toLocaleString(),
            }
          });
          setStage('result');
        } else {
          throw new Error("Invalid Data");
        }
      }, wait);
    } catch (error) {
      setStage('deep');
    }
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true });
      const link = document.createElement('a');
      link.download = `Snap_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("이미지 저장에 실패했습니다.");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Feeling Snap',
      text: `Snap: "${resultData?.description}"`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("링크가 클립보드에 복사되었습니다!");
      }
    } catch (err) {
      console.log("공유 실패:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 overflow-x-hidden font-sans">
      <header className="max-w-xl mx-auto pt-14 pb-8 text-center">
        <h1 
          className="text-5xl font-black tracking-tighter cursor-pointer flex justify-center items-center" 
          onClick={() => window.location.reload()}
          style={{ WebkitTextStroke: '1.2px currentColor' }}
        >
          <span className="text-[#0F172A]" style={{ WebkitTextStrokeColor: '#0F172A' }}>Feeling</span>
          <span className="text-[#E91E63] ml-1" style={{ WebkitTextStrokeColor: '#E91E63' }}>Snap</span>
        </h1>
      </header>

      <main className="max-w-md mx-auto px-6">
        {stage === 'pick' && (
          <div className="text-center space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#2D3E50]">나야, Snap.</h2>
              <p className="text-slate-400 text-lg font-medium">오늘은 어떤 쪽으로 마음이 기울었어?</p>
            </div>
            
            <div className="grid grid-cols-2 gap-5 mt-10">
              {Object.keys(EMOTION_DATA).map((key) => (
                <button key={key} onClick={() => { setSelectedKey(key); setStage('resonate'); }}
                  className={`${EMOTION_DATA[key].bgColor} p-10 rounded-[32px] hover:scale-105 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center`}>
                  <div className="text-5xl mb-4">{EMOTION_DATA[key].icon}</div>
                  <div className="font-bold text-xl text-slate-700">{EMOTION_DATA[key].label}</div>
                </button>
              ))}
            </div>

<section className="mt-20 border-t border-slate-100 pt-12 text-left opacity-60">
  <div className="flex justify-between items-end mb-6">
    <h2 className="text-xl font-bold text-slate-800 flex items-center italic">
      <span className="mr-2">Snap's Log</span>
    </h2>
    <Link href="/articles" className="text-[11px] font-bold text-slate-400 hover:text-[#E91E63] transition-colors pb-1">
      더보기 →
    </Link>
  </div>
              <div className="space-y-4">
                <Link href="/articles/1" className="block group">
                   <div className="p-1">
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#E91E63] transition-colors">
                      불안은 왜 나쁜 것만이 아닐까?
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 font-medium">불안 에너지를 준비성으로 바꾸는 법.</p>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        )}

        {stage === 'resonate' && (
          <div className="space-y-12 animate-in slide-in-from-right-4 duration-500 text-center">
             <div className="space-y-4 pt-10">
              <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full text-slate-400 uppercase tracking-widest">Snap</span>
              <p className="text-2xl font-bold text-slate-700 leading-relaxed break-keep">
                "{EMOTION_DATA[selectedKey].resonate}"
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {EMOTION_DATA[selectedKey].reasons.map((r: string) => (
                <button key={r} onClick={() => { setSelectedReason(r); setStage('deep'); }}
                  className="w-full py-5 bg-white rounded-[24px] font-bold text-lg text-slate-500 border border-slate-100 shadow-sm active:bg-slate-50 transition-all">{r}</button>
              ))}
            </div>
          </div>
        )}

        {stage === 'deep' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="px-4 text-center text-slate-400 font-medium italic">
              Snap: 괜히 잘 쓰려고 안 해도 돼.
            </div>
            <textarea className="w-full h-56 bg-[#F8FAFC] rounded-[32px] p-8 text-xl outline-none shadow-inner focus:ring-2 focus:ring-pink-100"
              value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="여기에 네 마음을 좀 더 쏟아내도 돼" />
            <button onClick={handleFinalAnalyze} className="w-full bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl active:scale-95 transition-all">
              Snap에게 마음 건네기 ✨
            </button>
          </div>
        )}
        {stage === 'analyzing' && (
          <div className="py-32 text-center space-y-8">
            <div className="w-16 h-16 border-4 border-[#E91E63] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xl font-bold text-slate-500 animate-pulse">잠깐만. 네 얘기 천천히 읽고 있어.</p>
          </div>
        )}

        {stage === 'result' && resultData && (
          <div className="space-y-8 animate-in zoom-in-95 duration-700">
            <div ref={cardRef} className="relative aspect-[3/4.5] w-full rounded-[50px] overflow-hidden shadow-2xl bg-black font-rounded" style={{ fontFamily: 'ui-rounded, "Hiragino Maru Gothic ProN", "Quicksand", "Nanum Gothic", system-ui, sans-serif' }}>
              <img src={resultData.mainEmotion.img} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="text-white space-y-4">
                  <div className="flex items-center space-x-1.5 opacity-90 mb-4">
                    <div className="text-xl font-black tracking-tighter flex items-center" style={{ WebkitTextStroke: '0.6px currentColor' }}>
                      <span className="text-white">Feeling</span>
                      <span className="text-[#E91E63] ml-0.5">Snap</span>
                    </div>
                  </div>
                  
                  <h3 className="text-4xl font-black leading-tight tracking-tighter drop-shadow-md">
                    {resultData.subName}
                  </h3>

                  <div className="pt-2">
                    <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-widest mb-2 inline-block">Snap</span>
                    <p className="text-[17px] leading-relaxed font-bold break-keep">
                      {resultData.description}
                    </p>
                  </div>
                </div>

<div className="bg-white/95 backdrop-blur-lg rounded-[40px] p-6 space-y-1 shadow-lg">
  {/* 감정 분석 그래프 섹션 */}
  <div className="space-y-4">
    {resultData.mix?.map((item: any, index: number) => (
      <div key={`${item.key}-${index}`} className="space-y-2">
        <div className="flex justify-between text-xs font-black text-slate-700 uppercase tracking-tight">
          <span>{item.label || EMOTION_DATA[item.key]?.label}</span>
          <span className="text-[#E91E63]">{item.rate}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${EMOTION_DATA[item.key]?.color || 'from-slate-400 to-slate-500'} transition-all duration-1000 ease-out`} 
            style={{ width: `${item.rate}%` }} 
          />
        </div>
      </div>
    ))}
  </div>

  {/* 사운드트랙 섹션 (문구 없이 바로 노출) */}
  <div className="pt-2">
    <div className="pt-5 border-t border-slate-100 flex justify-between items-center">
      <div className="flex flex-col min-w-0">
        <span className="text-[9px] font-black text-[#E91E63] tracking-widest opacity-80 uppercase mb-0.5">Soundtrack</span>
        {resultData.song.includes(' - ') ? (
          <>
            <p className="text-[10px] font-bold text-slate-400 leading-tight truncate">
              {resultData.song.split(' - ')[0]}
            </p>
            <p className="text-[14px] font-black text-slate-800 leading-tight truncate">
              {resultData.song.split(' - ')[1]}
            </p>
          </>
        ) : (
          <p className="text-[14px] font-black text-slate-800 leading-tight truncate">
            {resultData.song}
          </p>
        )}
      </div>
      <button 
        onClick={() => openYouTubeSearch(resultData.song)}
        className="flex-shrink-0 w-9 h-9 bg-[#E91E63] rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-md ml-4"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  </div>

{/* 하단 통계 섹션 (공감도) */}
<div className="pt-4 border-t border-slate-50 flex justify-between items-end">
  {/* 왼쪽: 설명 문구 */}
  <div className="text-[11px] font-bold text-slate-500 leading-tight flex-1 mr-4">
    오늘 이 감정을 고른 사람 중,<br />
    <span className="text-[#E91E63]">{resultData.globalShare.sameEmotion}%</span>가 너랑 같은 이유를 골랐어
  </div>

  {/* 오른쪽: Snap 수 (오른쪽 정렬) */}
<div className="text-[15px] font-bold text-pink-300 text-right whitespace-nowrap">
  snaps #{resultData.globalShare.totalSnaps}
  </div>
  </div>
</div>              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button onClick={handleSaveImage} className="py-6 bg-white rounded-3xl font-bold text-sm shadow-sm border border-slate-100 active:bg-slate-50 flex flex-col items-center gap-1">
                <span>💾</span><span>Snap 저장</span>
              </button>
              <button onClick={handleShare} className="py-6 bg-white rounded-3xl font-bold text-sm shadow-sm border border-slate-100 active:bg-slate-50 flex flex-col items-center gap-1">
                <span>🔗</span><span>공유하기</span>
              </button>
              <button onClick={() => window.location.reload()} className="py-6 bg-[#1A1F2C] text-white rounded-3xl font-bold text-sm flex flex-col items-center gap-1">
                <span>↻</span><span>새 스냅</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}