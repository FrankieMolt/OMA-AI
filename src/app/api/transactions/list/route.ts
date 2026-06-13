import { NextRequest, NextResponse } from 'next/server';
import {
  getTransactions as dbGetTransactions,
  insertTransaction,
  type DbTransaction,
} from '@/lib/db/sqlite';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get('wallet');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);
    const offset = (page - 1) * limit;
    const status = searchParams.get('status');

    let txs = dbGetTransactions(limit, offset);

    // Filter by wallet if provided
    if (wallet) {
      txs = txs.filter(tx =>
        tx.from_address.toLowerCase() === wallet.toLowerCase() ||
        tx.to_address.toLowerCase() === wallet.toLowerCase()
      );
    }

    // Filter by status if provided
    if (status && status !== 'all') {
      txs = txs.filter(tx => tx.status === status);
    }

    // Compute stats from real data
    const allTxs = dbGetTransactions(1000, 0);
    const completedTxs = allTxs.filter(tx => tx.status === 'completed');
    const volume24hAgo = Math.floor(Date.now() / 1000) - 86400;
    const recentTxs = completedTxs.filter(tx => tx.created_at >= volume24hAgo);

    const totalVolume = completedTxs.reduce((sum, tx) => sum + BigInt(tx.amount), BigInt(0));
    const volume24h = recentTxs.reduce((sum, tx) => sum + BigInt(tx.amount), BigInt(0));

    const successRate = allTxs.length > 0
      ? Math.round((completedTxs.length / allTxs.length) * 1000) / 10
      : 0;

    return NextResponse.json({
      success: true,
      transactions: txs.map(tx => ({
        id: tx.id,
        from_wallet: tx.from_address,
        to_wallet: tx.to_address,
        amount_usdc: Number(BigInt(tx.amount) / BigInt(1_000_000)),
        status: tx.status,
        tx_hash: tx.tx_hash,
        mcp_id: tx.mcp_id,
        skill_name: tx.mcp_id ?? 'MCP',
        created_at: tx.created_at,
        completed_at: tx.status === 'completed' ? tx.updated_at : null,
      })),
      stats: {
        total_transactions: allTxs.length,
        total_volume: Number(totalVolume / BigInt(1_000_000)),
        volume_24h: Number(volume24h / BigInt(1_000_000)),
        success_rate: successRate,
      },
      pagination: {
        page,
        limit,
        total: allTxs.length,
        hasMore: allTxs.length > offset + limit,
      },
      notice: allTxs.length === 0
        ? 'No transactions yet — connect a wallet and make a payment'
        : undefined,
    });
  } catch (error) {
    console.error('Transactions list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions', success: false },
      { status: 500 }
    );
  }
}
