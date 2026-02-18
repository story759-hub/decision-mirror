import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://feeling-snap.vercel.app'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`, // 개인정보 처리방침이 있다면
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    // 추가한 경로가 있다면 여기에 계속 추가하세요.
  ]
}