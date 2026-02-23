import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oma-ai.com'
  
  const routes = [
    '',
    '/api',
    '/dashboard',
    '/docs',
    '/features',
    '/pricing',
    '/about',
    '/blog',
    '/blog/posts/what-is-x402-protocol',
    '/blog/posts/building-ai-agents-with-oma-ai',
    '/blog/posts/how-to-monetize-your-api',
    '/contact',
    '/privacy',
    '/terms',
    '/how-it-works',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
