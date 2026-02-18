'use client';

import { useState } from 'react'; 
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();
  const router = useRouter();

  // 회원가입과 동일한 비밀번호 규칙 적용
  const validatePassword = (pw: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/;
    const consecutiveNumbers = /(012|123|234|345|456|567|678|789|890|098|987|876|765|654|543|432|321|210)/;
    const repeatedNumbers = /(\d)\1\1/;

    if (!regex.test(pw)) {
      return "비밀번호는 9자 이상, 16자 미만이며 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.";
    }
    if (consecutiveNumbers.test(pw) || repeatedNumbers.test(pw)) {
      return "연속되거나 동일한 숫자를 3개 이상 사용할 수 없습니다.";
    }
    return null;
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const errorMsg = validatePassword(newPassword);
    if (errorMsg) {
      setMessage(errorMsg);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    
    if (error) {
      setMessage(error.message);
    } else {
      alert('비밀번호가 성공적으로 변경되었습니다. 새로운 비밀번호로 로그인해주세요.');
      router.push('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tighter text-slate-900">새 비밀번호 설정</h1>
          <p className="text-slate-500 text-sm">보안을 위해 강력한 비밀번호를 설정해주세요.</p>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="password"
              placeholder="새로운 비밀번호 입력"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-[#E91E63]/10 transition-all"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? '변경 중...' : '비밀번호 재설정 완료'}
          </button>
        </form>

        {message && (
          <p className="text-center text-[13px] font-bold text-[#E91E63] bg-red-50 py-3 rounded-xl px-4 break-keep">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}