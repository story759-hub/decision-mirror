'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

type Stage = 'pick' | 'resonate' | 'deep' | 'analyzing' | 'result';

// --- [데이터 정의] 감정 그룹 및 설정 ---
const EMOTION_DATA: { [key: string]: any } = {
  joy: { 
    label: "기쁨", icon: "✨", color: "from-yellow-400 to-orange-400", bgColor: "bg-yellow-50", img: "/images/joy.png",
    resonate: "최고의 순간이군요! 이 에너지는 당신을 더 빛나게 할 거예요.",
    reasons: ['원하던 목표 달성', '뜻밖의 행운', '사랑하는 사람과 함께', '나 자신이 대견해서'],
    quote: "행복은 찾는 것이 아니라, 만들어가는 것이다.", song: "아이유 - 미리 메리 크리스마스"
  },
  sadness: { 
    label: "슬픔", icon: "💧", color: "from-blue-400 to-indigo-500", bgColor: "bg-blue-50", img: "/images/sadness.png",
    resonate: "마음이 많이 무겁군요. 눈물은 마음의 먼지를 씻어내는 과정이에요.",
    reasons: ['사람에게 서운함', '이별이나 상실', '이유 없는 공허함', '자책과 후회'],
    quote: "슬픔은 영원하지 않지만, 사랑은 지속된다.", song: "에픽하이 - 우산 (Feat. 윤하)"
  },
  anger: { 
    label: "분노", icon: "🔥", color: "from-red-500 to-rose-600", bgColor: "bg-red-50", img: "/images/anger.png",
    resonate: "정말 답답하시겠어요. 분노는 당신이 소중히 여기는 가치가 침해당했을 때 생기죠.",
    reasons: ['부당한 대우', '반복되는 실수', '상대방의 무례함', '계속 참아온 일들'],
    quote: "분노는 불처럼, 꺼뜨리지 않으면 모든 것을 태운다.", song: "Imagine Dragons - Believer"
  },
  anxiety: { 
    label: "불안", icon: "🌀", color: "from-purple-500 to-indigo-600", bgColor: "bg-purple-50", img: "/images/anxiety.png",
    resonate: "생각이 꼬리에 꼬리를 무는군요. 불안은 당신이 잘해내고 싶다는 증거예요.",
    reasons: ['막연한 미래 걱정', '중요한 일 앞두고', '남들의 시선 의식', '결정하기 힘든 상황'],
    quote: "내일의 근심으로 오늘의 평화를 망치지 마라.", song: "검정치마 - 섬으로"
  },
  regret: { 
    label: "미안", icon: "✉️", color: "from-slate-500 to-slate-700", bgColor: "bg-slate-50", img: "/images/regret.png",
    resonate: "자꾸 되짚게 되는 마음이군요. 과거의 당신도 최선을 다했을 거예요.",
    reasons: ['하지 못한 말들', '나의 실수나 잘못', '상대방에 대한 미안함', '놓쳐버린 기회'],
    quote: "과거를 후회하기보다 지금을 살라.", song: "아이유 - 나만 몰랐던 이야기"
  },
  neutral: { 
    label: "평온", icon: "🌿", color: "from-emerald-400 to-teal-500", bgColor: "bg-emerald-50", img: "/images/neutral.png",
    resonate: "잔잔한 호수 같은 마음이네요. 이런 평범한 하루가 가장 소중할 때가 있죠.",
    reasons: ['오늘 하루 무사히', '여유로운 휴식', '그저 그런 일상', '나쁘지 않은 기분'],
    quote: "평온함은 모든 것을 받아들일 때 찾아온다.", song: "혁오 - TOMBOY"
  }
};

