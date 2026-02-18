'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // 하이드레이션 오류 방지
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 transition-colors duration-300 py-20 px-6">
      {/* 헤더 */}
      <header className="max-w-2xl mx-auto mb-12 flex justify-center">
        <h1
          className="text-2xl font-black text-[#0F172A] dark:text-white cursor-pointer"
          onClick={() => router.push('/')}
        >
          Feeling <span className="text-[#E91E63]">Snap</span>
        </h1>
      </header>

      {/* 본문 */}
      <main className="max-w-2xl mx-auto space-y-12 pb-20">
        <section className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">개인정보 처리방침</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">시행일: 2026년 2월 19일</p>
        </section>

        {/* 1. 수집 항목 */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-l-4 border-[#E91E63] pl-4">
            1. 수집하는 개인정보 항목
          </h3>
          <div className="leading-relaxed text-slate-600 dark:text-slate-400 space-y-4">
            <p>서비스는 회원가입 및 이용 과정에서 다음 정보를 수집합니다.</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><span className="font-bold text-slate-900 dark:text-slate-200">회원가입/로그인 시:</span> 이메일 주소, 인증 식별값(UID)</li>
              <li><span className="font-bold text-slate-900 dark:text-slate-200">서비스 이용 시:</span> 감정 선택 데이터, 텍스트(일기), 분석 결과, 생성 시각</li>
              <li><span className="font-bold text-slate-900 dark:text-slate-200">비로그인 이용 시:</span> 브라우저 로컬 식별값(FP/UUID)</li>
              <li><span className="font-bold text-slate-900 dark:text-slate-200">자동 수집 항목:</span> 접속 로그, IP 정보, 기기 정보</li>
            </ul>
          </div>
        </section>

        {/* 2. 이용 목적 */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-l-4 border-[#E91E63] pl-4">
            2. 개인정보의 이용 목적
          </h3>
          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            수집된 정보는 오직 <span className="text-slate-900 dark:text-slate-200 font-bold">사용자 본인의 감정 기록 저장 및 AI 분석 리포트 제공</span>을 위해서만 사용됩니다. 이메일 정보는 본인 확인 및 데이터 영구 보관을 위한 계정 식별 용도로 사용되며, 광고성 메일 전송 등 마케팅 용도로 무단 활용되지 않습니다.
          </p>
        </section>

{/* 3. 보유 및 파기 */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-l-4 border-[#E91E63] pl-4">
            3. 정보의 보유 및 파기
          </h3>
          <div className="leading-relaxed text-slate-600 dark:text-slate-400 space-y-3">
            <p>
              이용자의 개인정보 및 감정 기록 데이터는 <span className="text-slate-900 dark:text-slate-200 font-bold">회원 탈퇴 요청 시 관련 법령에 따른 보존 의무가 없는 범위 내에서 지체 없이 삭제</span>됩니다.
            </p>
            <p>
              비로그인 상태에서 생성된 기록은 브라우저 저장소(localStorage) 삭제 시 즉시 접근이 불가능해집니다.
            </p>
            <p>
              접속 로그 등 서비스 운영을 위한 정보는 보안 강화 및 시스템 오류 대응 목적으로 일정 기간 안전하게 보관되며, 내부 정책에 따라 목적 달성 시 즉시 파기됩니다.
            </p>
          </div>
        </section>
        
        {/* 4. 위탁 및 보안 조치 */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-l-4 border-[#E91E63] pl-4">
            4. 위탁 및 보안 조치
          </h3>
          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            데이터는 클라우드 데이터베이스 서비스(Supabase) 및 외부 AI 분석 엔진을 통해 처리될 수 있습니다. <span className="text-slate-900 dark:text-slate-200 font-bold">AI 분석 과정에서는 이메일 등 직접적인 식별 정보는 제외</span>되며, 감정 데이터 중심으로 분석이 수행됩니다. 모든 통신은 HTTPS 암호화 프로토콜을 사용하여 보호됩니다. 외부 AI 분석 과정에서 개인정보 보호를 위한 기술적·관리적 조치를 적용합니다.
          </p>
        </section>

        {/* 5. 이용자의 권리 */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-l-4 border-[#E91E63] pl-4">
            5. 이용자의 권리
          </h3>
          <p className="leading-relaxed text-slate-600 dark:text-slate-400">
            이용자는 언제든지 자신의 감정 기록을 삭제하거나 회원 탈퇴를 요청할 수 있습니다. 비로그인 사용자의 경우 브라우저 저장소(localStorage)의 데이터를 직접 삭제하여 이용 기록을 즉시 제거할 수 있습니다.
          </p>
        </section>

        {/* 6. 책임자 및 문의 */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-l-4 border-[#E91E63] pl-4">
            6. 개인정보 보호책임자
          </h3>
          <div className="leading-relaxed text-slate-600 dark:text-slate-400">
            <p>서비스 운영 및 개인정보와 관련된 문의사항은 아래 이메일을 통해 문의해 주시기 바랍니다. 보내주신 의견은 확인 후 영업일 기준 3일 이내에 답변드리겠습니다.</p>
            <div className="mt-2">
              <a 
                href="mailto:bullet9372@gmail.com" 
                className="text-[#E91E63] font-bold hover:underline inline-flex items-center gap-1 transition-all"
              >
                bullet9372@gmail.com
                <svg xmlns="http://www.w3.org/2000/01/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* 7. 서비스 성격 안내 */}
        <section className="space-y-4 bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="text-xl">⚠️</span> 7. 서비스 성격 안내
          </h3>
          <p className="leading-relaxed text-sm text-slate-600 dark:text-slate-400 font-medium">
            본 서비스는 사용자의 감정 기록 및 분석을 지원하는 도구이며, <span className="text-slate-900 dark:text-slate-200 underline decoration-[#E91E63] decoration-2 underline-offset-4">전문적인 의료적 진단이나 심리 치료를 대체할 수 없습니다.</span> 정서적 어려움이 지속될 경우 반드시 전문의 또는 관련 상담 기관의 도움을 받으시길 권장합니다.
          </p>
        </section>

        <div className="pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
          <button 
            onClick={() => router.push('/')}
            className="px-10 py-4 bg-[#1A1F2C] dark:bg-[#E91E63] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
          >
            확인하였습니다
          </button>
        </div>

        <footer className="pt-10 text-center text-[11px] text-slate-400 dark:text-slate-600">
          <p>© 2026 Feeling Snap. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}