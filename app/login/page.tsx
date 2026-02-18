'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  LogIn 
} from 'lucide-react';
import Link from 'next/link';

type ViewMode = 'login' | 'signup' | 'find';

export default function AuthPage() {
  const [mode, setMode] = useState<ViewMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const supabase = createClient();

  // 하이드레이션 오류 방지
  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleSocialLogin = async (provider: 'google' | 'kakao') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      if (error.message.includes("Email not confirmed")) {
        setMessage("이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.");
      } else {
        setMessage("아이디 또는 비밀번호를 확인해주세요.");
      }
    } else {
      window.location.href = '/snap';
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const passwordError = validatePassword(password);
    if (passwordError) {
      setMessage(passwordError);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('인증 메일이 발송되었습니다! 메일함에서 확인 버튼을 눌러주세요.');
      setEmail('');
      setPassword('');
    }
    setLoading(false);
  };

  const handleFindPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) setMessage(error.message);
    else setMessage('비밀번호 재설정 링크가 발송되었습니다.');
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0F1C] flex flex-col items-center justify-center px-6 py-12 transition-colors duration-300">
      <div className="w-full max-w-sm space-y-10">
        
        {/* 상단 헤더 */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/snap" className="group flex items-center gap-2 text-[12px] font-bold text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
            <ArrowLeft size={16} /> 게스트 모드로 계속하기
          </Link>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
            Feeling<span className="text-[#E91E63]">Snap</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm break-keep">
            {mode === 'login' && '나의 감정 기록을 안전하게 보관하세요'}
            {mode === 'signup' && '새로운 감정 일기를 시작해보세요'}
            {mode === 'find' && '계정 정보를 찾기 위해 이메일을 입력하세요'}
          </p>
        </div>

        {/* 소셜 로그인 */}
        {mode === 'login' && (
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => handleSocialLogin('google')}
              className="flex items-center justify-center gap-3 w-full py-4 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="google" />
              Google로 시작하기
            </button>
            <button 
              onClick={() => handleSocialLogin('kakao')}
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#FEE500] text-[#3C1E1E] rounded-2xl font-bold hover:bg-[#FADA00] transition-all"
            >
              <span className="w-5 h-5 flex items-center justify-center bg-[#3C1E1E] rounded-full text-[10px] text-[#FEE500]">K</span>
              카카오로 시작하기
            </button>
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100 dark:border-slate-800"></span></div>
              <div className="relative flex justify-center text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest bg-white dark:bg-[#0A0F1C] px-4">OR</div>
            </div>
          </div>
        )}

        {/* 폼 입력 섹션 */}
        <form onSubmit={
          mode === 'login' ? handleEmailLogin : 
          mode === 'signup' ? handleSignUp : handleFindPassword
        } className="space-y-4">
          <div className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border-none rounded-2xl outline-none focus:ring-2 ring-[#E91E63]/20 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {mode !== 'find' && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900/50 border-none rounded-2xl outline-none focus:ring-2 ring-[#E91E63]/20 dark:text-white transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 dark:bg-[#E91E63] text-white rounded-2xl font-bold shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? '처리 중...' : (
              mode === 'login' ? '로그인' : mode === 'signup' ? '회원가입' : '재설정 메일 보내기'
            )}
          </button>
        </form>

        {/* 하단 링크 */}
        <div className="space-y-6">
          {message && (
            <p className="text-center text-[13px] font-bold text-[#E91E63] bg-red-50 dark:bg-red-900/10 py-3 rounded-xl px-4 break-keep">
              {message}
            </p>
          )}

          <div className="flex justify-center gap-6 text-[13px] font-bold text-slate-400 dark:text-slate-500">
            {mode === 'login' ? (
              <>
                <button onClick={() => { setMode('signup'); setMessage(''); }} className="hover:text-slate-900 dark:hover:text-slate-200">회원가입</button>
                <button onClick={() => { setMode('find'); setMessage(''); }} className="hover:text-slate-900 dark:hover:text-slate-200">비밀번호 찾기</button>
              </>
            ) : (
              <button onClick={() => { setMode('login'); setMessage(''); }} className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200">
                <LogIn size={14} /> 로그인으로 돌아가기
              </button>
            )}
          </div>
        </div>

        {/* 안내 문구 */}
        <div className="pt-8 border-t border-slate-50 dark:border-slate-900 text-center">
            <p className="text-[11px] text-slate-300 dark:text-slate-600 font-medium leading-relaxed">
                로그인 없이도 스냅을 찍을 수 있지만,<br/>
                기기를 변경하거나 브라우저 쿠키 삭제 시 데이터가 소실됩니다.
            </p>
        </div>
      </div>
    </div>
  );
}