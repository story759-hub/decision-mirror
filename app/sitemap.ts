import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://feeling-snap.vercel.app'
  const currentDate = new Date()

  // 아티클 ID 리스트
  const articleIds = [
    "things-seen-when-stopped", "comfort-in-monochrome-emotions", "shaking-called-anxiety",
    "capturing-fleeting-joy", "darkroom-of-sadness", "red-noise-anger",
    "psychology-of-feeling-behind", "filter-of-perfectionism", "mind-shutter-speed",
    "developing-negative-emotions", "when-records-rule-memories", "composition-of-relationships",
    "burnout-overexposure", "snap-of-self-compassion", "portfolio-of-my-life",
    "guide-for-emotional-archivers", "beyond-the-lens", "color-of-mind",
    "analog-resilience", "final-shutter"
  ]

  // 1. 기본 페이지 구성 (as const를 붙여 타입을 고정)
  const basePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: '2026-02-15', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/snap`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/login`, lastModified: '2026-02-15', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: '2026-02-15', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: '2026-02-15', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: '2026-02-15', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/articles/mindset`, lastModified: '2026-02-15', changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/articles/saved`, lastModified: '2026-02-15', changeFrequency: 'weekly' as const, priority: 0.7 },
  ]

  // 2. 아티클 페이지 구성
  const articlePages: MetadataRoute.Sitemap = articleIds.map((id) => ({
    url: `${baseUrl}/articles/${id}`,
    lastModified: '2026-02-15',
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...basePages, ...articlePages]
}