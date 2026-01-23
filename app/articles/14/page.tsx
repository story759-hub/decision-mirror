'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleFourteen() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20 overflow-x-hidden">
      {/* 메인 로고 디자인 유지 */}
      <header className="max-w-xl mx-auto pt-14 pb-8 text-center border-b border-slate-50">
        <Link href="/">
          <h1 
            className="text-4xl font-black tracking-tighter flex justify-center items-center cursor-pointer" 
            style={{ WebkitTextStroke: '1.2px currentColor' }}
          >
            <span className="text-[#0F172A]" style={{ WebkitTextStrokeColor: '#0F172A' }}>Feeling</span>
            <span className="text-[#E91E63] ml-1" style={{ WebkitTextStrokeColor: '#E91E63' }}>Snap</span>
          </h1>
        </Link>
      </header>

      <main className="max-w-xl mx-auto px-6 py-12">
        {/* 수정된 목록 경로와 문구 */}
        <Link href="/articles" className="text-[#E91E63] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>

        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-10">
            {/* 카테고리 태그 */}
            <div className="mb-4">
              <span className="bg-pink-50 text-[#E91E63] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-pink-100">
                Social Psychology
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              기대가 만드는 기적: <br/>'피그말리온 효과' 활용법
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 24 • 5 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              타인의 긍정적인 기대나 관심이 사람의 능력을 실제로 향상시키는 현상을 심리학에서는 <strong>'피그말리온 효과(Pygmalion Effect)'</strong>라고 부릅니다. 조각상에 생명을 불어넣은 신화처럼, 우리가 스스로 혹은 타인에게 거는 '기대'는 단순한 바람을 넘어 실제 현실을 바꾸는 강력한 힘을 가집니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 믿음이 행동을 규정한다</h3>
            <p className="break-keep">
              하버드 대학의 로젠탈 교수는 무작위로 뽑힌 학생들을 '지능지수가 높은 학생들'이라고 교사에게 거짓 정보를 주었습니다. 8개월 후, 실제로 그 학생들의 성적은 비약적으로 향상되었습니다. 교사의 긍정적인 기대가 학생들의 태도와 학업 성취에 직접적인 영향을 미친 것입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 나를 향한 '자기 충족적 예언'</h3>
            <p className="break-keep">
              피그말리온 효과는 타인뿐만 아니라 자기 자신에게도 적용됩니다. "나는 역시 안 돼"라는 부정적 예언은 실패를 부르고, "나는 이 문제를 해결할 능력이 있어"라는 긍정적 예언은 창의적인 해결책을 찾게 만듭니다. 당신이 자신에게 어떤 꼬리표를 붙이느냐가 당신의 한계를 결정합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 일상에서 피그말리온 효과 실천하기</h3>
            <ul className="space-y-4">
              <li className="flex items-start border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>긍정적 단어 선택:</strong> '문제'라는 단어 대신 '과제'나 '기회'라는 단어를 사용해 보세요.</span>
              </li>
              <li className="flex items-start border-b border-slate-50 pb-2">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>작은 가능성에 집중:</strong> 부족한 점보다 이미 가지고 있는 강점에 기대를 걸어보세요.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>진심 어린 지지:</strong> 주변 사람들에게 구체적인 기대와 신뢰를 표현하세요.</span>
              </li>
            </ul>

            {/* 인용구 박스 */}
            <div className="bg-slate-50 border-l-4 border-[#E91E63] p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "누군가를 있는 그대로 대하면 그는 그대로 남을 것이지만, <br/>그가 될 수 있는 모습으로 대하면 그는 결국 그렇게 될 것이다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: Feeling Snap의 제언</h3>
            <p className="break-keep">
              당신은 아직 발견되지 않은 거대한 잠재력을 가진 조각상과 같습니다. 스스로를 향해 어떤 기대를 품고 있나요?
            </p>
            <p className="font-bold text-[#0F172A] p-6 bg-pink-50/50 rounded-2xl border border-pink-100">
              Feeling Snap에서 당신의 오늘을 긍정적으로 선언해 보세요. AI가 당신의 텍스트 속에 숨겨진 강점과 가능성을 찾아내어, 당신이 스스로의 피그말리온이 될 수 있도록 돕겠습니다.
            </p>
          </section>

          {/* 하단 CTA 버튼 */}
          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                나를 향한 긍정적 기대 선언하기 🌟
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}