import React from 'react';
import Link from 'next/link';

export default function ArticleNine() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            이직 고민, 단순한 불만인가 성장의 신호인가? <br/>반드시 체크해야 할 3가지 리스트
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 커리어 전략 및 의사결정</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            직장인이라면 누구나 한 번쯤 품속에 사표를 담고 삽니다. 하지만 이직은 인생의 궤적을 바꾸는 중대한 결정입니다. 단순히 현재 직장이 싫어서 떠나는 '도피형 이직'은 다음 직장에서도 같은 문제를 반복하게 만들 뿐입니다. 성공적인 커리어 전환을 위해 반드시 자문해봐야 할 세 가지 기준을 정리했습니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 푸시 요인(Push)과 풀 요인(Pull)의 분석</h2>
          <p>
            이직 동기는 크게 두 가지로 나뉩니다. 현재 직장에서 나를 밀어내는 '푸시 요인'(낮은 연봉, 인간관계 스트레스)과 새로운 직장이 나를 당기는 '풀 요인'(새로운 기술 습득, 더 큰 권한)입니다. 
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>위험 신호:</strong> 동기가 오직 푸시 요인에만 쏠려 있다면, 그것은 결정이 아니라 '회피'일 가능성이 높습니다.</li>
            <li><strong>긍정 신호:</strong> 풀 요인이 명확할 때, 이직 후 만족도와 커리어 자산이 급격히 상승합니다.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 학습 곡선(Learning Curve)의 정체 여부</h2>
          <p>
            심리학자 미하이 칙센트미하이는 몰입(Flow)을 위해 도전 과제와 숙련도의 균형이 중요하다고 말했습니다. 만약 현재 업무가 너무 익숙해져서 더 이상 배울 것이 없다면, 당신의 '커리어 자본'은 감가상각되고 있는 중입니다. 안정적이지만 성장이 멈춘 상태라면, 그것은 이직을 진지하게 고려해야 할 가장 강력한 신호입니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. 환경을 바꿨을 때 해결될 문제인가?</h2>
          <p>
            인간관계나 조직 문화에 대한 불만으로 이직을 결심했다면 냉정해져야 합니다. 이 문제는 '이 회사'의 문제인가요, 아니면 '이 업계' 혹은 '나의 소통 방식'의 문제인가요? 환경을 바꿔도 따라올 문제라면, 이직은 해결책이 아닌 지연책이 될 뿐입니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "최선의 이직 타이밍은 가장 높이 평가받을 때 떠나는 것이지, 도저히 버틸 수 없을 때 떠나는 것이 아닙니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: 감정이 아닌 데이터로 결정하십시오</h2>
          <p>
            커리어 결정은 감정의 파도가 낮아졌을 때 내려야 합니다. 머릿속으로만 장단점을 비교하면 뇌는 확증 편향에 빠지기 쉽습니다. 현재의 유불리를 명확한 문장으로 기록하고 객관화하는 과정이 반드시 선행되어야 합니다.
          </p>
          <p className="font-bold text-white">
            Clarity Room은 당신의 커리어 혼란을 구조화해 드립니다. 이직을 고민하게 만드는 핵심 패턴이 무엇인지, 현재 당신의 판단 리스크는 어느 정도인지 AI 엔진을 통해 확인해 보세요. 정돈된 생각만이 후회 없는 다음 스텝을 보장합니다.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              커리어 결정 구조화하기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}