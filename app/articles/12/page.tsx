import React from 'react';
import Link from 'next/link';

export default function ArticleTwelve() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            의사결정에도 골든타임이 있다: <br/>생체 리듬에 따른 최적의 판단 시간
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 시간 생물학 및 성과 심리학</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            중요한 계약이나 인생의 갈림길에서 내리는 결정, 혹시 '언제' 내리는지가 결과에 영향을 미친다는 사실을 알고 계셨나요? 심리학자와 생물학자들의 연구에 따르면, 우리의 인지 능력은 하루 24시간 동안 일정한 패턴을 그리며 오르내립니다. 이를 무시하고 결정을 내리는 것은 마치 안개가 자욱한 날 고속도로를 달리는 것과 같습니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 크로노타입(Chronotype): 사자형 vs 올빼미형</h2>
          <p>
            사람마다 에너지가 정점에 도달하는 시간은 다릅니다. 이를 '크로노타입'이라고 합니다. 
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>아침형(사자형):</strong> 기상 직후부터 정오까지 논리적 사고와 분석 능력이 최고조에 달합니다. 중대한 비즈니스 결정은 오전에 하는 것이 유리합니다.</li>
            <li><strong>저녁형(올빼미형):</strong> 오전에는 인지 효율이 낮으나, 오후 늦게나 밤이 될수록 창의성과 문제 해결 능력이 활성화됩니다.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 오전의 '분석' vs 오후의 '창의'</h2>
          <p>
            일반적으로 인간의 뇌는 잠에서 깨어난 지 몇 시간 후 가장 높은 '기민함'을 유지합니다. 이때는 논리적인 허점을 찾아내거나 숫자를 다루는 업무에 적합합니다. 반대로 오후 2~4시 사이에는 인지적 에너지가 일시적으로 하락하는 '오후 슬럼프'가 찾아옵니다. 흥미롭게도 이 시기에는 뇌의 억제력이 약해져 오히려 고정관념에서 벗어난 창의적인 아이디어가 더 잘 나오기도 합니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. 밤늦은 시간의 결정이 위험한 이유</h2>
          <p>
            밤이 깊어질수록 전두엽의 기능은 퇴화하고 감정을 담당하는 편도체의 목소리가 커집니다. 밤에 쓴 편지가 다음 날 아침 오글거리는 이유가 바로 이것입니다. '결정 피로'가 극에 달한 밤에는 복잡한 인생의 결정을 내리기보다, 잠을 통해 뇌를 청소(Glymphatic system)하고 다음 날 아침의 명료함을 기다리는 것이 현명합니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "최악의 결정은 가장 지쳤을 때 내려지고, 최선의 결정은 가장 맑을 때 내려집니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: 시간의 흐름을 타는 지혜</h2>
          <p>
            자신의 생체 시계가 언제 가장 날카로운지 파악하십시오. 에너지가 부족한 시간에 억지로 답을 찾으려 고군분투하는 것은 효율을 떨어뜨릴 뿐입니다. 때로는 시간을 기다리는 것 자체가 훌륭한 전략이 됩니다.
          </p>
          <p className="font-bold text-white">
            Clarity Room은 당신의 인지적 밀도를 분석하여 지금이 판단을 내리기에 적절한 상태인지 시각적으로 보여줍니다. 뇌가 보내는 신호를 무시하지 마세요. 가장 명료한 순간에 가장 최선의 결정을 내릴 수 있도록 Clarity Room이 돕겠습니다.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              지금 내 판단력 점수 확인하기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}