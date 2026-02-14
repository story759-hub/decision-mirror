'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleFive() {
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
              <span className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-green-100">
                Happiness Science
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              도파민과 세로토닌: <br/>번쩍이는 플래시와 은은한 자연광 사이의 균형
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 03 • 7 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              우리는 흔히 '기분 좋다'는 표현 하나로 모든 긍정적인 상태를 뭉뚱그려 말하곤 합니다. 하지만 우리 뇌 속에서는 전혀 다른 두 종류의 화학 물질이 행복의 색깔을 결정합니다. 바로 **도파민(Dopamine)**과 **세로토닌(Serotonin)**입니다. 사진에 비유하자면 도파민은 어둠을 한순간에 밝히는 강렬한 '플래시'이고, 세로토닌은 공간 전체를 포근하게 감싸는 '오후의 자연광'과 같습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 도파민: 더 강한 자극을 원하는 '하이라이트'</h3>
            <p className="break-keep">
              숏폼 영상을 볼 때, 맛있는 음식을 먹을 때, 혹은 SNS의 '좋아요' 알림이 울릴 때 분비되는 도파민은 우리에게 강력한 쾌락을 선사합니다. 하지만 도파민에는 치명적인 약점이 있습니다. 바로 '내성'입니다. 어두운 곳에서 너무 강한 플래시를 터뜨리면 피사체의 디테일이 날아가 버리듯(Whiteout), 도파민에 중독된 뇌는 웬만한 일상에서는 즐거움을 느끼지 못하는 상태가 됩니다. 더 강하고, 더 자극적인 빛만을 갈구하게 되는 것이죠.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 세로토닌: 일상을 지탱하는 '적정 노출'</h3>
            <p className="break-keep">
              반면 세로토닌은 자극적이지 않습니다. 아침 햇살을 받으며 산책할 때, 사랑하는 사람과 가만히 눈을 맞출 때, 혹은 깊은 숨을 들이마실 때 서서히 차오릅니다. 이는 사진에서 암부와 명부의 균형이 완벽하게 잡힌 상태와 같습니다. 화려하진 않지만 오래 보아도 눈이 피로하지 않고, 삶 전체에 안정감을 부여합니다. 지속 가능한 행복의 핵심은 바로 이 세로토닌의 '적정 노출'을 유지하는 데 있습니다.
            </p>

            <div className="bg-slate-50 border-l-4 border-green-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "도파민은 '무엇을 얻었을 때' 오지만, <br/>세로토닌은 '지금 이대로 괜찮을 때' 찾아옵니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap으로 행복의 밸런스 맞추기</h3>
            <p className="break-keep">
              지나치게 자극적인 일상에 지쳐있다면, 의도적으로 세로토닌의 스냅을 찍어야 합니다. <strong>Feeling Snap</strong>에 당신의 소소한 평온함을 기록해 보세요. 거창한 성공담이 아니어도 좋습니다. "오늘 마신 차가 따뜻했다", "바람의 감촉이 부드러웠다"와 같은 기록은 도파민으로 과다 노출된 당신의 마음 렌즈에 'ND 필터(빛의 양을 줄여주는 필터)' 역할을 해줄 것입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 당신의 사진첩은 어떤 빛으로 가득한가요?</h3>
            <p className="break-keep">
              번쩍이는 플래시 뒤에 오는 공허함에 지쳤다면, 이제는 은은한 자연광을 기록할 차례입니다. 오늘 당신의 마음속에 머문 가장 평온한 순간을 한 문장으로 현상해 보세요. 그 기록들이 모여 당신의 삶을 지탱하는 가장 단단한 바탕색이 될 것입니다.
            </p>
            
            <div className="p-6 bg-green-50/50 rounded-2xl border border-green-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Serotonin Boost Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Norah Jones - Don't Know Why (안정감을 주는 보이스)</li>
                <li>• Jack Johnson - Better Together (소박한 일상의 즐거움)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                평온한 일상 인화하기 🌿
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}