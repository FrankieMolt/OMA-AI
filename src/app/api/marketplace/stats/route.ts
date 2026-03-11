import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({
    success: true,
    data: {
      marketplace: {
        verifiedMcpCount: 3,
        totalAgents: 12
      },
      volume: {
        total: 1250.75,
        last24h: { usdc: 45.25, change: 2.25 },
        last7d: { usdc: 287.5 }
      },
      transactions: {
        last24h: { count: 142, change: 2.27 },
        last7d: { count: 892 }
      },
      network: {
        name: 'Base',
        chainId: 8453,
        token: 'USDC'
      },
      lastUpdated: new Date().toISOString()
    }
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=60');
  return response;
}
