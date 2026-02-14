import Link from 'next/link';
import { ArrowLeft, Thermometer, Brain, HeartHandshake, Sparkles, Lightbulb, Compass } from 'lucide-react';
export default function MindsetArticle() {
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      {/* 1. 상단 네비게이션 */}
      <nav className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-[#E91E63] transition-colors font-medium group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>홈으로 돌아가기</span>
        </Link>
      </nav>

      {/* 2. 아티클 헤더 */}
      <header className="max-w-3xl mx-auto px-6 mb-12">
        <div className="inline-block px-3 py-1 mb-4 bg-pink-50 text-[#E91E63] text-xs font-bold rounded-md uppercase tracking-wider">
          Psychology & Mental Health
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-8 leading-[1.15] break-keep">
          마음의 온도를 지키는 기술: <br />
          왜 기록이 최고의 심리적 방열판인가
        </h1>
        <div className="flex items-center gap-4 text-slate-400 text-sm border-b border-slate-100 pb-8">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <Compass size={20} className="text-slate-400" />
          </div>
          <div>
            <p className="font-bold text-slate-600">Feeling Snap Editor</p>
            <p>2026. 02. 15 • 8 min read</p>
          </div>
        </div>
      </header>

      {/* 3. 메인 비주얼 요소 */}
      <section className="max-w-3xl mx-auto px-6 mb-16">
        <div className="w-full h-64 bg-gradient-to-br from-[#1A1F2C] to-[#2D3446] rounded-[40px] flex flex-col items-center justify-center text-white p-8 text-center shadow-xl">
          <Thermometer size={56} className="mb-4 text-[#E91E63] animate-pulse" />
          <p className="text-2xl font-black tracking-tight mb-2">당신의 감정은 지금 몇 도인가요?</p>
          <p className="text-slate-400 text-sm">마음의 평온을 찾는 기록의 과학</p>
        </div>
      </section>

      {/* 4. 아티클 본문 (1,200자 이상 확보) */}
      <article className="max-w-3xl mx-auto px-6 text-[18px] leading-[1.8] text-slate-600 space-y-10 break-keep">
        
        <p>
          우리는 기온이 영하로 떨어지면 두꺼운 코트를 꺼내 입고, 영상 30도가 넘어가면 에어컨을 켭니다. 
          신체의 항상성을 유지하기 위해 외부 환경에 기민하게 반응하는 것입니다. 하지만 우리 내면의 
          <strong> '감정 온도'</strong>에 대해서는 얼마나 민감하게 반응하고 있나요? 심리학적 관점에서 볼 때, 
          인간의 정서에도 건강을 유지하기 위한 '적정 온도'가 존재합니다. 너무 뜨거운 분노는 주변 사람과 
          나 자신을 태워버리고, 너무 차가운 무력감은 삶의 동력을 얼려버립니다.
        </p>

        <p>
          현대인들이 겪는 대부분의 심리적 고통은 이 온도가 조절되지 않아 발생하는 '정서적 과열' 혹은 
          '정서적 저체온증'에서 기인합니다. <strong>Feeling Snap</strong>은 바로 이 감정의 온도를 실시간으로 
          체크하고 조절할 수 있도록 돕는 디지털 온도계이자, 동시에 과도한 열기를 식혀주는 방열판의 역할을 합니다.
        </p>

        <div className="space-y-4">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Brain className="text-[#E91E63]" size={28} />
            1. 감정 명명하기(Affect Labeling)의 과학적 원리
          </h3>
          <p>
            많은 사람이 "그냥 기분을 글로 적는다고 뭐가 달라질까?"라고 의구심을 갖습니다. 하지만 여기에는 
            명확한 뇌과학적 근거가 있습니다. 우리가 극심한 스트레스나 분노를 느낄 때, 뇌의 '편도체(Amygdala)'는 
            비상벨을 울리며 과열되기 시작합니다. 이때 감정의 정체를 파악하지 못하면 뇌는 계속해서 비상 상태를 유지하며 
            우리 몸에 스트레스 호르몬을 내뿜습니다.
          </p>
          <p>
            그러나 우리가 "나는 지금 무시당했다는 느낌 때문에 화가 난다"라고 감정을 구체적인 단어로 정의(Labeling)하는 순간, 
            놀라운 일이 일어납니다. 뇌의 고위 사고를 담당하는 <strong>'전두엽(Prefrontal Cortex)'</strong>이 활성화되면서 
            편도체의 과잉 반응을 억제하기 시작합니다. 즉, 감정을 문자로 기록하는 행위 자체가 뜨거워진 뇌를 식히는 
            냉각수를 주입하는 것과 같습니다. 기록은 주관적인 폭풍 속에 있던 나를 객관적인 관찰자의 위치로 옮겨 놓습니다.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Sparkles className="text-[#E91E63]" size={28} />
            2. 완벽한 문장보다 중요한 '관찰의 지속성'
          </h3>
          <p>
            애드센스 승인을 준비하거나 개인 기록을 남길 때 흔히 하는 실수가 '완벽한 글쓰기'에 집착하는 것입니다. 
            하지만 감정 기록의 본질은 문학적 성취에 있지 않습니다. 오히려 기상청이 매일의 날씨를 기록하듯, 
            내 마음의 날씨를 데이터화하는 <strong>'성실한 관찰'</strong>에 있습니다.
          </p>
          <p>
            감정 기록이 아카이브로 쌓이게 되면, 우리는 비로소 자신의 '정서적 패턴'을 발견하게 됩니다. 
            예를 들어, "나는 매주 목요일 오후가 되면 유독 마음의 온도가 차가워지는구나"라거나 
            "특정한 사람과의 대화 이후에는 항상 감정이 과열되는구나"라는 사실을 깨닫게 됩니다. 
            원인을 알면 대책을 세울 수 있습니다. 목요일 오후에는 따뜻한 차 한 잔을 마시는 루틴을 만들거나, 
            특정 상황을 미리 인지하여 심리적 방어선을 구축할 수 있게 됩니다. 이것이 바로 기록이 주는 '예측 가능한 평온함'입니다.
          </p>
        </div>

        <div className="bg-slate-50 p-8 md:p-12 rounded-[40px] border border-slate-100 my-12 relative overflow-hidden">
          <Lightbulb className="absolute -right-4 -top-4 text-pink-100" size={120} />
          <h4 className="text-xl font-black text-slate-800 mb-4 relative">심리학 팁: 감정의 시각화</h4>
          <p className="text-slate-600 relative">
            기록을 할 때 단순히 '슬프다'라고 하기보다 '영하 5도의 슬픔' 혹은 '80도의 분노'처럼 온도로 환산해 보세요. 
            추상적인 감정이 숫자로 변하는 순간, 우리 마음은 그것을 통제 가능한 대상으로 인식하기 시작합니다.
          </p>
        </div>

        <div className="space-y-4">
<h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
  <HeartHandshake className="text-[#E91E63]" size={28} />
  3. 부정적인 감정을 '승화'시키는 방법
</h3>          <p>
            우리는 흔히 기쁘고 행복한 순간만을 기록하고 싶어 합니다. 하지만 심리적 회복탄력성(Resilience)을 
            높이기 위해서는 부정적인 감정의 '온도'를 기록하는 것이 훨씬 중요합니다. 슬픔이나 불안을 외면하고 억누르면, 
            그 감정들은 마음 깊은 곳에서 곪아 터지기 마련입니다. 
          </p>
          <p>
            Feeling Snap을 통해 부정적인 감정을 포착하는 것은 그 감정을 내 삶의 일부로 인정하고 수용하는 과정입니다. 
            "지금 내 마음이 영하 10도구나. 춥지만 괜찮아, 곧 따뜻해질 거야"라고 인정하는 태도는 정서적 건강의 핵심입니다. 
            기록된 슬픔은 더 이상 나를 갉아먹는 괴물이 아니라, 내가 지나온 삶의 한 페이지이자 성장의 거름이 됩니다. 
            나중에 기록을 다시 돌아볼 때, "이토록 추운 겨울도 나는 잘 지나왔구나"라는 자기 효능감을 얻게 될 것입니다.
          </p>
        </div>

        <div className="pt-8 border-t border-slate-100">
          <h4 className="text-2xl font-black text-slate-800 mb-6">마치며: 당신의 기록은 삶의 북극성입니다</h4>
          <p className="mb-6">
            기록되지 않은 하루는 무채색의 기억으로 남지만, 기록된 하루는 고유한 색채와 온도를 지닌 역사가 됩니다. 
            오늘 당신이 남긴 짧은 문장 하나, 선택한 감정 아이콘 하나가 시간이 흘러 당신이 길을 잃었을 때 
            든든한 북극성이 되어줄 것입니다. 
          </p>
          <p>
            마음의 온도는 고정된 것이 아닙니다. 외부의 자극에 따라 끊임없이 변하는 것이 당연합니다. 
            중요한 것은 그 변화에 휘둘리는 것이 아니라, 변화하는 온도를 스스로 인지하고 조절할 줄 아는 
            '기록하는 자의 여유'를 갖는 것입니다. 지금 이 순간, 당신의 마음은 몇 도인가요? 
            작은 기록 하나로 당신만의 평온을 찾아보세요.
          </p>
        </div>

        {/* 5. 하단 CTA 섹션 */}
        <div className="mt-20 p-10 bg-[#1A1F2C] rounded-[48px] text-center text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#E91E63]" />
          <h4 className="text-2xl md:text-3xl font-black mb-4">지금 당신의 온도를 기록해보세요</h4>
          <p className="text-slate-400 mb-10 max-w-md mx-auto">
            찰나의 기록이 모여 당신의 단단한 내면이 됩니다. <br />
            오늘의 스냅을 남겨보세요.
          </p>
          <Link href="/snap">
            <button className="bg-[#E91E63] text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg shadow-pink-500/20">
              감정 스냅 기록하기 📷
            </button>
          </Link>
        </div>
      </article>

      {/* 6. 연관 아티클 추천 */}
      <section className="max-w-3xl mx-auto px-6 mt-20">
        <h5 className="font-bold text-slate-400 mb-6 uppercase tracking-widest text-xs">Read More</h5>
        <Link href="/articles">
          <div className="p-6 bg-slate-50 rounded-3xl flex justify-between items-center group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
            <span className="font-bold text-slate-700">전체 아티클 목록 확인하기</span>
            <ArrowLeft size={20} className="rotate-180 text-[#E91E63]" />
          </div>
        </Link>
      </section>
    </div>
  );
}