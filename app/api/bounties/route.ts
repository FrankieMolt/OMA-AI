import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    bounties: []
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({
    id: `bty_${Date.now()}`,
    title: body.title || 'New Bounty',
    description: body.description || 'Complete this task',
    amount: body.amount || 1.0,
    creator: body.creator || 'system',
    status: 'open',
    created_at: new Date().toISOString()
  });
}
