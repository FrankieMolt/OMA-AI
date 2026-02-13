import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : 'https://lethometry.vercel.app')

  const routes = [
    '',
    '/clock',
    '/memory',
    '/experiments',
    '/philosophy',
    '/bio',
    '/about',
    '/privacy',
    '/data',
    '/guidelines'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
