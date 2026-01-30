'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleSeven() {
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
              <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-indigo-100">
                Social Psychology
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              나만 뒤처지는 것 같을 때의 심리학: <br/>모든 필름은 인화되는 속도가 다르다
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 02. 05 • 8 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              SNS를 열면 타인의 삶은 언제나 하이라이트 릴처럼 빛납니다. 누군가의 승진, 누군가의 결혼, 누군가의 화려한 여행 사진들. 그 틈바구니에서 나의 일상을 바라보면 마치 초점이 나간 실패작처럼 느껴질 때가 있습니다. 심리학에서는 이를 **'사회적 비교 이론(Social Comparison Theory)'**이라 부르는데, 우리는 무의식중에 타인의 겉모습을 나의 내면과 비교하며 스스로를 깎아내리곤 합니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 하이라이트와 비하인드 씬의 오류</h3>
            <p className="break-keep">
              우리가 보는 타인의 모습은 수백 장의 사진 중 가장 잘 나온 '베스트 컷'입니다. 하지만 내가 경험하는 나의 삶은 편집되지 않은 '비하인드 씬'과 'NG 장면'의 연속이죠. 남의 잘 다듬어진 포트폴리오와 나의 어지러운 작업실을 비교하는 것은 애초에 공정하지 못한 게임입니다. 
            </p>
            <p className="break-keep">
              사진에서 배경을 흐릿하게 날리는 '아웃포커싱' 기법은 피사체를 돋보이게 하지만, 삶에서 타인에게만 초점을 맞추는 아웃포커싱은 정작 주인공인 나 자신을 흐릿한 배경으로 전락시킵니다. 지금 당신의 렌즈가 어디를 향하고 있는지 점검해야 할 때입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 각자에게 필요한 '노출 시간'이 있다</h3>
            <p className="break-keep">
              현상액 속에서 이미지가 떠오르는 속도는 온도와 약품, 그리고 필름의 종류에 따라 모두 다릅니다. 어떤 이미지는 1분 만에 선명해지지만, 어떤 이미지는 10분이 지나서야 깊이 있는 색감을 드러냅니다. 
            </p>
            <ul className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>비교 렌즈 닦아내기:</strong> '그는 그고, 나는 나다'라는 문장을 입 밖으로 내뱉어 보세요. 타인의 속도는 나의 도착 시간을 결정하지 않습니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#E91E63] mr-2 font-bold">•</span>
                <span><strong>나만의 계조 찾기:</strong> 밝은 부분(성공)뿐만 아니라 어두운 부분(실패와 고민)이 조화를 이룰 때 비로소 입체감 있는 인생 사진이 완성됩니다.</span>
              </li>
            </ul>

            <div className="bg-slate-50 border-l-4 border-indigo-400 p-8 my-10 rounded-r-[32px] shadow-sm">
              <p className="italic text-[#0F172A] text-xl font-bold leading-relaxed">
                "인생은 경주가 아니라 전시다. <br/>누가 먼저 도착하느냐보다, 어떤 질감의 시간을 채워 넣느냐가 더 중요하다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap: 비교 대신 관찰하기</h3>
            <p className="break-keep">
              뒤처지는 기분이 들 때 <strong>Feeling Snap</strong>을 켜고, 비교의 대상이 아닌 '지금의 나'를 찍어보세요. "불안함 80%, 조바심 20%"라고 솔직하게 기록하는 순간, 그 감정은 나를 지배하는 괴물이 아니라 관찰 대상인 '데이터'가 됩니다. 내가 뒤처진다고 느끼는 지점이 어디인지 글로 적어 내려가다 보면, 그것이 사실은 '나만의 속도'를 찾아가는 과정임을 깨닫게 될 것입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">결론: 당신의 현상기는 아직 작동 중입니다</h3>
            <p className="break-keep">
              조급해하지 마세요. 당신이라는 필름은 지금 가장 깊고 풍부한 색을 머금기 위해 현상액 속에서 기다리는 중일 뿐입니다. 남들의 화려한 색감에 눈 돌리지 않고 오직 당신만의 명도와 채도를 믿을 때, 세상에 단 한 장뿐인 명작이 탄생합니다.
            </p>
            
            <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">Mindful Focus Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Ryuichi Sakamoto - Merry Christmas Mr. Lawrence (깊은 사유의 시간)</li>
                <li>• Bill Evans - Peace Piece (비교 없는 평온함)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                나만의 속도로 기록하기 🎞️
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}