'use client';

import { useRouter } from 'next/navigation'; // router를 사용하기 위해 추가

export default function TermsOfService() {
  const lastUpdated = "2026. 01. 23";
  const router = useRouter(); // router 인스턴스 생성

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans py-20 px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="space-y-2 border-b border-slate-100 pb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">이용약관</h1>
          <p className="text-sm text-slate-400 font-medium">시행일자: {lastUpdated}</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">1. 목적</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            본 약관은 &apos;필링스냅&apos;(이하 &quot;서비스&quot;)이 제공하는 감정 분석 및 포토카드 생성 서비스의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">2. 서비스의 이용</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            사용자는 별도의 가입 없이 서비스를 이용할 수 있습니다. 본 서비스는 사용자가 입력한 텍스트를 바탕으로 감정 상태를 추정하여 시각적 이미지를 제공하며, 이는 의학적 진단이나 전문적인 심리 상담을 대체할 수 없습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">3. 책임의 한계</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            서비스에서 제공하는 결과물은 AI 기술 및 통계적 추측을 바탕으로 생성됩니다. 결과의 정확성이나 사용자의 심리적 상태에 대한 완전한 일치를 보장하지 않으며, 서비스 이용으로 인해 발생하는 결과에 대해 서비스 제공자는 법적 책임을 지지 않습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">4. 게시물 및 저작권</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            사용자가 생성한 감정 포토카드는 개인적인 용도로 자유롭게 저장 및 공유할 수 있습니다. 다만, 서비스의 로고를 무단으로 삭제하거나 상업적인 목적으로 재판매하는 행위는 금지됩니다.
          </p>
        </section>

        {/* 요청하신 메인으로 돌아가기 버튼 영역 */}
        <div className="pt-10 border-t border-slate-100 text-center">
          <button 
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-[#1A1F2C] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform"
          >
            메인으로 돌아가기
          </button>
        </div>
        
        <footer className="pt-10 border-t border-slate-100 text-[11px] text-slate-400">
          <p>© 2026 Feeling Snap. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}