import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  // Test all endpoints
  const endpoints = [
    { name: 'price', url: 'http://localhost:3000/api/price' },
    { name: 'prices', url: 'http://localhost:3000/api/prices' },
    { name: 'weather', url: 'http://localhost:3000/api/weather?city=London' },
    { name: 'search', url: 'http://localhost:3000/api/search?q=test' },
    { name: 'compute', url: 'http://localhost:3000/api/compute?action=list' },
    { name: 'marketplace', url: 'http://localhost:3000/api/marketplace' }
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