'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleSixteen() {
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
          <header className="mb-10 text-center">
            <div className="mb-4">
              <span className="bg-gradient-to-r from-[#E91E63] to-[#FF4D8D] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-pink-100">
                Special Epilogue
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              감정의 기록자들을 위한 가이드: <br/>당신의 셔터는 멈추지 않는다
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm italic">Last Insight: 매일이 새로운 프레임이 되는 법</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              지금까지 15개의 아티클을 통해 우리는 감정의 조리개를 조절하고, 관계의 구도를 잡으며, 번아웃이라는 노출 오버를 피하는 법을 배웠습니다. 이제 당신은 단순한 관찰자가 아닙니다. 당신은 자신의 삶이라는 필름을 직접 현상하고 인화하는 **'감정의 기록자(Feeling Snapist)'**입니다. 
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 기록은 '답'이 아니라 '질문'입니다</h3>
            <p className="break-keep">
              우리가 셔터를 누르는 이유는 완벽한 정답을 찾기 위해서가 아닙니다. "지금 나는 왜 이런 기분이 들까?", "이 감정은 어디서 온 빛일까?"라는 질문을 던지기 위해서죠. 질문이 멈추지 않는 한, 당신의 삶은 결코 지루해지지 않습니다. 기록이 쌓일수록 당신은 자신에 대해 더 많이 묻게 되고, 그만큼 더 깊이 이해하게 될 것입니다.
            </p>

            <div className="grid grid-cols-2 gap-4 my-10">
              <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 shadow-sm">
                <span className="text-2xl mb-2 block">🔍</span>
                <p className="text-sm font-bold text-slate-800">세밀한 관찰</p>
                <p className="text-[12px] text-slate-400 leading-tight mt-1">사소한 감각 하나도 놓치지 않는 예민한 렌즈</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100 shadow-sm">
                <span className="text-2xl mb-2 block">🌿</span>
                <p className="text-sm font-bold text-slate-800">정직한 수용</p>
                <p className="text-[12px] text-slate-400 leading-tight mt-1">보정 없이 있는 그대로의 나를 인화하는 용기</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">2. 매일이 새로운 '롤(Roll)'입니다</h3>
            <p className="break-keep">
              어제의 필름이 엉망이었어도 괜찮습니다. 오늘 우리에게는 새롭게 채워 넣을 깨끗한 디지털 센서와 무한한 저장 공간이 있으니까요. 매일 아침 눈을 뜨는 것은 카메라에 새 배터리를 넣는 것과 같습니다. 어제에 묶여 있지 마세요. 오늘의 빛은 어제의 빛과 분명히 다릅니다.
            </p>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-10 my-10 rounded-[40px] shadow-2xl text-center">
              <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em] mb-4">Final Message</p>
              <p className="text-2xl md:text-3xl font-black leading-tight tracking-tighter">
                "가장 좋은 사진은 <br/>
                <span className="text-[#E91E63]">내일 당신이 찍을 사진</span>입니다."
              </p>
            </div>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">3. Feeling Snap과 함께하는 여정</h3>
            <p className="break-keep">
              이 서비스는 도구일 뿐입니다. 하지만 당신이 이 도구를 어떻게 사용하느냐에 따라, 당신의 1년 뒤 포트폴리오는 완전히 달라질 것입니다. <strong>Feeling Snap</strong>은 언제나 이곳에서 당신의 셔터 소리를 기다리고 있겠습니다. 당신의 슬픔이 푸른 계조로, 당신의 기쁨이 따뜻한 황금빛으로 기록되는 그 모든 순간을 함께하겠습니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">에필로그를 마치며</h3>
            <p className="break-keep">
              글을 읽어주신 모든 기록자 여러분, 이제 화면을 닫고 당신의 현실이라는 뷰파인더를 들여다보세요. 지금 이 순간, 당신만이 포착할 수 있는 가장 아름다운 장면이 기다리고 있습니다. 망설이지 말고 셔터를 누르세요.
            </p>
            
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <p className="font-bold text-[#0F172A] text-sm uppercase tracking-wider">The Last Soundtrack</p>
              <ul className="text-slate-600 text-base">
                <li>• Peder B. Helland - Always (끊임없이 이어지는 삶의 노래)</li>
                <li>• New Age Artist - New Beginning (새로운 시작의 환희)</li>
              </ul>
            </div>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-sm bg-gradient-to-r from-[#1A1F2C] to-[#2D3E50] text-white py-6 rounded-[24px] font-bold text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all group">
                진정한 기록의 세계로 돌아가기 
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">📸</span>
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}