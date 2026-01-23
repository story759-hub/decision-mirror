'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

type Stage = 'input' | 'analyzing' | 'result';

export default function FeelingSnap() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [resultData, setResultData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. 감정 분석 및 이미지 매칭 시뮬레이션
  const handleAnalyze = async () => {
    if (input.trim().length < 5) return alert("오늘의 마음을 조금 더 들려주세요.");
    
    setStage('analyzing');

    // 실제 API 호출 대신 시뮬레이션 (이미지 풀 방식)
    setTimeout(() => {
      setResultData({
        emotion: "기쁨",
        imagePath: "/images/joy_01.png", // 미리 준비된 이미지 풀
        matchRate: 84,
        description: "당신의 마음속에 몽글몽글한 구름이 피어오르고 있네요. 이 기분은 주변 사람들에게도 따뜻한 에너지가 될 거예요.",
        totalcount: 1240
      });
      setStage('result');
    }, 3000);
  };

  // 2. 이미지 저장 (필링스냅 포토카드)
  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `FeelingSnap_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert('이미지를 저장할 수 없습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20 selection:bg-pink-100">
      {/* 헤더 */}
      <header className="max-w-xl mx-auto pt-16 pb-10 text-center px-6">
        <h1 className="text-3xl font-black tracking-tight text-slate-800 mb-2">
          Feeling <span className="text-pink-500">Snap</span>
        </h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Capture your heart, Share your mood</p>
      </header>

      <main className="max-w-md mx-auto px-6">
        {/* 단계 1: 입력 */}
        {stage === 'input' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-700">지금 어떤 기분이신가요?</h2>
              <p className="text-sm text-slate-400">누구에게도 말하지 못한 감정을 솔직하게 적어보세요.</p>
            </div>
            <textarea
              className="w-full h-56 bg-white shadow-inner rounded-[32px] p-8 text-lg border-none focus:ring-2 focus:ring-pink-200 outline-none transition-all placeholder:text-slate-300 italic"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="여기에 당신의 마음을 스냅하세요..."
            />
            <button onClick={handleAnalyze} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all">
              나만의 감정카드 만들기 ✨
            </button>
          </div>
        )}

        {/* 단계 2: 분석 중 */}
        {stage === 'analyzing' && (
          <div className="py-24 text-center space-y-6 animate-in zoom-in-95">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 border-4 border-pink-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-slate-600">감정의 주파수를 맞추는 중...</p>
              <p className="text-xs text-slate-400">비슷한 마음을 가진 {resultData?.totalcount || '1,200'}명의 데이터를 찾고 있어요.</p>
            </div>
          </div>
        )}

        {/* 단계 3: 결과 (포토카드) */}
        {stage === 'result' && resultData && (
          <div className="space-y-8 animate-in fade-in scale-95 duration-500">
            {/* 저장될 카드 영역 */}
            <div ref={cardRef} className="bg-white rounded-[40px] p-10 shadow-2xl border border-slate-50 flex flex-col items-center text-center space-y-6">
              <div className="w-full aspect-square bg-slate-50 rounded-[30px] overflow-hidden flex items-center justify-center border border-slate-100">
                {/* 실제 이미지가 없을 경우를 대비한 placeholder */}
                <img src={resultData.imagePath} alt={resultData.emotion} className="w-full h-full object-cover" 
                     onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400?text=Feeling+Snap")} />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-[0.3em] text-pink-500 uppercase">Today's Snapshot</span>
                <h3 className="text-2xl font-black text-slate-800 italic">“{resultData.emotion}”</h3>
              </div>

              <div className="w-full p-6 bg-slate-50 rounded-3xl">
                <p className="text-sm leading-relaxed text-slate-600 font-medium break-keep">
                  {resultData.description}
                </p>
              </div>

              <div className="w-full pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Same Feelings</p>
                  <p className="text-lg font-black text-slate-800">{resultData.matchRate}%</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-pink-400 font-bold uppercase">Feeling Snap</p>
                  <p className="text-[10px] text-slate-300 font-medium">feelingsnap.com</p>
                </div>
              </div>
            </div>

            {/* 버튼들 */}
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleSaveImage} className="py-5 bg-white text-slate-700 rounded-2xl font-bold border border-slate-200 shadow-sm active:bg-slate-50">이미지 저장 💾</button>
              <button onClick={() => alert('공유 기능')} className="py-5 bg-white text-slate-700 rounded-2xl font-bold border border-slate-200 shadow-sm active:bg-slate-50">공유하기 🔗</button>
            </div>
            <button onClick={() => setStage('input')} className="w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-widest">↻ 다시 찍기</button>
          </div>
        )}
      </main>
    </div>
  );
}