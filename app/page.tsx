'use client';

import { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import Link from 'next/link'; // 🔹 Link 임포트 추가 확인

// 🔹 globals.css에 'Bongsoong-Tint' 폰트가 등록되어 있어야 합니다.

type Stage = 'pick' | 'resonate' | 'deep' | 'analyzing' | 'result';

const EMOTION_DATA: { [key: string]: any } = {
  joy: {
    label: "기쁨",
    icon: "✨",
    color: "from-yellow-400 to-orange-400",
    bgColor: "bg-yellow-50",
    img: "/images/joy.png",
    resonate: "밝은 쪽으로 기울어진 상태",
    reasons: ['남아 있는 여운', '확인된 결과', '예상 밖의 보상', '잠깐의 고조', '충분한 여백']
  },
  sadness: {
    label: "슬픔",
    icon: "💧",
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-50",
    img: "/images/sadness.png",
    resonate: "조용히 가라앉은 지점",
    reasons: ['마침표 이후', '지나간 장면', '불투명한 상태', '기대가 무너진 쪽']
  },
  anger: {
    label: "분노",
    icon: "🔥",
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50",
    img: "/images/anger.png",
    resonate: "온도가 올라간 채로",
    reasons: ['어긋난 상황', '반복된 방해', '넘어진 선', '참지 않기로 한 쪽']
  },
  anxiety: {
    label: "불안",
    icon: "🌀",
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-purple-50",
    img: "/images/anxiety.png",
    resonate: "아직 좌표가 없다",
    reasons: ['정해지지 않은 방향', '시선이 많은 자리', '예측 불가']
  },
  regret: {
    label: "미안",
    icon: "✉️",
    color: "from-slate-500 to-slate-700",
    bgColor: "bg-slate-50",
    img: "/images/regret.png",
    resonate: "이미 지나간 쪽",
    reasons: ['전하지 못한 말', '늦은 인식', '돌릴 수 없는 선택']
  },
  neutral: {
    label: "평온",
    icon: "🌿",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-50",
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
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mainEmotion: selectedKey, 
          reason: selectedReason, 
          text: textInput || "특별한 설명 없음" 
        })
      });
      
      const aiData = await response.json();
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 8000 - elapsedTime);

      setTimeout(() => {
        setResultData({
          ...aiData,
          mix: aiData.mix.map((m: any) => ({
            ...m,
            color: EMOTION_DATA[m.key]?.color || "from-slate-400 to-slate-500",
            label: m.label || EMOTION_DATA[m.key]?.label
          })),
          mainEmotion: EMOTION_DATA[selectedKey],
          subName: selectedReason || EMOTION_DATA[selectedKey].label,
          displayStats: {
            commonRate: aiData.commonRate || "15%",
            rateLabel: aiData.rateLabel || "이 지점을 공유하는 사람은 드문 편입니다.",
            totalCount: (Math.floor(Math.random() * 500) + 1240).toLocaleString(),
          }
        });
        setStage('result');
      }, remainingTime);
    } catch (error) { 
      setStage('deep'); 
    }
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `Snap_${stamp.date}_${stamp.time.replace(':', '')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { alert("추출 실패"); }
  };

  // 공통 아티클 컴포넌트
  const ArticleSection = () => (
    <div className="pt-10 pb-10 space-y-5 animate-in fade-in duration-700">
      <div className="flex justify-between items-end px-1">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-[#E91E63] uppercase tracking-widest">Recommended</span>
          <h4 className="text-xl font-black text-slate-800 tracking-tighter">기록을 위한 아티클</h4>
        </div>
        {/* 🔹 전체보기 연결 수정 완료 */}
        <Link href="/articles">
          <span className="text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            전체보기 +
          </span>
        </Link>
      </div>

      <div className="space-y-3">
        {[
          { id: 1, title: "가끔은 멈춰서야 보이는 것들", desc: "빠르게 지나가는 일상 속에서 셔터를 누르는 이유", tag: "Essay" },
          { id: 2, title: "무채색의 감정이 주는 위로", desc: "선명하지 않아도 괜찮은 우리의 기록 방식", tag: "Column" }
        ].map((post) => (
          <div 
            key={post.id} 
            onClick={() => window.location.href = `/articles/${post.id}`}
            className="group p-5 bg-[#F8FAFC] rounded-[32px] border border-slate-50 hover:border-slate-200 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[9px] font-black bg-white px-2 py-0.5 rounded text-slate-400 uppercase tracking-tighter">{post.tag}</span>
            </div>
            <h5 className="font-bold text-slate-800 mb-1 group-hover:text-[#E91E63] transition-colors">{post.title}</h5>
            <p className="text-xs text-slate-400 font-medium">{post.desc}</p>
          </div>
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
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2D3E50]">지금 순간을 찍어볼까.</h2>
              <p className="text-slate-400 text-base sm:text-lg font-medium">제일 먼저 생각나는 감정을 골라봐.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(EMOTION_DATA).map((key) => (
                <button key={key} onClick={() => { setSelectedKey(key); setStage('resonate'); }}
                  className={`${EMOTION_DATA[key].bgColor} p-8 sm:p-10 rounded-[32px] hover:scale-105 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center`}>
                  <div className="text-4xl sm:text-5xl mb-3">{EMOTION_DATA[key].icon}</div>
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
            <div className="px-4 text-center text-slate-400 text-sm font-medium italic">같이 담겼으면 하는거 있어?.</div>
            <textarea className="w-full h-48 sm:h-56 bg-[#F8FAFC] rounded-[32px] p-6 sm:p-8 text-lg sm:text-xl outline-none shadow-inner"
              value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="지금 순간을 좀 더 자세히 담아보자. 없으면 그냥 넘겨도 돼" />
            <button onClick={handleFinalAnalyze} className="w-full bg-[#1A1F2C] text-white py-5 sm:py-6 rounded-[24px] font-bold text-lg sm:text-xl shadow-xl active:scale-95 transition-all">
              SNAP 📷
            </button>
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
          <div className="space-y-6 animate-in zoom-in-95 duration-700">
            <div ref={cardRef} className="relative w-full rounded-[44px] overflow-hidden shadow-2xl bg-black" style={{ aspectRatio: '3 / 4.8' }}>
              <img src={resultData.mainEmotion.img} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
              <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-lg font-black tracking-tighter" style={{ WebkitTextStroke: '0' }}>
                      <span>Feeling</span><span className="text-[#E91E63] ml-0.5">Snap</span>
                    </div>
                    <div className="text-[10px] font-bold text-white/40 tracking-widest uppercase italic">
                      {stamp.date}  {stamp.time}
                    </div>
                  </div>
                  <span className="text-[9px] font-black border border-white/20 px-2.5 py-1 rounded-full uppercase tracking-widest text-white/50 backdrop-blur-sm">Snap Shot</span>
                </div>
                
                <div className="mt-4 mb-auto space-y-3 transform translate-y-4">
                  <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-tighter opacity-60 italic">{resultData.subName}</h3>
                  <p className="text-[19px] sm:text-[20px] font-medium whitespace-pre-line leading-[1.45] text-white drop-shadow-2xl pr-4" style={{ fontFamily: "'Bongsoong-Tint', sans-serif" }}>
                    {resultData.description}
                  </p>
                </div>

                <div className="bg-white/95 backdrop-blur-xl rounded-[36px] p-6 sm:p-8 space-y-5 text-slate-900 shadow-2xl">
                  <div className="space-y-3.5">
                    {resultData.mix && resultData.mix.map((item: any, index: number) => (
                      <div key={index} className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-tight">
                          <span>{item.label}</span><span className="text-[#E91E63]">{item.rate}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000`} style={{ width: `${item.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-[8px] font-black text-[#E91E63] uppercase mb-0.5 tracking-widest opacity-70">Soundtrack</span>
                      <p className="text-[14px] font-black text-slate-800 truncate">{resultData.song.split(' - ')[1] || resultData.song}</p>
                      <p className="text-[10px] font-bold text-slate-400 tracking-tight">{resultData.song.split(' - ')[0]}</p>
                    </div>
                    <button onClick={() => openYouTubeSearch(resultData.song)} className="w-10 h-10 bg-[#E91E63] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-100 active:scale-90 transition-transform">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-50 flex justify-between items-end">
                    <div className="text-[10px] font-bold leading-[1.6] text-slate-400">
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 rounded text-[8px] text-slate-500 font-black tracking-tighter uppercase">
                          <span className="w-1 h-1 bg-[#E91E63] rounded-full animate-pulse" />
                          Captured
                        </div>
                        <span className="text-[#E91E63] font-black text-[16px] tracking-tighter tabular-nums leading-none">
                          {resultData.displayStats.commonRate}
                        </span>
                      </div>
                      <div className="text-slate-700 font-medium tracking-tight leading-tight whitespace-pre-line">
                        {resultData.displayStats.rateLabel}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[8px] text-slate-300 font-black uppercase tracking-widest mb-0.5">Today's snap</span>
                      <div className="text-[20px] font-black text-slate-800 tracking-tighter font-mono">
                        #{resultData.displayStats.totalCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button onClick={handleSaveImage} className="py-5 bg-white rounded-[28px] font-bold text-[13px] shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-1 active:bg-slate-50 transition-all">
                <span>🎞️</span>
                <span>간직하기</span>
              </button>

              <button 
                onClick={async () => {
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: 'Feeling Snap',
                        text: `나의 감정 스냅: ${resultData.description.replace('\n', ' ')}`,
                        url: window.location.href,
                      });
                    } catch (err) { console.log('공유 취소'); }
                  } else {
                    alert('공유하기를 지원하지 않는 브라우저입니다. 링크를 복사해주세요!');
                  }
                }}
                className="py-5 bg-white rounded-[28px] font-bold text-[13px] shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-1 active:bg-slate-50 transition-all"
              >
                <span>🔗</span>
                <span>공유하기</span>
              </button>

              <button onClick={() => window.location.reload()} className="py-5 bg-[#1A1F2C] text-white rounded-[28px] font-bold text-[13px] flex flex-col items-center justify-center gap-1 active:scale-95 shadow-lg transition-all">
                <span>↻</span>
                <span>다시찍기</span>
              </button>
            </div>
            <ArticleSection />
          </div>
        )}
      </main>
    </div>
  );
}