'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

type Stage = 'pick' | 'resonate' | 'deep' | 'analyzing' | 'result';

const EMOTION_DATA: { [key: string]: any } = {
  joy: { 
    label: "기쁨", 
    icon: "✨", 
    color: "from-yellow-400 to-orange-400", 
    bgColor: "bg-yellow-50", 
    img: "/images/joy.png", 
    resonate: "최고의 순간이군요!", 
    reasons: [
      '원하던 목표 달성', '뜻밖의 행운', '사랑하는 사람과 함께', 
      '칭찬이나 인정받음', '맛있는 음식의 행복', '작은 성취의 기쁨', 
      '오랜만의 휴식', '설레는 계획의 시작'
    ] 
  },
  sadness: { 
    label: "슬픔", 
    icon: "💧", 
    color: "from-blue-400 to-indigo-500", 
    bgColor: "bg-blue-50", 
    img: "/images/sadness.png", 
    resonate: "마음이 무겁군요.", 
    reasons: [
      '사람에게 서운함', '이별이나 상실', '자책과 후회', 
      '이유 없는 우울함', '기대했던 일의 실패', '외로움과 고립감', 
      '몸이 아프고 지침', '공허한 마음'
    ] 
  },
  anger: { 
    label: "분노", 
    icon: "🔥", 
    color: "from-red-500 to-rose-600", 
    bgColor: "bg-red-50", 
    img: "/images/anger.png", 
    resonate: "정말 답답하시겠어요.", 
    reasons: [
      '부당한 대우', '반복되는 실수', '무례함에 노출', 
      '일이 뜻대로 안 됨', '억울한 상황', '계획의 방해', 
      '나 자신에 대한 화', '무책임한 태도'
    ] 
  },
  anxiety: { 
    label: "불안", 
    icon: "🌀", 
    color: "from-purple-500 to-indigo-600", 
    bgColor: "bg-purple-50", 
    img: "/images/anxiety.png", 
    resonate: "불안은 잘해내고 싶다는 증거예요.", 
    reasons: [
      '막연한 미래 걱정', '중요한 일 앞두고', '남들의 시선', 
      '새로운 환경의 적응', '결정을 내릴 때', '실수할까 봐 걱정', 
      '금전적인 부담', '인간관계의 긴장'
    ] 
  },
  regret: { 
    label: "미안", 
    icon: "✉️", 
    color: "from-slate-500 to-slate-700", 
    bgColor: "bg-slate-50", 
    img: "/images/regret.png", 
    resonate: "과거의 당신도 최선을 다했습니다.", 
    reasons: [
      '하지 못한 말들', '나의 실수', '상대방에 대한 미안함', 
      '시간을 낭비한 기분', '상처 준 기억', '약속을 못 지킴', 
      '챙겨주지 못한 마음', '과거의 선택'
    ] 
  },
  neutral: { 
    label: "평온", 
    icon: "🌿", 
    color: "from-emerald-400 to-teal-500", 
    bgColor: "bg-emerald-50", 
    img: "/images/neutral.png", 
    resonate: "잔잔한 호수 같은 마음이네요.", 
    reasons: [
      '오늘 하루 무사히', '여유로운 휴식', '그저 그런 일상', 
      '정돈된 주변 환경', '몰입하는 시간', '조용한 혼자만의 시간', 
      '충분한 수면 후', '평화로운 오후'
    ] 
  }
};

