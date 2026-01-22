'use client';

import { useState } from 'react';

export default function ClarityRoom() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ------------------------------
     카드 이미지 생성
  ------------------------------ */
  const generateImage = (data: any) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 900;
    canvas.height = 1200;

    // 배경
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 카드
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(80, 160, 740, 760, 48);
    ctx.fill();

    ctx.fillStyle = '#111827';
    ctx.font = 'bold 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Clarity Room', 450, 260);

    ctx.font = 'bold 32px sans-serif';
    wrapText(ctx, `“${data.mainTitle}”`, 450, 340, 620, 42);

    ctx.font = 'italic 26px sans-serif';
    wrapText(ctx, data.basic.pattern, 450, 480, 620, 36);

    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText('Judgment Mirror v5.4', 450, 780);

    return canvas.toDataURL('image/png');
  };

  /* ------------------------------
     분석 요청
  ------------------------------ */
  const analyze = async () => {
    if (input.trim().length < 5) {
      alert('조금 더 구체적으로 입력하세요.');
      return;
    }

    setLoading(true);
    setImageUrl(null);

    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decisionText: input }),
    });

    const data = await res.json();
    const img = generateImage(data);

    setImageUrl(img);
    setLoading(false);
  };

  /* ------------------------------
     다운로드
  ------------------------------ */
  const downloadImage = () => {
    if (!imageUrl) return;
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = `clarity_${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center px-6 pt-20">
      <h1 className="text-3xl font-black mb-2">Clarity Room</h1>
      <p className="text-xs tracking-widest text-slate-400 mb-10">
        Cognitive Depth Organizer
      </p>

      {!imageUrl && (
        <>
          <textarea
            className="w-full max-w-md h-40 rounded-2xl bg-slate-900/70 p-5 outline-none"
            placeholder="지금 머릿속 상태를 입력하세요."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={analyze}
            className="mt-6 w-full max-w-md py-4 rounded-xl bg-indigo-500 font-bold"
          >
            {loading ? '데이터를 분석하고 있습니다' : '정리 시작'}
          </button>
        </>
      )}

      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt="Clarity Result"
            className="w-full max-w-md rounded-3xl shadow-xl"
          />
          <button
            onClick={downloadImage}
            className="mt-6 w-full max-w-md py-4 rounded-xl bg-white/10"
          >
            이미지 저장 💾
          </button>
        </>
      )}
    </div>
  );
}

/* ------------------------------
   텍스트 줄바꿈
------------------------------ */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
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
