'use client';
import { useState } from 'react';

export default function DecisionMirror() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [lockedData, setLockedData] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [useSarcasm, setUseSarcasm] = useState(false);
  const [randomQuote, setRandomQuote] = useState('');

  const quotes = [
    "결정하지 않는 것도 하나의 결정입니다.",
    "데이터는 감정을 읽지 못하지만, 감정은 데이터를 왜곡합니다.",
    "지금의 확신이 6개월 뒤에도 유효할까요?",
    "통제할 수 없는 것에 집중하고 있지는 않나요?"
  ];

  const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);
    setResult(null);
    setLockedData(null);
    setIsUnlocked(false);
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decisionText: input, useSarcasm }),
      });

      if (!res.ok) throw new Error('서버 응답 오류');

      const data = await res.json();
      const fullText = data.result || "데이터를 불러올 수 없습니다.";

      if (fullText.includes('[LOCKED_DATA]')) {
        const parts = fullText.split('[LOCKED_DATA]');
        setResult(parts[0].trim());
        setLockedData(parts[1].trim());
      } else {
        setResult(fullText);
      }
    } catch (err) {
      setResult("시스템 연결 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans pb-20">
      <header className="max-w-4xl mx-auto pt-20 pb-16 text-center px-4">
        <div className="inline-flex items-center gap-2 bg-[#5D5FEF]/10 text-[#5D5FEF] text-[10px] px-4 py-1.5 rounded-full mb-6 font-mono tracking-widest uppercase border border-[#5D5FEF]/20 animate-pulse">
          Decision Mirror v4.4 Operational
        </div>
        <h1 className="text-6xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
          Decision <span className="text-[#5D5FEF]">Mirror</span>
        </h1>
        <p className="text-lg font-medium text-slate-400">당신의 패턴은 데이터가 기억하고 있습니다.</p>
      </header>

      <main className="max-w-3xl mx-auto px-4">
        {!result && !loading ? (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-[40px] p-10 border border-slate-700/50">
            <textarea 
              className="w-full h-48 bg-slate-900/50 rounded-3xl p-8 text-xl border border-slate-700 focus:ring-2 focus:ring-[#5D5FEF] transition-all outline-none resize-none mb-6 text-white placeholder-slate-600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="무엇을 망설이고 있습니까? 당신의 의도를 입력하십시오."
            />
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm text-slate-500">* 감정적 왜곡을 배제하고 패턴만 분석합니다.</span>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold ${useSarcasm ? 'text-[#5D5FEF]' : 'text-slate-500'}`}>독설 모드</span>
                <button onClick={() => setUseSarcasm(!useSarcasm)} className={`w-14 h-7 rounded-full relative transition-all ${useSarcasm ? 'bg-[#5D5FEF]' : 'bg-slate-700'}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${useSarcasm ? 'left-8' : 'left-1'}`} />
                </button>
              </div>
            </div>
            <button onClick={handleAnalyze} className="w-full bg-[#5D5FEF] hover:bg-[#4A4CCF] text-white py-6 rounded-3xl font-black text-2xl shadow-lg transition-all active:scale-95">
              패턴 분석 시작 🚀
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-32 animate-pulse text-[#5D5FEF] font-black tracking-widest text-xl">
            결정 가능 상태 검증 및 패턴 대조 중...
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10">
            <div className="bg-slate-800/80 rounded-[48px] p-10 border border-slate-700">
              {/* 무료 분석 결과 영역 */}
              <div className="whitespace-pre-wrap leading-relaxed text-slate-200 text-xl font-medium mb-4">
                {result}
              </div>
              
              {/* 유료 잠금 영역: 심리적 거리감과 불쾌하지만 궁금한 UI 설계 */}
              {lockedData && (
                <div className="mt-12 pt-8 border-t border-dashed border-slate-600">
                  <div className="bg-slate-900/90 rounded-[32px] p-10 border border-[#5D5FEF]/20 relative overflow-hidden transition-all duration-1000">
                    
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-[10px] font-mono tracking-widest text-[#5D5FEF] uppercase">Pattern Analysis Locked</span>
                      <span className="text-[10px] text-slate-500 font-medium">유사 패턴 12,400+건 대조 완료</span>
                    </div>

                    <div className="relative mb-10">
                      <div className={`transition-all duration-1000 ${!isUnlocked ? 'filter blur-[18px] opacity-20 select-none' : 'filter blur-0 opacity-100'}`}>
                        <div className="space-y-6 text-slate-300 text-base leading-relaxed font-light">
                          {lockedData}
                        </div>
                      </div>
                      
                      {!isUnlocked && (
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                          <h3 className="text-white text-lg font-black mb-3 leading-tight">
                            "당신이 스스로 부정하고 싶은<br/>장면들이 포함되어 있습니다."
                          </h3>
                          <p className="text-slate-500 text-sm font-medium">
                            시스템이 포착한 당신의 '결정적 패턴'을 확인하시겠습니까?
                          </p>
                        </div>
                      )}
                    </div>

                    {!isUnlocked ? (
                      <div className="space-y-4">
                        <button 
                          onClick={() => setIsUnlocked(true)} 
                          className="w-full py-6 bg-[#5D5FEF] hover:bg-[#4A4CCF] text-white rounded-3xl font-black text-xl transition-all shadow-[0_20px_40px_rgba(93,95,239,0.2)] hover:scale-[1.01] active:scale-95"
                        >
                          나의 패턴 실체 확인하기 🔓
                        </button>
                        <p className="text-center text-[11px] text-slate-600 font-semibold tracking-tight">
                          * 이 데이터는 당신의 선택 전/후 통제감 변화를 추적합니다.
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-[#5D5FEF] font-bold animate-pulse">
                        🔓 데이터 거울이 활성화되었습니다.
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-10 text-center pt-10 border-t border-slate-700/50">
                <button 
                  onClick={() => {setResult(null); setLockedData(null); setIsUnlocked(false); setInput('');}} 
                  className="px-12 py-4 bg-slate-700/50 text-slate-400 font-bold rounded-2xl hover:bg-slate-700 transition-all"
                >
                  새로운 판단 미러링
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#1E293B] to-[#0F172A] rounded-[32px] p-10 text-center border border-slate-800">
              <h2 className="text-2xl font-black text-white italic">"{randomQuote}"</h2>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}