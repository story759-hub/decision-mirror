'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';

export default function Contact() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // 하이드레이션 오류 방지
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C] flex flex-col items-center justify-center py-20 px-6 transition-colors duration-300">
      
      <div className="max-w-md w-full bg-white dark:bg-[#151C2C] rounded-[40px] p-12 shadow-sm dark:shadow-2xl border border-slate-100 dark:border-slate-800 text-center space-y-8">
        <div className="space-y-3">
          <div className="w-12 h-12 bg-pink-50 dark:bg-pink-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="text-[#E91E63]" size={24} />
          </div>
          <span className="text-[#E91E63] font-black text-xs uppercase tracking-[0.2em]">Contact Us</span>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">무엇을 도와드릴까요?</h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
            필링스냅에 대한 의견이나 제휴 문의는<br />아래 메일로 편하게 연락주세요.
          </p>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700 group hover:border-[#E91E63] dark:hover:border-[#E91E63] transition-colors">
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mb-1 tracking-wider">Email Address</p>
          <a 
            href="mailto:bullet9372@gmail.com" 
            className="text-lg font-black text-slate-800 dark:text-slate-100 hover:text-[#E91E63] dark:hover:text-[#E91E63] transition-colors"
          >
            bullet9372@gmail.com
          </a>
        </div>

        {/* 메인으로 돌아가기 버튼 (요청하신 스타일로 통일) */}
        <div className="pt-4 text-center">
          <button 
            onClick={() => router.push('/')}
            className="w-full px-8 py-4 bg-[#1A1F2C] dark:bg-[#E91E63] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all duration-300"
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>

      {/* 푸터 스타일의 작은 문구 */}
      <p className="mt-8 text-xs text-slate-400 dark:text-slate-600 font-medium">
        © 2026 Feeling Snap. All rights reserved.
      </p>
    </div>
  );
}