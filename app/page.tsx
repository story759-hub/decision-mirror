'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

type Stage = 'pick' | 'resonate' | 'deep' | 'analyzing' | 'result';

const EMOTION_DATA: { [key: string]: any } = {
  joy: { label: "기쁨", icon: "✨", color: "from-yellow-400 to-orange-400", bgColor: "bg-yellow-50", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94", resonate: "최고의 순간이군요!", reasons: ['원하던 목표 달성', '뜻밖의 행운', '사랑하는 사람과 함께', '나 자신이 대견해서'] },
  sadness: { label: "슬픔", icon: "💧", color: "from-blue-400 to-indigo-500", bgColor: "bg-blue-50", img: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c", resonate: "마음이 많이 무겁군요.", reasons: ['사람에게 서운함', '이별이나 상실', '이유 없는 공허함', '자책과 후회'] },
  anger: { label: "분노", icon: "🔥", color: "from-red-500 to-rose-600", bgColor: "bg-red-50", img: "https://images.unsplash.com/photo-1579546678181-9927bf144062", resonate: "정말 답답하시겠어요.", reasons: ['부당한 대우', '반복되는 실수', '상대방의 무례함', '계속 참아온 일들'] },
  anxiety: { label: "불안", icon: "🌀", color: "from-purple-500 to-indigo-600", bgColor: "bg-purple-50", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773", resonate: "생각이 꼬리에 꼬리를 무는군요.", reasons: ['막연한 미래 걱정', '중요한 일 앞두고', '남들의 시선 의식', '결정하기 힘든 상황'] },
  regret: { label: "미안", icon: "✉️", color: "from-slate-500 to-slate-700", bgColor: "bg-slate-50", img: "https://images.unsplash.com/photo-1528459801416-a7e99a0d13a3", resonate: "자꾸 되짚게 되는 마음이군요.", reasons: ['하지 못한 말들', '나의 실수나 잘못', '상대방에 대한 미안함', '놓쳐버린 기회'] },
  neutral: { label: "평온", icon: "🌿", color: "from-emerald-400 to-teal-500", bgColor: "bg-emerald-50", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e", resonate: "잔잔한 호수 같은 마음이네요.", reasons: ['오늘 하루 무사히', '여유로운 휴식', '그저 그런 일상', '나쁘지 않은 기분'] }
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
        // [수정] 데이터가 불완전해도 런타임 에러가 나지 않도록 방어 코드 적용
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
    <div className="min-h-screen bg-white text-slate-900 pb-20 overflow-x-hidden">
      {/* 고정 헤더 */}
      <header className="max-w-xl mx-auto pt-12 pb-6 text-center">
        <h1 className="text-3xl font-black text-[#E91E63] tracking-tighter cursor-pointer" onClick={() => window.location.reload()}>
          Feeling <span className="text-[#E91E63]">Snap</span>
        </h1>
      </header>

      <main className="max-w-md mx-auto px-6">
        {/* 1단계: 감정 선택 (사용자 요청 문구 반영) */}
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

        {/* 2단계: 이유 선택 */}
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

        {/* 3단계: 일기 작성 */}
        {stage === 'deep' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <textarea className="w-full h-56 bg-[#F8FAFC] rounded-[32px] p-8 text-xl outline-none shadow-inner focus:ring-2 focus:ring-pink-100"
              value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="자유로운 기록을 남겨보세요..." />
            <button onClick={handleFinalAnalyze} className="w-full bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl active:scale-95 transition-all">
              AI 감정 스냅 찍기 ✨
            </button>
          </div>
        )}

        {/* 로딩 화면 */}
        {stage === 'analyzing' && (
          <div className="py-32 text-center space-y-8">
            <div className="w-16 h-16 border-4 border-[#E91E63] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xl font-bold text-slate-500 animate-pulse">AI가 마음을 정교하게 분석하고 있습니다...</p>
          </div>
        )}

        {/* 결과 화면 */}
        {stage === 'result' && resultData && (
          <div className="space-y-8 animate-in zoom-in-95 duration-700">
            <div ref={cardRef} className="relative aspect-[3/4.5] w-full rounded-[50px] overflow-hidden shadow-2xl bg-black">
              <img src={resultData.mainEmotion.img} alt="bg" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="text-white space-y-4">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70">Emotional Snap</span>
                  {/* 요청하신 굵고 기울어진 제목 스타일 */}
                  <h3 className="text-5xl font-black italic leading-tight tracking-tighter">"{resultData.subName}"</h3>
                  <p className="text-sm opacity-90 leading-relaxed font-medium pt-2">{resultData.description}</p>
                </div>

                <div className="bg-white/95 backdrop-blur-lg rounded-[40px] p-8 space-y-6">
                  <div className="space-y-4">
                    {/* mix.map 시 Optional Chaining(?.)을 써서 에러 방지 */}
                    {resultData.mix?.map((item: any) => (
                      <div key={item.key} className="space-y-2">
                        <div className="flex justify-between text-xs font-black text-slate-700">
                          <span>{EMOTION_DATA[item.key]?.label || item.key}</span>
                          <span>{item.rate}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${EMOTION_DATA[item.key]?.color || 'from-slate-400 to-slate-500'}`} 
                               style={{ width: `${item.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-600">오늘 당신과 같은 마음 <span className="text-[#E91E63]">{resultData.globalShare.sameEmotion}%</span></p>
                      <span className="text-[10px] font-black text-slate-400 italic">#{resultData.globalShare.totalSnaps} snaps today</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-bold text-slate-800">🎧 {resultData.song}</p>
                      <span className="text-[9px] font-black text-[#E91E63]">TRACK FOR YOU</span>
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