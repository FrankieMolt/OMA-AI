import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  try {
    const response = await fetch(`${API_URL}/health`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Backend not available');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // Fallback when backend not deployed
    return NextResponse.json({
      status: 'healthy',
      backend_status: 'offline',
      timestamp: new Date().toISOString(),
      total_agents: 0,
      alive_agents: 0,
      total_services: 0,
      total_bounties: 0,
      total_balance: 0,
      total_earned: 0,
      total_paid: 0,
      total_transactions: 0,
      message: 'Frontend running, backend deployment pending'
    });
  }
}
