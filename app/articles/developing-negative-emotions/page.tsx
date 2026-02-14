'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleTen() {
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
              <span className="bg-slate-800 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-slate-900">
                Emotional Alchemy
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              부정적 감정의 현상법: <br/>슬픔도 선명한 하나의 색깔이다
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 08 • 8 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              밝고 화사한 사진만이 정답이라고 믿는 시대입니다. 하지만 우리는 알고 있습니다. 흑백 사진이 주는 묵직한 울림이나, 짙은 그림자가 드리워진 정물 사진의 매력을 말이죠. 우리 마음도 마찬가지입니다. 슬픔, 우울, 분노와 같은 부정적인 감정들은 인생이라는 사진에서 지워야 할 '노출 부족'이 아니라, 삶의 질감을 풍성하게 만드는 **'그림자(Shadow)'**입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 어둠이 있어야 빛이 정의된다</h3>
            <p className="break-keep">
              사진학에서 완벽하게 하얀색으로만 가득한 사진은 아무런 정보를 담지 못합니다. 형태를 구분하고 깊이감을 만드는 것은 결국 어두운 부분입니다. 기쁨이 빛이라면, 슬픔은 그 기쁨의 형태를 선명하게 빚어내는 어둠입니다. 슬픔을 겪어본 사람만이 기쁨의 농도를 예민하게 감각할 수 있는 법이죠. 자신의 우울함을 억지로 밝게 보정하려 애쓰지 마세요. 그 어둠은 당신의 영혼이 가진 깊이입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 감정의 암실: 현상을 거부하지 않기</h3>
            <p className="break-keep">
              필름은 암실의 차가운 약품 속에서 자신의 본모습을 드러냅니다. 부정적인 감정이 찾아왔을 때, 그것을 회피하는 것은 필름을 현상하지 않은 채 방치하는 것과 같습니다. 
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>슬픔의 계조(Tone) 인정하기:</strong> "그냥 슬프다"가 아니라 "오늘은 짙은 감청색의 슬픔이다"라고 이름을 붙여보세요. 구체적인 이름은 감정의 소용돌이에서 나를 지켜주는 안전장치가 됩니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>대조(Contrast)의 미학:</strong> 힘든 시간을 통과하는 중이라면, 이것이 훗날 맞이할 눈부신 순간을 위한 극적인 대비 장치라고 믿어보세요.</span>
              </li>
            </ul>

            <div className="bg-slate-900 text-white p-8 my-10 rounded-[32px] shadow-xl">
              <p className="italic text-slate-200 text-xl font-bold leading-relaxed">
                "가장 어두운 그림자를 가진 사진이 <br/>때로는 가장 많은 진실을 말해줍니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap: 어둠 속에서 셔터 누르기</h3>
            <p className="break-keep">
              기분이 좋지 않을 때 <strong>Feeling Snap</strong>을 기록하는 것은 용기 있는 현상 과정입니다. 슬픔의 데이터를 회피하지 않고 직면할 때, 뇌는 그 감정을 '위협'이 아닌 '경험'으로 분류하기 시작합니다. 우울한 기분을 인화지에 옮겨 담듯 텍스트로 뱉어내 보세요. 기록된 슬픔은 더 이상 당신 내면을 갉아먹지 않고, 당신이 통과해 온 단단한 삶의 흔적으로 남게 될 것입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 당신의 모든 색을 사랑하세요</h3>
            <p className="break-keep">
              삶이라는 사진첩에는 원색의 기쁨도, 무채색의 슬픔도 모두 필요합니다. 오늘 당신의 마음이 조금 어둡다면, 그것은 당신이 그만큼 깊은 이야기를 써 내려가고 있다는 증거입니다. 그 어두운 색깔조차 당신만의 고유한 필터임을 잊지 마세요. 
            </p>
            
            <div className="p-6 bg-slate-100/50 rounded-2xl border border-slate-200 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Deep Blue Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Adele - Someone Like You (슬픔의 정석적인 현상)</li>
                <li>• Radiohead - No Surprises (고요한 우울의 질감)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                있는 그대로의 나 현상하기 🌑
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}