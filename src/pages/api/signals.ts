/**
 * Trading Signals API
 * GET /api/signals?pair=SOL/USDC&type=BUY&limit=20
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export interface TradingSignal {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  entry: number;
  target: number;
  stop: number;
  confidence: number; // 0 to 1
  timeframe: string; // 1m, 5m, 15m, 1H, 4H, 1D
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  reason: string;
  indicators: {
    rsi?: number;
    macd?: {
      value: number;
      signal: number;
    };
    ema?: {
      short: number;
      long: number;
    };
  };
  createdAt: string;
  expiresAt: string;
}

export interface SignalsResponse {
  success: boolean;
  signals: TradingSignal[];
  count: number;
  summary: {
    buySignals: number;
    sellSignals: number;
    holdSignals: number;
    avgConfidence: number;
    topPairs: Array<{ pair: string; count: number }>;
  };
  disclaimer: string;
  timestamp: number;
}

// Mock trading signals (replace with real signals from trading bot after integration)
const MOCK_SIGNALS: TradingSignal[] = [
  {
    id: 'sig_001',
    pair: 'SOL/USDC',
    type: 'BUY',
    entry: 86.25,
    target: 95.00,
    stop: 82.00,
    confidence: 0.85,
    timeframe: '1D',
    risk: 'MEDIUM',
    reason: 'RSI oversold (28.5), strong support at $85, bullish MACD crossover',
    indicators: {
      rsi: 28.5,
      macd: {
        value: -0.45,
        signal: -0.52,
      },
      ema: {
        short: 86.10,
        long: 87.45,
      },
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sig_002',
    pair: 'BTC/USDC',
    type: 'HOLD',
    entry: 70000,
    target: 75000,
    stop: 68000,
    confidence: 0.75,
    timeframe: '4H',
    risk: 'LOW',
    reason: 'Consolidation phase, RSI neutral (52), waiting for breakout',
    indicators: {
      rsi: 52.0,
      macd: {
        value: 0.15,
        signal: 0.18,
      },
      ema: {
        short: 69850,
        long: 69500,
      },
    },
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sig_003',
    pair: 'ETH/USDC',
    type: 'BUY',
    entry: 2036,
    target: 2150,
    stop: 1950,
    confidence: 0.78,
    timeframe: '4H',
    risk: 'MEDIUM',
    reason: 'Strong bounce from $2000 support, RSI rising, volume increase',
    indicators: {
      rsi: 58.0,
      macd: {
        value: 2.15,
        signal: 1.98,
      },
      ema: {
        short: 2032,
        long: 2018,
      },
    },
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sig_004',
    pair: 'RAY/USDC',
    type: 'SELL',
    entry: 0.599,
    target: 0.550,
    stop: 0.620,
    confidence: 0.82,
    timeframe: '1D',
    risk: 'MEDIUM',
    reason: 'RSI overbought (72), resistance at $0.60, bearish divergence',
    indicators: {
      rsi: 72.0,
      macd: {
        value: 0.002,
        signal: 0.003,
      },
      ema: {
        short: 0.598,
        long: 0.592,
      },
    },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sig_005',
    pair: 'BONK/USDC',
    type: 'BUY',
    entry: 0.000006,
    target: 0.0000075,
    stop: 0.0000055,
    confidence: 0.65,
    timeframe: '1H',
    risk: 'HIGH',
    reason: 'Momentum play, RSI bullish, but high volatility',
    indicators: {
      rsi: 65.0,
      macd: {
        value: 0.0000001,
        signal: 0.00000005,
      },
    },
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sig_006',
    pair: 'MSOL/USDC',
    type: 'HOLD',
    entry: 0.0214,
    target: 0.0250,
    stop: 0.0200,
    confidence: 0.70,
    timeframe: '1D',
    risk: 'LOW',
    reason: 'Stable performance, following SOL trend, no clear direction',
    indicators: {
      rsi: 55.0,
      macd: {
        value: 0.00015,
        signal: 0.00012,
      },
    },
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse<SignalsResponse | { error: string; details?: string }>) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      pair,
      type,
      timeframe,
      risk,
      limit = '20',
    } = req.query;

    const limitNum = parseInt(limit as string, 10);

    // Start with all signals
    let signals = [...MOCK_SIGNALS];

    // Filter by pair
    if (pair && typeof pair === 'string') {
      signals = signals.filter((s) => s.pair.toUpperCase().includes(pair.toUpperCase()));
    }

    // Filter by type
    if (type && typeof type === 'string') {
      signals = signals.filter((s) => s.type === type.toUpperCase());
    }

    // Filter by timeframe
    if (timeframe && typeof timeframe === 'string') {
      signals = signals.filter((s) => s.timeframe === timeframe.toUpperCase());
    }

    // Filter by risk
    if (risk && typeof risk === 'string') {
      signals = signals.filter((s) => s.risk === risk.toUpperCase());
    }

    // Remove expired signals
    const now = new Date().toISOString();
    signals = signals.filter((s) => s.expiresAt > now);

    // Sort by confidence (highest first), then by created (newest first)
    signals.sort((a, b) => {
      if (b.confidence !== a.confidence) {
        return b.confidence - a.confidence;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Limit results
    signals = signals.slice(0, limitNum);

    // Calculate summary statistics
    const buySignals = signals.filter((s) => s.type === 'BUY').length;
    const sellSignals = signals.filter((s) => s.type === 'SELL').length;
    const holdSignals = signals.filter((s) => s.type === 'HOLD').length;
    const avgConfidence = signals.length > 0
      ? signals.reduce((sum, s) => sum + s.confidence, 0) / signals.length
      : 0;

    // Calculate top pairs
    const pairCounts = signals.reduce((acc, s) => {
      if (!acc[s.pair]) {
        acc[s.pair] = 0;
      }
      acc[s.pair] += 1;
      return acc;
    }, {} as Record<string, number>);

    const topPairs = Object.entries(pairCounts)
      .map(([pair, count]) => ({ pair, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const response: SignalsResponse = {
      success: true,
      signals,
      count: signals.length,
      summary: {
        buySignals,
        sellSignals,
        holdSignals,
        avgConfidence: Math.round(avgConfidence * 100) / 100,
        topPairs,
      },
      disclaimer: 'These signals are for informational purposes only. Trading cryptocurrencies involves significant risk. Always do your own research and never invest more than you can afford to lose. Past performance is not indicative of future results.',
      timestamp: Date.now(),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Signals API error:', error);
    res.status(500).json({
      error: 'Failed to fetch trading signals',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
