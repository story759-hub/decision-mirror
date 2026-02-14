import Link from 'next/link';
import { Sparkles, BookOpen, Heart, ShieldCheck, Compass, ArrowRight, Camera } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* 0. 상단 네비게이션 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="w-7 h-7 bg-[#E91E63] rounded flex items-center justify-center mr-2 group-hover:rotate-12 transition-transform">
              <Camera size={16} className="text-white" />
            </div>
            <div className="text-xl font-black tracking-tighter">
              <span className="text-[#0F172A]">Feeling</span>
              <span className="text-[#E91E63] ml-1">Snap</span>
            </div>
          </Link>
          <Link href="/snap">
            <button className="text-sm font-bold text-[#E91E63] hover:bg-pink-50 px-4 py-2 rounded-full transition-colors">
              기록하기
            </button>
          </Link>
        </div>
      </header>

      {/* 1. 히어로 섹션: 다시 가운데 정렬로 수정 */}
      <section className="max-w-4xl mx-auto px-6 pt-40 pb-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 bg-slate-50 rounded-full text-[#E91E63] text-xs font-bold tracking-widest uppercase">
          Emotional Archive Project
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] break-keep">
          기록은 당신의 <span className="text-[#E91E63]">순간</span>을<br />
          선명한 기억으로 인화합니다.
        </h1>
        <p className="text-xl md:text-2xl text-slate-500 font-medium mb-12 break-keep max-w-2xl mx-auto leading-relaxed">
          복잡한 일기 대신, 지금 느껴지는 감정의 조각을 기록해 보세요. <br />
          <span className="font-bold text-[#0F172A]">Feeling</span>
          <span className="font-bold text-[#E91E63] ml-1">Snap</span>은 당신의 마음을 아카이빙하는 가장 쉬운 방법입니다.
        </p>
        <Link href="/snap">
          <button className="bg-[#1A1F2C] text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300">
            지금 기록 시작하기 📷
          </button>
        </Link>
      </section>

      {/* 2. 애드센스 승인용 롱폼 에세이 */}
      <article className="max-w-3xl mx-auto px-6 py-24 border-y border-slate-50">
        <h2 className="text-3xl font-black mb-12 text-slate-800 tracking-tight leading-snug break-keep text-center">
          디지털 시대, 우리가 휘발되는 감정을 다시 '기록'해야 하는 이유
        </h2>
        
        <div className="prose prose-slate max-w-none leading-[1.8] text-slate-600 space-y-10 text-lg">
          <p>
            우리는 하루에도 수만 가지의 생각을 하며 수많은 감정의 파도를 경험합니다. 하지만 바쁜 현대 사회의 속도는 우리로 하여금 그 감정들이 어디서 왔는지, 
            어떤 형태를 띠고 있는지 깊이 들여다볼 여유를 허락하지 않습니다. <strong>Feeling Snap</strong>은 이러한 
            감정의 파편들을 스쳐 지나가게 두지 않고, 그 찰나의 순간을 기록으로 남김으로써 스스로를 치유하고 성장시키는 도구입니다.
          </p>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800 border-l-4 border-[#E91E63] pl-4">1. 감정 명명하기: 마음의 소음을 잠재우는 첫걸음</h3>
            <p>
              심리학적 연구에 따르면, 자신의 감정을 단어로 명명하는 행위(Affect Labeling)만으로도 뇌의 편도체 활성도가 
              낮아지며 정서적 안정을 찾는 데 큰 도움을 준다고 합니다. 일기를 길게 쓸 필요는 없습니다. 단지 오늘 내 마음이 
              '기쁨'인지, 혹은 '약간의 불안'을 담고 있는지 인지하고 이름을 붙여주는 것만으로도 우리 뇌는 그 감정을 '통제 가능한 범위' 안에 두기 시작합니다.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800 border-l-4 border-[#E91E63] pl-4">2. 기록은 분석이 아닌 따뜻한 관찰입니다</h3>
            <p>
              많은 사람이 기록을 완벽해야 하는 숙제처럼 여깁니다. 하지만 우리가 지향하는 가치는 완벽한 문장이 아닙니다. 
              마치 카메라 셔터를 누르듯 가볍게, 하지만 진실하게 나의 상태를 남기는 것입니다. 무채색이었던 하루가 기록을 통해 
              각기 다른 채도를 가진 풍경화로 변하는 경험을 해보세요. 기록이 쌓이면 비로소 나만의 '감정 지도'가 보이기 시작합니다.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800 border-l-4 border-[#E91E63] pl-4">3. 디지털 정서적 회복탄력성 키우기</h3>
            <p>
              스마트폰을 통해 타인의 화려한 삶을 끊임없이 관찰하는 시대에, 우리는 오히려 자신의 평범한 삶과 멀어지기 쉽습니다. 
              Feeling Snap은 외부의 소음을 차단하고 오직 당신만의 고유한 아카이브 공간을 지향합니다. 
              부정적인 감정이 찾아왔을 때 이를 회피하지 않고 기록으로 남기는 행위는 심리적 회복탄력성을 키우는 훌륭한 훈련이 됩니다.
            </p>
          </div>
          
          <p className="bg-slate-50 p-8 rounded-3xl italic text-slate-500 text-center border-t border-b border-slate-100">
            "기록은 삶의 조각들을 연결하여 의미 있는 이야기로 만드는 마법입니다. 오늘 당신의 마음은 어떤 빛깔인가요?"
          </p>
        </div>
      </article>

      {/* 3. 내부 링크 섹션 */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight mb-4">더 깊은 기록을 위한 가이드</h2>
          <p className="text-slate-400 font-medium">감정의 기록이 일상이 되는 콘텐츠 허브</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="group p-10 bg-slate-50 rounded-[48px] hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-slate-100">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#E91E63] transition-colors mx-auto">
              <BookOpen className="text-[#E91E63] group-hover:text-white" />
            </div>
            <h4 className="text-2xl font-bold mb-4 text-slate-800 text-center">감정 아카이브 가이드</h4>
            <p className="text-slate-500 leading-relaxed mb-8 text-center">
              지금까지 쌓인 기록들을 어떻게 읽어야 할까요? 단순한 데이터 나열을 넘어, 당신의 삶의 패턴을 발견하는 분석 가이드를 제공합니다.
            </p>
            <div className="text-center">
              <Link href="/articles" className="inline-flex items-center gap-2 font-bold text-[#E91E63] hover:underline">
                전체 아카이브 목록 보기 <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="group p-10 bg-slate-50 rounded-[48px] hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-slate-100">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#E91E63] transition-colors mx-auto">
              <Heart className="text-[#E91E63] group-hover:text-white" />
            </div>
            <h4 className="text-2xl font-bold mb-4 text-slate-800 text-center">마음의 온도 유지하기</h4>
            <p className="text-slate-500 leading-relaxed mb-8 text-center">
              감정의 기복 속에서도 나를 잃지 않는 법. 기록이 어떻게 심리적 방열판 역할을 하는지, 그 과학적인 원리와 실천법을 알아봅니다.
            </p>
            <div className="text-center">
              <Link href="/articles/mindset" className="inline-flex items-center gap-2 font-bold text-[#E91E63] hover:underline">
                전용 칼럼 읽기 <Sparkles size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* 4. 신뢰도 보강 섹션 */}
      <section className="bg-slate-900 py-24 text-white rounded-t-[60px] md:rounded-t-[100px]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShieldCheck className="mx-auto mb-6 text-[#E91E63]" size={48} />
          <h2 className="text-3xl font-bold mb-6">개인정보와 보안</h2>
          <p className="text-slate-400 leading-relaxed mb-10 break-keep">
            Feeling Snap은 사용자의 감정 데이터를 소중히 다룹니다. 
            모든 기록은 익명으로 처리되거나 로컬 보안 환경에서 관리되며, 
            당신의 마음을 안전하게 보관하는 것이 우리의 첫 번째 원칙입니다.
          </p>
        </div>
      </section>
    </div>
  );
}