import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://oma-ai.com'

  const routes = [
    '',
    '/marketplace',
    '/ai/models',
    '/mcp/servers',
    '/dashboard',
    '/pricing',
    '/about',
    '/developers',
    '/docs',
    '/contact',
    '/tasks',
    '/how-it-works',
    '/apex-shift'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
