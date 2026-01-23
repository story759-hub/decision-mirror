'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

type Stage = 'input' | 'analyzing' | 'result';

// --- [데이터 정의] 감정 그룹, 세부 키워드, 명언, 노래 ---
const EMOTION_GROUPS: { [key: string]: any } = {
  joy: { 
    label: "기쁨", 
    color: "from-yellow-400 to-orange-400", 
    img: "/images/joy.png", // 요청하신 파일명 규칙 적용
    sub: ['행복', '설렘', '뿌듯', '감사', '만족', '환희', '안도', '자신감', '활기', '포근', '사랑', '성공', '합격', '데이트'],
    quote: "행복은 찾는 것이 아니라, 만들어가는 것이다.",
    song: "아이유 - 미리 메리 크리스마스"
  },
  sadness: { 
    label: "슬픔", 
    color: "from-blue-400 to-indigo-500", 
    img: "/images/sadness.png",
    sub: ['우울', '공허', '외로움', '그리움', '서운', '서러움', '후회', '상실감', '비참', '애틋', '이별', '헤어짐'],
    quote: "슬픔은 영원히 지속되지 않지만, 사랑은 지속된다.",
    song: "에픽하이 - 우산 (Feat. 윤하)"
  },
  anger: { 
    label: "분노", 
    color: "from-red-500 to-rose-600", 
    img: "/images/anger.png",
    sub: ['짜증', '답답', '억울', '괘씸', '불쾌', '열받음', '미움', '질투', '독기', '분개', '싸웠', '다툼', '스트레스'],
    quote: "분노는 불처럼, 꺼뜨리지 않으면 모든 것을 태워버린다.",
    song: "Imagine Dragons - Believer"
  },
  anxiety: { 
    label: "불안", 
    color: "from-purple-500 to-indigo-600", 
    img: "/images/anxiety.png",
    sub: ['걱정', '초조', '긴장', '당혹', '두려움', '막막', '위축', '압박', '묘함', '이상해', '어떡하지'],
    quote: "내일의 근심으로 오늘의 평화를 망치지 마라.",
    song: "검정치마 - 섬으로"
  },
  regret: { 
    label: "미안/후회", 
    color: "from-slate-500 to-slate-700", 
    img: "/images/regret.png",
    sub: ['미안', '죄책감', '반성', '자책', '미련', '아쉬움', '부끄러움', '민망', '어색', '송구'],
    quote: "과거를 후회하기보다 미래를 위해 지금을 살라.",
    song: "아이유 - 나만 몰랐던 이야기"
  },
  neutral: { 
    label: "평온", 
    color: "from-emerald-400 to-teal-500", 
    img: "/images/neutral.png",
    sub: ['평범', '그냥', '보통', '덤덤', '지루', '잔잔', '조용', '무념무상', '멍함', '일상', '괜찮아'],
    quote: "평온함은 모든 것을 받아들일 때 찾아온다.",
    song: "혁오 (HYUKOH) - TOMBOY"
  }
};

const analyzeEmotionsMulti = (text: string) => {
  const scores: { [key: string]: number } = { joy: 0, sadness: 0, anger: 0, anxiety: 0, regret: 0, neutral: 0 };
  let detectedSub: string[] = [];

  Object.keys(EMOTION_GROUPS).forEach(group => {
    EMOTION_GROUPS[group].sub.forEach((keyword: string) => {
      if (text.includes(keyword)) {
        scores[group] += 2;
        detectedSub.push(keyword);
      }
    });
  });

  if (text.includes('싸웠') || text.includes('다툼')) { scores.anger += 3; scores.sadness += 1; }
  if (text.includes('데이트') || text.includes('합격') || text.includes('성공')) { scores.joy += 4; }
  if (text.includes('헤어') || text.includes('이별')) { scores.sadness += 5; scores.regret += 2; }
  if (text.includes('시험') || text.includes('면접') || text.includes('발표')) { scores.anxiety += 3; }
  if (text.includes('피곤') || text.includes('지쳐')) { scores.sadness += 2; scores.neutral += 1; }

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  
  if (total === 0) {
    const defaultNeutral = EMOTION_GROUPS['neutral'].sub[Math.floor(Math.random() * EMOTION_GROUPS['neutral'].sub.length)];
    return { mainSub: defaultNeutral, mix: [{ key: 'neutral', rate: 100 }] };
  }

  const mix = Object.keys(scores)
    .map(key => ({ key, rate: Math.round((scores[key] / total) * 100) }))
    .filter(item => item.rate > 0)
    .sort((a, b) => b.rate - a.rate);

  const finalSubName = detectedSub.length > 0 ? detectedSub[0] : EMOTION_GROUPS[mix[0].key].sub[0];

  return { mainSub: finalSubName, mix: mix.slice(0, 3) };
};

