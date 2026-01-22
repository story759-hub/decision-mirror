import React from 'react';
import Link from 'next/link';

export default function ArticleEleven() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans leading-relaxed">
      <article className="max-w-2xl mx-auto px-6 py-20">
        <Link href="/articles" className="text-[#5D5FEF] font-bold mb-8 inline-block hover:underline">
          ← Insights 목록으로 돌아가기
        </Link>
        
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-4 leading-tight">
            디지털 디톡스: <br/>과잉 정보 시대, 뇌에 휴식을 주는 전략
          </h1>
          <p className="text-slate-500 font-medium">작성일: 2026. 01. 22 • 카테고리: 뇌과학 및 생산성</p>
        </header>

        <section className="space-y-6 text-lg">
          <p>
            우리는 깨어 있는 시간 내내 끊임없는 알림과 정보의 홍수 속에 살고 있습니다. 스마트폰은 우리에게 편리함을 주었지만, 동시에 '팝콘 브레인(Popcorn Brain)' 현상을 야기했습니다. 팝콘 브레인이란 현실의 느리고 잔잔한 자극에는 반응하지 않고, 디지털 매체의 빠르고 강렬한 자극에만 뇌가 반응하게 되는 현상을 말합니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. 도파민 루프와 주의력 결핍</h2>
          <p>
            SNS의 '좋아요'나 끊임없이 올라오는 숏폼 영상은 뇌의 보상 회로를 자극하여 도파민을 분출합니다. 이러한 자극에 길들여진 뇌는 깊은 사고(Deep Work)를 할 수 있는 능력을 점차 상실합니다. 긴 글을 읽지 못하거나, 한 가지 문제에 10분 이상 집중하기 어려워졌다면 이미 뇌가 디지털 중독 상태에 빠졌을 가능성이 높습니다.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. 의사결정력을 갉아먹는 정보 과부하</h2>
          <p>
            뇌가 처리할 수 있는 정보량에는 한계가 있습니다. 불필요한 뉴스와 정보가 뇌를 가득 채우면, 정작 중요한 순간에 올바른 판단을 내릴 '인지적 자원'이 부족해집니다. 디지털 디톡스는 단순히 스마트폰을 멀리하는 것이 아니라, 내 삶의 주도권을 되찾고 **'생각의 공간'**을 확보하는 행위입니다.
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>침실 스마트폰 금지:</strong> 수면의 질은 다음 날의 의사결정력을 결정합니다.</li>
            <li><strong>알림 오프(Off):</strong> 수동적으로 반응하는 뇌에서 능동적으로 선택하는 뇌로 전환하세요.</li>
            <li><strong>아날로그 시간 확보:</strong> 하루 30분은 기기 없이 걷거나 명상하며 뇌의 '디폴트 모드 네트워크(Default Mode Network)'를 활성화하세요.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. 명료함은 고요함 속에서 나옵니다</h2>
          <p>
            복잡한 문제를 해결하는 통찰력은 끊임없는 정보 입력이 아니라, 입력을 멈추고 정보를 정리하는 과정에서 발생합니다. 뇌에게 멍하게 있을 시간, 즉 '사유의 여백'을 주어야 정보들이 서로 연결되어 지혜로 변합니다.
          </p>

          <div className="bg-slate-900 border-l-4 border-[#5D5FEF] p-6 my-10">
            <p className="italic">
              "진정한 지능은 무엇을 저장하느냐가 아니라, 무엇을 필터링하느냐에 달려 있습니다."
            </p>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">결론: 입력보다 정리가 중요한 시대</h2>
          <p>
            매일 쏟아지는 자극적인 소음에서 벗어나 잠시 침묵해 보십시오. 디지털 디톡스를 통해 맑아진 정신은 당신이 그동안 보지 못했던 문제의 본질을 꿰뚫어 보게 해 줄 것입니다.
          </p>
          <p className="font-bold text-white">
            Clarity Room은 디지털 소음으로 가득 찬 당신의 머릿속을 정화하는 도구입니다. 외부의 자극이 아닌, 당신 내면의 목소리를 텍스트로 기록하고 구조화해 보세요. 정보의 양이 아닌 생각의 깊이가 당신의 삶을 바꿉니다.
          </p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link href="/">
            <button className="bg-[#5D5FEF] text-white px-8 py-4 rounded-2xl font-black hover:scale-105 transition-transform">
              뇌의 여백 만들기 시작하기 🚀
            </button>
          </Link>
        </footer>
      </article>
    </div>
  );
}