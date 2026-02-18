import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://feeling-snap.vercel.app'
  const currentDate = new Date().toISOString().split('T')[0] // 오늘 날짜

  // 아티클 데이터 정의
  const articleIds = [
    "things-seen-when-stopped", "comfort-in-monochrome-emotions", "shaking-called-anxiety",
    "capturing-fleeting-joy", "darkroom-of-sadness", "red-noise-anger",
    "psychology-of-feeling-behind", "filter-of-perfectionism", "mind-shutter-speed",
    "developing-negative-emotions", "when-records-rule-memories", "composition-of-relationships",
    "burnout-overexposure", "snap-of-self-compassion", "portfolio-of-my-life",
    "guide-for-emotional-archivers", "beyond-the-lens", "color-of-mind",
    "analog-resilience", "final-shutter"
  ]

  // 1. 기본 페이지 구성
  const basePages = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: '2026-01-11', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/snap`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/login`, lastModified: '2026-01-12', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: '2026-01-15', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: '2026-01-22', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: '2026-01-23', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/articles/mindset`, lastModified: '2026-01-17', changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/articles/saved`, lastModified: '2026-02-19', changeFrequency: 'weekly', priority: 0.7 },
  ]

  // 2. 아티클 페이지 구성 (자동 생성)
  const articlePages = articleIds.map((id) => ({
    url: `${baseUrl}/articles/${id}`,
    lastModified: '2026-02-15', // 요청하신 임의 날짜
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...basePages, ...articlePages]
}