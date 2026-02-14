'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleFour() {
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
              <span className="bg-yellow-50 text-yellow-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-yellow-100">
                Joy & Positivity
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              찰나의 기쁨을 영원히 박제하는 기술: <br/>행복의 유통기한을 늘리는 긍정의 기록
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 02 • 6 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              행복은 나비와 같습니다. 가만히 앉아 있을 때 살포시 내려앉지만, 우리가 그것을 움켜쥐려 손을 뻗는 순간 허무하게 날아가 버리죠. 특히 기쁨이라는 감정은 슬픔이나 분노보다 훨씬 휘발성이 강합니다. 퇴근길의 아름다운 노을, 동료가 건넨 따뜻한 캔커피 한 잔, 오래된 외투 주머니에서 발견한 오천 원권 지폐 한 장. 이런 사소한 기쁨들은 금세 일상의 소음 속으로 증발해 버립니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 왜 좋은 기억은 빨리 사라질까?</h3>
            <p className="break-keep">
              우리의 뇌는 진화론적으로 '생존'에 최적화되어 있습니다. 위험한 상황(슬픔, 공포, 분노)은 생존과 직결되기에 뇌에 깊게 각인시키지만, 평온하고 기쁜 순간은 뇌 입장에서 '안전한 상태'이기에 굳이 에너지를 써가며 장기 기억으로 넘기지 않습니다. 이것이 우리가 의도적으로 기쁨을 **'박제(Archive)'**해야 하는 이유입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 감정 스냅: 행복의 '노출 값'을 높이는 법</h3>
            <p className="break-keep">
              기쁨을 기록하는 행위는 카메라의 노출 시간을 길게 가져가는 '장노출 촬영'과 같습니다. 짧게 지나가는 빛을 최대한 많이 렌즈에 담아내듯, 긍정적인 감정을 문장으로 적어 내리는 동안 우리 뇌는 그 기쁨을 다시 한번 경험(Rewiring)하게 됩니다.
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>구체적인 질감 기록하기:</strong> 단순히 "좋았다"가 아니라 "차가운 공기 속에서 마신 코코아가 목을 타고 내려갈 때의 뜨거움이 좋았다"처럼 오감을 동원해 기록해 보세요.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>나만의 '황금 시간대' 발견하기:</strong> 기록이 쌓이면 내가 언제 가장 선명한 기쁨을 느끼는지 데이터가 보입니다. 그것이 당신의 심리적 골든 아워입니다.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. 기쁨의 기록은 미래의 나를 위한 구호물자</h3>
            <p className="break-keep">
              오늘 남긴 한 줄의 긍정 스냅은 오늘을 위한 것이 아닙니다. 언젠가 마음이 지독하게 흐린 날, 당신이 꺼내 볼 수 있는 '감정의 비축분'입니다. <strong>Feeling Snap</strong>에 저장된 수많은 기쁜 순간들은 인생의 폭풍우가 몰아칠 때 "그래도 내 삶에는 이런 빛나는 순간들이 있었지"라고 말해주는 가장 강력한 위로가 될 것입니다.
            </p>

            <div className="bg-slate-50 border-l-4 border-yellow-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "기쁨을 기록하는 것은 사치가 아니라 습관입니다. <br/>그 습관이 모여 당신의 인생이라는 앨범을 빛으로 채웁니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 지금 셔터를 누르세요</h3>
            <p className="break-keep">
              지금 이 글을 읽으며 떠오르는 작은 기분 좋음이 있나요? 그렇다면 바로 <strong>Feeling Snap</strong>에 기록해 보세요. 거창하지 않아도 좋습니다. 당신이 그 감정에 머물러 준 그 짧은 시간이, 당신의 하루를 완전히 다른 색으로 인화해 줄 것입니다.
            </p>
            
            <div className="p-6 bg-yellow-50/50 rounded-2xl border border-yellow-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Joyful Mood Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Joe Hisaishi - Summer (생동감 넘치는 오후의 에너지)</li>
                <li>• Corinne Bailey Rae - Put Your Records On (나를 사랑하게 되는 리듬)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                오늘의 기쁨 박제하기 ✨
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}