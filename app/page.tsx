'use client';

import { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';

type Stage =
  | 'input'
  | 'ad_basic'
  | 'processing'
  | 'result'
  | 'ad_deep'
  | 'deep_result';

export default function ClarityRoom() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [data, setData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ------------------------------
     ✅ 최종 안정 이미지 저장 로직
  ------------------------------ */
  const handleSaveImage = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor:
          stage === 'deep_result' ? '#5D5FEF' : '#ffffff',
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `Clarity_${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error('이미지 저장 실패:', err);
      alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /* ------------------------------ */
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: 'Clarity Room',
        text: '나의 상태 정리 카드',
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다.');
    }
  };

  const handleBasicAnalyze = async () => {
    if (input.trim().length < 5) {
      alert('조금 더 입력해주세요.');
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
        setStage('processing');
        setTimeout(() => setStage('result'), 1200);
      }, 5000);
    } catch {
      setStage('input');
      alert('분석 실패');
    }
  };

  const handleDeepAnalyze = () => {
    setStage('ad_deep');
    setTimeout(() => setStage('deep_result'), 30000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 pb-20">
      <header className="max-w-xl mx-auto pt-20 pb-12 text-center px-6">
        <h1
          className="text-4xl font-black tracking-tighter mb-2 cursor-pointer"
          onClick={() => window.location.reload()}
        >
          Clarity <span className="text-[#5D5FEF]">Room</span>
        </h1>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          Cognitive Depth Organizer
        </p>
      </header>

      <main className="max-w-lg mx-auto px-6">
        {stage === 'input' && (
          <div className="space-y-6">
            <textarea
              className="w-full h-44 bg-slate-900/50 rounded-3xl p-6 text-lg border border-slate-700 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="현재의 혼란을 입력하십시오."
            />
            <button
              onClick={handleBasicAnalyze}
              className="w-full bg-[#5D5FEF] py-5 rounded-2xl font-black text-lg"
            >
              상태 정리 시작 🚀
            </button>
          </div>
        )}

        {stage === 'result' && data && (
          <div className="space-y-8">
            <div
              ref={cardRef}
              className="bg-white text-slate-900 rounded-[40px] p-12 shadow-2xl space-y-8 text-center"
            >
              <span className="text-[12px] font-black tracking-[0.4em] text-[#5D5FEF] uppercase">
                CLARITY CARD
              </span>
              <h2 className="text-2xl font-black">“{data.mainTitle}”</h2>
              <div className="bg-slate-50 rounded-3xl p-8">
                <p className="italic font-bold">
                  “{data.basic.pattern}”
                </p>
              </div>
              <p className="font-black">답은 없었지만, 정리는 됐다.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSaveImage}
                className="py-5 bg-white/5 rounded-2xl font-bold"
              >
                이미지 저장 💾
              </button>
              <button
                onClick={handleShare}
                className="py-5 bg-white/5 rounded-2xl font-bold"
              >
                링크 공유 🔗
              </button>
            </div>

            {!data.isTrivial && (
              <button
                onClick={handleDeepAnalyze}
                className="w-full py-5 bg-[#5D5FEF] rounded-2xl font-black"
              >
                심층 분석 시작 🔓
              </button>
            )}
          </div>
        )}

        {stage === 'deep_result' && data && (
          <div className="space-y-8">
            <div
              ref={cardRef}
              className="bg-[#5D5FEF] text-white rounded-[40px] p-12 shadow-2xl text-center space-y-6"
            >
              <span className="text-[11px] font-black opacity-60 uppercase">
                DEEP POSITIONING
              </span>
              <h3 className="text-xl font-black">
                “{data.deep.position}”
              </h3>
              <p className="opacity-90">{data.deep.complex}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSaveImage}
                className="py-5 bg-white/10 rounded-2xl font-bold"
              >
                이미지 저장 💾
              </button>
              <button
                onClick={handleShare}
                className="py-5 bg-white/10 rounded-2xl font-bold"
              >
                링크 공유 🔗
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
