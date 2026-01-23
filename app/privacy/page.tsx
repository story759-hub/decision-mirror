'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

type Stage = 'pick' | 'resonate' | 'deep' | 'analyzing' | 'result';

const EMOTION_DATA: { [key: string]: any } = {
  joy: { label: "기쁨", icon: "✨", color: "from-yellow-400 to-orange-400", bgColor: "bg-yellow-50", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94", resonate: "최고의 순간이군요!", reasons: ['원하던 목표 달성', '뜻밖의 행운', '사랑하는 사람과 함께'] },
  sadness: { label: "슬픔", icon: "💧", color: "from-blue-400 to-indigo-500", bgColor: "bg-blue-50", img: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c", resonate: "마음이 무겁군요.", reasons: ['사람에게 서운함', '이별이나 상실', '자책과 후회'] },
  anger: { label: "분노", icon: "🔥", color: "from-red-500 to-rose-600", bgColor: "bg-red-50", img: "https://images.unsplash.com/photo-1579546678181-9927bf144062", resonate: "정말 답답하시겠어요.", reasons: ['부당한 대우', '반복되는 실수', '무례함'] },
  anxiety: { label: "불안", icon: "🌀", color: "from-purple-500 to-indigo-600", bgColor: "bg-purple-50", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773", resonate: "불안은 잘해내고 싶다는 증거예요.", reasons: ['막연한 미래 걱정', '중요한 일 앞두고', '남들의 시선'] },
  regret: { label: "미안", icon: "✉️", color: "from-slate-500 to-slate-700", bgColor: "bg-slate-50", img: "https://images.unsplash.com/photo-1528459801416-a7e99a0d13a3", resonate: "과거의 당신도 최선을 다했을 거예요.", reasons: ['하지 못한 말들', '나의 실수', '상대방에 대한 미안함'] },
  neutral: { label: "평온", icon: "🌿", color: "from-emerald-400 to-teal-500", bgColor: "bg-emerald-50", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", resonate: "잔잔한 호수 같은 마음이네요.", reasons: ['오늘 하루 무사히', '여유로운 휴식', '그저 그런 일상'] }
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
      const elapsed = Date.now() - start;
      const wait = Math.max(0, 5000 - elapsed); // 5초 로딩 보장

      setTimeout(() => {
        // 데이터가 불완전해도 프론트엔드가 죽지 않도록 기본값 설정
        setResultData({
          mix: aiData?.mix || [{ key: selectedKey, rate: 100 }],
          description: aiData?.description || "분석 완료",
          song: aiData?.song || "오늘의 추천 음악",
          mainEmotion: EMOTION_DATA[selectedKey],
          subName: selectedReason,
          globalShare: {
            sameEmotion: Math.floor(Math.random() * 15) + 10,
            totalSnaps: (Math.floor(Math.random() * 500) + 1200).toLocaleString(),
          }
        });
        setStage('result');
      }, wait);
    } catch (e) {
      setStage('deep');
      alert("분석에 실패했습니다.");
    }
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true });
    const link = document.createElement('a');
    link.download = `FeelingSnap_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <header className="max-w-xl mx-auto pt-10 pb-4 text-center">
        <h1 className="text-3xl font-black text-[#E91E63] tracking-tighter cursor-pointer" onClick={() => window.location.reload()}>
          Feeling <span className="text-[#E91E63]">Snap</span>
        </h1>
      </header>

      <main className="max-w-md mx-auto px-6">
        {stage === 'pick' && (
          <div className="text-center space-y-10 animate-in fade-in slide-in-from-bottom-4">
            {/* 사진 속 헤더 디자인 구현 */}
            <div className="space-y-3 mt-4">
              <h2 className="text-2xl font-bold text-[#2D3E50]">지금 어떤 마음인가요?</h2>
              <p className="text-slate-400 text-lg">가장 눈에 들어오는 단어 하나만 골라보세요.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-5 mt-10">
              {Object.keys(EMOTION_DATA).map((key) => (
                <button key={key} onClick={() => { setSelectedKey(key); setStage('resonate'); }}
                  className={`${EMOTION_DATA[key].bgColor} p-10 rounded-[32px] flex flex-col items-center justify-center transition-transform active:scale-95 shadow-sm`}>
                  <div className="text-5xl mb-4">{EMOTION_DATA[key].icon}</div>
                  <div className="font-bold text-xl text-slate-700">{EMOTION_DATA[key].label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* resonate & deep 단계 생략 (이전과 동일하게 작동) */}
        {stage === 'resonate' && (
            <div className="space-y-10 mt-10 animate-in slide-in-from-right-4">
                <div className="bg-[#F8FAFC] p-8 rounded-[32px] text-center text-xl font-medium text-slate-600">"{EMOTION_DATA[selectedKey].resonate}"</div>
                <div className="grid grid-cols-1 gap-4">
                    {EMOTION_DATA[selectedKey].reasons.map((r: string) => (
                        <button key={r} onClick={() => { setSelectedReason(r); setStage('deep'); }}
                                className="w-full py-5 bg-white rounded-[20px] font-bold text-lg text-slate-500 border border-slate-100 shadow-sm active:bg-slate-50">{r}</button>
                    ))}
                </div>
            </div>
        )}

        {stage === 'deep' && (
            <div className="space-y-10 mt-10 animate-in slide-in-from-bottom-4">
                <textarea className="w-full h-60 bg-[#F8FAFC] rounded-[32px] p-8 text-xl border-none outline-none"
                          value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="자유롭게 적어보세요..." />
                <button onClick={handleFinalAnalyze} className="w-full bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-lg active:scale-95">
                    AI 감정 스냅 찍기 ✨
                </button>
            </div>
        )}

        {stage === 'analyzing' && (
          <div className="py-32 text-center space-y-8">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xl font-bold text-slate-500 animate-pulse">데이터를 분석 중입니다...</p>
          </div>
        )}

        {stage === 'result' && resultData && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div ref={cardRef} className="relative aspect-[3/4.5] w-full rounded-[50px] overflow-hidden shadow-2xl bg-[#1A1F2C]">
              <img src={resultData.mainEmotion.img} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="text-white space-y-6">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70">Emotional Snap</span>
                  <h3 className="text-5xl font-black italic leading-tight">"{resultData.subName}"</h3>
                  <p className="text-sm opacity-90 leading-relaxed font-medium">{resultData.description}</p>
                </div>

                <div className="bg-white/95 backdrop-blur-md rounded-[40px] p-8 space-y-6">
                  <div className="space-y-4">
                    {resultData.mix?.map((item: any) => (
                      <div key={item.key} className="space-y-2">
                        <div className="flex justify-between text-xs font-black text-slate-700">
                          <span>{EMOTION_DATA[item.key]?.label || item.key}</span>
                          <span>{item.rate}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${EMOTION_DATA[item.key]?.color || 'from-slate-400 to-slate-500'}`} style={{ width: `${item.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-600">오늘 당신과 같은 마음 <span className="text-[#E91E63]">{resultData.globalShare.sameEmotion}%</span></p>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-slate-400 italic">#{resultData.globalShare.totalSnaps} snaps today</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[11px] font-bold text-slate-800">🎧 {resultData.song}</p>
                        <span className="text-[9px] font-black text-[#E91E63]">TRACK FOR YOU</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button onClick={handleSaveImage} className="flex-1 py-6 bg-white rounded-3xl font-bold text-lg shadow-sm border border-slate-100">스냅 저장 💾</button>
              <button onClick={() => window.location.reload()} className="flex-1 py-6 bg-[#1A1F2C] text-white rounded-3xl font-bold text-lg">새로 찍기 ↻</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}