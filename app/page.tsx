'use client';
import { useState } from 'react';

export default function DecisionMirror() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
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
    
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    try {
const res = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ decisionText: input, useSarcasm }),
});

// [추가된 안전장치] 서버가 200(OK)이 아닌 응답을 보냈을 때의 예외 처리
if (!res.ok) {
  const errorData = await res.json();
  throw new Error(errorData.error || '서버 응답 오류');
}

const data = await res.json();
      let cleanResult = data.result || "데이터를 불러올 수 없습니다.";

      // 1. 시각적 노이즈(##, **) 강제 제거
      cleanResult = cleanResult.replace(/\*\*/g, '').replace(/##/g, '');

      // 2. [변경사항] 백엔드 AI가 메타 질문을 직접 생성하므로 
      // 프론트엔드에서 강제로 붙이던 배열 로직은 삭제합니다.
      // 이렇게 하면 AI가 문맥에 맞는 질문을 직접 던집니다.

      setResult(cleanResult);
    } catch (err) {
      console.error("Analysis communication error:", err);
      setResult("시스템 연결 오류가 발생했습니다. 네트워크 상태를 확인해 주세요.");
    } finally {
      setLoading(false);
    }
  }; // <--- 중괄호 누락 수정 완료

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans pb-20">
      <header className="max-w-4xl mx-auto pt-20 pb-16 text-center px-4">
        <div className="inline-flex items-center gap-2 bg-[#5D5FEF]/10 text-[#5D5FEF] text-[10px] px-4 py-1.5 rounded-full mb-6 font-mono tracking-widest uppercase border border-[#5D5FEF]/20 animate-pulse">
          Ironclad Safety v3.1 Operational
        </div>
        <h1 className="text-6xl font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
          Decision <span className="text-[#5D5FEF]">Mirror</span>
        </h1>
        <p className="text-lg font-medium text-slate-400">객관적 데이터로 당신의 확신을 비추십시오.</p>
      </header>

      <main className="max-w-3xl mx-auto px-4">
        {!result && !loading ? (
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-[40px] p-10 border border-slate-700/50">
            <textarea 
              className="w-full h-48 bg-slate-900/50 rounded-3xl p-8 text-xl border border-slate-700 focus:ring-2 focus:ring-[#5D5FEF] transition-all outline-none resize-none mb-6 text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="고민 중인 내용을 입력하세요..."
            />
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm text-slate-500">* 실시간 AI가 위험 문맥을 감지합니다.</span>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold ${useSarcasm ? 'text-[#5D5FEF]' : 'text-slate-500'}`}>독설 모드</span>
                <button onClick={() => setUseSarcasm(!useSarcasm)} className={`w-14 h-7 rounded-full relative transition-all ${useSarcasm ? 'bg-[#5D5FEF]' : 'bg-slate-700'}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${useSarcasm ? 'left-8' : 'left-1'}`} />
                </button>
              </div>
            </div>
            <button onClick={handleAnalyze} className="w-full bg-[#5D5FEF] hover:bg-[#4A4CCF] text-white py-6 rounded-3xl font-black text-2xl shadow-lg transition-all active:scale-95">
              생각 물어보기 🚀
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-32 animate-pulse text-[#5D5FEF] font-black tracking-widest text-xl">
            문맥 파악 및 위험성 검증 중...
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10">
            <div className="bg-slate-800/80 rounded-[48px] p-10 border border-slate-700">
              <div className="whitespace-pre-wrap leading-relaxed text-slate-200 text-xl font-medium">{result}</div>
              <div className="mt-16 text-center pt-10 border-t border-slate-700/50">
                <button onClick={() => {setResult(null); setInput('');}} className="px-12 py-4 bg-slate-700/50 text-slate-400 font-bold rounded-2xl hover:bg-slate-700 hover:text-white transition-all">다른 데이터 미러링</button>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#1E293B] to-[#0F172A] rounded-[32px] p-10 text-center border border-slate-800">
              <p className="text-[#5D5FEF] font-mono text-xs mb-4 tracking-widest uppercase">Insight Commentary</p>
              <h2 className="text-2xl font-black text-white italic">"{randomQuote}"</h2>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}