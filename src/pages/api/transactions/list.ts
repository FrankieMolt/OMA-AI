/**
 * Transactions API - List Transactions
 * GET /api/transactions/list?address=0x...&status=completed&limit=50&page=1
 */

import type { NextApiRequest, NextApiResponse } from 'next';

// Mock transactions for MVP (replace with real database queries)
const MOCK_TRANSACTIONS = [
  {
    id: 'tx_1',
    fromWallet: '0x8a2f...4b3c',
    toWallet: '0x40AE...4eC6',
    amountUsdc: 0.0005,
    status: 'completed',
    skillId: 'exa-web-search',
    createdAt: '2026-03-10T20:00:00Z',
    completedAt: '2026-03-10T20:00:05Z',
  },
  {
    id: 'tx_2',
    fromWallet: '0x3d7f...9a1e',
    toWallet: '0x40AE...4eC6',
    amountUsdc: 0.001,
    status: 'completed',
    skillId: 'byteover',
    createdAt: '2026-03-10T19:55:00Z',
    completedAt: '2026-03-10T19:55:02Z',
  },
  {
    id: 'tx_3',
    fromWallet: '0x7b9c...2d4f',
    toWallet: '0x40AE...4eC6',
    amountUsdc: 0.002,
    status: 'completed',
    skillId: 'self-improving-agent',
    createdAt: '2026-03-10T19:50:00Z',
    completedAt: '2026-03-10T19:50:08Z',
  },
  {
    id: 'tx_4',
    fromWallet: '0x1e2d...8f3a',
    toWallet: '0x40AE...4eC6',
    amountUsdc: 0.0005,
    status: 'pending',
    skillId: 'exa-web-search',
    createdAt: '2026-03-10T19:45:00Z',
    completedAt: null,
  },
  {
    id: 'tx_5',
    fromWallet: '0x6a8b...5c9d',
    toWallet: '0x40AE...4eC6',
    amountUsdc: 0.0015,
    status: 'completed',
    skillId: 'github-repo-manager',
    createdAt: '2026-03-10T19:40:00Z',
    completedAt: '2026-03-10T19:40:03Z',
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=10');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      address,
      status,
      skillId,
      limit = '50',
      page = '1',
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const offset = (pageNum - 1) * limitNum;

    // Start with all transactions
    let transactions = [...MOCK_TRANSACTIONS];

    // Filter by wallet address
    if (address && typeof address === 'string') {
      transactions = transactions.filter(
        (tx) =>
          tx.fromWallet.toLowerCase().includes(address.toLowerCase()) ||
          tx.toWallet.toLowerCase().includes(address.toLowerCase())
      );
    }

    // Filter by status
    if (status && status !== 'all') {
      transactions = transactions.filter((tx) => tx.status === status);
    }

    // Filter by skill ID
    if (skillId && typeof skillId === 'string') {
      transactions = transactions.filter((tx) => tx.skillId === skillId);
    }

    // Sort transactions
    transactions.sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a];
      const bVal = b[sortBy as keyof typeof b];

      // Handle null/undefined values
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (aVal < bVal) return sortOrder === 'desc' ? 1 : -1;
      if (aVal > bVal) return sortOrder === 'desc' ? -1 : 1;
      return 0;
    });

    // Pagination
    const total = transactions.length;
    const paginatedTransactions = transactions.slice(offset, offset + limitNum);

    // Calculate statistics
    const totalVolume = transactions
      .filter((tx) => tx.status === 'completed')
      .reduce((sum, tx) => sum + tx.amountUsdc, 0);

    const pendingVolume = transactions
      .filter((tx) => tx.status === 'pending')
      .reduce((sum, tx) => sum + tx.amountUsdc, 0);

    res.status(200).json({
      success: true,
      data: paginatedTransactions,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: offset + limitNum < total,
        hasPrevPage: pageNum > 1,
      },
  stats: {
    total_transactions: transactions.length,
    total_volume: totalVolume,
    volume_24h: totalVolume,
    success_rate: total > 0 ? (transactions.filter((tx) => tx.status === 'completed').length / total) * 100 : 0,
  },
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      error: 'Failed to fetch transactions',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
