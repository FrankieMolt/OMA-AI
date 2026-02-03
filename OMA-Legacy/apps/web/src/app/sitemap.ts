import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oma.ai';

  // Base pages
  const routes = [
    '',
    '/marketplace',
    '/docs',
    '/pricing',
    '/about',
    '/help',
    '/login',
    '/register',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In a real app, you would fetch listing slugs and doc slugs from the DB/file system
  // and append them here.

  return [...routes];
}
