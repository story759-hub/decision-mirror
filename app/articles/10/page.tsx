import React from 'react';
import Link from 'next/link';

export default function ArticleTen() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            인간관계 다이어트: <br/>나를 갉아먹는 관계를 정리해야 하는 심리학적 근거
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 인간관계 및 심리 건강</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            우리는 모든 사람과 잘 지내야 한다는 강박에 시달리곤 합니다. 하지만 인류학자 로빈 던바(Robin Dunbar)가 주장한 '던바의 수'에 따르면, 인간이 안정적으로 유지할 수 있는 관계는 약 150명에 불과하며, 깊은 정서적 교감을 나눌 수 있는 핵심 인원은 5명 내외입니다. 무분별한 인맥 확장은 오히려 에너지를 고갈시키고 진정한 관계의 질을 떨어뜨립니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 에너지 뱀파이어와 거리두기</h2>
          <p>
             심리학에서는 만남 뒤에 유독 진이 빠지는 사람을 '에너지 뱀파이어'라고 부르기도 합니다. 이들은 끊임없이 부정적인 감정을 쏟아내거나 상대를 통제하려 함으로써 타인의 정서적 자원을 소모시킵니다. 이런 관계를 방치하는 것은 단순한 피로를 넘어 당신의 자존감과 의사결정력에도 부정적인 영향을 미칩니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 관계의 양보다 '밀도'에 집중할 때</h2>
          <p>
            성공적인 삶은 얼마나 많은 사람을 아느냐가 아니라, 얼마나 건강한 관계망 속에 있느냐에 달려 있습니다. 관계를 정리하는 것은 상대에 대한 비난이 아닙니다. 오히려 나를 지키고, 정말 소중한 사람들에게 더 많은 시간을 할애하기 위한 **'선택과 집중'**의 과정입니다.
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>정서적 안전성:</strong> 내가 약점을 보였을 때 이를 이용하지 않는 사람인가?</li>
            <li><strong>상호 호혜성:</strong> 한쪽의 일방적인 희생이나 배려만으로 유지되는 관계는 아닌가?</li>
            <li><strong>가치관의 조화:</strong> 만남 이후에 내가 더 나은 사람이 되고 싶다는 동기를 부여받는가?</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. 죄책감 없는 거절 연습</h2>
          <p>
            인간관계 다이어트의 가장 큰 장벽은 '죄책감'입니다. 하지만 모든 요청에 '예'라고 답하는 것은 결국 나 자신에 대해 '아니오'라고 말하는 것과 같습니다. 건강한 관계는 명확한 경계(Boundary) 위에서 세워집니다. 경계를 설정하는 것은 이기적인 것이 아니라 지속 가능한 소통을 위한 최소한의 안전장치입니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "당신은 당신이 가장 많은 시간을 함께 보내는 다섯 사람의 평균입니다. 당신의 곁에 누구를 둘지 결정하는 것이 곧 당신의 미래를 결정하는 일입니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: 관계의 지도를 다시 그리십시오</h2>
          <p>
            머릿속이 복잡하고 무기력하다면, 현재 당신을 둘러싼 관계망을 점검해 볼 시점입니다. 불필요한 소음을 차단하고 본질적인 관계에 집중할 때, 당신의 정신적 에너지는 비로소 성장을 위해 사용될 수 있습니다.
          </p>
          <p className="font-bold text-white">
            Clarity Room은 당신이 맺고 있는 사회적 상호작용의 심리적 무게를 객관적으로 직시하도록 돕습니다. 현재 당신을 괴롭히는 관계의 갈등을 텍스트로 풀어내고, 그것이 당신의 인지 구조에서 차지하는 비중을 확인해 보세요.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              관계의 복잡도 정리하기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}