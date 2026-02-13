import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://oma-ai.com')

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
    '/bounties',
    '/blog',
    '/how-it-works',
    '/apex-shift',
    '/privacy',
    '/terms',
    '/login',
    '/signup',
    '/forgot-password',
    '/api-docs',
    '/features',
    '/resume',
    '/frankie-os',
    '/search',
    '/blog/welcome-to-oma-ai',
    '/blog/oma-ai-humans-and-agents-2026',
    '/blog/x402-payments-complete-guide-2026'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
