import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  try {
    const response = await fetch(`${API_URL}/services`, {
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
      services: [
        {
          id: 'demo-1',
          name: 'AI Code Review',
          description: 'Automated code review with GPT-4',
          type: 'ai',
          price: 0.01,
          capabilities: ['code_review', 'bug_detection'],
          seller_wallet: '0x590FdA238A52bBA79fD4635e73bDAC1eAe558e784',
          status: 'active',
          total_sales: 0
        },
        {
          id: 'demo-2',
          name: 'Market Analysis',
          description: 'DeFi market analysis and recommendations',
          type: 'ai',
          price: 0.02,
          capabilities: ['market_analysis', 'trading_signals'],
          seller_wallet: '0x590FdA238A52bBA79fD4635e73bDAC1eAe558e784',
          status: 'active',
          total_sales: 0
        }
      ]
    });
  }
}
