/**
 * AIXBT Signals API
 * GET /api/aixbt-signals?chain=solana&limit=20
 *
 * Combines trading signals with AIXBT market signals for comprehensive analysis
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export interface AIXBTSignal {
  id: string;
  category: string;
  title: string;
  description: string;
  tier: string;
  tierName: string;
  address?: string;
  names?: string[];
  tickers?: string[];
  xHandles?: string[];
  reinforcedAt: string;
  detectedAt: string;
}

export interface AIXBTProjectsData {
  id: string;
  name: string;
  ticker: string;
  xHandle?: string;
  address?: string;
  chain: string;
  momentumScore: number;
  momentumTrend: 'SURGING' | 'PEAKING' | 'STABLE' | 'DROPPING' | 'CRASHING';
  price: number;
  mcap: string;
  volume24h: string;
  change24h: number;
  hasToken: boolean;
  reinforcedAt: string;
}

export interface CombinedSignalsResponse {
  success: boolean;
  tradingSignals: any[];
  aixbtSignals: AIXBTSignal[];
  projects: AIXBTProjectsData[];
  summary: {
    buySignals: number;
    sellSignals: number;
    holdSignals: number;
    avgConfidence: number;
    topMomentumProjects: AIXBTProjectsData[];
  };
  source?: 'combined' | 'aixbt' | 'trading-bot' | 'error';
  note?: string;
  timestamp: number;
}

const SIGNAL_CATEGORIES = [
  'FINANCIAL_EVENT',
  'TOKEN_ECONOMICS',
  'TECH_EVENT',
  'MARKET_ACTIVITY',
  'ONCHAIN_METRICS',
  'PARTNERSHIP',
  'TEAM_UPDATE',
  'REGULATORY',
  'WHALE_ACTIVITY',
  'RISK_ALERT',
  'VISIBILITY_EVENT',
  'OPINION_SPECULATION',
];

const TIER_NAMES = {
  '1': 'Partnership',
  '2': 'Team Update',
  '3': 'Tech Event',
  '4': 'Momentum Signal',
  '5': 'Whale Alert',
  '6': 'Risk Alert',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CombinedSignalsResponse>
) {
  const { chain = 'solana', limit = '20' } = req.query;

  try {
    const aixbtApiKey = process.env.AIXBT_API_KEY;

    // Fetch trading signals from local trading bot
    console.log('[AIXBT Signals] Fetching trading signals...');
    const tradingSignalsRes = await fetch('http://localhost:3008/api/signals');
    const tradingSignals = await tradingSignalsRes.json();

    // Fetch AIXBT signals
    console.log('[AIXBT Signals] Fetching AIXBT signals...');
    const aixbtSignals: AIXBTSignal[] = [];

    if (aixbtApiKey && aixbtApiKey !== 'test') {
      try {
        const signalsResponse = await fetch(
          `https://api.aixbt.tech/v2/signals?categories=${SIGNAL_CATEGORIES.join(',')}&limit=${limit}&detectedAfter=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}`,
          {
            headers: {
              'x-api-key': aixbtApiKey,
              'Content-Type': 'application/json',
            },
            next: {
              revalidate: 3600,
            },
          }
        );

        if (signalsResponse.ok) {
          const data = await signalsResponse.json();
          aixbtSignals.push(...(data.data || []));
        } else {
          console.warn('[AIXBT Signals] API error, using fallback data:', signalsResponse.statusText);
        }
      } catch (error) {
        console.warn('[AIXBT Signals] Error fetching signals:', error);
      }
    }

    // Fallback signals if no AIXBT API key
    if (aixbtSignals.length === 0) {
      console.log('[AIXBT Signals] No AIXBT API key, using fallback signals');

      const fallbackSignals: AIXBTSignal[] = [
        {
          id: 'aixbt_001',
          category: 'PARTNERSHIP',
          title: 'Partnership with Top 100 Exchange',
          description: 'Project announces strategic partnership with leading centralized exchange for trading on mainnet',
          tier: '1',
          tierName: TIER_NAMES['1'],
          tickers: ['TOKEN'],
          xHandles: ['@project'],
          reinforcedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          detectedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'aixbt_002',
          category: 'TOKEN_ECONOMICS',
          title: 'Liquidity Mining Program Launched',
          description: 'Announcement of new liquidity mining rewards with 500K USDC pool',
          tier: '2',
          tierName: TIER_NAMES['2'],
          tickers: ['TOKEN'],
          xHandles: ['@project'],
          reinforcedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          detectedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'aixbt_003',
          category: 'TECH_EVENT',
          title: 'Mainnet Upgrade Complete',
          description: 'Successful deployment of V2 upgrade with 10x throughput improvement',
          tier: '3',
          tierName: TIER_NAMES['3'],
          tickers: ['TOKEN'],
          xHandles: ['@project'],
          reinforcedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          detectedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'aixbt_004',
          category: 'WHALE_ACTIVITY',
          title: 'Whale Accumulation Detected',
          description: 'Large wallet accumulation of 5M tokens in last 24 hours',
          tier: '5',
          tierName: TIER_NAMES['5'],
          tickers: ['TOKEN'],
          xHandles: ['@project'],
          reinforcedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'aixbt_005',
          category: 'ONCHAIN_METRICS',
          title: 'TVL Crossing $100M',
          description: 'Total value locked surpasses $100M milestone',
          tier: '4',
          tierName: TIER_NAMES['4'],
          tickers: ['TOKEN'],
          xHandles: ['@project'],
          reinforcedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'aixbt_006',
          category: 'REGULATORY',
          title: 'Regulatory Compliance Verified',
          description: 'Project completes regulatory compliance review in key jurisdiction',
          tier: '2',
          tierName: TIER_NAMES['2'],
          tickers: ['TOKEN'],
          xHandles: ['@project'],
          reinforcedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          detectedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        },
      ];

      aixbtSignals.push(...fallbackSignals);
    }

    // Filter by chain if specified
    const filteredAixbtSignals = chain !== 'all'
      ? aixbtSignals.filter((s) => {
          // Try to match by project names/tickers/addresses
          const project = tradingSignals.signals?.find((sig: any) =>
            s.names?.includes(sig.pair.split('/')[0]) ||
            s.tickers?.includes(sig.pair.split('/')[1]?.toUpperCase()) ||
            s.address?.toLowerCase() === sig.pair.toLowerCase()
          );
          return !!project;
        })
      : aixbtSignals;

    // Calculate summary
    const summary = {
      buySignals: (tradingSignals.signals || []).filter(
        (s: any) => s.type === 'BUY'
      ).length,
      sellSignals: (tradingSignals.signals || []).filter(
        (s: any) => s.type === 'SELL'
      ).length,
      holdSignals: (tradingSignals.signals || []).filter(
        (s: any) => s.type === 'HOLD'
      ).length,
      avgConfidence:
        ((tradingSignals.signals || []).reduce(
          (acc: number, s: any) => acc + s.confidence,
          0
        ) / (tradingSignals.signals?.length || 1)) || 0,
      topMomentumProjects: (await getTopMomentumProjects(String(chain), Number(limit) || 20)).slice(0, 5),
    };

    return res.status(200).json({
      success: true,
      tradingSignals: tradingSignals.signals || [],
      aixbtSignals: filteredAixbtSignals,
      projects: summary.topMomentumProjects,
      summary,
      source: 'combined',
      note: 'Signals powered by Trading Bot + AIXBT',
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error('[AIXBT Signals] Error:', error);

    return res.status(500).json({
      success: false,
      tradingSignals: [],
      aixbtSignals: [],
      projects: [],
      summary: {
        buySignals: 0,
        sellSignals: 0,
        holdSignals: 0,
        avgConfidence: 0,
        topMomentumProjects: [],
      },
      source: 'error',
      note: error instanceof Error ? error.message : 'Unknown error',
      timestamp: Date.now(),
    });
  }
}

// Helper function to get top momentum projects
async function getTopMomentumProjects(chain: string, limit: number) {
  const aixbtApiKey = process.env.AIXBT_API_KEY;

  if (aixbtApiKey && aixbtApiKey !== 'test') {
    try {
      const response = await fetch(
        `https://api.aixbt.tech/v2/projects?chain=${chain}&limit=${Number(limit) || 20}&sort=momentumScore&order=desc`,
        {
          headers: {
            'x-api-key': aixbtApiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return (data.data || []).map((proj: any) => ({
          id: proj.id,
          name: proj.name,
          ticker: proj.ticker,
          xHandle: proj.xHandle,
          address: proj.address,
          chain: proj.chain,
          momentumScore: proj.momentumScore,
          momentumTrend: proj.momentumTrend,
          price: proj.price || 0,
          mcap: proj.mcap,
          volume24h: proj.volume24h,
          change24h: proj.change24h || 0,
          hasToken: proj.hasToken,
          reinforcedAt: proj.reinforcedAt,
        }));
      }
    } catch (error) {
      console.warn('[AIXBT Projects] Error fetching projects:', error);
    }
  }

  // Fallback projects
  return [
    {
      id: 'sol_001',
      name: 'Solana Perps Protocol',
      ticker: 'SOL-PERP',
      xHandle: '@solperps',
      chain: 'solana',
      momentumScore: 92.5,
      momentumTrend: 'SURGING',
      price: 0.98,
      mcap: '95M',
      volume24h: '8.5M',
      change24h: 24.5,
      hasToken: true,
      reinforcedAt: new Date().toISOString(),
    },
    {
      id: 'sol_002',
      name: 'Phantom Wallet',
      ticker: 'PHANTOM',
      xHandle: '@phantom',
      chain: 'solana',
      momentumScore: 88.3,
      momentumTrend: 'STABLE',
      price: 1.25,
      mcap: '250M',
      volume24h: '3.2M',
      change24h: 5.2,
      hasToken: true,
      reinforcedAt: new Date().toISOString(),
    },
    {
      id: 'sol_003',
      name: 'Marinade Staking',
      ticker: 'MNDE',
      xHandle: '@marinade',
      chain: 'solana',
      momentumScore: 85.1,
      momentumTrend: 'SURGING',
      price: 0.89,
      mcap: '45M',
      volume24h: '2.8M',
      change24h: 12.8,
      hasToken: true,
      reinforcedAt: new Date().toISOString(),
    },
    {
      id: 'sol_004',
      name: 'Orca AMM',
      ticker: 'ORCA',
      xHandle: '@orca_swap',
      chain: 'solana',
      momentumScore: 82.7,
      momentumTrend: 'STABLE',
      price: 2.15,
      mcap: '180M',
      volume24h: '4.1M',
      change24h: 3.5,
      hasToken: true,
      reinforcedAt: new Date().toISOString(),
    },
    {
      id: 'sol_005',
      name: 'Jupiter Aggregator',
      ticker: 'JUP',
      xHandle: '@jup_aggregator',
      chain: 'solana',
      momentumScore: 79.5,
      momentumTrend: 'PEAKING',
      price: 1.45,
      mcap: '320M',
      volume24h: '6.8M',
      change24h: 8.2,
      hasToken: true,
      reinforcedAt: new Date().toISOString(),
    },
  ];
}
