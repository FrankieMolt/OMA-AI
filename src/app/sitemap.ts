import { MetadataRoute } from 'next';
import { getMCPData } from '@/lib/mcp-data';

const baseUrl = 'https://www.oma-ai.com';
const mcpLastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: mcpLastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/mcps`, lastModified: mcpLastModified, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified: mcpLastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/compare`, lastModified: mcpLastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/publish`, lastModified: mcpLastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/dashboard`, lastModified: mcpLastModified, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/agents`, lastModified: mcpLastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/docs`, lastModified: mcpLastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: mcpLastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: mcpLastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/wallet`, lastModified: mcpLastModified, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const mcps = getMCPData();
  mcps.forEach((mcp) => {
    routes.push({
      url: `${baseUrl}/mcps/${mcp.slug}`,
      lastModified: mcpLastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  return routes;
}
