import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 1. 서비스명 및 설명 업데이트
  title: "필링스냅 (Feeling Snap) | 당신의 감정을 스냅하세요",
  description: "복잡한 마음을 한 장의 포토카드로. 필링스냅에서 오늘의 감정을 기록하고 사람들과 공유해보세요.",
  
  // 2. 서치콘솔 인증 유지
  verification: {
    google: "X8nk5HbNdU0hqqDg6AGr2q9Mzu2yOfyMkZxKO8ppdfU",
  },
  
  // 3. 애드센스 계정 확인용 메타태그 유지
  other: {
    "google-adsense-account": "ca-pub-6062349022770025",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 애드센스 자동 광고 스크립트 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062349022770025"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      {/* 배경색을 기존 어두운 남색(#0F172A)에서 더 부드럽고 밝은 톤(#F8FAFC)으로 변경 가능성 고려 */}
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#F8FAFC]`}>
        
        {/* 메인 콘텐츠 영역 */}
        <div className="flex-grow">
          {children}
        </div>

        {/* 필링스냅 브랜드 푸터 영역 */}
        <footer className="w-full max-w-md mx-auto py-16 px-6 text-center border-t border-slate-100">
          <div className="mb-6">
            <h2 className="text-sm font-black text-slate-800 tracking-tighter">
              Feeling <span className="text-pink-500">Snap</span>
            </h2>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
            <Link href="/privacy" className="hover:text-pink-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-pink-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </div>
          
          <p className="text-[10px] text-slate-300 font-medium tracking-widest uppercase">
            © 2026 Feeling Snap. All rights reserved.
          </p>
          <p className="mt-2 text-[9px] text-slate-200">
            당신의 모든 스냅은 인지적 공감을 위해 분석됩니다.
          </p>
        </footer>
      </body>
    </html>
  );
}