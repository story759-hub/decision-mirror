import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
      {/* head 태그를 명시하지 않아도 Script 컴포넌트가 알아서 처리합니다 */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6062349022770025"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}