'use client';

// 1. 모든 외부 라이브러리 및 폰트 import
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { toPng } from 'html-to-image';
import Link from 'next/link';
import { 
  Sparkles, Droplets, Flame, Tornado, Play, Clock, ChevronRight, 
  ArrowLeft, Lock, AlertCircle, User, LogOut, Coffee, Zap, Heart, 
  CloudRain, Share2, Trash2, UserX, Type, Plus, TrendingUp, Activity, Target
} from 'lucide-react';
import { Nanum_Pen_Script, Nanum_Myeongjo, Noto_Sans_KR, Bagel_Fat_One } from 'next/font/google';
import { createClient } from "../../utils/supabase/client";
import confetti from 'canvas-confetti'; // Confetti 라이브러리 추가 필요

// 2. 폰트 객체 선언
const handwriting = Nanum_Pen_Script({ weight: '400', subsets: ['latin'], display: 'swap' });
const myeongjo = Nanum_Myeongjo({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });
const gothic = Noto_Sans_KR({ weight: ['400', '900'], subsets: ['latin'], display: 'swap' });
const design = Bagel_Fat_One({ weight: '400', subsets: ['latin'], display: 'swap' });

// 3. 타입 정의
type Stage = 'pick' | 'intensity' | 'tags' | 'deep' | 'analyzing' | 'result' | 'archive' | 'report';
type FontType = 'handwriting' | 'myeongjo' | 'gothic' | 'design';

// 4. 상수 설정
const PRICING = { REPORT_FEE: 4900 }; 
const MAX_TEXT_LENGTH = 70;

// 5. 감정 데이터 정의
const EMOTION_DATA: { [key: string]: any } = {
  stable: { label: "안정", icon: <Heart size={40} strokeWidth={1.2} className="text-emerald-500" />, bgColor: "bg-emerald-50/50 dark:bg-emerald-900/20", img: "/images/stable.png", color: "text-emerald-500" },
  joy: { label: "기쁨", icon: <Sparkles size={40} strokeWidth={1.2} className="text-yellow-500" />, bgColor: "bg-yellow-50/50 dark:bg-yellow-900/20", img: "/images/joy.png", color: "text-yellow-500" },
  expect: { label: "기대", icon: <Zap size={40} strokeWidth={1.2} className="text-orange-500" />, bgColor: "bg-orange-50/50 dark:bg-orange-900/20", img: "/images/expect.png", color: "text-orange-500" },
  tired: { label: "피로", icon: <Coffee size={40} strokeWidth={1.2} className="text-slate-500" />, bgColor: "bg-slate-50/50 dark:bg-slate-800/40", img: "/images/tired.png", color: "text-slate-500" },
  stress: { label: "스트레스", icon: <Tornado size={40} strokeWidth={1.2} className="text-purple-500" />, bgColor: "bg-purple-50/50 dark:bg-purple-900/20", img: "/images/stress.png", color: "text-purple-500" },
  anger: { label: "분노", icon: <Flame size={40} strokeWidth={1.2} className="text-red-500" />, bgColor: "bg-red-50/50 dark:bg-red-900/20", img: "/images/anger.png", color: "text-red-500" },
  sadness: { label: "슬픔", icon: <CloudRain size={40} strokeWidth={1.2} className="text-blue-500" />, bgColor: "bg-blue-50/50 dark:bg-blue-900/20", img: "/images/sadness.png", color: "text-blue-500" },
  anxiety: { label: "불안", icon: <Droplets size={40} strokeWidth={1.2} className="text-indigo-500" />, bgColor: "bg-indigo-50/50 dark:bg-indigo-900/20", img: "/images/anxiety.png", color: "text-indigo-500" },
};

