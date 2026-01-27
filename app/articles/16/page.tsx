'use client';

import React from 'react';
import Link from 'next/link';

export default function ArticleSixteen() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20 overflow-x-hidden">
      <header className="max-w-xl mx-auto pt-14 pb-8 text-center border-b border-slate-50">
        <Link href="/">
          <h1 className="text-4xl font-black tracking-tighter flex justify-center items-center cursor-pointer" style={{ WebkitTextStroke: '1.2px currentColor' }}>
            <span className="text-[#0F172A]" style={{ WebkitTextStrokeColor: '#0F172A' }}>Feeling</span>
            <span className="text-[#E91E63] ml-1" style={{ WebkitTextStrokeColor: '#E91E63' }}>Snap</span>
          </h1>
        </Link>
      </header>

      <main className="max-w-xl mx-auto px-6 py-12">
        <Link href="/articles" className="text-[#E91E63] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>

        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-10">
            <div className="mb-4">
              <span className="bg-blue-50 text-[#4267B2] text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-blue-100">
                Emotional Recovery
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] leading-tight tracking-tighter">
              상실의 70%는 애도입니다: <br/>슬픔이 치유로 변하는 시간
            </h2>
            <p className="text-slate-400 mt-4 font-medium text-sm">작성일: 2026. 01. 27 • 4 min read</p>
          </header>

          <section className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
            <p className="break-keep">
              상실을 겪은 후 찾아오는 슬픔은 불청객처럼 느껴지곤 합니다. 하지만 심리학적으로 볼 때, <strong>슬픔은 마음이 입은 상처를 스스로 봉합하려는 '치유의 과정'</strong>입니다. 이별 후에 느끼는 슬픔의 70%는 정상적인 회복을 위한 필수적인 단계입니다.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-12 mb-4">1. 슬픔은 뇌의 재구성 과정입니다</h3>
            <p className="break-keep">
              누군가와 함께하던 일상은 뇌에 강력한 회로를 형성합니다. 그 연결이 갑자기 끊어지면 뇌는 혼란을 느끼며 에너지를 대량으로 소모합니다. 이때 느끼는 눈물은 뇌가 새로운 현실을 받아들이고 정서적 지도를 재배치하기 위한 활동입니다.
            </p>

            <div className="bg-slate-50 border-l-4 border-[#4267B2] p-8 my-10 rounded-r-[32px] shadow-sm text-xl font-bold leading-relaxed">
              "슬픔을 충분히 느끼는 것은 <br/>다시 시작할 수 있는 용기를 얻는 과정입니다."
            </div>

            <p className="font-bold text-[#0F172A] p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
              오늘의 감정 스냅을 통해 당신의 마음 상태를 기록하고, AI가 제안하는 치유의 조언을 들어보세요.
            </p>
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 text-center">
            <Link href="/">
              <button className="w-full max-w-xs bg-[#1A1F2C] text-white py-6 rounded-[24px] font-bold text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                나의 마음 기록하기 💧
              </button>
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}