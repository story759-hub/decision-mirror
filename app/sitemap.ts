import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://decision-mirror.vercel.app/'; // 본인의 실제 도메인으로 변경하세요.

  // 1. 기본 페이지 리스트
  const routes = [
    '',
    '/privacy',
    '/articles',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0, // 메인 페이지와 주요 경로는 높은 우선순위
  }));

  // 2. 작성한 15개의 아티클 경로 자동 생성
  // [사실 확인] 1~15번까지의 아티클이 /articles/[id] 구조로 있다고 가정합니다.
  const articleRoutes = Array.from({ length: 15 }, (_, i) => ({
    url: `${baseUrl}/articles/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8, // 아티클은 중간 우선순위
  }));

  return [...routes, ...articleRoutes];
}