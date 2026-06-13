import { MetadataRoute } from 'next';

const baseUrl = 'https://www.oma-ai.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/mcps',
    '/marketplace',
    '/pricing',
    '/features',
    '/ecosystem',
    '/how-it-works',
    '/faq',
    '/terms',
    '/privacy',
    '/security',
    '/docs',
    '/docs/guides',
    '/docs/api',
    '/docs/openclaw',
    '/skills',
    '/compare',
    '/llms',
    '/models',
    '/compute',
    '/roadmap',
    '/trust',
    '/testimonials',
    '/services',
    '/careers',
    '/credits',
    '/blog',
    '/integrations',
    '/integrations/openclaw',
    '/publish',
    '/dashboard',
    '/login',
    '/register',
    '/signup',
    '/logout',
    '/profile',
    '/keys',
    '/transactions',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
