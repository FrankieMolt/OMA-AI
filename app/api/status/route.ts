import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  // Check if it's a status request
  if (request.nextUrl.pathname === '/api/status') {
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      total_agents: 0,
      alive_agents: 0,
      total_services: 0,
      total_bounties: 0,
      total_balance: 0,
      total_earned: 0,
      total_paid: 0,
      total_transactions: 0
    });
  }

  // Check if it's an agents request
  if (request.nextUrl.pathname === '/api/agents') {
    return NextResponse.json({
      agents: []
    });
  }

  // Check if it's a marketplace request
  if (request.nextUrl.pathname === '/api/marketplace') {
    return NextResponse.json({
      services: []
    });
  }

  // Check if it's a bounties request
  if (request.nextUrl.pathname === '/api/bounties') {
    return NextResponse.json({
      bounties: []
    });
  }

  // Default response
  return NextResponse.json({
    message: 'OMA-AI API',
    status: 'Backend deployment pending',
    endpoints: ['/api/status', '/api/agents', '/api/marketplace', '/api/bounties']
  });
}
