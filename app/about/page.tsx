'use client';

import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-20">
      {/* 헤더 */}
      <header className="max-w-2xl mx-auto pt-10 pb-6 px-6 flex justify-between items-center">
        <h1
          className="text-2xl font-black text-[#0F172A] cursor-pointer"
          onClick={() => router.push('/')}
        >
          Feeling <span className="text-[#E91E63]">Snap</span>
        </h1>
        <button
          onClick={() => router.back()}
          className="text-sm font-bold text-slate-400 hover:text-slate-600"
        >
          뒤로가기
        </button>
      </header>

      {/* 본문 */}
      <main className="max-w-2xl mx-auto px-6 space-y-10 mt-10">
        <section className="space-y-4">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            About Feeling Snap
          </h2>
          <p className="text-slate-500 font-medium">
            Feeling Snap 서비스 소개
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            1. 서비스 개요
          </h3>
          <p className="leading-relaxed text-slate-600">
            Feeling Snap은 사용자가 느낀 감정과 생각을 간단히 기록하고,
            이를 시각적인 이미지 형태로 정리할 수 있도록 돕는
            <strong> 웹 기반 감정 기록 도구</strong>입니다.
            본 서비스는 사용자의 감정을 분석하거나 판단하지 않으며,
            치료·의료·상담 목적의 서비스가 아닙니다.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            2. 서비스 목적
          </h3>
          <p className="leading-relaxed text-slate-600">
            Feeling Snap의 목적은 사용자가 자신의 감정을
            보다 가볍고 부담 없이 정리하고,
            하루의 상태를 시각적으로 기록할 수 있도록 돕는 것입니다.
            회원가입 없이 누구나 자유롭게 이용할 수 있으며,
            감정 기록에 대한 결과는 참고용으로만 제공됩니다.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            3. 데이터 처리 방식
          </h3>
          <p className="leading-relaxed text-slate-600">
            사용자가 입력한 텍스트 데이터는
            결과 이미지 생성을 위한 처리에만 사용되며,
            서버에 영구적으로 저장되지 않습니다.
            생성된 이미지 결과는 사용자의 기기에 직접 저장되며,
            서비스 운영자는 해당 내용을 열람하거나 보관하지 않습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            4. 서비스 운영 및 수익 구조
          </h3>
          <p className="leading-relaxed text-slate-600">
            Feeling Snap은 서비스 운영 및 유지 비용 충당을 위해
            광고가 표시될 수 있습니다.
            광고는 서비스 이용에 필수적이지 않으며,
            사용자 경험을 해치지 않는 범위 내에서 제공됩니다.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            5. 문의 안내
          </h3>
          <p className="leading-relaxed text-slate-600">
            서비스 관련 문의 사항은 Contact 페이지를 통해
            확인하실 수 있습니다.
          </p>
        </section>

        <div className="pt-10 border-t border-slate-100 text-center">
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-[#1A1F2C] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
          >
            메인으로 돌아가기
          </button>
        </div>
      </main>
    </div>
  );
}
