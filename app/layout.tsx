import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // Next.js 스크립트 컴포넌트 임포트

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clarity Room",
  description: "Cognitive Depth Organizer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 구글 애드센스 소유권 확인 스크립트 */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062349022770025"
          crossOrigin="anonymous"
          strategy="afterInteractive" // 페이지 상호작용 후 로드하여 성능 최적화
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}