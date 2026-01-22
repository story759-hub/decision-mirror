'use client';

import { useState } from 'react';
import Script from 'next/script';

type Stage = 'input' | 'ad_basic' | 'processing' | 'result' | 'ad_deep' | 'deep_result';

export default function ClarityRoom() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [data, setData] = useState<any>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  // 텍스트 줄바꿈 함수 (컴포넌트 내부에 배치하여 참조 오류 방지)
  const drawWrappedText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let yy = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, yy);
        line = words[i] + ' ';
        yy += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, yy);
  };

  // 이미지 생성 핵심 로직 (오류 방지 버전)
  const generateCanvasImage = (analysisData: any, isDeep: boolean) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    canvas.width = 900;
    canvas.height = 1200;

    // 1. 전체 배경색
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. 카드 배경 (둥근 사각형 - 호환성 위해 수동 구현)
    const cardX = 80;
    const cardY = 150;
    const cardW = 740;
    const cardH = 800;
    const radius = 60;

    ctx.fillStyle = isDeep ? '#5D5FEF' : '#ffffff';
    ctx.beginPath();
    ctx.moveTo(cardX + radius, cardY);
    ctx.lineTo(cardX + cardW - radius, cardY);
    ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + radius);
    ctx.lineTo(cardX + cardW, cardY + cardH - radius);
    ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - radius, cardY + cardH);
    ctx.lineTo(cardX + radius, cardY + cardH);
    ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - radius);
    ctx.lineTo(cardX, cardY + radius);
    ctx.quadraticCurveTo(cardX, cardY, cardX + radius, cardY);
    ctx.closePath();
    ctx.fill();

    // 3. 텍스트 그리기
    const textColor = isDeep ? '#ffffff' : '#111827';
    ctx.textAlign = 'center';
    
    // 헤더
    ctx.fillStyle = isDeep ? 'rgba(255,255,255,0.5)' : '#5D5FEF';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText(isDeep ? 'DEEP POSITIONING' : 'CLARITY CARD', 450, 240);

    // 메인 타이틀
    ctx.fillStyle = textColor;
    ctx.font = 'bold 48px sans-serif';
    const title = isDeep ? analysisData.deep.position : analysisData.mainTitle;
    drawWrappedText(ctx, `“${title}”`, 450, 360, 600, 65);

    // 상세 내용
    ctx.font = '32px sans-serif';
    ctx.fillStyle = isDeep ? 'rgba(255,255,255,0.9)' : '#334155';
    const content = isDeep ? analysisData.deep.complex : analysisData.basic.pattern;
    drawWrappedText(ctx, content, 450, 580, 600, 48);

    // 푸터
    ctx.font = '24px sans-serif';
    ctx.fillStyle = isDeep ? 'rgba(255,255,255,0.4)' : '#94A3B8';
    ctx.fillText('Judgment Mirror v5.4', 450, 880);

    return canvas.toDataURL('image/png');
  };

  const handleBasicAnalyze = async () => {
    if (input.trim().length < 5) return alert("입력이 너무 짧습니다.");
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
        const img = generateCanvasImage(result, false);
        setGeneratedImageUrl(img);
        setStage('processing');
        setTimeout(() => setStage('result'), 1200);
      }, 5000);
    } catch (err) {
      alert("분석 중 오류 발생");
      setStage('input');
    }
  };

  const downloadImage = () => {
    if (!generatedImageUrl) return alert("이미지가 아직 준비되지 않았습니다.");
    const link = document.createElement('a');
    link.href = generatedImageUrl;
    link.download = `Clarity_${Date.now()}.png`;
    link.click();
  };

  return (
    <>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062349022770025" crossOrigin="anonymous" />
      <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center px-6 pt-20">
        <h1 className="text-4xl font-black mb-10">Clarity Room</h1>
        
        {stage === 'input' && (
          <div className="w-full max-w-md space-y-4">
            <textarea 
              className="w-full h-44 bg-slate-900/50 rounded-3xl p-6 border border-slate-700 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="머릿속 고민을 입력하세요."
            />
            <button onClick={handleBasicAnalyze} className="w-full bg-[#5D5FEF] py-5 rounded-2xl font-bold">정리 시작</button>
          </div>
        )}

        {(stage === 'ad_basic' || stage === 'processing') && (
          <div className="text-center py-20">
            <div className="animate-pulse text-[#5D5FEF] font-bold">분석 중...</div>
          </div>
        )}

        {stage === 'result' && data && (
          <div className="w-full max-w-md space-y-6">
            <div className="bg-white text-slate-900 rounded-[40px] p-10 text-center shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">“{data.mainTitle}”</h2>
              <p className="text-slate-600">{data.basic.pattern}</p>
            </div>
            <button onClick={downloadImage} className="w-full bg-white/10 py-5 rounded-2xl font-bold border border-white/20">이미지 저장 💾</button>
            <button onClick={() => window.location.reload()} className="w-full text-slate-500 text-xs uppercase tracking-widest">New Entry</button>
          </div>
        )}
      </div>
    </>
  );
}