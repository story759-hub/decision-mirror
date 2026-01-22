'use client';

import { useState, useRef } from 'react';
import Script from 'next/script';

type Stage = 'input' | 'ad_basic' | 'processing' | 'result' | 'ad_deep' | 'deep_result';

export default function ClarityRoom() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [data, setData] = useState<any>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  /* ------------------------------
      [핵심] Canvas 이미지 생성 함수
  ------------------------------ */
  const generateCanvasImage = (analysisData: any, isDeep: boolean) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // 고해상도를 위해 크기 설정 (900x1200)
    canvas.width = 900;
    canvas.height = 1200;

    // 1. 전체 배경색
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. 카드 배경 (일반은 흰색, 심층은 보라색)
    ctx.fillStyle = isDeep ? '#5D5FEF' : '#ffffff';
    ctx.beginPath();
    ctx.roundRect(80, 150, 740, 800, 60);
    ctx.fill();

    // 3. 카드 내부 텍스트 설정
    const textColor = isDeep ? '#ffffff' : '#111827';
    const subColor = isDeep ? 'rgba(255,255,255,0.6)' : '#94A3B8';
    
    ctx.textAlign = 'center';
    
    // 헤더 텍스트
    ctx.fillStyle = isDeep ? 'rgba(255,255,255,0.5)' : '#5D5FEF';
    ctx.font = 'black 24px sans-serif';
    ctx.fillText(isDeep ? 'DEEP POSITIONING' : 'CLARITY CARD', 450, 240);

    // 메인 타이틀 (줄바꿈 적용)
    ctx.fillStyle = textColor;
    ctx.font = 'bold 48px sans-serif';
    const title = isDeep ? analysisData.deep.position : analysisData.mainTitle;
    wrapText(ctx, `“${title}”`, 450, 340, 600, 60);

    // 상세 내용/패턴 (줄바꿈 적용)
    ctx.font = 'medium 32px sans-serif';
    const content = isDeep ? analysisData.deep.complex : analysisData.basic.pattern;
    ctx.fillStyle = isDeep ? 'rgba(255,255,255,0.9)' : '#334155';
    wrapText(ctx, content, 450, 550, 600, 45);

    // 하단 푸터
    ctx.font = '24px sans-serif';
    ctx.fillStyle = subColor;
    ctx.fillText('Judgment Mirror v5.4', 450, 880);

    return canvas.toDataURL('image/png');
  };

  /* ------------------------------
      분석 및 데이터 처리
  ------------------------------ */
  const handleBasicAnalyze = async () => {
    if (input.trim().length < 5) {
      alert("조금 더 구체적으로 입력하세요.");
      return;
    }
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
        // 결과 단계로 넘어가기 전 이미지 미리 생성
        const img = generateCanvasImage(result, false);
        setGeneratedImageUrl(img);
        setStage('processing');
        setTimeout(() => setStage('result'), 1200);
      }, 5000);
    } catch (err) {
      setStage('input');
      alert("정리 중 오류가 발생했습니다.");
    }
  };

  const handleDeepAnalyze = () => {
    setStage('ad_deep');
    setTimeout(() => {
      const img = generateCanvasImage(data, true);
      setGeneratedImageUrl(img);
      setStage('deep_result');
    }, 30000);
  };

  const downloadImage = () => {
    if (!generatedImageUrl) return;
    const a = document.createElement('a');
    a.href = generatedImageUrl;
    a.download = `Clarity_${Date.now()}.png`;
    a.click();
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Clarity Room',
      text: '나의 인지 구조 분석 결과입니다.',
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        alert("링크가 복사되었습니다.");
      }
    } catch (err) { console.error(err); }
  };

  return (
    <>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062349022770025" crossorigin="anonymous" />
      
      <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans pb-20 px-6">
        <header className="max-w-xl mx-auto pt-20 pb-12 text-center">
          <h1 className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent cursor-pointer" onClick={() => window.location.reload()}>
            Clarity <span className="text-[#5D5FEF]">Room</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Cognitive Depth Organizer</p>
        </header>

        <main className="max-w-lg mx-auto">
          {stage === 'input' && (
            <div className="space-y-6 animate-in fade-in">
              <textarea 
                className="w-full h-44 bg-slate-900/50 rounded-3xl p-6 text-lg border border-slate-700 focus:ring-1 focus:ring-[#5D5FEF] outline-none resize-none text-white font-light"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="현재의 혼란을 입력하십시오."
              />
              <button onClick={handleBasicAnalyze} className="w-full bg-[#5D5FEF] text-white py-5 rounded-2xl font-black text-lg active:scale-95 transition-all">
                상태 정리 시작 🚀
              </button>
            </div>
          )}

          {(stage === 'ad_basic' || stage === 'ad_deep' || stage === 'processing') && (
            <div className="py-20 text-center animate-in zoom-in-95">
              <div className="text-[#5D5FEF] font-black text-xl mb-4 uppercase tracking-tighter">
                {stage === 'ad_basic' ? 'Analyzing density...' : stage === 'ad_deep' ? 'Deep Purification...' : 'Structuring...'}
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-xs mx-auto mb-4">
                <div className={`h-full bg-[#5D5FEF] ${stage === 'ad_basic' ? 'animate-[load_5s_linear]' : stage === 'ad_deep' ? 'animate-[load_30s_linear]' : 'w-full animate-pulse'}`} />
              </div>
            </div>
          )}

          {(stage === 'result' || stage === 'deep_result') && data && (
            <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-700">
              {/* 화면에 보여지는 결과 카드 (Canvas와 디자인 동일하게 유지) */}
              <div className={`${stage === 'deep_result' ? 'bg-[#5D5FEF] text-white' : 'bg-white text-slate-900'} rounded-[40px] p-12 shadow-2xl space-y-8 text-center`}>
                 <span className={`text-[12px] font-black tracking-[0.4em] ${stage === 'deep_result' ? 'text-white/60' : 'text-[#5D5FEF]'} uppercase block`}>
                    {stage === 'deep_result' ? 'DEEP POSITIONING' : 'CLARITY CARD'}
                 </span>
                 <h2 className="text-2xl font-black leading-tight tracking-tighter break-keep">
                    “{stage === 'deep_result' ? data.deep.position : data.mainTitle}”
                 </h2>
                 <p className={`text-sm font-medium ${stage === 'deep_result' ? 'text-white/90' : 'text-slate-600'} leading-relaxed break-keep`}>
                    {stage === 'deep_result' ? data.deep.complex : data.basic.pattern}
                 </p>
                 <p className={`pt-4 text-[9px] font-bold uppercase tracking-widest ${stage === 'deep_result' ? 'text-white/40' : 'text-slate-300'}`}>Judgment Mirror v5.4</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={downloadImage} className="py-5 bg-white/5 text-slate-300 rounded-2xl font-bold text-sm border border-white/10 active:bg-white/10">
                    이미지 저장 💾
                  </button>
                  <button onClick={handleShare} className="py-5 bg-white/5 text-slate-300 rounded-2xl font-bold text-sm border border-white/10 active:bg-white/10">
                    결과 공유 🔗
                  </button>
                </div>
                {stage === 'result' && !data.isTrivial && (
                  <button onClick={handleDeepAnalyze} className="w-full py-5 bg-[#5D5FEF] text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all">
                    심층 분석 (30초 정제) 🔓
                  </button>
                )}
                <button onClick={() => { setStage('input'); setInput(''); setGeneratedImageUrl(null); }} className="w-full py-4 text-slate-500 font-bold text-xs uppercase tracking-widest">
                  New Entry
                </button>
              </div>
            </div>
          )}
        </main>

        <style jsx>{`
          @keyframes load { from { width: 0%; } to { width: 100%; } }
        `}</style>
      </div>
    </>
  );
}

/* ------------------------------
    텍스트 줄바꿈 보조 함수
------------------------------ */
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let yy = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const { width } = ctx.measureText(testLine);
    if (width > maxWidth && i > 0) {
      ctx.fillText(line, x, yy);
      line = words[i] + ' ';
      yy += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, yy);
}