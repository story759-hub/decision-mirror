'use client';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

type Stage = 'input' | 'ad_basic' | 'processing' | 'result' | 'ad_deep' | 'deep_result';

export default function ClarityRoom() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [data, setData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // [기능 1: 이미지 저장] - 현재 화면에 보이는 cardRef를 캡처합니다.
  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: stage === 'deep_result' ? '#5D5FEF' : '#ffffff', // 배경색 단계별 대응
        scale: 3,
        useCORS: true,
      });
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Clarity_${stage}_${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error("이미지 저장 실패", err);
      alert("이미지 저장 중 오류가 발생했습니다.");
    }
  };

  // [기능 2: 페이지 공유] - Web Share API 사용
  const handleShare = async () => {
    const shareData = {
      title: 'Clarity Room - 나의 인지 구조 분석',
      text: `"${data?.mainTitle || '나의 분석 결과'}" - 클러리티 룸에서 확인한 나의 상태입니다.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("링크가 클립보드에 복사되었습니다.");
      }
    } catch (err) {
      console.error("공유 실패", err);
    }
  };

  // [분석 로직 생략 없이 유지]
  const handleBasicAnalyze = async () => {
    if (input.trim().length < 5) {
      alert("기록할 만한 판단 구조가 감지되지 않았습니다.");
      return;
    }
    setStage('ad_basic');
    try {
      const fetchPromise = fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decisionText: input }),
      }).then(res => res.json());

      setTimeout(async () => {
        const result = await fetchPromise;
        setData(result);
        setStage('processing');
        setTimeout(() => setStage('result'), 1200);
      }, 5000);
    } catch (err) {
      setStage('input');
      alert("정리 중 오류가 발생했습니다.");
    }
  };

  const handleDeepAnalyze = () => {
    if (data?.isTrivial) return;
    setStage('ad_deep');
    setTimeout(() => setStage('deep_result'), 30000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans pb-20 selection:bg-[#5D5FEF]/30">
      <header className="max-w-xl mx-auto pt-20 pb-12 text-center px-6">
        <h1 className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent cursor-pointer" onClick={() => window.location.reload()}>
          Clarity <span className="text-[#5D5FEF]">Room</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Cognitive Depth Organizer</p>
      </header>

      <main className="max-w-lg mx-auto px-6">
        {/* 1. 입력 단계 */}
        {stage === 'input' && (
          <div className="space-y-6 animate-in fade-in">
            <textarea 
              className="w-full h-44 bg-slate-900/50 rounded-3xl p-6 text-lg border border-slate-700 focus:ring-1 focus:ring-[#5D5FEF] transition-all outline-none resize-none text-white font-light"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="현재의 혼란을 입력하십시오."
            />
            <button onClick={handleBasicAnalyze} className="w-full bg-[#5D5FEF] text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-[#5D5FEF]/20 active:scale-95 transition-all">
              상태 정리 시작 🚀
            </button>
          </div>
        )}

        {/* 2. 대기/로딩 단계 */}
        {(stage === 'ad_basic' || stage === 'ad_deep' || stage === 'processing') && (
          <div className="py-20 text-center animate-in zoom-in-95">
            <div className="text-[#5D5FEF] font-black text-xl mb-4 uppercase tracking-tighter">
              {stage === 'ad_basic' ? 'Analyzing density...' : stage === 'ad_deep' ? 'Deep Purification...' : 'Structuring...'}
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-xs mx-auto">
              <div className={`h-full bg-[#5D5FEF] ${stage === 'ad_basic' ? 'animate-[load_5s_linear]' : stage === 'ad_deep' ? 'animate-[load_30s_linear]' : 'w-full animate-pulse'}`} />
            </div>
          </div>
        )}

        {/* 3. 일반 결과 단계 (result) */}
        {stage === 'result' && data && (
          <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-1000">
            <div 
              ref={cardRef} 
              className="bg-white text-slate-900 rounded-[40px] p-12 shadow-2xl space-y-12 relative overflow-hidden flex flex-col items-center text-center"
            >
              <div className="space-y-1">
                <span className="text-[12px] font-black tracking-[0.4em] text-[#5D5FEF] uppercase block">CLARITY CARD</span>
                <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider block">A snapshot, not an answer</span>
              </div>
              <h2 className="text-2xl font-black leading-tight tracking-tighter break-keep">“{data.mainTitle}”</h2>
              <div className="w-full space-y-8">
                <section className="space-y-3">
                  <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Emotion involvement</span>
                    <span className="text-slate-900 text-xs font-mono">{data.basic.emotion}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#5D5FEF]" style={{ width: `${data.basic.emotion}%` }} />
                  </div>
                </section>
                <section className="space-y-3">
                  <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Reality exposure</span>
                    <span className="text-slate-900 text-xs font-mono">{data.basic.risk}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900" style={{ width: `${data.basic.risk}%` }} />
                  </div>
                </section>
              </div>
              <div className="bg-slate-50 w-full rounded-3xl p-8 border border-slate-100">
                <p className="text-[14px] font-bold text-slate-800 leading-relaxed italic break-keep">“{data.basic.pattern}”</p>
              </div>
              <div className="pt-4 space-y-1">
                <p className="text-[13px] font-black text-slate-900">답은 없었지만, 정리는 됐다.</p>
                <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">Judgment Mirror v5.4</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* 기능 버튼 그룹 */}
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleSaveImage} className="py-5 bg-white/5 text-slate-300 rounded-2xl font-bold text-sm border border-white/10 active:bg-white/10">
                  이미지 저장 💾
                </button>
                <button onClick={handleShare} className="py-5 bg-white/5 text-slate-300 rounded-2xl font-bold text-sm border border-white/10 active:bg-white/10">
                  결과 공유 🔗
                </button>
              </div>

              {!data.isTrivial ? (
                <button onClick={handleDeepAnalyze} className="w-full py-5 bg-[#5D5FEF] text-white rounded-2xl font-black text-sm shadow-xl shadow-[#5D5FEF]/20 active:scale-95 transition-all">
                  심층 분석 (30초 정제) 🔓
                </button>
              ) : (
                <div className="text-center p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] leading-relaxed">Cognitive density too low<br/>Deep analysis is restricted</p>
                </div>
              )}
              
              <button onClick={() => { setStage('input'); setInput(''); }} className="w-full py-4 text-slate-500 font-bold text-xs uppercase tracking-widest">
                New Entry
              </button>
            </div>
          </div>
        )}

        {/* 4. 심층 결과 단계 (deep_result) */}
        {stage === 'deep_result' && data && (
          <div className="space-y-8 animate-in zoom-in-95 duration-700">
            <div ref={cardRef} className="bg-[#5D5FEF] text-white rounded-[40px] p-12 shadow-2xl space-y-12 text-center overflow-hidden">
              <div className="space-y-1">
                <span className="text-[11px] font-black tracking-[0.3em] opacity-60 uppercase">DEEP POSITIONING</span>
                <span className="text-[9px] font-bold opacity-40 uppercase">Where you stand</span>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-black leading-tight break-keep">“{data.deep.position}”</h3>
                <p className="text-sm font-medium opacity-90 leading-relaxed break-keep">{data.deep.complex}</p>
              </div>
              <div className="pt-8 border-t border-white/20">
                <p className="text-[12px] font-black italic opacity-80 uppercase tracking-tight">“이 상태는 틀리지 않았다.”</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Deep 단계에서도 저장 및 공유 추가 */}
              <div className="grid grid-cols-2 gap-3">
                <button onClick={handleSaveImage} className="py-5 bg-white/10 text-white rounded-2xl font-bold text-sm border border-white/20 active:bg-white/20">
                  이미지 저장 💾
                </button>
                <button onClick={handleShare} className="py-5 bg-white/10 text-white rounded-2xl font-bold text-sm border border-white/20 active:bg-white/20">
                  결과 공유 🔗
                </button>
              </div>
              <button onClick={() => { setStage('input'); setInput(''); }} className="w-full py-5 bg-slate-800 text-slate-400 rounded-2xl font-black text-sm uppercase">Reset</button>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes load {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}