import { MetadataRoute } from 'next'
import { realProducts } from '@/data/real-products'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://spendthrone.com'

  const staticRoutes = [
    '',
    '/marketplace',
    '/login',
    '/signup',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/faq',
    '/shipping',
    '/returns',
    '/features',
    '/pricing',
    '/accessibility',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const productRoutes = realProducts.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...productRoutes]
}
