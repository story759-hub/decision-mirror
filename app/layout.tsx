import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle"; // 테마 전환 버튼 추가

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "필링스냅 (Feeling Snap) | 당신의 감정을 스냅하세요",
  description: "복잡한 마음을 한 장의 포토카드로. 필링스냅에서 오늘의 감정을 기록하고 사람들과 공유해보세요.",
  verification: {
    google: "X8nk5HbNdU0hqqDg6AGr2q9Mzu2yOfyMkZxKO8ppdfU",
  },
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
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 애드센스 자동 광고 스크립트 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062349022770025"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      {/* body에 배경색을 직접 넣기보다 ThemeProvider 안에서 처리되도록 합니다. */}
      <body className={`${inter.className} min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // 다크 모드 기본
          enableSystem={false}
        >
          {/* 테마 전환 버튼 (오른쪽 상단 고정) */}
          <ModeToggle />

          {/* 메인 콘텐츠 영역 */}
          <main className="flex-grow">
            {children}
          </main>

          {/* 필링스냅 브랜드 푸터 영역 */}
          <footer className="w-full max-w-md mx-auto py-16 px-6 text-center border-t border-slate-100 dark:border-slate-800">
            <div className="mb-6">
              <h2 className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tighter">
                Feeling <span className="text-pink-500">Snap</span>
              </h2>
            </div>
            
            <div className="flex justify-center space-x-6 mb-6 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
              <Link href="/about" className="hover:text-pink-500 transition-colors">
                about us
              </Link>
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
            
            <p className="text-[10px] text-slate-300 dark:text-slate-600 font-medium tracking-widest uppercase">
              © 2026 Feeling Snap. All rights reserved.
            </p>
            <p className="mt-2 text-[9px] text-slate-200 dark:text-slate-700">
              당신의 모든 스냅은 인지적 공감을 위해 분석됩니다.
            </p>
          </footer>
          
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}