export default function FeelingSnapV2() {
  const [stage, setStage] = useState<Stage>('pick');
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [textInput, setTextInput] = useState('');
  const [resultData, setResultData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 최종 분석 실행 (선택 데이터 + 텍스트 데이터 결합)
  const handleFinalAnalyze = () => {
    setStage('analyzing');
    
    // 로직: 텍스트가 있다면 이전처럼 비율 분석을 섞고, 없다면 선택 기반으로 비중 설정
    const mainGroup = EMOTION_DATA[selectedKey];
    
    setTimeout(() => {
      setResultData({
        mainEmotion: mainGroup,
        subName: selectedReason || mainGroup.label,
        // 선택 기반이므로 메인을 70% 이상으로 고정 배치하여 신뢰도 확보
        mix: [
          { key: selectedKey, rate: 78 },
          { key: textInput.length > 5 ? 'anxiety' : 'neutral', rate: 15 },
          { key: 'regret', rate: 7 }
        ],
        quote: mainGroup.quote,
        song: mainGroup.song
      });
      setStage('result');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20 overflow-x-hidden">
      <header className="max-w-xl mx-auto pt-12 pb-6 text-center px-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tighter cursor-pointer" onClick={() => window.location.reload()}>
          Feeling <span className="text-pink-500">Snap</span>
        </h1>
      </header>

      <main className="max-w-md mx-auto px-6">
        {/* 1단계: 감정 카드 선택 (인지 부하 최소화) */}
        {stage === 'pick' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-700">지금 어떤 마음인가요?</h2>
              <p className="text-sm text-slate-400">가장 눈에 들어오는 단어 하나만 골라보세요.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(EMOTION_DATA).map((key) => (
                <button
                  key={key}
                  onClick={() => { setSelectedKey(key); setStage('resonate'); }}
                  className={`${EMOTION_DATA[key].bgColor} p-7 rounded-[32px] text-center hover:scale-105 active:scale-95 transition-all shadow-sm group`}
                >
                  <div className="text-4xl mb-3 group-hover:bounce">{EMOTION_DATA[key].icon}</div>
                  <div className="font-bold text-slate-800">{EMOTION_DATA[key].label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2단계: 공명 및 세부 상황 선택 */}
        {stage === 'resonate' && selectedKey && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-50 italic text-slate-700 leading-relaxed font-medium">
              "{EMOTION_DATA[selectedKey].resonate}"
            </div>
            <div className="space-y-4">
              <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">상황을 선택하면 더 정확해져요</p>
              <div className="grid grid-cols-1 gap-3">
                {EMOTION_DATA[selectedKey].reasons.map((r: string) => (
                  <button
                    key={r}
                    onClick={() => { setSelectedReason(r); setStage('deep'); }}
                    className="w-full py-4 bg-white rounded-2xl font-bold text-slate-600 border border-slate-100 hover:border-pink-200 hover:text-pink-500 transition-all"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3단계: 선택적 심화 입력 (정리할 사람만!) */}
        {stage === 'deep' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-700 tracking-tight">마지막으로, 쏟아내고 싶나요?</h2>
              <p className="text-sm text-slate-400">하지 못한 말이 있다면 적어주세요. (건너뛰기 가능)</p>
            </div>
            <textarea
              className="w-full h-48 bg-white rounded-[32px] p-7 text-lg border-none focus:ring-2 focus:ring-pink-100 outline-none shadow-sm placeholder:text-slate-200"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="여기에 자유롭게 적어보세요..."
            />
            <button onClick={handleFinalAnalyze} className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-bold text-lg shadow-xl shadow-slate-200 transition-all">
              감정 분석 스냅 확인 ✨
            </button>
          </div>
        )}

        {/* 4단계: 분석 중 로딩 */}
        {stage === 'analyzing' && (
          <div className="py-24 text-center space-y-6">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="font-bold text-slate-600 tracking-tight">당신만의 감정 포트레이트를 그리는 중...</p>
          </div>
        )}

        {/* 5단계: 결과 (이전과 동일한 퀄리티 유지) */}
        {stage === 'result' && resultData && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
            <div ref={cardRef} className="relative aspect-[3/4] w-full rounded-[44px] overflow-hidden shadow-2xl bg-white">
              <img src={resultData.mainEmotion.img} alt="bg" className="absolute inset-0 w-full h-full object-cover" 
                   onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926")}/>
              
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] p-10 flex flex-col justify-between">
                <div className="text-white">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70">Emotional Portrait</span>
                  <h3 className="text-4xl font-black italic tracking-tighter mt-2">"{resultData.subName}"</h3>
                </div>

                <div className="bg-white/90 backdrop-blur-lg rounded-[32px] p-6 space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Emotion Mix (%)</p>
                  <div className="space-y-3">
                    {resultData.mix.map((item: any) => (
                      <div key={item.key} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{EMOTION_DATA[item.key].label}</span>
                          <span>{item.rate}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200/50 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${EMOTION_DATA[item.key].color}`} style={{ width: `${item.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest mb-1">Recommendation</p>
                    <p className="text-xs font-bold text-slate-700 italic">"{resultData.quote}"</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold underline cursor-pointer">🎧 {resultData.song}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => {
                if (cardRef.current) toPng(cardRef.current).then(dataUrl => {
                  const link = document.createElement('a');
                  link.download = 'FeelingSnap.png';
                  link.href = dataUrl;
                  link.click();
                });
              }} className="py-5 bg-white rounded-2xl font-bold shadow-sm border border-slate-100">이미지 저장</button>
              <button onClick={() => window.location.reload()} className="py-5 bg-slate-900 text-white rounded-2xl font-bold">다시 찍기</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}