import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oma-ai.com';
  
  const routes = [
    '',
    '/marketplace',
    '/tasks',
    '/docs',
    '/features',
    '/pricing',
    '/login',
    '/signup',
    '/blog',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/developers',
    '/how-it-works',
    '/apex-shift',
    '/resume',
    '/frankie-os',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
