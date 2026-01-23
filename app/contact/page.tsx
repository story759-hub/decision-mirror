'use client'; // 이 문구가 없으면 onClick 사용 시 에러가 발생합니다.

import { useRouter } from 'next/navigation'; // window.location 대신 Next.js 권장 방식 사용

export default function Contact() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-sm border border-slate-100 text-center space-y-8">
        <div className="space-y-2">
          <span className="text-pink-500 font-black text-xs uppercase tracking-widest">Contact Us</span>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">무엇을 도와드릴까요?</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            필링스냅에 대한 의견이나 제휴 문의는<br />아래 메일로 편하게 연락주세요.
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
          <p className="text-xs text-slate-400 font-bold uppercase mb-1">Email Address</p>
          {/* bullet9372@gmail.com */}
          <a href="mailto:bullet9372@gmail.com" className="text-lg font-black text-slate-800 hover:text-pink-500 transition-colors">
            bullet9372@gmail.com
          </a>
        </div>

        <div className="pt-4">
          <button 
            onClick={() => router.push('/')} // Next.js에서는 router.push가 더 빠르고 부드럽습니다.
            className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-all"
          >
            ← 메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}