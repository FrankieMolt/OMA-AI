/**
 * Transactions API - List Transactions (Real Database Version)
 * GET /api/transactions/list?address=0x...&status=completed&limit=50&page=1
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase, type Transaction, TABLES } from '@/lib/supabase';

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
      sortBy = 'created_at',
      sortOrder = 'desc',
    } = req.query;

    const limitNum = parseInt(limit as string, 10);
    const pageNum = parseInt(page as string, 10);
    const offset = (pageNum - 1) * limitNum;

    // Build query
    let query = supabase
      .from(TABLES.TRANSACTIONS)
      .select('*', { count: 'exact' });

    // Filter by wallet address
    if (address && typeof address === 'string') {
      query = query.or(`from_wallet.ilike.%${address}%,to_wallet.ilike.%${address}%`);
    }

    // Filter by status
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    // Filter by skill ID
    if (skillId && typeof skillId === 'string') {
      query = query.eq('skill_id', skillId);
    }

    // Sorting
    const ascending = sortOrder === 'asc';
    if (sortBy && ['created_at', 'amount_usdc', 'status'].includes(sortBy as string)) {
      query = query.order(sortBy as string, { ascending, nullsFirst: false });
    } else {
      query = query.order('created_at', { ascending: false, nullsFirst: false });
    }

    // Pagination
    query = query.range(offset, offset + limitNum - 1);

    // Execute query
    const { data: transactions, error, count } = await query;

    if (error) {
      console.error('Error fetching transactions:', error);
      return res.status(500).json({
        error: 'Failed to fetch transactions',
        details: error.message,
      });
    }

    // Calculate statistics
    const total = count || 0;
    const completedTransactions = transactions?.filter((t) => t.status === 'completed') || [];
    const pendingTransactions = transactions?.filter((t) => t.status === 'pending') || [];
    const failedTransactions = transactions?.filter((t) => t.status === 'failed') || [];

    const totalVolume = completedTransactions.reduce((sum, tx) => sum + tx.amount_usdc, 0);
    const pendingVolume = pendingTransactions.reduce((sum, tx) => sum + tx.amount_usdc, 0);

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: transactions || [],
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNextPage: offset + limitNum < total,
        hasPrevPage: pageNum > 1,
      },
      statistics: {
        totalVolume,
        pendingVolume,
        completedCount: completedTransactions.length,
        pendingCount: pendingTransactions.length,
        failedCount: failedTransactions.length,
      },
    });
  } catch (error) {
    console.error('Error in transactions list handler:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
