import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({
    success: true,
    marketplace: {
      total_mcp_servers: 229,
      total_skills: 500,
      categories: ['AI', 'Trading', 'Web3', 'Tools', 'Data']
    },
    trending: [
      { name: 'Exa Web Search', downloads: 15420, category: 'AI' },
      { name: 'Solana Payments', downloads: 12000, category: 'Trading' },
      { name: 'GitHub Integration', downloads: 9800, category: 'Tools' }
    ]
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=300');
  return response;
}
