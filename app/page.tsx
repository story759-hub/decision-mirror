'use client';
import { useState, useRef, useEffect } from 'react'; // useEffect 추가
import html2canvas from 'html2canvas';
import Script from 'next/script';

type Stage = 'input' | 'ad_basic' | 'processing' | 'result' | 'ad_deep' | 'deep_result';

export default function ClarityRoom() {
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('input');
  const [data, setData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // [오류 방지] 폰트 로딩 대기 및 초기 설정 확인
  useEffect(() => {
    // 이미지 저장 시 폰트 깨짐 방지를 위해 문서 준비 확인
    document.fonts.ready.then(() => {
      console.log('Fonts ready for canvas');
    });
  }, []);

  // [기능 1: 이미지 저장 보강]
  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    
    try {
      // 저장 시 일시적으로 폰트나 레이아웃이 깨지지 않도록 옵션 추가
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null, // 투명 배경 유지 후 부모 색상 반영
        scale: 2, // 너무 높으면 모바일에서 튕길 수 있어 2로 조정
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
          // 복제된 요소에서 스타일 강제 고정 (오류 방지)
          const el = clonedDoc.querySelector('[ref="cardRef"]') as HTMLElement;
          if (el) el.style.borderRadius = '40px';
        }
      });
      
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `Clarity_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("이미지 저장 실패:", err);
      alert("이미지 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  // [기능 2: 스마트 공유하기]
  const handleShare = async () => {
    const shareTitle = 'Clarity Room - 나의 인지 구조 분석';
    const shareText = `"${data?.mainTitle || '나의 분석 결과'}" - 클러리티 룸에서 확인한 나의 상태입니다.`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("공유 실패:", err);
        }
      }
    } else {
      // 웹 공유 API 미지원 시 (데스크탑 등)
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("링크가 복사되었습니다. 카카오톡이나 인스타에 붙여넣어 보세요!");
      } catch (err) {
        alert("링크 복사에 실패했습니다.");
      }
    }
  };

  // [분석 로직]
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
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062349022770025"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans pb-20 selection:bg-[#5D5FEF]/30">
        <header className="max-w-xl mx-auto pt-20 pb-12 text-center px-6">
          <h1 className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent cursor-pointer" onClick={() => window.location.reload()}>
            Clarity <span className="text-[#5D5FEF]">Room</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Cognitive Depth Organizer</p>
        </header>

        <main className="max-w-lg mx-auto px-6">
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

          {(stage === 'ad_basic' || stage === 'ad_deep' || stage === 'processing') && (
            <div className="py-20 text-center animate-in zoom-in-95">
              <div className="text-[#5D5FEF] font-black text-xl mb-4 uppercase tracking-tighter">
                {stage === 'ad_basic' ? 'Analyzing density...' : stage === 'ad_deep' ? 'Deep Purification...' : 'Structuring...'}
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-xs mx-auto mb-8">
                <div className={`h-full bg-[#5D5FEF] ${stage === 'ad_basic' ? 'animate-[load_5s_linear]' : stage === 'ad_deep' ? 'animate-[load_30s_linear]' : 'w-full animate-pulse'}`} />
              </div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest animate-pulse text-center">광고 시청 후 결과가 공개됩니다</p>
            </div>
          )}

          {stage === 'result' && data && (
            <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-1000">
              {/* 이미지 캡처 대상 영역 */}
              <div 
                ref={cardRef} 
                className="bg-white text-slate-900 rounded-[40px] p-12 shadow-2xl space-y-12 relative overflow-hidden flex flex-col items-center text-center"
                style={{ WebkitFontSmoothing: 'antialiased' }}
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
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={handleSaveImage} className="py-5 bg-white/5 text-slate-300 rounded-2xl font-bold text-sm border border-white/10 active:bg-white/10">
                    이미지 저장 💾
                  </button>
                  <button onClick={handleShare} className="py-5 bg-white/5 text-slate-300 rounded-2xl font-bold text-sm border border-white/10 active:bg-white/10">
                    결과 공유 🔗
                  </button>
                </div>
                {!data.isTrivial && (
                  <button onClick={handleDeepAnalyze} className="w-full py-5 bg-[#5D5FEF] text-white rounded-2xl font-black text-sm shadow-xl shadow-[#5D5FEF]/20 active:scale-95 transition-all">
                    심층 분석 (30초 정제) 🔓
                  </button>
                )}
                <button onClick={() => { setStage('input'); setInput(''); }} className="w-full py-4 text-slate-500 font-bold text-xs uppercase tracking-widest text-center">
                  New Entry
                </button>
              </div>
            </div>
          )}

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
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={handleSaveImage} className="py-5 bg-white/10 text-white rounded-2xl font-bold text-sm border border-white/20 active:bg-white/20">
                    이미지 저장 💾
                  </button>
                  <button onClick={handleShare} className="py-5 bg-white/10 text-white rounded-2xl font-bold text-sm border border-white/20 active:bg-white/20">
                    결과 공유 🔗
                  </button>
                </div>
                <button onClick={() => { setStage('input'); setInput(''); }} className="w-full py-5 bg-slate-800 text-slate-400 rounded-2xl font-black text-sm uppercase text-center">Reset</button>
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
    </>
  );
}