/**
 * Portfolio API - Get Wallet Portfolio Data
 * GET /api/portfolio?wallet=0x...
 */

import type { NextApiRequest, NextApiResponse } from 'next';

interface Transaction {
  id: string;
  fromWallet: string;
  toWallet: string;
  amountUsdc: number;
  status: 'pending' | 'completed' | 'failed' | 'expired';
  skillId?: string;
  skillName?: string;
  createdAt: string;
  completedAt?: string;
}

interface WalletData {
  walletAddress: string;
  balanceUsdc: number;
  totalEarned: number;
  totalSpent: number;
  netProfit: number;
  totalTransactions: number;
  completedTransactions: number;
  pendingTransactions: number;
  failedTransactions: number;
}

interface UsageMetric {
  id: string;
  apiEndpoint: string;
  success: boolean;
  latencyMs: number;
  costUsdc: number;
  createdAt: string;
}

interface PortfolioResponse {
  success: boolean;
  wallet: WalletData;
  transactions: Transaction[];
  metrics: UsageMetric[];
  summary: {
    topSkills: Array<{ skillId: string; calls: number; cost: number }>;
    recentActivity: string;
  };
  timestamp: number;
}

// Mock wallet data (replace with real database queries after Supabase setup)
const MOCK_WALLETS: Record<string, WalletData> = {
  '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6': {
    walletAddress: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
    balanceUsdc: 150.75,
    totalEarned: 250.50,
    totalSpent: 99.75,
    netProfit: 150.75,
    totalTransactions: 1250,
    completedTransactions: 1230,
    pendingTransactions: 15,
    failedTransactions: 5,
  },
};

// Mock transactions (replace with real database queries after Supabase setup)
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_001',
    fromWallet: '0x8a2f...4b3c',
    toWallet: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
    amountUsdc: 0.0005,
    status: 'completed',
    skillId: 'exa-web-search',
    skillName: 'Exa Web Search',
    createdAt: '2026-03-10T20:00:00Z',
    completedAt: '2026-03-10T20:00:05Z',
  },
  {
    id: 'tx_002',
    fromWallet: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
    toWallet: '0x8a2f...4b3c',
    amountUsdc: 0.001,
    status: 'completed',
    skillId: 'byteover',
    skillName: 'ByteOver Memory',
    createdAt: '2026-03-10T19:55:00Z',
    completedAt: '2026-03-10T19:55:02Z',
  },
  {
    id: 'tx_003',
    fromWallet: '0x7b9c...2d4f',
    toWallet: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
    amountUsdc: 0.002,
    status: 'completed',
    skillId: 'self-improving-agent',
    skillName: 'Self-Improving Agent',
    createdAt: '2026-03-10T19:50:00Z',
    completedAt: '2026-03-10T19:50:08Z',
  },
  {
    id: 'tx_004',
    fromWallet: '0x1e2d...8f3a',
    toWallet: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
    amountUsdc: 0.0005,
    status: 'pending',
    skillId: 'exa-web-search',
    skillName: 'Exa Web Search',
    createdAt: '2026-03-10T19:45:00Z',
  },
  {
    id: 'tx_005',
    fromWallet: '0x6a8b...5c9d',
    toWallet: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
    amountUsdc: 0.0015,
    status: 'completed',
    skillId: 'github-repo-manager',
    skillName: 'GitHub Repo Manager',
    createdAt: '2026-03-10T19:40:00Z',
    completedAt: '2026-03-10T19:40:03Z',
  },
];

// Mock usage metrics (replace with real database queries after Supabase setup)
const MOCK_METRICS: UsageMetric[] = [
  {
    id: 'metric_001',
    apiEndpoint: '/api/search',
    success: true,
    latencyMs: 125,
    costUsdc: 0.0005,
    createdAt: '2026-03-10T20:00:00Z',
  },
  {
    id: 'metric_002',
    apiEndpoint: '/api/embeddings',
    success: true,
    latencyMs: 89,
    costUsdc: 0.0001,
    createdAt: '2026-03-10T19:55:00Z',
  },
  {
    id: 'metric_003',
    apiEndpoint: '/api/llm/openrouter',
    success: true,
    latencyMs: 1250,
    costUsdc: 0.0125,
    createdAt: '2026-03-10T19:50:00Z',
  },
  {
    id: 'metric_004',
    apiEndpoint: '/api/prices',
    success: false,
    latencyMs: 500,
    costUsdc: 0,
    createdAt: '2026-03-10T19:45:00Z',
  },
  {
    id: 'metric_005',
    apiEndpoint: '/api/weather',
    success: true,
    latencyMs: 210,
    costUsdc: 0.001,
    createdAt: '2026-03-10T19:40:00Z',
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse<PortfolioResponse | { error: string; details?: string }>) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wallet, limit = '20', page = '1' } = req.query;

    if (!wallet || typeof wallet !== 'string') {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const offset = (pageNum - 1) * limitNum;

    // Get wallet data (mock for now, real DB after Supabase setup)
    const walletData = MOCK_WALLETS[wallet] || {
      walletAddress: wallet,
      balanceUsdc: 0,
      totalEarned: 0,
      totalSpent: 0,
      netProfit: 0,
      totalTransactions: 0,
      completedTransactions: 0,
      pendingTransactions: 0,
      failedTransactions: 0,
    };

    // Get transactions for this wallet (filter by address)
    let transactions = MOCK_TRANSACTIONS.filter(
      (tx) =>
        tx.fromWallet.toLowerCase().includes(wallet.toLowerCase()) ||
        tx.toWallet.toLowerCase().includes(wallet.toLowerCase())
    );

    // Sort by created date (newest first)
    transactions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Pagination
    const totalTransactions = transactions.length;
    const paginatedTransactions = transactions.slice(offset, offset + limitNum);

    // Get usage metrics for this wallet
    const metrics = MOCK_METRICS.slice(0, limitNum);

    // Calculate top skills by cost
    const skillCosts = MOCK_TRANSACTIONS
      .filter(tx => tx.status === 'completed' && tx.skillId)
      .reduce((acc, tx) => {
        if (!acc[tx.skillId!]) {
          acc[tx.skillId!] = { calls: 0, cost: 0, name: tx.skillName || tx.skillId };
        }
        acc[tx.skillId!].calls += 1;
        acc[tx.skillId!].cost += tx.amountUsdc;
        return acc;
      }, {} as Record<string, { calls: number; cost: number; name: string }>);

    const topSkills = Object.entries(skillCosts)
      .map(([skillId, data]) => ({
        skillId,
        skillName: data.name,
        calls: data.calls,
        cost: data.cost,
      }))
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 5);

    // Calculate recent activity
    const recentActivity = paginatedTransactions.length > 0
      ? `Last transaction: ${new Date(paginatedTransactions[0].createdAt).toLocaleDateString()}`
      : 'No recent activity';

    const response: PortfolioResponse = {
      success: true,
      wallet: walletData,
      transactions: paginatedTransactions,
      metrics,
      summary: {
        topSkills,
        recentActivity,
      },
      timestamp: Date.now(),
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Portfolio API error:', error);
    res.status(500).json({
      error: 'Failed to fetch portfolio data',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
