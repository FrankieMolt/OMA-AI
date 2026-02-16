import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OMA-AI - API Marketplace',
    short_name: 'OMA-AI',
    description: 'API Marketplace for AI Agents and MCPs',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#a855f7',
    icons: [
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
