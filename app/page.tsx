'use client';

import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Script from 'next/script';

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

  // ✅ 캡처 전용 ref (단 하나만 사용)
  const captureRef = useRef<HTMLDivElement>(null);

  /* --------------------------------------------------
     폰트 로딩 안정화
  -------------------------------------------------- */
  useEffect(() => {
    document.fonts?.ready.then(() => {
      console.log('Fonts ready');
    });
  }, []);

  /* --------------------------------------------------
     이미지 저장 (안정판)
  -------------------------------------------------- */
  const handleSaveImage = async () => {
    const target = captureRef.current;
    if (!target) {
      alert('캡처 대상이 준비되지 않았습니다.');
      return;
    }

    // 렌더링/애니메이션 안정화 대기
    await new Promise((r) =>
      requestAnimationFrame(() => setTimeout(r, 120))
    );

    try {
      const canvas = await html2canvas(target, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        logging: false,
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Clarity_${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error('이미지 저장 실패:', err);
      alert('이미지 생성 중 오류가 발생했습니다.');
    }
  };

  /* --------------------------------------------------
     공유
  -------------------------------------------------- */
  const handleShare = async () => {
    const title = 'Clarity Room';
    const text = `"${data?.mainTitle}"`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다.');
    }
  };

  /* --------------------------------------------------
     기본 분석
  -------------------------------------------------- */
  const handleBasicAnalyze = async () => {
    if (input.trim().length < 5) {
      alert('기록할 만한 판단 구조가 감지되지 않았습니다.');
      return;
    }

    setStage('ad_basic');

    try {
      const fetchPromise = fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decisionText: input }),
      }).then((res) => res.json());

      setTimeout(async () => {
        const result = await fetchPromise;
        setData(result);
        setStage('processing');
        setTimeout(() => setStage('result'), 1000);
      }, 5000);
    } catch {
      setStage('input');
      alert('정리 중 오류가 발생했습니다.');
    }
  };

  /* --------------------------------------------------
     Deep 분석
  -------------------------------------------------- */
  const handleDeepAnalyze = () => {
    if (data?.isTrivial) return;
    setStage('ad_deep');
    setTimeout(() => setStage('deep_result'), 30000);
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

      <div className="min-h-screen bg-[#0F172A] text-slate-100 pb-20">
        <header className="max-w-xl mx-auto pt-20 pb-12 text-center px-6">
          <h1
            className="text-4xl font-black tracking-tighter mb-2 text-white cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Clarity <span className="text-[#5D5FEF]">Room</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            Cognitive Depth Organizer
          </p>
        </header>

        <main className="max-w-lg mx-auto px-6">
          {/* INPUT */}
          {stage === 'input' && (
            <div className="space-y-6">
              <textarea
                className="w-full h-44 bg-slate-900/50 rounded-3xl p-6 text-lg border border-slate-700 outline-none resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="현재의 혼란을 입력하십시오."
              />
              <button
                onClick={handleBasicAnalyze}
                className="w-full bg-[#5D5FEF] text-white py-5 rounded-2xl font-black"
              >
                상태 정리 시작 🚀
              </button>
            </div>
          )}

          {/* LOADING */}
          {(stage === 'ad_basic' ||
            stage === 'ad_deep' ||
            stage === 'processing') && (
            <div className="py-20 text-center">
              <p className="text-[#5D5FEF] font-black text-xl mb-4">
                Structuring...
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">
                광고 시청 후 결과가 공개됩니다
              </p>
            </div>
          )}

          {/* RESULT */}
          {stage === 'result' && data && (
            <div className="space-y-6">
              <div
                ref={captureRef}
                data-capture="card"
                className="bg-white text-slate-900 rounded-[40px] p-12 shadow-2xl text-center space-y-10"
              >
                <h2 className="text-2xl font-black">
                  “{data.mainTitle}”
                </h2>

                <p className="italic font-bold">
                  “{data.basic.pattern}”
                </p>

                <p className="text-xs text-slate-400 font-bold">
                  Judgment Mirror v5.4
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleSaveImage}
                  className="py-4 bg-white/5 rounded-xl"
                >
                  이미지 저장 💾
                </button>
                <button
                  onClick={handleShare}
                  className="py-4 bg-white/5 rounded-xl"
                >
                  결과 공유 🔗
                </button>
              </div>

              {!data.isTrivial && (
                <button
                  onClick={handleDeepAnalyze}
                  className="w-full py-5 bg-[#5D5FEF] text-white rounded-2xl font-black"
                >
                  심층 분석 🔓
                </button>
              )}
            </div>
          )}

          {/* DEEP RESULT */}
          {stage === 'deep_result' && data && (
            <div className="space-y-6">
              <div
                ref={captureRef}
                data-capture="card"
                className="bg-[#5D5FEF] text-white rounded-[40px] p-12 shadow-2xl text-center space-y-8"
              >
                <h3 className="text-xl font-black">
                  {data.deep.position}
                </h3>
                <p className="opacity-90">
                  {data.deep.complex}
                </p>
                <p className="italic font-bold">
                  “이 상태는 틀리지 않았다.”
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleSaveImage}
                  className="py-4 bg-white/10 rounded-xl"
                >
                  이미지 저장 💾
                </button>
                <button
                  onClick={handleShare}
                  className="py-4 bg-white/10 rounded-xl"
                >
                  결과 공유 🔗
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
