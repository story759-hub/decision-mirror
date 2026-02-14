import { Metadata } from 'next';

// ✅ 이 파일이 `/snap` 경로로 들어오는 모든 요청에 대해 검색 엔진을 차단합니다.
export const metadata: Metadata = {
  title: 'Feeling Snap - 기록 중',
  robots: {
    index: false, // 검색 노출 안 함
    follow: false, // 링크 따라가지 않음
  },
};

export default function SnapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}