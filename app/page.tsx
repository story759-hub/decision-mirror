'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

type Stage = 'pick' | 'resonate' | 'deep' | 'analyzing' | 'result';

const EMOTION_DATA: { [key: string]: any } = {
  joy: { label: "기쁨", icon: "✨", color: "from-yellow-400 to-orange-400", bgColor: "bg-yellow-50", img: "/images/joy.png",
    resonate: "최고의 순간이군요! 이 에너지는 당신을 더 빛나게 할 거예요.",
    reasons: ['원하던 목표 달성', '뜻밖의 행운', '사랑하는 사람과 함께', '나 자신이 대견해서'],
    quote: "행복은 찾는 것이 아니라, 만들어가는 것이다." },
  sadness: { label: "슬픔", icon: "💧", color: "from-blue-400 to-indigo-500", bgColor: "bg-blue-50", img: "/images/sadness.png",
    resonate: "마음이 많이 무겁군요. 눈물은 마음의 먼지를 씻어내는 과정이에요.",
    reasons: ['사람에게 서운함', '이별이나 상실', '이유 없는 공허함', '자책과 후회'],
    quote: "슬픔은 영원하지 않지만, 사랑은 지속된다." },
  anger: { label: "분노", icon: "🔥", color: "from-red-500 to-rose-600", bgColor: "bg-red-50", img: "/images/anger.png",
    resonate: "정말 답답하시겠어요. 분노는 당신이 소중히 여기는 가치가 침해당했을 때 생기죠.",
    reasons: ['부당한 대우', '반복되는 실수', '상대방의 무례함', '계속 참아온 일들'],
    quote: "분노는 불처럼, 꺼뜨리지 않으면 모든 것을 태운다." },
  anxiety: { label: "불안", icon: "🌀", color: "from-purple-500 to-indigo-600", bgColor: "bg-purple-50", img: "/images/anxiety.png",
    resonate: "생각이 꼬리에 꼬리를 무는군요. 불안은 당신이 잘해내고 싶다는 증거예요.",
    reasons: ['막연한 미래 걱정', '중요한 일 앞두고', '남들의 시선 의식', '결정하기 힘든 상황'],
    quote: "내일의 근심으로 오늘의 평화를 망치지 마라." },
  regret: { label: "미안", icon: "✉️", color: "from-slate-500 to-slate-700", bgColor: "bg-slate-50", img: "/images/regret.png",
    resonate: "자꾸 되짚게 되는 마음이군요. 과거의 당신도 최선을 다했을 거예요.",
    reasons: ['하지 못한 말들', '나의 실수나 잘못', '상대방에 대한 미안함', '놓쳐버린 기회'],
    quote: "과거를 후회하기보다 지금을 살라." },
  neutral: { label: "평온", icon: "🌿", color: "from-emerald-400 to-teal-500", bgColor: "bg-emerald-50", img: "/images/neutral.png",
    resonate: "잔잔한 호수 같은 마음이네요. 이런 평범한 하루가 가장 소중할 때가 있죠.",
    reasons: ['오늘 하루 무사히', '여유로운 휴식', '그저 그런 일상', '나쁘지 않은 기분'],
    quote: "평온함은 모든 것을 받아들일 때 찾아온다." }
};

