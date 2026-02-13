import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://localhost:3001'
  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
  ]
}