export default function FeelingSnapV2() {
  const [stage, setStage] = useState<Stage>('pick');
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [textInput, setTextInput] = useState('');
  const [resultData, setResultData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
      const wait = Math.max(0, 5000 - (Date.now() - start));

      setTimeout(() => {
        if (aiData) {
          setResultData({
            mix: aiData.mix || [{ key: selectedKey, rate: 100 }],
            description: aiData.description || "오늘의 소중한 감정을 기록했습니다.",
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
      alert("분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      setStage('deep');
    }
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true });
      const link = document.createElement('a');
      link.download = `FeelingSnap_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("이미지 저장에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 overflow-x-hidden font-sans">
      <header className="max-w-xl mx-auto pt-14 pb-8 text-center">
        {/* 로고: 기존 스타일 유지 + 텍스트 스트로크를 통해 굵기 1.5배 강화 */}
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
              <h2 className="text-2xl font-bold text-[#2D3E50]">지금 어떤 마음인가요?</h2>
              <p className="text-slate-400 text-lg font-medium">가장 눈에 들어오는 단어 하나만 골라보세요.</p>
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
          </div>
        )}

        {stage === 'resonate' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="bg-[#F8FAFC] p-8 rounded-[32px] shadow-sm italic text-center text-xl font-medium text-slate-600">
              "{EMOTION_DATA[selectedKey].resonate}"
            </div>
            <div className="grid grid-cols-1 gap-4">
              {EMOTION_DATA[selectedKey].reasons.map((r: string) => (
                <button key={r} onClick={() => { setSelectedReason(r); setStage('deep'); }}
                  className="w-full py-5 bg-white rounded-[24px] font-bold text-lg text-slate-500 border border-slate-100 shadow-sm active:bg-slate-50 transition-all">{r}</button>
              ))}
            </div>
          </div>
        )}

        {stage === 'deep' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <textarea className="w-full h-56 bg-[#F8FAFC] rounded-[32px] p-8 text-xl outline-none shadow-inner focus:ring-2 focus:ring-pink-100"
              value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="자유로운 기록을 남겨보세요..." />
            <button onClick={handleFinalAnalyze} className="w-full bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl active:scale-95 transition-all">
              AI 감정 스냅 찍기 ✨
            </button>
          </div>
        )}

        {stage === 'analyzing' && (
          <div className="py-32 text-center space-y-8">
            <div className="w-16 h-16 border-4 border-[#E91E63] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xl font-bold text-slate-500 animate-pulse">AI가 마음을 정교하게 분석하고 있습니다...</p>
          </div>
        )}

        {stage === 'result' && resultData && (
          <div className="space-y-8 animate-in zoom-in-95 duration-700">
            <div ref={cardRef} className="relative aspect-[3/4.5] w-full rounded-[50px] overflow-hidden shadow-2xl bg-black font-rounded" style={{ fontFamily: 'ui-rounded, "Hiragino Maru Gothic ProN", "Quicksand", "Nanum Gothic", system-ui, sans-serif' }}>
              <img src={resultData.mainEmotion.img} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="text-white space-y-4">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-80">Emotional Snap</span>
                  
                  <h3 className="text-4xl font-black leading-tight tracking-tighter drop-shadow-md">
                    {resultData.subName}
                  </h3>

                  <p className="text-[15px] opacity-100 leading-relaxed font-bold pt-1 break-keep line-clamp-3">
                    {resultData.description}
                  </p>
                </div>

                <div className="bg-white/95 backdrop-blur-lg rounded-[40px] p-8 space-y-6 shadow-lg">
                  <div className="space-y-4">
                    {resultData.mix?.map((item: any) => (
                      <div key={item.key} className="space-y-2">
                        <div className="flex justify-between text-xs font-black text-slate-700 uppercase tracking-tight">
                          <span>{EMOTION_DATA[item.key]?.label || item.key}</span>
                          <span className="text-[#E91E63]">{item.rate}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                          <div className={`h-full bg-gradient-to-r ${EMOTION_DATA[item.key]?.color || 'from-slate-400 to-slate-500'} transition-all duration-1000 ease-out`} 
                               style={{ width: `${item.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-600 leading-none">오늘 당신과 같은 마음 <span className="text-[#E91E63]">{resultData.globalShare.sameEmotion}%</span></p>
                      <span className="text-[10px] font-black text-slate-400 italic tracking-tight opacity-80">#{resultData.globalShare.totalSnaps} snaps today</span>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-[12px] font-extrabold text-slate-800 leading-tight">🎧 {resultData.song}</p>
                      <span className="text-[9px] font-black text-[#E91E63] tracking-widest opacity-80 uppercase">TRACK FOR YOU</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleSaveImage} className="py-6 bg-white rounded-3xl font-bold text-lg shadow-sm border border-slate-100 active:bg-slate-50 transition-all">스냅 저장 💾</button>
              <button onClick={() => window.location.reload()} className="py-6 bg-[#1A1F2C] text-white rounded-3xl font-bold text-lg active:scale-95 transition-all">새로 찍기 ↻</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}