export default function FeelingSnap() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [resultData, setResultData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async () => {
    if (input.trim().length < 5) return alert("오늘의 마음을 조금 더 구체적으로 적어주세요.");
    setStage('analyzing');

    const analysis = analyzeEmotionsMulti(input);
    const mainEmotionGroup = EMOTION_GROUPS[analysis.mix[0].key];

    setTimeout(() => {
      setResultData({
        mainEmotion: mainEmotionGroup,
        subName: analysis.mainSub,
        mix: analysis.mix,
        quote: mainEmotionGroup.quote,
        song: mainEmotionGroup.song,
        description: "당신의 마음속 여러 감정들이 어우러져 특별한 순간을 만들고 있네요. 이 스냅이 감정을 이해하는 데 도움이 되길 바랍니다."
      });
      setStage('result');
    }, 3000);
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#F8FAFC' });
      const link = document.createElement('a');
      link.download = `FeelingSnap_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert('이미지를 저장할 수 없습니다.');
    }
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: '필링스냅 (Feeling Snap)',
        text: `오늘 내 감정은 "${resultData?.subName}"! 감정 믹스 비율을 확인해보세요. ${resultData?.quote}`,
        url: window.location.href,
      };
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        alert("링크가 복사되었습니다.");
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20">
      <header className="max-w-xl mx-auto pt-16 pb-10 text-center px-6">
        <h1 className="text-3xl font-black text-slate-800 tracking-tighter cursor-pointer" onClick={() => setStage('input')}>
          Feeling <span className="text-pink-500">Snap</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Capture your heart, Share your mood</p>
      </header>

      <main className="max-w-md mx-auto px-6">
        {stage === 'input' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-700 tracking-tight">지금 어떤 기분이신가요?</h2>
              <p className="text-sm text-slate-400 font-medium">누구에게도 말하지 못한 감정을 솔직하게 적어보세요.</p>
            </div>
            <textarea
              className="w-full h-64 bg-white shadow-sm rounded-[32px] p-8 text-lg border-none focus:ring-2 focus:ring-pink-100 outline-none placeholder:text-slate-200 leading-relaxed"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="여기에 당신의 마음을 스냅하세요..."
            />
            <button onClick={handleAnalyze} className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-bold text-lg shadow-2xl shadow-slate-200 active:scale-[0.98] transition-all">
              감정 믹스 스냅 찍기 ✨
            </button>
          </div>
        )}

        {stage === 'analyzing' && (
          <div className="py-24 text-center space-y-8 animate-in zoom-in-95 duration-300">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-[6px] border-pink-50 rounded-full"></div>
              <div className="absolute inset-0 border-[6px] border-pink-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="space-y-3">
              <p className="font-bold text-lg text-slate-700 tracking-tight">당신의 복합적인 감정을 분석 중...</p>
              <div className="flex flex-col space-y-1">
                <p className="text-xs text-slate-400 font-medium italic">"수천 개의 감성 데이터 속에서 당신의 마음을 찾고 있어요"</p>
                <div className="w-32 h-1 bg-slate-100 mx-auto rounded-full mt-4 overflow-hidden">
                   <div className="h-full bg-pink-500 animate-[load_3s_linear]"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {stage === 'result' && resultData && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div ref={cardRef} className="relative aspect-[3/4] w-full rounded-[44px] overflow-hidden shadow-2xl bg-white">
              <img src={resultData.mainEmotion.img} alt={resultData.mainEmotion.label} className="absolute inset-0 w-full h-full object-cover" 
                   onError={(e) => (e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926")}/>
              
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] p-10 flex flex-col justify-between">
                <div className="text-white space-y-2">
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-70">Emotional Portrait</span>
                  <h3 className="text-5xl font-black italic tracking-tighter">"{resultData.subName}"</h3>
                  <p className="text-sm font-medium opacity-80 mt-2 leading-relaxed">{resultData.description}</p>
                </div>

                <div className="bg-white/90 backdrop-blur-lg rounded-[32px] p-6 space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Emotion Mix (%)</p>
                  <div className="space-y-3">
                    {resultData.mix.map((item: any) => (
                      <div key={item.key} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{EMOTION_GROUPS[item.key].label}</span>
                          <span>{item.rate}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200/50 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${EMOTION_GROUPS[item.key].color}`} style={{ width: `${item.rate}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Quote for you</p>
                      <p className="text-sm font-bold text-slate-700 leading-relaxed italic">"{resultData.quote}"</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-pink-500 uppercase tracking-widest">Song for you</p>
                      <p className="text-sm font-bold text-slate-700">{resultData.song}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleSaveImage} className="py-5 bg-white rounded-2xl font-bold shadow-sm border border-slate-100 text-slate-700 active:bg-slate-50 transition-colors">스냅 저장 💾</button>
              <button onClick={handleShare} className="py-5 bg-white rounded-2xl font-bold shadow-sm border border-slate-100 text-slate-700 active:bg-slate-50 transition-colors">공유하기 🔗</button>
            </div>
            <button onClick={() => setStage('input')} className="w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-[0.3em] hover:text-pink-400 transition-colors">
              ↻ Retake Snapshot
            </button>
          </div>
        )}
      </main>
      <style jsx>{` @keyframes load { from { width: 0%; } to { width: 100%; } } `}</style>
    </div>
  );
}