'use client';

import { useState, useRef } from 'react';

type Stage = 'input' | 'ad_basic' | 'processing' | 'result' | 'ad_deep' | 'deep_result';

export default function ClarityRoom() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [data, setData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

/* ------------------------------
      [최종 해결] 이미지 저장 로직
  ------------------------------ */
  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      // 1. 캔버스 생성
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,             // 3에서 2로 조절 (사양 충돌 방지)
        useCORS: true,        
        allowTaint: true,
        backgroundColor: stage === 'deep_result' ? '#5D5FEF' : '#ffffff',
        logging: false,
        // 아래 설정을 추가하여 렌더링 누락 방지
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      });

      // 2. Blob 방식으로 변환 (가장 안전한 다운로드 방식)
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Clarity_${Date.now()}.png`;
        
        document.body.appendChild(link);
        link.click();
        
        // 정리
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 'image/png');

    } catch (err) {
      console.error("이미지 저장 실패:", err);
      alert("이미지 저장에 실패했습니다. 크롬 브라우저 이용을 권장합니다.");
    }
  };

  // 나머지 handleShare, handleBasicAnalyze 등 로직은 동일하게 유지됩니다.
  const handleShare = async () => {
    try {
      const shareData = {
        title: 'Clarity Room',
        text: `"${data?.mainTitle || '분석 결과'}" 확인하기`,
        url: window.location.href,
      };
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        alert("링크가 복사되었습니다.");
      }
    } catch (err) { console.error(err); }
  };

  const handleBasicAnalyze = async () => {
    if (input.trim().length < 5) return alert("내용을 조금 더 입력해주세요.");
    setStage('ad_basic');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decisionText: input }),
      });
      const result = await res.json();
      setTimeout(() => {
        setData(result);
        setStage('processing');
        setTimeout(() => setStage('result'), 1200);
      }, 5000);
    } catch (err) {
      setStage('input');
      alert("오류가 발생했습니다.");
    }
  };

  const handleDeepAnalyze = () => {
    setStage('ad_deep');
    setTimeout(() => setStage('deep_result'), 30000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans pb-20">
      <header className="max-w-xl mx-auto pt-20 pb-12 text-center px-6">
        <h1 className="text-4xl font-black tracking-tighter mb-2 cursor-pointer" onClick={() => window.location.reload()}>
          Clarity <span className="text-[#5D5FEF]">Room</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Cognitive Depth Organizer</p>
      </header>

      <main className="max-w-lg mx-auto px-6">
        {stage === 'input' && (
          <div className="space-y-6">
            <textarea
              className="w-full h-44 bg-slate-900/50 rounded-3xl p-6 text-lg border border-slate-700 focus:ring-1 focus:ring-[#5D5FEF] outline-none text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="현재의 혼란을 입력하십시오."
            />
            <button onClick={handleBasicAnalyze} className="w-full bg-[#5D5FEF] text-white py-5 rounded-2xl font-black text-lg">상태 정리 시작 🚀</button>
          </div>
        )}

        {(stage === 'ad_basic' || stage === 'ad_deep' || stage === 'processing') && (
          <div className="py-20 text-center animate-pulse">
            <div className="text-[#5D5FEF] font-black text-xl mb-4 uppercase">{stage === 'ad_basic' ? 'Analyzing...' : 'Processing...'}</div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden max-w-xs mx-auto">
              <div className="h-full bg-[#5D5FEF] animate-[load_5s_linear]" />
            </div>
          </div>
        )}

        {stage === 'result' && data && (
          <div className="space-y-8">
            <div ref={cardRef} className="bg-white text-slate-900 rounded-[40px] p-12 shadow-2xl space-y-8 flex flex-col items-center text-center">
              <span className="text-[12px] font-black tracking-[0.4em] text-[#5D5FEF] uppercase">CLARITY CARD</span>
              <h2 className="text-2xl font-black leading-tight">“{data.mainTitle}”</h2>
              <div className="bg-slate-50 w-full rounded-3xl p-8 border border-slate-100">
                <p className="text-[14px] font-bold text-slate-800 italic">“{data.basic.pattern}”</p>
              </div>
              <p className="text-[13px] font-black text-slate-900">답은 없었지만, 정리는 됐다.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleSaveImage} className="py-5 bg-white/5 text-slate-300 rounded-2xl font-bold border border-white/10">이미지 저장 💾</button>
              <button onClick={handleShare} className="py-5 bg-white/5 text-slate-300 rounded-2xl font-bold border border-white/10">결과 공유 🔗</button>
            </div>
            {!data.isTrivial && <button onClick={handleDeepAnalyze} className="w-full py-5 bg-[#5D5FEF] text-white rounded-2xl font-black shadow-xl">심층 분석 시작 🔓</button>}
          </div>
        )}

        {stage === 'deep_result' && data && (
          <div className="space-y-8">
            <div ref={cardRef} className="bg-[#5D5FEF] text-white rounded-[40px] p-12 shadow-2xl space-y-8 text-center">
              <span className="text-[11px] font-black tracking-[0.3em] opacity-60 uppercase">DEEP POSITIONING</span>
              <h3 className="text-xl font-black">“{data.deep.position}”</h3>
              <p className="text-sm font-medium opacity-90">{data.deep.complex}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleSaveImage} className="py-5 bg-white/10 text-white rounded-2xl font-bold border border-white/20">이미지 저장 💾</button>
              <button onClick={handleShare} className="py-5 bg-white/10 text-white rounded-2xl font-bold border border-white/20">결과 공유 🔗</button>
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