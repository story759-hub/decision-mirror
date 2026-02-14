'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleFifteen() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20 overflow-x-hidden">
      {/* 헤더 */}
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
        <Link href="/articles" className="text-[#E91E63] font-bold mb-8 inline-block hover:underline">
          ← 인사이트 목록으로 돌아가기
        </Link>

        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-10">
            <div className="mb-4">
              <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-900">
                Life as a Masterpiece
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              내 인생의 포트폴리오: <br/>매 순간의 스냅이 모여 작품이 된다
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 13 • 10 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              사진가들에게 물어보면, 그들의 대표작은 어느 날 갑자기 하늘에서 떨어진 행운이 아니라고 말합니다. 수만 번의 셔터질, 버려진 수천 장의 파지, 그리고 의미 없어 보이던 일상의 기록들이 쌓여 비로소 하나의 '포트폴리오'가 완성되죠. 우리의 삶도 이와 다르지 않습니다. 오늘 당신이 <strong>Feeling Snap</strong>에 남긴 사소한 감정 한 조각은 그 자체로는 작아 보일지 모르지만, 그것들이 연결되는 순간 당신이라는 거대한 예술 작품이 드러납니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 점들을 연결하기(Connecting the Dots)</h3>
            <p className="break-keep">
              스티브 잡스는 "미래를 내다보며 점을 연결할 수는 없다. 오직 과거를 뒤돌아볼 때만 점들을 연결할 수 있다"고 말했습니다. 우리가 기록하는 매 순간의 감정 스냅들은 인생이라는 도화지 위에 찍히는 '점'들입니다. 슬텄던 날의 기록, 환희에 찼던 기록, 지루함에 몸부림치던 기록들이 충분히 모였을 때, 비로소 우리는 내 인생이 어떤 방향으로 흐르고 있는지, 내가 어떤 색깔을 가진 사람인지 깨닫게 됩니다. 
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 큐레이션: 내 삶의 의미를 편집하는 힘</h3>
            <p className="break-keep">
              포트폴리오를 만드는 과정에서 가장 중요한 것은 '편집'입니다. 하지만 편집을 하려면 우선 '재료'가 있어야 하죠. 기록이 없는 삶은 복기할 수 없는 체보와 같습니다. 
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>아카이빙의 가치:</strong> 기쁠 때뿐만 아니라 고통스러울 때도 셔터를 누르세요. 나중에 돌아보면 그 고통의 기록이야말로 당신을 가장 크게 성장시킨 '결정적 순간'이었음을 알게 될 것입니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>일관성 발견:</strong> 기록이 쌓이면 내가 반복적으로 느끼는 감정의 패턴이 보입니다. 그것이 바로 당신의 영혼이 가진 고유한 '화풍'이자 '스타일'입니다.</span>
              </li>
            </ul>

            <div className="bg-slate-900 text-white p-8 my-10 rounded-[32px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/></svg>
              </div>
              <p className="italic text-slate-200 text-xl font-bold leading-relaxed relative z-10">
                "당신의 인생은 아직 인화되지 않은 필름통과 같습니다. <br/>매일의 기록은 그 필름에 빛을 새기는 숭고한 작업입니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap: 당신의 갤러리를 위하여</h3>
            <p className="break-keep">
              우리가 이 서비스를 만든 이유는 단순히 감정을 분석하기 위함이 아닙니다. 당신이 자기 자신을 더 깊이 관찰하고, 당신의 삶을 소중한 예술 작품처럼 대하기를 바랐기 때문입니다. <strong>Feeling Snap</strong>에 쌓인 데이터들은 단순한 숫자가 아닙니다. 그것은 당신이 이 세상을 살아내며 남긴 빛의 궤적이며, 그 누구도 대신 써줄 수 없는 유일무이한 서사입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 셔터 소리는 계속되어야 합니다</h3>
            <p className="break-keep">
              포트폴리오에는 완성이 없습니다. 우리가 숨 쉬고 느끼는 한, 새로운 페이지는 계속 추가될 것입니다. 때로는 초점이 빗나가고 노출이 맞지 않는 날도 있겠지만, 그 모든 실패작조차 당신의 포트폴리오를 구성하는 소중한 자산입니다. 오늘 당신의 마음을 찍는 것을 멈추지 마세요. 훗날 당신의 인생 사진첩을 넘겨볼 때, 모든 페이지가 당신다운 진솔함으로 빛나고 있기를 진심으로 응원합니다.
            </p>
            
            <div className="p-6 bg-slate-100/50 rounded-2xl border border-slate-200 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Grand Finale Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Claude Debussy - Clair de Lune (삶의 모든 순간을 비추는 달빛)</li>
                <li>• Joe Hisaishi - Summer (새로운 시작의 설렘)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#E91E63] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                인생의 다음 장 기록하기 🎞️
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}