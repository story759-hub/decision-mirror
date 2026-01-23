export default function PrivacyPolicy() {
  const lastUpdated = "2026. 01. 23"; // 오늘 날짜로 수정 가능

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans py-20 px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        <header className="space-y-2 border-b border-slate-100 pb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">개인정보 처리방침</h1>
          <p className="text-sm text-slate-400 font-medium">시행일자: {lastUpdated}</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">1. 수집하는 개인정보 항목</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            &apos;필링스냅&apos;은 사용자의 별도 회원가입 없이 이용 가능한 서비스로, 원칙적으로 직접적인 개인 식별 정보(이름, 연락처 등)를 수집하지 않습니다. 다만, 서비스 이용 과정에서 다음과 같은 정보가 자동 생성되어 수집될 수 있습니다.
          </p>
          <ul className="list-disc list-inside text-sm text-slate-600 ml-2 space-y-1">
            <li>IP 주소, 쿠키, 방문 일시, 서비스 이용 기록</li>
            <li>사용자가 입력한 감정 텍스트 (통계 및 분석용)</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">2. 개인정보의 수집 및 이용 목적</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            수집된 정보는 다음의 목적을 위해서만 활용됩니다.
          </p>
          <ul className="list-disc list-inside text-sm text-slate-600 ml-2 space-y-1">
            <li>감정 분석 결과(포토카드) 생성 및 제공</li>
            <li>전체 사용자 감정 통계 데이터 산출</li>
            <li>구글 애드센스 광고 게재 및 서비스 품질 개선</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">3. 제3자 제공 및 위탁</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            &apos;필링스냅&apos;은 사용자의 개인정보를 외부에 제공하지 않습니다. 다만, 구글(Google)에서 제공하는 광고 서비스(AdSense) 및 분석 도구 등을 이용하는 과정에서 비식별화된 정보가 해당 업체에 제공될 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight text-pink-500 font-black">4. 구글 애드센스 광고 관련 안내</h2>
          <p className="text-sm leading-relaxed text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            본 웹사이트는 구글(Google)이 제공하는 웹 분석 및 광고 서비스인 구글 애드센스를 사용합니다. 구글은 사용자의 방문 기록을 바탕으로 맞춤형 광고를 제공하기 위해 쿠키(Cookie)를 사용하며, 사용자는 브라우저 설정을 통해 쿠키 수집을 거부할 수 있습니다.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">5. 개인정보의 보유 및 파기</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            수집된 비식별 정보는 서비스 운영 목적이 달성된 후 지체 없이 파기하는 것을 원칙으로 합니다.
          </p>
        </section>

        <footer className="pt-10 border-t border-slate-100 text-[11px] text-slate-400">
          <p>© 2026 Feeling Snap. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}