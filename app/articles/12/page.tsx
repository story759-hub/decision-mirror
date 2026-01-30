'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleTwelve() {
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
              <span className="bg-rose-50 text-rose-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-rose-100">
                Relationship Dynamics
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              관계의 구도: <br/>적당한 거리가 만드는 가장 선명한 순간
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 10 • 8 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              카메라 렌즈에는 '최단 초점 거리'라는 것이 있습니다. 피사체에 너무 가까이 다가가면 렌즈는 초점을 잡지 못하고 화면 전체가 흐릿해지고 말죠. 인간관계도 이와 놀랍도록 닮아 있습니다. 우리는 흔히 가까울수록 좋다고 믿지만, 실상은 너무 가까워지는 순간 상대의 전체 모습 대신 단점이라는 잡티만 크게 보이거나, 나 자신의 정체성이 상대의 그림자에 가려 흐릿해지곤 합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 클로즈업의 함정: 보이지 않는 전체상</h3>
            <p className="break-keep">
              상대를 너무 사랑하거나 의지할 때, 우리는 자꾸만 그에게 '밀착'하려고 합니다. 하지만 밀착된 관계에서는 '구도'라는 것이 존재할 수 없습니다. 상대가 무엇을 생각하는지, 어떤 배경을 가지고 살아가는지 이해하기보다는 지금 당장 나에게 보여주는 반응 하나하나에 일희일비하게 되죠. 관계의 숨통을 틔워주는 것은 밀착이 아니라, 한 걸음 뒤로 물러나 상대를 하나의 독립된 피사체로 바라보는 '여백'입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 황금 분할: 나와 타인의 균형점</h3>
            <p className="break-keep">
              좋은 사진은 피사체를 정중앙에 두기보다 황금 분할 선상에 배치하여 시각적 편안함을 줍니다. 관계에서도 나를 중심에 두면서도 타인의 자리를 존중하는 적절한 배치가 필요합니다.
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>건강한 거리 두기(Boundaries):</strong> 거리는 단절이 아닙니다. 오히려 상대를 가장 잘 관찰하고 존중할 수 있는 '최적의 시야'를 확보하는 행위입니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>배경 수용하기:</strong> 피사체 뒤의 풍경이 인물을 돋보이게 하듯, 상대의 과거와 환경을 있는 그대로의 '배경'으로 인정할 때 관계의 해상도가 높아집니다.</span>
              </li>
            </ul>

            <div className="bg-rose-50 border-l-4 border-rose-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "가장 아름다운 풍경은 <br/>적당한 거리에서 바라볼 때 비로소 완성됩니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap: 관계의 온도 조절하기</h3>
            <p className="break-keep">
              관심 있는 사람과의 관계에서 갈등이 생겼다면, 잠시 <strong>Feeling Snap</strong>을 켜고 현재의 구도를 점검해 보세요. 내가 너무 그 사람에게 초점을 맞추느라 내 삶의 수평을 잃어버리지는 않았는지, 혹은 너무 멀리 떨어져 방치하고 있지는 않은지 말입니다. 나의 감정 상태를 기록하는 것만으로도 뜨거워진 감정의 센서를 식히고, 다시금 선명하고 아름다운 관계의 구도를 찾아갈 수 있는 힘이 생깁니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 각자의 빛을 지켜주는 거리</h3>
            <p className="break-keep">
              모든 별은 서로 멀리 떨어져 있기에 고유한 빛을 낼 수 있습니다. 우리도 각자의 고유한 빛을 잃지 않으면서 서로를 비춰줄 수 있는 그 '적당한 거리'를 찾아야 합니다. 너무 가까워 상처 주지 않고, 너무 멀어 외롭지 않은 그 지점에서 당신의 인간관계는 가장 선명하고 따뜻한 스냅으로 기록될 것입니다.
            </p>
            
            <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Harmony Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Norah Jones - Don't Know Why (부드러운 거리감의 정서)</li>
                <li>• Kings of Convenience - Misread (오해와 이해 사이의 선율)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                건강한 거리 유지하며 기록하기 🌷
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}