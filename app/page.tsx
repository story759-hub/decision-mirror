'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Script from 'next/script';

type Stage =
  | 'input'
  | 'loading'
  | 'processing'
  | 'result'
  | 'deep_processing'
  | 'deep_result';

export default function ClarityRoom() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [data, setData] = useState<any>(null);

  const captureRef = useRef<HTMLDivElement>(null);

  /* -----------------------------------
     이미지 저장 (실동작 안정판)
  ----------------------------------- */
  const handleSaveImage = async () => {
    const target = captureRef.current;
    if (!target) return alert('저장할 결과가 없습니다.');

    // ✅ 캡처용 임시 노드 생성
    const clone = target.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.top = '-9999px';
    clone.style.left = '0';
    clone.style.transform = 'none';
    clone.style.opacity = '1';
    document.body.appendChild(clone);

    await new Promise((r) => setTimeout(r, 300));

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });

      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `clarity_${Date.now()}.png`;
      a.click();
    } catch (e) {
      alert('이미지 저장에 실패했습니다.');
    } finally {
      document.body.removeChild(clone);
    }
  };

  /* -----------------------------------
     링크 공유
  ----------------------------------- */
  const handleShareLink = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: 'Clarity Room',
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다.');
    }
  };

  /* -----------------------------------
     기본 분석
  ----------------------------------- */
  const handleAnalyze = async () => {
    if (input.trim().length < 5) {
      alert('조금 더 구체적으로 입력해 주세요.');
      return;
    }

    setStage('loading');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decisionText: input }),
      });

      const result = await res.json();
      setData(result);

      setStage('processing');
      setTimeout(() => setStage('result'), 1200);
    } catch {
      setStage('input');
      alert('분석 중 오류가 발생했습니다.');
    }
  };

  /* -----------------------------------
     Deep 분석
  ----------------------------------- */
  const handleDeepAnalyze = () => {
    setStage('deep_processing');
    setTimeout(() => setStage('deep_result'), 2500);
  };

  return (
    <>
      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062349022770025"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-[#0F172A] text-white pb-24">
        <header className="text-center pt-20 pb-12">
          <h1
            className="text-4xl font-black cursor-pointer"
            onClick={() => location.reload()}
          >
            Clarity <span className="text-[#5D5FEF]">Room</span>
          </h1>
          <p className="text-xs tracking-widest text-slate-400 mt-2">
            Cognitive Depth Organizer
          </p>
        </header>

        <main className="max-w-lg mx-auto px-6">
          {/* INPUT */}
          {stage === 'input' && (
            <div className="space-y-6">
              <textarea
                className="w-full h-44 bg-slate-900/60 rounded-3xl p-6 text-lg resize-none outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="지금 머릿속 상태를 입력하세요."
              />
              <button
                onClick={handleAnalyze}
                className="w-full py-5 rounded-2xl bg-[#5D5FEF] font-black"
              >
                정리 시작
              </button>
            </div>
          )}

          {/* LOADING */}
          {(stage === 'loading' ||
            stage === 'processing' ||
            stage === 'deep_processing') && (
            <div className="py-24 text-center">
              <p className="text-[#5D5FEF] text-xl font-black mb-3">
                데이터를 분석하고 있습니다
              </p>
              <p className="text-xs text-slate-400 tracking-widest">
                잠시만 기다려 주세요
              </p>
            </div>
          )}

          {/* RESULT */}
          {stage === 'result' && data && (
            <div className="space-y-6">
              <div
                ref={captureRef}
                className="bg-white text-slate-900 rounded-[36px] p-10 text-center space-y-8 shadow-xl"
              >
                <h2 className="text-2xl font-black">
                  “{data.mainTitle}”
                </h2>
                <p className="italic font-bold">
                  {data.basic?.pattern}
                </p>
                <p className="text-xs text-slate-400">
                  Judgment Mirror v5
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleSaveImage}
                  className="py-4 rounded-xl bg-white/10"
                >
                  이미지 저장 💾
                </button>
                <button
                  onClick={handleShareLink}
                  className="py-4 rounded-xl bg-white/10"
                >
                  링크 공유 🔗
                </button>
              </div>

              {!data.isTrivial && (
                <button
                  onClick={handleDeepAnalyze}
                  className="w-full py-5 rounded-2xl bg-[#5D5FEF] font-black"
                >
                  심층 분석 열기
                </button>
              )}
            </div>
          )}

          {/* DEEP RESULT */}
          {stage === 'deep_result' && data && (
            <div className="space-y-6">
              <div
                ref={captureRef}
                className="bg-[#5D5FEF] rounded-[36px] p-10 text-center space-y-6 shadow-xl"
              >
                <h3 className="text-xl font-black">
                  {data.deep?.position}
                </h3>
                <p className="opacity-90">
                  {data.deep?.complex}
                </p>
                <p className="italic font-bold">
                  이 상태는 틀리지 않았다
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleSaveImage}
                  className="py-4 rounded-xl bg-white/10"
                >
                  이미지 저장 💾
                </button>
                <button
                  onClick={handleShareLink}
                  className="py-4 rounded-xl bg-white/10"
                >
                  링크 공유 🔗
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