export default function FeelingSnapV2() {
  const [stage, setStage] = useState<Stage>('pick');
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [textInput, setTextInput] = useState('');
  const [resultData, setResultData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // --- [API 연동 함수] ---
  const handleFinalAnalyze = async () => {
    setStage('analyzing');
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mainEmotion: selectedKey,
          reason: selectedReason,
          text: textInput
        })
      });
      
      const aiData = await response.json();
      
      setResultData({
        mainEmotion: EMOTION_DATA[selectedKey],
        subName: selectedReason || EMOTION_DATA[selectedKey].label,
        mix: aiData.mix,
        description: aiData.description,
        song: aiData.song,
        globalShare: {
          sameEmotion: Math.floor(Math.random() * 15) + 10,
          totalSnaps: (Math.floor(Math.random() * 500) + 1240).toLocaleString(),
        }
      });
      setStage('result');
    } catch (error) {
      alert("분석 중 오류가 발생했습니다.");
      setStage('deep');
    }
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3 });
    const link = document.createElement('a');
    link.download = `FeelingSnap_${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20 overflow-x-hidden">
      <header className="max-w-xl mx-auto pt-12 pb-6 text-center px-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tighter" onClick={() => window.location.reload()}>
          Feeling <span className="text-pink-500">Snap</span>
        </h1>
      </header>

      <main className="max-w-md mx-auto px-6">
        {stage === 'pick' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-700">지금 어떤 마음인가요?</h2>
              <p className="text-sm text-slate-400">가장 눈에 들어오는 단어 하나만 골라보세요.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(EMOTION_DATA).map((key) => (
                <button key={key} onClick={() => { setSelectedKey(key); setStage('resonate'); }}
                  className={`${EMOTION_DATA[key].bgColor} p-7 rounded-[32px] text-center hover:scale-105 active:scale-95 transition-all shadow-sm`}>
                  <div className="text-4xl mb-3">{EMOTION_DATA[key].icon}</div>
                  <div className="font-bold text-slate-800">{EMOTION_DATA[key].label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === 'resonate' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50 italic text-slate-700 font-medium">
              "{EMOTION_DATA[selectedKey].resonate}"
            </div>
            <div className="space-y-4">
              <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">상황을 선택하면 분석이 시작됩니다</p>
              <div className="grid grid-cols-1 gap-3">
                {EMOTION_DATA[selectedKey].reasons.map((r: string) => (
                  <button key={r} onClick={() => { setSelectedReason(r); setStage('deep'); }}
                    className="w-full py-4 bg-white rounded-2xl font-bold text-slate-600 border border-slate-100 hover:text-pink-500 transition-all">{r}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {stage === 'deep' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-700">기록하고 싶은 이야기가 있나요?</h2>
              <p className="text-sm text-slate-400">없다면 바로 결과 확인을 눌러주세요.</p>
            </div>
            <textarea className="w-full h-48 bg-white rounded-[32px] p-7 text-lg border-none focus:ring-2 focus:ring-pink-100 outline-none shadow-sm"
              value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="자유롭게 적어보세요..." />
            <button onClick={handleFinalAnalyze} className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-bold text-lg shadow-xl transition-all">
              AI 감정 스냅 찍기 ✨
            </button>
          </div>
        )}

        {stage === 'analyzing' && (
          <div className="py-24 text-center space-y-6 animate-pulse">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="font-bold text-slate-600">AI가 당신의 마음을 스캔하고 있습니다...</p>
          </div>
        )}

        {stage === 'result' && resultData && (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            <div ref={cardRef} className="relative aspect-[3/4] w-full rounded-[44px] overflow-hidden shadow-2xl bg-white">
              <img src={resultData.mainEmotion.img} alt="bg" className="absolute inset-0 w-full h-full object-cover" 
                   onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926")}/>
              
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] p-8 flex flex-col justify-between">
                <div className="text-white">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70">Emotional Snap</span>
                  <h3 className="text-4xl font-black italic mt-2">"{resultData.subName}"</h3>
                  <p className="text-xs mt-3 opacity-90 leading-relaxed font-medium">{resultData.description}</p>
                </div>

                <div className="bg-white/90 backdrop-blur-lg rounded-[32px] p-6 space-y-4">
                  <div className="space-y-2">
                    {resultData.mix.map((item: any) => (
                      <div key={item.key} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-black text-slate-700">
                          <span>{EMOTION_DATA[item.key].label}</span>
                          <span>{item.rate}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200/50 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${EMOTION_DATA[item.key].color}`} style={{ width: `${item.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-200/50">
                    <p className="text-[11px] font-bold text-slate-600">
                      오늘 당신과 같은 마음인 분들이 <span className="text-pink-500">{resultData.globalShare.sameEmotion}%</span> 있어요.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => <img key={i} className="w-5 h-5 rounded-full border border-white" src={`https://i.pravatar.cc/100?img=${i+20}`} />)}
                      </div>
                      <span className="text-[9px] font-black text-slate-400 italic">#{resultData.globalShare.totalSnaps} snaps today</span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-slate-200/50 flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-700">🎧 {resultData.song}</p>
                    <span className="text-[9px] font-black text-pink-500 uppercase">Track for you</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleSaveImage} className="py-5 bg-white rounded-2xl font-bold shadow-sm border border-slate-100 active:bg-slate-50 transition-all">스냅 저장 💾</button>
              <button onClick={() => window.location.reload()} className="py-5 bg-slate-900 text-white rounded-2xl font-bold active:scale-95 transition-all">새로 찍기 ↻</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}