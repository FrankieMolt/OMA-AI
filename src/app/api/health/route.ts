import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : (process.env.FRONTEND_URL || 'https://www.oma-ai.com');

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
        const response = await fetch(ep.url, {
          headers: { 'User-Agent': 'OMA-AI-HealthCheck/1.0' }
        });
        const isWorking = response.status === 200 || response.status === 402 || response.status === 401;
        return {
          name: ep.name,
          status: isWorking ? 'ok' : 'error',
          code: response.status,
          message: response.status === 402 ? 'x402 payment required' :
                   response.status === 401 ? 'auth required' :
                   response.status === 200 ? 'working' : 'error'
        };
      } catch {
        return { name: ep.name, status: 'error', code: 0, message: 'connection failed' };
      }
    })
  );

  const allOk = results.every(r => r.status === 'ok');
  const response = NextResponse.json({
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
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'no-cache');
  return response;
}