/** 확장된 트리거 태그 정의 */
const CONTEXT_TAGS = {
  trigger: {
    title: "이 감정이 생긴 이유가 있다면",
    items: [
      '일이 자꾸 밀림', '해야 할 게 너무 많음', '실수한 게 계속 생각남', '괜히 내가 부족한 느낌', '성과 압박', '상사/동료 눈치', '마감 다가옴', '시험/평가 앞둠', '집중이 안 됨',
      '답장이 안 옴', '읽씹 당한 느낌', '말을 잘못한 것 같음', '괜히 눈치 보임', '서운한 일이 있었음', '갈등이 있었음', '혼자 남겨진 느낌', '누군가의 말이 계속 생각남',
      'SNS 보다가 비교됨', '남들이 더 잘 사는 것 같음', '나만 뒤처진 느낌', '인정받고 싶었음', '스스로 실망함', '괜히 작아진 느낌',
      '돈 걱정이 스침', '지출이 부담됨', '앞으로가 막막함', '취업 고민', '이직 고민', '불확실한 상황',
      '잠을 못 잠', '계속 피곤함', '예민해진 상태', '컨디션 난조', '배고픔/과식', '생리/호르몬 영향',
      '밤이라 생각이 많아짐', '주말인데 공허함', '혼자 있는 시간', '사람 많은 곳', '날씨 영향', '이동 중',
      '딱히 이유는 없음', '그냥 그런 날', '별 생각 없음', '잘 모르겠음'
    ]
  }
};

