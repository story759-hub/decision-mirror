'use client';

import { useRouter } from 'next/navigation';

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-20">
      {/* 헤더 */}
      <header className="max-w-2xl mx-auto pt-10 pb-6 px-6 flex justify-between items-center">
        <h1 
          className="text-2xl font-black text-[#E91E63] cursor-pointer"
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
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">개인정보 처리방침</h2>
          <p className="text-slate-500 font-medium">시행일: 2026년 1월 1일</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">1. 수집하는 개인정보 항목</h3>
          <p className="leading-relaxed text-slate-600">
            '필링스냅'은 별도의 회원가입 없이 이용 가능한 서비스로, 사용자의 이름, 이메일, 전화번호 등 <strong>직접적인 개인 식별 정보는 저장하지 않습니다.</strong> 분석을 위해 입력하시는 감정 데이터와 일기 텍스트는 AI 분석 결과 생성을 위해서만 사용됩니다.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">2. 개인정보의 이용 목적</h3>
          <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
            <li>사용자 맞춤형 감정 분석 결과 및 추천 콘텐츠 제공</li>
            <li>서비스 이용 통계 분석 및 품질 개선</li>
            <li>이미지 저장 기능 제공 (브라우저 로컬 저장 방식)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">3. 정보의 보유 및 파기</h3>
          <p className="leading-relaxed text-slate-600">
            입력된 데이터는 분석 완료 후 이미지 결과 생성 즉시 서버에서 휘발되거나 비식별화 처리됩니다. 사용자가 생성한 '스냅 이미지'는 사용자의 기기에 직접 저장되며, 서버에 별도로 보관되지 않습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">4. 이용자의 권리</h3>
          <p className="leading-relaxed text-slate-600">
            이용자는 언제든지 서비스 이용을 중단할 수 있습니다. 개인 식별 정보를 수집하지 않으므로 별도의 탈퇴 절차는 없으며, 브라우저의 캐시를 삭제함으로써 이용 기록을 제거할 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">5. 문의처</h3>
          <p className="leading-relaxed text-slate-600">
            서비스 이용 중 개인정보 관련 문의사항이 있으시면 아래 메일로 연락 부탁드립니다.<br/>
            <span className="text-[#E91E63] font-bold">support@feelingsnap.com</span>
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