import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    agents: []
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    id: `agent_${Date.now()}`,
    name: body.name || 'New Agent',
    status: 'alive',
    balance: body.balance || 10.0,
    daily_rent: 1.0,
    daily_revenue: 0.5,
    capabilities: body.capabilities || [],
    children: [],
    total_earned: 0,
    total_paid: 0,
    created_at: new Date().toISOString()
  });
}
