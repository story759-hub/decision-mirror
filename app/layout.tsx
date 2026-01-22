import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

// [수정된 부분] verification 항목을 추가했습니다.
export const metadata: Metadata = {
  title: "Clarity Room",
  description: "Cognitive Depth Organizer",
  verification: {
    google: "X8nk5HbNdU0hqqDg6AGr2q9Mzu2yOfyMkZxKO8ppdfU",
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
        {/* 애드센스 스크립트 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062349022770025"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#0F172A]`}>
        {/* 메인 콘텐츠 영역 */}
        <div className="flex-grow">
          {children}
        </div>

        {/* 애드센스 승인을 위한 필수 푸터 영역 */}
        <footer className="w-full max-w-lg mx-auto py-12 px-6 text-center border-t border-slate-800/50">
          <div className="flex justify-center space-x-6 mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <Link href="/privacy" className="hover:text-[#5D5FEF] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/articles" className="hover:text-[#5D5FEF] transition-colors">
              Insights
            </Link>
          </div>
          <p className="text-[9px] text-slate-600 font-medium tracking-widest uppercase">
            © 2026 Clarity Room. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}