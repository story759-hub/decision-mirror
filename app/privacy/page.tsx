import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8 py-10">
        <h1 className="text-3xl font-black text-white">Privacy Policy (개인정보 처리방침)</h1>
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#5D5FEF]">1. 개인정보의 처리 목적</h2>
          <p>Clarity Room은 사용자가 입력한 텍스트를 바탕으로 인지 구조화 분석 결과를 제공합니다. 입력된 데이터는 오직 분석 목적으로만 활용됩니다.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#5D5FEF]">2. 수집하는 개인정보 항목</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>필수 항목: 사용자가 입력창에 직접 입력한 텍스트 데이터</li>
            <li>자동 수집 항목: 쿠키(Cookie), 접속 IP, 방문 기록 (Google AdSense 및 서비스 최적화용)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#5D5FEF]">3. 제3자 제공 (AI 분석 및 광고)</h2>
          <p>본 서비스는 분석의 정확도를 위해 Google Gemini API를 이용하며, 광고 게재를 위해 Google AdSense를 활용합니다.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Google (AI): 입력 텍스트 분석 (저장되지 않음)</li>
            <li>Google (AdSense): 맞춤형 광고 게재를 위한 쿠키 사용</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#5D5FEF]">4. 데이터 보유 및 파기</h2>
          <p>사용자의 입력 데이터는 분석 완료 후 즉시 파기되며, 서버에 영구적으로 기록되지 않습니다.</p>
        </section>

        <footer className="pt-10 border-t border-slate-800 text-sm">
          <p>문의: your-email@example.com (본인 이메일로 수정하세요)</p>
          <p className="mt-2">© 2026 Clarity Room. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}