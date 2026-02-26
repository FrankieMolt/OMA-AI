import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  // Test all endpoints
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const endpoints = [
    { name: 'price', url: `${baseUrl}/api/price` },
    { name: 'prices', url: `${baseUrl}/api/prices` },
    { name: 'weather', url: `${baseUrl}/api/weather?city=London` },
    { name: 'search', url: `${baseUrl}/api/search?q=test` },
    { name: 'compute', url: `${baseUrl}/api/compute?action=list` },
    { name: 'marketplace', url: `${baseUrl}/api/marketplace` }
  ];

  const results = await Promise.all(
    endpoints.map(async (ep) => {
      try {
        const response = await fetch(ep.url);
        return { name: ep.name, status: response.ok ? 'ok' : 'error', code: response.status };
      } catch (e) {
        return { name: ep.name, status: 'error', code: 0 };
      }
    })
  );

  const allOk = results.every(r => r.status === 'ok');

  res.json({
    success: allOk,
    platform: 'OMA-AI',
    version: '1.0.0',
    timestamp: Date.now(),
    endpoints: results,
    stats: {
      total_apis: 16,
      free_apis: 10,
      paid_apis: 6,
      categories: ['crypto', 'data', 'ai', 'utilities', 'images', 'finance', 'space']
    },
    network: {
      payment: 'x402',
      currency: 'USDC',
      chains: ['base', 'solana'],
      treasury: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6'
    }
  });
}