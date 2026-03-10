/**
 * Marketplace Statistics API
 * GET /api/marketplace/stats
 */

import type { NextApiRequest, NextApiResponse } from 'next';

// Mock data for MVP (replace with real database queries)
const MARKETPLACE_STATS = {
  verifiedMcpCount: 3,
  totalAgents: 12,
  totalVolumeUsdc: 1250.75,
  volume24h: 45.25,
  volume7d: 287.50,
  tx24h: 142,
  tx7d: 892,
  lastUpdated: new Date().toISOString(),
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  try {
    // Return live statistics
    const stats = {
      ...MARKETPLACE_STATS,
      lastUpdated: new Date().toISOString(),
    };

    // Calculate percentage changes
    const volume24hChange = ((stats.volume24h / stats.volume7d) * 100 / 7).toFixed(2);
    const tx24hChange = ((stats.tx24h / stats.tx7d) * 100 / 7).toFixed(2);

    res.status(200).json({
      success: true,
      data: {
        marketplace: {
          verifiedMcpCount: stats.verifiedMcpCount,
          totalAgents: stats.totalAgents,
        },
        volume: {
          total: stats.totalVolumeUsdc,
          last24h: {
            usdc: stats.volume24h,
            change: parseFloat(volume24hChange),
          },
          last7d: {
            usdc: stats.volume7d,
          },
        },
        transactions: {
          last24h: {
            count: stats.tx24h,
            change: parseFloat(tx24hChange),
          },
          last7d: {
            count: stats.tx7d,
          },
        },
        network: {
          name: 'Base',
          chainId: 8453,
          token: 'USDC',
        },
        lastUpdated: stats.lastUpdated,
      },
    });
  } catch (error) {
    console.error('Error fetching marketplace stats:', error);
    res.status(500).json({
      error: 'Failed to fetch marketplace statistics',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
