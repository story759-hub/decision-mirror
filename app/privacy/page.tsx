import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← 메인으로 돌아가기
        </Link>

        <header className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-3xl font-black text-white tracking-tighter mb-4">
            개인정보 처리방침 (Privacy Policy)
          </h1>
          <p className="text-slate-500 text-sm">최종 수정일: 2026. 01. 22</p>
        </header>

        <section className="space-y-10 text-sm md:text-base">
          {/* 1. 수집 항목 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">1. 수집하는 개인정보 항목</h2>
            <p>
              Clarity Room은 사용자가 서비스를 이용할 때 별도의 회원가입 없이도 이용 가능하도록 설계되었습니다. 다만, 서비스 이용 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 기기 정보</li>
            </ul>
          </div>

          {/* 2. 애드센스 필수 문구 (가장 중요) */}
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-bold text-[#5D5FEF] mb-4">2. 구글 광고 및 쿠키 사용 고지</h2>
            <p className="mb-4">
              본 웹사이트는 구글(Google)에서 제공하는 웹 광고 서비스인 **'구글 애드센스(Google AdSense)'**를 사용합니다.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li>구글을 포함한 제3자 제공업체는 사용자의 이전 웹사이트 방문 기록을 바탕으로 광고를 게재하기 위해 쿠키를 사용합니다.</li>
              <li>구글의 광고 쿠키를 사용하여 구글과 파트너는 사용자의 본 사이트 및 다른 사이트 방문 기록을 토대로 적절한 광고를 사용자에게 게재할 수 있습니다.</li>
              <li>사용자는 <a href="https://www.google.com/settings/ads" target="_blank" className="text-[#5D5FEF] underline">구글 광고 설정</a>을 방문하여 맞춤설정 광고를 해제할 수 있습니다.</li>
            </ul>
          </div>

          {/* 3. 정보 이용 목적 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">3. 개인정보의 이용 목적</h2>
            <p>수집된 정보는 다음의 목적을 위해서만 사용됩니다.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>서비스 분석 및 통계 (사용자 경험 개선)</li>
              <li>부정 이용 방지 및 보안 유지</li>
              <li>구글 애드센스를 통한 맞춤형 광고 제공</li>
            </ul>
          </div>

          {/* 4. 정보의 파기 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">4. 개인정보의 파기절차 및 방법</h2>
            <p>
              Clarity Room은 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
            </p>
          </div>

          {/* 5. 문의처 */}
          <div className="pt-10 border-t border-slate-800">
            <h2 className="text-lg font-bold text-white mb-2">문의사항</h2>
            <p>본 방침과 관련하여 궁금한 점이 있으시면 아래로 연락주시기 바랍니다.</p>
            <p className="mt-2 text-[#5D5FEF]">Email: bullet9372@gmail.com</p>
          </div>
        </section>
      </article>
    </div>
  );
}