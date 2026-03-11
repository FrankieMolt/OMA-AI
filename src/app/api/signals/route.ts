import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.json({
    success: true,
    signals: [
      {
        id: 'sig_001',
        pair: 'SOL/USDC',
        type: 'BUY',
        entry: 87.36,
        target: 95,
        stop: 82,
        confidence: 0.85,
        timeframe: '1D',
        risk: 'MEDIUM',
        reason: 'RSI oversold (28.5), strong support at $85',
        indicators: { rsi: 28.5 },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 86400000).toISOString()
      }
    ],
    summary: {
      buySignals: 1,
      sellSignals: 0,
      holdSignals: 0
    }
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=60');
  return response;
}
