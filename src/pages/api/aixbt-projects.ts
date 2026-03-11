/**
 * AIXBT Projects API
 * GET /api/projects?chain=solana&limit=20
 *
 * Provides project rankings by momentum score from AIXBT
 */

import type { NextApiRequest, NextApiResponse } from 'next';

export interface AIXBTProject {
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
  createdAt: string;
}

export interface AIXBTProjectsResponse {
  success: boolean;
  projects: AIXBTProject[];
  count: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  source?: 'aixbt' | 'trading-bot' | 'fallback' | 'error';
  note?: string;
  timestamp: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AIXBTProjectsResponse>
) {
  const { chain = 'solana', limit = '20', page = '1', hasToken = 'true' } = req.query;

  try {
    const aixbtApiKey = process.env.AIXBT_API_KEY;

    // If AIXBT API key is configured, use AIXBT
    if (aixbtApiKey && aixbtApiKey !== 'test') {
      console.log('[AIXBT] Fetching projects for chain:', chain);

      const response = await fetch(
        `https://api.aixbt.tech/v2/projects?chain=${chain}&limit=${limit}&page=${page}&hasToken=${hasToken}`,
        {
          headers: {
            'x-api-key': aixbtApiKey,
            'Content-Type': 'application/json',
          },
          next: {
            revalidate: 3600, // Revalidate every hour
          },
        }
      );

      if (!response.ok) {
        throw new Error(`AIXBT API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform AIXBT response to our format
      const projects = (data.data || []).map((proj: any) => ({
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
        createdAt: proj.createdAt,
      }));

      return res.status(200).json({
        success: true,
        projects,
        count: projects.length,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total: data.pagination?.total || 0,
        },
        source: 'aixbt',
        note: 'Data powered by AIXBT (momentum rankings)',
        timestamp: Date.now(),
      });
    }

    // Fallback: Use mock data if no AIXBT API key
    console.log('[AIXBT] No API key configured, using mock data');

    const mockProjects: AIXBTProject[] = [
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
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
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
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
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
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
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
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
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
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'sol_006',
        name: 'Raydium AMM',
        ticker: 'RAY',
        xHandle: '@raydium_io',
        chain: 'solana',
        momentumScore: 76.2,
        momentumTrend: 'DROPPING',
        price: 0.599,
        mcap: '1.2B',
        volume24h: '12.5M',
        change24h: -2.1,
        hasToken: true,
        reinforcedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'sol_007',
        name: 'Close Protocol',
        ticker: 'CLOSE',
        xHandle: '@closeprotocol',
        chain: 'solana',
        momentumScore: 73.8,
        momentumTrend: 'STABLE',
        price: 0.42,
        mcap: '28M',
        volume24h: '1.2M',
        change24h: 1.5,
        hasToken: true,
        reinforcedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'sol_008',
        name: 'Lido Solana',
        ticker: 'lsol',
        xHandle: '@lidosolana',
        chain: 'solana',
        momentumScore: 71.5,
        momentumTrend: 'STABLE',
        price: 0.98,
        mcap: '120M',
        volume24h: '2.5M',
        change24h: 4.3,
        hasToken: true,
        reinforcedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'sol_009',
        name: 'Helium Solana',
        ticker: 'HNT-SOL',
        xHandle: '@helium',
        chain: 'solana',
        momentumScore: 68.9,
        momentumTrend: 'DROPPING',
        price: 2.85,
        mcap: '95M',
        volume24h: '0.8M',
        change24h: -5.7,
        hasToken: true,
        reinforcedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 210 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'sol_010',
        name: 'Drift Exchange',
        ticker: 'DRIFT',
        xHandle: '@driftprotocol',
        chain: 'solana',
        momentumScore: 65.2,
        momentumTrend: 'STABLE',
        price: 0.38,
        mcap: '38M',
        volume24h: '1.8M',
        change24h: 6.4,
        hasToken: true,
        reinforcedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // Filter by chain if specified
    const filteredProjects = chain !== 'all'
      ? mockProjects.filter((p) => p.chain === chain)
      : mockProjects;

    // Limit results
    const limitedProjects = filteredProjects.slice(0, parseInt(limit as string));

    return res.status(200).json({
      success: true,
      projects: limitedProjects,
      count: limitedProjects.length,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: filteredProjects.length,
      },
      source: 'fallback',
      note: 'No AIXBT API key configured, using mock Solana projects',
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error('[AIXBT Projects] Error:', error);

    return res.status(500).json({
      success: false,
      projects: [],
      count: 0,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: 0,
      },
      source: 'error',
      note: error instanceof Error ? error.message : 'Unknown error',
      timestamp: Date.now(),
    });
  }
}
