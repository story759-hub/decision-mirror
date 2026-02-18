import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://feeling-snap.vercel.app'
  const currentDate = new Date()

  // 1. 아티클 ID 리스트 (순서대로)
  const articleIds = [
    "things-seen-when-stopped", "comfort-in-monochrome-emotions", "shaking-called-anxiety",
    "capturing-fleeting-joy", "darkroom-of-sadness", "red-noise-anger",
    "psychology-of-feeling-behind", "filter-of-perfectionism", "mind-shutter-speed",
    "developing-negative-emotions", "when-records-rule-memories", "composition-of-relationships",
    "burnout-overexposure", "snap-of-self-compassion", "portfolio-of-my-life",
    "guide-for-emotional-archivers", "beyond-the-lens", "color-of-mind",
    "analog-resilience", "final-shutter"
  ]

  // 2. 1월 1일부터 2월 18일 사이의 날짜를 순서대로 생성하는 함수
  // 1월 1일(day 1) ~ 2월 18일(day 49) 사이에서 20개를 균등하게 혹은 랜덤하게 추출하여 정렬
  const generateSortedDates = (count: number) => {
    const start = new Date('2026-01-01').getTime()
    const end = new Date('2026-02-18').getTime()
    
    // 간격을 두고 날짜 생성 (랜덤성 부여를 위해 약간의 변수 추가)
    return Array.from({ length: count }, (_, i) => {
      const progress = i / (count - 1)
      const dateTimestamp = start + (end - start) * progress
      return new Date(dateTimestamp).toISOString().split('T')[0]
    })
  }

  const sortedDates = generateSortedDates(articleIds.length)

  // 3. 기본 페이지 구성
  const basePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: '2026-02-18', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/snap`, lastModified: currentDate, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/login`, lastModified: '2026-02-18', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: '2026-02-18', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: '2026-02-18', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: '2026-02-18', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/articles/mindset`, lastModified: '2026-02-18', changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/articles/saved`, lastModified: '2026-02-18', changeFrequency: 'weekly' as const, priority: 0.7 },
  ]

  // 4. 아티클 페이지 구성 (ID 순서대로 날짜 배정)
  const articlePages: MetadataRoute.Sitemap = articleIds.map((id, index) => ({
    url: `${baseUrl}/articles/${id}`,
    lastModified: sortedDates[index], // 앞번호일수록 1월 1일에 가까운 날짜
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...basePages, ...articlePages]
}