export default function FeelingSnapFinal() {
  const [stage, setStage] = useState<Stage>('pick');
  const [selectedKey, setSelectedKey] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [intensity, setIntensity] = useState<number>(3);
  const [textInput, setTextInput] = useState('');
  const [selectedFont, setSelectedFont] = useState<FontType>('handwriting');
  const [resultData, setResultData] = useState<any>(null);
  const [stamp, setStamp] = useState({ date: '', time: '' });
  const [loadingText, setLoadingText] = useState('초점을 맞추는 중');
  const [history, setHistory] = useState<any[]>([]);
  const [showPayModal, setShowPayModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const shuffledTags = useMemo(() => {
    return [...CONTEXT_TAGS.trigger.items].sort(() => Math.random() - 0.5);
  }, [stage === 'tags']);

  // [신규] 감정 통찰 로직 (요약, 트리거, 모드)
  const insight = useMemo(() => {
    if (history.length < 1) return null;

    // A. 감정 패턴 요약 (최근 3회 vs 이전 평균)
    const recent = history.slice(0, 3);
    const recentAnxiety = recent.filter(h => h.emotion_key === 'anxiety' || h.emotion_key === 'stress').length;
    const summary = recentAnxiety >= 2 
      ? "최근 '불안'과 '스트레스' 비율이 눈에 띄게 높아지고 있어요." 
      : "감정의 파동이 비교적 안정적인 흐름을 보이고 있습니다.";

    // B. 반복 트리거 분석
    const allTags = history.flatMap(h => h.tags || []);
    const tagFreq = allTags.reduce((acc: any, cur: string) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});
    const topTags = Object.entries(tagFreq)
      .sort(([, a]: any, [, b]: any) => b - a)
      .slice(0, 2)
      .map(([tag]) => tag);

    // C. 감정 리듬 상태 분류
    const mainKey = history[0]?.emotion_key;
    let mode = { label: "안정 모드", icon: "🌿", color: "text-emerald-500" };
    if (['stress', 'anxiety', 'anger'].includes(mainKey)) mode = { label: "긴장 모드", icon: "⚠️", color: "text-red-500" };
    else if (['tired', 'sadness'].includes(mainKey)) mode = { label: "회복 필요", icon: "🌙", color: "text-indigo-500" };
    else if (['joy', 'expect'].includes(mainKey)) mode = { label: "상승 모드", icon: "🔥", color: "text-orange-500" };

    return { summary, topTags, mode };
  }, [history]);

  const getIntensityDesc = (val: number) => {
    if (val <= 1) return "아주 미세하게 느껴지는 정도예요.";
    if (val <= 2) return "은은한 여운이 마음을 스치고 있어요.";
    if (val <= 3) return "분명하게 느껴지는 오늘의 감정 농도예요.";
    if (val <= 4) return "마음의 상당 부분을 차지하고 있는 상태예요.";
    return "매우 강렬하게 온 마음을 뒤흔들고 있어요.";
  };

  const fetchHistory = useCallback(async (userId: string | null) => {
    if (typeof window === 'undefined') return;
    let fp = localStorage.getItem('snap_fp');
    if (!fp) {
      fp = 'fp_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('snap_fp', fp);
    }
    try {
      const url = userId ? `/api/analyze?user_id=${userId}` : `/api/analyze?fp=${fp}`;
      const res = await fetch(`${url}&t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setHistory(data);
      }
    } catch (err) { console.error("History fetch error:", err); }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setUser(authUser);
        await fetchHistory(authUser?.id || null);
      } catch (err) {
        console.error("Init error:", err);
        await fetchHistory(null);
      }
    };
    init();
  }, [fetchHistory, supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setHistory([]);
    setStage('pick');
    window.location.reload(); 
  };

  const handleWithdrawal = async () => {
    if (!confirm("정말로 회원 탈퇴를 하시겠습니까?\n작성하신 모든 기록이 삭제되며 복구할 수 없습니다.")) return;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/auth/withdraw', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        alert("회원 탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.");
        handleLogout();
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "탈퇴 처리 중 오류가 발생했습니다.");
      }
    } catch (err: any) { alert(err.message); }
  };

  useEffect(() => {
    let interval: any = null;
    if (stage === 'analyzing') {
      const texts = ['조리개 값을 조정하는 중', '셔터를 누르는 찰나', '빛을 기록하는 중', '필름을 현상하는 중', '인화하는 중'];
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 1500);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [stage]);

  const handleDeleteRecord = async (e: React.MouseEvent, recordId: string) => {
    e.stopPropagation();
    if (!confirm("이 기록을 영구히 삭제할까요?\n삭제 후에는 분석 데이터에서도 제외됩니다.")) return;
    const fingerprint = localStorage.getItem('snap_fp');
    const userId = user?.id || null;
    try {
      const res = await fetch(`/api/analyze?id=${recordId}&fp=${fingerprint}&user_id=${userId}`, { method: 'DELETE' });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "삭제 실패");
      }
      setHistory(prev => prev.filter(item => item.id !== recordId));
      if (resultData?.id === recordId) { setResultData(null); setStage('pick'); }
      alert("삭제되었습니다.");
    } catch (err: any) { alert(err.message || "삭제 중 오류가 발생했습니다."); }
  };

  const handleFinalAnalyze = async () => {
    if (stage === 'analyzing') return;
    const currentUserInput = textInput.trim(); 
    setStage('analyzing');
    const startTime = Date.now();
    const fingerprint = typeof window !== 'undefined' ? localStorage.getItem('snap_fp') : null;
    const now = new Date();
    setStamp({
      date: `${String(now.getFullYear()).slice(-2)}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`,
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    });
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mainEmotion: selectedKey,
          tags: selectedTags, 
          text: currentUserInput, 
          intensity: intensity,
          font: selectedFont,
          fingerprint,
          user_id: user?.id || null 
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "분석 실패");
      const wait = Math.max(0, 5000 - (Date.now() - startTime));
      setTimeout(async () => {
        const processedMix = (result?.mix || result?.mix_data || []).map((m: any) => ({
          ...m,
          label: EMOTION_DATA[m.key]?.label || m.key.slice(0, 4),
        }));
        const finalContent = (result.reason !== undefined && result.reason !== null) ? result.reason : currentUserInput;
        
        setResultData({
          ...result,
          userInput: finalContent, 
          mix: processedMix,
          selectedFont: result.font || selectedFont,
          mainEmotion: EMOTION_DATA[result.emotion_key] || EMOTION_DATA[selectedKey],
          subName: selectedTags.join(' · ') || "오늘의 조각"
        });
        setStage('result');
        await fetchHistory(user?.id || null);
      }, wait);
    } catch (error: any) { alert(error.message); setStage('deep'); }
  };

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleHistoryClick = (item: any) => {
    const createdAt = new Date(item.created_at);
    setStamp({
      date: `${String(createdAt.getFullYear()).slice(-2)}.${String(createdAt.getMonth() + 1).padStart(2, '0')}.${String(createdAt.getDate()).padStart(2, '0')}`,
      time: `${String(createdAt.getHours()).padStart(2, '0')}:${String(createdAt.getMinutes()).padStart(2, '0')}`
    });
    const processedMix = (item.mix_data || []).map((m: any) => ({
      ...m,
      label: EMOTION_DATA[m.key]?.label || m.key.slice(0, 4),
    }));
    setResultData({
      ...item,
      userInput: item.reason ?? "", 
      mix: processedMix,
      selectedFont: item.font || 'handwriting',
      mainEmotion: EMOTION_DATA[item.emotion_key] || EMOTION_DATA.stable,
      subName: item.tags?.join(' · ') || "과거의 기록",
      analysis: item.analysis || { delta: 0.0 }
    });
    setStage('result');
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      await document.fonts.ready;
      const dataUrl = await toPng(cardRef.current, { 
        pixelRatio: 3, 
        backgroundColor: '#0d0d0d', 
        cacheBust: true,
        includeQueryParams: true,
        style: { borderRadius: '0' }
      });
      const link = document.createElement('a');
      link.download = `FeelingSnap_${stamp.date.replace(/\./g, '')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { 
      console.error(err);
      alert("이미지 저장에 실패했습니다.");
    }
  };

  const handleUnlockReport = () => {
    if (!user) {
      alert("로그인하시면 정밀 분석 리포트를 확인하실 수 있습니다!");
      return;
    }
    // Confetti 애니메이션 실행
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E91E63', '#FFC107', '#2196F3']
    });
    setStage('report');
  };

  const ArchiveCard = ({ item, onClick }: { item: any, onClick: () => void }) => (
    <div onClick={onClick} className="group relative p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-slate-300">
          <Clock size={12} />
          <span className="text-[10px] font-mono">{new Date(item.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400">
            {EMOTION_DATA[item.emotion_key]?.label || 'SNAP'}
          </span>
          <button onClick={(e) => handleDeleteRecord(e, item.id)} className="p-1.5 text-slate-200 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <p className={`${item.font === 'myeongjo' ? myeongjo.className : item.font === 'gothic' ? gothic.className : item.font === 'design' ? design.className : handwriting.className} text-2xl text-slate-700 dark:text-slate-200 leading-snug truncate pr-4`}>
        {(item.reason && item.reason !== "") ? item.reason : (item.description?.split('\n')[0] || "기록된 조각")}
      </p>
      <div className="flex justify-between items-center mt-3">
        <p className="text-[11px] text-slate-400 italic opacity-70 truncate max-w-[80%]">
          {item.reason === "" ? "부적절한 표현이 정제되었습니다." : item.reason || "기록된 텍스트가 없습니다."}
        </p>
        <ChevronRight size={14} className="text-slate-300 group-hover:text-[#E91E63] transition-colors" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 pb-10 flex flex-col transition-colors">
      {/* 유료 리포트 유도 모달 */}
      {showPayModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 max-w-sm w-full text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto text-red-500">
              <AlertCircle size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tighter">심리 지표 급변 경보</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                평소보다 감정 수치가 <span className="text-red-500 font-bold">+{resultData?.analysis?.delta || '0.0'}</span> 상승했습니다.<br/>
                AI 정밀 리포트로 원인을 분석하세요.
              </p>
            </div>
            <button className="w-full py-4 bg-[#E91E63] text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-transform">
              심층 리포트 열기 (₩{PRICING.REPORT_FEE.toLocaleString()})
            </button>
            <button onClick={() => setShowPayModal(false)} className="text-xs text-slate-400 underline">나중에 볼게요</button>
          </div>
        </div>
      )}

      {/* 네비게이션 */}
      <nav className="max-w-md mx-auto w-full px-6 pt-6 flex justify-between items-center">
        {stage === 'pick' ? (
          <Link href="/" className="group flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <ArrowLeft size={14} /> HOME
          </Link>
        ) : (
          <button onClick={() => { setStage('pick'); setResultData(null); }} className="group flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <ArrowLeft size={14} /> BACK
          </button>
        )}
        
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-500">{user.email?.split('@')[0]}님</span>
            <div className="flex items-center gap-2">
              <button onClick={handleLogout} className="text-slate-300 hover:text-slate-600 transition-colors" title="로그아웃">
                <LogOut size={14} />
              </button>
              <button onClick={handleWithdrawal} className="text-slate-300 hover:text-red-500 transition-colors" title="회원탈퇴">
                <UserX size={14} />
              </button>
            </div>
          </div>
        ) : (
          <Link href="/login" className="text-[11px] font-bold text-[#E91E63] flex items-center gap-1"><User size={14} /> LOGIN</Link>
        )}
      </nav>
      
      {/* 로고 */}
      <header className="max-w-xl mx-auto pt-6 pb-6 text-center">
        <h1 className="text-4xl font-black tracking-tighter cursor-pointer" onClick={() => {setStage('pick'); setTextInput('');}}>
          <span className="text-[#0F172A] dark:text-white">Feeling</span><span className="text-[#E91E63] ml-1">Snap</span>
        </h1>
      </header>

      <main className="max-w-md mx-auto px-6 flex-grow w-full">
        {/* 단계 1: 감정 선택 */}
        {stage === 'pick' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2 pt-6">
              <h2 className="text-xl font-bold">지금 어떤가요?</h2>
              <p className="text-slate-400 text-sm">8가지 핵심 감정 중 하나를 선택하세요.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(EMOTION_DATA).map((key) => (
                <button key={key} onClick={() => { setSelectedKey(key); setStage('intensity'); }}
                  className={`${EMOTION_DATA[key].bgColor} p-6 rounded-[32px] hover:scale-105 active:scale-95 transition-all flex flex-col items-center border border-transparent shadow-sm`}>
                  <div className="mb-3">{EMOTION_DATA[key].icon}</div>
                  <div className="font-bold text-slate-700 dark:text-slate-300">{EMOTION_DATA[key].label}</div>
                </button>
              ))}
            </div>

            {/* AI 분석 리포트 해금 영역 */}
            {history.length < 7 ? (
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-end mb-4">
                  <h4 className="text-sm font-bold flex items-center gap-2"><Sparkles size={16} className="text-[#E91E63]" /> AI 분석 리포트 해금</h4>
                  <span className="text-xs font-black text-[#E91E63]">{history.length % 7} / 7</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E91E63] transition-all" style={{ width: `${((history.length % 7) / 7) * 100}%` }}></div>
                </div>
              </div>
            ) : (
              <button onClick={handleUnlockReport} className="w-full p-5 bg-gradient-to-r from-[#E91E63] to-[#FF4081] rounded-[24px] shadow-lg animate-bounce duration-1000">
                <p className="text-sm text-white font-black text-center flex items-center justify-center gap-2">
                  <Sparkles size={18} /> 정밀 분석 리포트가 해금되었습니다!
                </p>
              </button>
            )}

            <div className="pt-4 space-y-6">
              <div className="flex justify-between items-end">
                <h4 className="text-xl font-black tracking-tighter italic">Recent Snaps</h4>
                {history.length > 3 && (
                  <button onClick={() => { if (!user) alert("전체 히스토리는 로그인 시 확인 가능합니다."); else setStage('archive'); }} className="text-[11px] font-black text-[#E91E63] hover:underline">+ MORE</button>
                )}
              </div>
              <div className="space-y-4">
                {history.length === 0 ? (
                  <div className="py-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-dashed border-slate-200 dark:border-slate-800">
                    <p className="text-[11px] text-slate-400 italic">아직 기록된 찰나가 없습니다.</p>
                  </div>
                ) : (
                  (user ? history.slice(0, 3) : history.slice(0, 5)).map((item) => <ArchiveCard key={item.id} item={item} onClick={() => handleHistoryClick(item)} />)
                )}
              </div>
            </div>
          </div>
        )}

        {/* 정밀 분석 리포트 화면 (해금 시 등장) */}
        {stage === 'report' && insight && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500 py-6">
            <div className="text-center space-y-4">
              <div className={`inline-block px-6 py-2 rounded-full bg-slate-100 dark:bg-slate-800 font-black ${insight.mode.color}`}>
                {insight.mode.icon} {insight.mode.label}
              </div>
              <h2 className="text-3xl font-black tracking-tighter">심층 분석 리포트</h2>
            </div>

            <div className="space-y-4">
              <div className="p-8 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-400 uppercase flex items-center gap-2"><TrendingUp size={14} /> 감정 패턴 요약</h4>
                  <p className="text-lg font-bold leading-snug">{insight.summary}</p>
                </div>
                
                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-400 uppercase flex items-center gap-2"><Target size={14} /> 반복 트리거 분석</h4>
                  <div className="flex flex-wrap gap-2">
                    {insight.topTags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-[#E91E63] rounded-full text-xs font-bold">#{tag}</span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">최근 당신의 감정을 가장 자주 자극하는 맥락들입니다.</p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase flex items-center justify-center gap-1"><Lock size={10} /> 30일 누적 시 열림</h4>
                <p className="text-sm font-bold text-slate-500">감정과 소비 연결 분석</p>
                <p className="text-[10px] text-slate-400">당신의 감정이 지갑에 미치는 영향을 곧 분석해 드립니다.</p>
              </div>
            </div>

            <button onClick={() => setStage('pick')} className="w-full py-5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-[24px] font-bold text-lg">기록하러 가기</button>
          </div>
        )}

        {/* 히스토리 전체 보기 */}
        {stage === 'archive' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 py-6">
            <h2 className="text-2xl font-black tracking-tighter italic">Timeline</h2>
            <div className="space-y-4">
              {history.map((item) => <ArchiveCard key={item.id} item={item} onClick={() => handleHistoryClick(item)} />)}
            </div>
            <button onClick={() => setStage('pick')} className="w-full py-5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-[24px] font-bold text-sm mt-4">돌아가기</button>
          </div>
        )}

        {/* 단계 2: 농도 선택 */}
        {stage === 'intensity' && (
          <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 text-center py-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tighter">농도는 어떤가요?</h2>
              <p className="text-sm text-slate-400 font-medium">{getIntensityDesc(intensity)}</p>
            </div>
            <div className="py-10 space-y-8">
              <div className="text-8xl font-black text-[#E91E63] tabular-nums">{intensity}</div>
              <input type="range" min="1" max="5" step="1" value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E91E63]" />
              <p className="text-xs text-slate-400 mt-2">1(낮음)부터 5(높음)까지 오늘의 감정 세기를 조절하세요.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStage('pick')} className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-[24px] font-bold">이전</button>
              <button onClick={() => { setStage('tags'); setShowAllTags(false); }} className="flex-[2] py-5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-[24px] font-bold text-lg shadow-xl">다음으로</button>
            </div>
          </div>
        )}

        {/* 단계 3: 맥락 태그 선택 */}
        {stage === 'tags' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 py-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black tracking-tighter">어떤 맥락인가요?</h2>
               <p className="text-xs text-slate-400 font-medium">최대 3개까지 선택 가능합니다. 오늘의 감정을 수식하는 단어들을 골라주세요.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 pl-1">{CONTEXT_TAGS.trigger.title}</h3>
              <div className="flex flex-wrap gap-2 transition-all duration-500">
                {(showAllTags ? shuffledTags : shuffledTags.slice(0, 15)).map(tag => (
                  <button key={tag} onClick={() => handleToggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedTags.includes(tag) ? 'bg-[#E91E63] text-white border-[#E91E63]' : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-100 dark:border-slate-800'}`}>
                    {tag}
                  </button>
                ))}
                {!showAllTags && (
                  <button onClick={() => setShowAllTags(true)} className="px-4 py-2 rounded-full text-sm font-bold bg-slate-50 dark:bg-slate-800 text-[#E91E63] flex items-center gap-1 border border-dashed border-[#E91E63]/30">
                    <Plus size={14} /> 더 보기
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStage('intensity')} className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-[24px] font-bold">이전</button>
              <button onClick={() => setStage('deep')} disabled={selectedTags.length === 0}
                className={`flex-[2] py-5 rounded-[24px] font-bold text-lg shadow-xl ${selectedTags.length > 0 ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900' : 'bg-slate-200 text-slate-400'}`}>다음으로</button>
            </div>
          </div>
        )}

        {/* 단계 4: 상세 내용 작성 및 폰트 선택 */}
        {stage === 'deep' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-center py-4 space-y-1">
              <h2 className="text-2xl font-black tracking-tighter">더 하고 싶은 말이 있나요?</h2>
              <p className="text-[13px] font-medium text-slate-400/80">쓰지않아도 괜찮아요. 할 말을 남기면 함께 snap이 됩니다.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[{ id: 'handwriting', name: '필기체' }, { id: 'myeongjo', name: '명조체' }, { id: 'gothic', name: '고딕체' }, { id: 'design', name: '디자인' }].map((f) => (
                <button key={f.id} onClick={() => setSelectedFont(f.id as FontType)} className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${selectedFont === f.id ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                  <Type size={14} /> {f.name}
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea 
                className={`w-full h-56 bg-[#F8FAFC] dark:bg-slate-900 rounded-[32px] p-8 text-xl outline-none shadow-inner border border-transparent dark:border-slate-800 focus:border-[#E91E63]/30 transition-all ${selectedFont === 'myeongjo' ? myeongjo.className : selectedFont === 'gothic' ? gothic.className : selectedFont === 'design' ? design.className : handwriting.className}`}
                value={textInput} 
                onChange={(e) => setTextInput(e.target.value.slice(0, MAX_TEXT_LENGTH))}
                placeholder={`자유롭게 작성해주세요.\n*깔끔하게 snap찍는 Tip!\n- 최대 6줄까지 출력(한글 기준 1줄 최대 13글자)\n- 엔터를 쳐서 입력하면 더 깔끔해요!`} 
              />
              <div className="absolute bottom-6 right-8 text-xs font-bold text-slate-400">{textInput.length} / {MAX_TEXT_LENGTH}</div>
            </div>
            <button onClick={() => handleFinalAnalyze()} disabled={stage !== 'deep'} className="w-full bg-[#1A1F2C] dark:bg-slate-100 text-white dark:text-slate-900 py-6 rounded-[24px] font-bold text-xl shadow-xl active:scale-95 transition-all disabled:opacity-50">SNAP 📷</button>
          </div>
        )}

        {/* 로딩 화면 */}
        {stage === 'analyzing' && (
          <div className="py-32 text-center space-y-10">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-8 border-slate-100 dark:border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-[#E91E63] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-xl font-black tracking-tight animate-pulse">{loadingText}</p>
          </div>
        )}
        
        {/* 단계 5: 결과 화면 (카드) */}
        {stage === 'result' && resultData && (
          <div className="animate-in fade-in duration-1000 pb-20">
            <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-[#E91E63] uppercase tracking-widest">Personal Delta</span>
                <div className="flex gap-4 items-center">
                  <button onClick={(e) => handleDeleteRecord(e, resultData.id)} className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={12} /> 기록 삭제</button>
                  {!user && <Link href="/login" className="text-[9px] font-bold text-slate-400 underline">데이터 영구 보관하기</Link>}
              </div>
              </div>
              <div className="flex items-center gap-5">
                <div className={`text-4xl font-black ${resultData.analysis?.delta > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{resultData.analysis?.delta > 0 ? `+${resultData.analysis?.delta}` : resultData.analysis?.delta || '0.0'}</div>
                <div className="flex-grow space-y-1">
                  <div className="text-[12px] font-bold text-slate-700 dark:text-slate-300">이전 평균 대비 변화량</div>
                  <div onClick={() => alert("나만의 감정 데이터 분석 'PRO Insight'는 추후 업데이트 예정입니다.")} className="flex items-center gap-1 text-[#E91E63] text-[9px] font-black uppercase tracking-tighter cursor-pointer hover:opacity-70 transition-opacity"><Lock size={10} strokeWidth={3} /> PRO Insight - Coming Soon</div>
                </div>
              </div>
            </div>

            <div ref={cardRef} className="relative w-full bg-[#0d0d0d] shadow-2xl rounded-[2px] overflow-hidden" style={{ minHeight: '850px' }}>
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <img src={resultData.mainEmotion?.img || "/images/stable.png"} alt="snap" className="w-full h-full object-cover opacity-50 saturate-[0.8]" crossOrigin="anonymous" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                <div className="absolute inset-0 p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start opacity-40 text-white text-[10px]">
                    <div className="font-mono">{stamp.date} / {stamp.time}</div>
                    <div className="font-black italic uppercase tracking-widest">FEELING SNAP 2.0</div>
                  </div>
                  <div className="space-y-4">
                    <span className={`${myeongjo.className} text-[8px] font-bold text-white/30 uppercase tracking-[0.4em]`}>
                      {resultData.subName || "오늘의 조각"}
                    </span>
                    <div className={`${resultData.selectedFont === 'myeongjo' ? myeongjo.className : resultData.selectedFont === 'gothic' ? gothic.className : resultData.selectedFont === 'design' ? design.className : handwriting.className} text-[44px] leading-[1.05] text-white break-words whitespace-pre-wrap line-clamp-6`} style={{ maxWidth: '13em' }}>
                      {resultData.userInput || (resultData.description ? resultData.description.split(/[.\n]/)[0].trim() : "오늘의 감정 조각")}
                    </div>
                  </div>
                  <div className="text-[9px] font-mono text-white/20 tracking-[0.5em] text-center uppercase">SNAP_RECORDED</div>
                </div>
              </div>

              <div className="p-10 space-y-10 bg-[#0d0d0d] relative">
                <p className={`${myeongjo.className} text-[14px] font-medium leading-[1.7] italic text-white/60 pl-4 border-l border-white/10 line-clamp-4`}>{resultData.description || "그날의 감정은 한 장의 사진처럼 마음에 남습니다."}</p>
                <div className="flex justify-between items-end border-t border-white/5 pt-8">
                  <div className="space-y-4">
                    <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Emotion Mix</span>
                    <div className="flex gap-4"> 
                      {(resultData.mix || []).slice(0, 3).map((item: any, i: number) => (
                        <div key={i} className="flex flex-col min-w-[32px]">
                          <span className="text-[9px] font-bold text-white/70 mb-0.5">{item.label}</span>
                          <span className="text-[10px] font-mono text-white/40">{item.rate}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right space-y-3 group cursor-pointer" onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(resultData.song)}`, '_blank')}>
                    <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Now Playing</span>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p className="text-[10px] font-bold text-white/40 italic">{resultData.song?.split('-')[0]?.trim() || 'AI Artist'}</p>
                        <p className={`${myeongjo.className} text-[13px] font-black text-white/70 group-hover:text-[#E91E63] italic break-words whitespace-pre-wrap text-right max-w-[150px]`}>{resultData.song?.split('-')[1]?.trim() || resultData.song || "Silence"}</p>
                      </div>
                      <div className="p-2 bg-white/5 rounded-full border border-white/10"><Play size={10} className="text-[#E91E63] fill-[#E91E63]" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <button onClick={handleSaveImage} className="w-full py-5 bg-black dark:bg-slate-100 text-white dark:text-slate-900 rounded-full font-black text-[14px] shadow-xl active:scale-95 transition-all">이미지로 저장하기</button>
              <div className="flex justify-center gap-10">
                <button onClick={() => { setStage('pick'); setTextInput(''); setSelectedTags([]); }} className="text-[11px] font-bold text-slate-400 hover:text-slate-600">다시 기록하기</button>
                <button onClick={() => alert("링크가 복사되었습니다!")} className="text-[11px] font-bold text-[#E91E63] hover:underline flex items-center gap-1"><Share2 size={12} /> 순간 공유하기</button>
              </div>
              <div className="pt-6 border-t border-slate-100 dark:border-white/5 space-y-3">
                <p className="text-center text-[10px] text-slate-400 font-medium opacity-70">부적절한 텍스트 입력 시 출력이 제한 될 수 있습니다.</p>
                <div className="flex flex-col items-center gap-2 opacity-50">
                  <div className="flex items-center gap-1 text-[9px] text-slate-400"><Lock size={10} /> <span>기록은 보안 연결과 계정 인증을 통해 보호됩니다.</span></div>
                  <div className="flex gap-4 text-[9px] text-slate-500 font-bold">
                    <Link href="/privacy" className="hover:underline">개인정보 처리방침</Link>
                  <button onClick={() => alert("익명성 보장: 모든 데이터는 암호화됩니다.\n편향 방지: AI는 감정을 판단하지 않고 기록합니다.")} className="hover:underline">AI 윤리가이드</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}