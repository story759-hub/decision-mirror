'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

type Stage = 'input' | 'analyzing' | 'result';

export default function FeelingSnap() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [resultData, setResultData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. 감정 분석 시뮬레이션 (필링스냅 로직)
  const handleAnalyze = async () => {
    if (input.trim().length < 5) return alert("오늘의 마음을 조금 더 들려주세요.");
    
    setStage('analyzing');

    // 3초간 분석하는 척하며 통계와 이미지를 준비합니다.
    setTimeout(() => {
      setResultData({
        emotion: "기쁨",
        imagePath: "/images/joy_01.png", 
        matchRate: 84, // 통계 데이터 (%)
        description: "당신의 마음속에 몽글몽글한 구름이 피어오르고 있네요. 이 기분은 주변 사람들에게도 따뜻한 에너지가 될 거예요.",
        totalCount: 1240
      });
      setStage('result');
    }, 3000);
  };

  // 2. 필링스냅 포토카드 이미지 저장
  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: '#F8FAFC', // 배경색과 통일
      });
      const link = document.createElement('a');
      link.download = `FeelingSnap_${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert('이미지를 저장할 수 없습니다.');
    }
  };

  // 3. 공유하기 (Native Share API)
  const handleShare = async () => {
    try {
      const shareData = {
        title: '필링스냅 (Feeling Snap)',
        text: `오늘 내 감정의 모습은? "${resultData?.emotion}" 스냅을 확인해보세요.`,
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20 selection:bg-pink-100">
      {/* 상단 로고 */}
      <header className="max-w-xl mx-auto pt-16 pb-10 text-center px-6">
        <h1 className="text-3xl font-black tracking-tighter text-slate-800 mb-2 cursor-pointer" onClick={() => setStage('input')}>
          Feeling <span className="text-pink-500">Snap</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Capture your heart, Share your mood</p>
      </header>

      <main className="max-w-md mx-auto px-6">
        {/* 단계 1: 입력 화면 */}
        {stage === 'input' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-700 tracking-tight">지금 어떤 기분이신가요?</h2>
              <p className="text-sm text-slate-400 font-medium">누구에게도 말하지 못한 감정을 솔직하게 적어보세요.</p>
            </div>
            <textarea
              className="w-full h-64 bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] rounded-[32px] p-8 text-lg border-none focus:ring-2 focus:ring-pink-100 outline-none transition-all placeholder:text-slate-200 leading-relaxed"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="여기에 당신의 마음을 스냅하세요..."
            />
            <button onClick={handleAnalyze} className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-bold text-lg shadow-2xl shadow-slate-200 active:scale-[0.98] transition-all">
              나만의 감정카드 만들기 ✨
            </button>
          </div>
        )}

        {/* 단계 2: 스냅 촬영 중 (로딩) */}
        {stage === 'analyzing' && (
          <div className="py-24 text-center space-y-8 animate-in zoom-in-95 duration-300">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-[6px] border-pink-50 rounded-full"></div>
              <div className="absolute inset-0 border-[6px] border-pink-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <div className="space-y-3">
              <p className="font-bold text-lg text-slate-700 tracking-tight">감정의 주파수를 맞추는 중...</p>
              <div className="flex flex-col space-y-1">
                <p className="text-xs text-slate-400 font-medium italic">"당신과 비슷한 마음을 가진 데이터를 찾고 있어요"</p>
                <div className="w-32 h-1 bg-slate-100 mx-auto rounded-full mt-4 overflow-hidden">
                   <div className="h-full bg-pink-500 animate-[load_3s_linear]"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 단계 3: 스냅 결과 (포토카드) */}
        {stage === 'result' && resultData && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* [포토카드 영역] - html-to-image가 캡처할 대상 */}
            <div ref={cardRef} className="bg-white rounded-[44px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white flex flex-col items-center text-center space-y-7">
              {/* 감정 이미지 프레임 */}
              <div className="w-full aspect-square bg-[#F1F5F9] rounded-[32px] overflow-hidden flex items-center justify-center border border-slate-50 shadow-inner">
                <img 
                  src={resultData.imagePath} 
                  alt={resultData.emotion} 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
                  onError={(e) => (e.currentTarget.src = `https://via.placeholder.com/400/F1F5F9/64748B?text=${resultData.emotion}`)}
                />
              </div>
              
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-[0.4em] text-pink-500 uppercase ml-[0.4em]">Today's Snapshot</span>
                <h3 className="text-3xl font-black text-slate-800 italic tracking-tighter">“{resultData.emotion}”</h3>
              </div>

              <div className="w-full p-7 bg-[#F8FAFC] rounded-[28px] border border-slate-50/50">
                <p className="text-[15px] leading-relaxed text-slate-600 font-bold break-keep">
                  {resultData.description}
                </p>
              </div>

              {/* 통계 데이터 영역 */}
              <div className="w-full pt-6 border-t border-slate-50 flex justify-between items-end px-2">
                <div className="text-left">
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider mb-1">Same Mood</p>
                  <p className="text-2xl font-black text-slate-800 tracking-tighter">{resultData.matchRate}<span className="text-sm ml-0.5">%</span></p>
                </div>
                <div className="text-right pb-1">
                  <p className="text-[11px] text-pink-500 font-black uppercase tracking-widest">Feeling Snap</p>
                  <p className="text-[9px] text-slate-300 font-medium">feelingsnap.com</p>
                </div>
              </div>
            </div>

            {/* 하단 버튼 액션 */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleSaveImage} className="py-5 bg-white text-slate-700 rounded-2xl font-bold border border-slate-200 shadow-sm active:bg-slate-50 transition-colors">스냅 저장 💾</button>
                <button onClick={handleShare} className="py-5 bg-white text-slate-700 rounded-2xl font-bold border border-slate-200 shadow-sm active:bg-slate-50 transition-colors">공유하기 🔗</button>
              </div>
              <button 
                onClick={() => setStage('input')} 
                className="w-full py-4 text-slate-400 font-bold text-xs uppercase tracking-[0.3em] hover:text-pink-400 transition-colors"
              >
                ↻ Retake Snapshot
              </button>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes load { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
}