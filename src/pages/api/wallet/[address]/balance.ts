/**
 * Wallet API - Get Balance
 * GET /api/wallet/:address/balance
 */

import type { NextApiRequest, NextApiResponse } from 'next';

interface AgentWallet {
  id: string;
  agentId: string;
  walletAddress: string;
  ensName: string | null;
  chainId: number;
  balanceUsdc: number;
  totalEarned: number;
  totalSpent: number;
  updatedAt: string;
}

// Mock database for MVP (replace with real Supabase queries)
const AGENT_WALLETS: Record<string, AgentWallet> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=5');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { address } = req.query;

    // Validate address
    if (!address || typeof address !== 'string') {
      return res.status(400).json({
        error: 'Invalid address parameter',
      });
    }

    // Find wallet by address
    const wallet = Object.values(AGENT_WALLETS).find(
      (w) => w.walletAddress.toLowerCase() === address.toLowerCase()
    );

    if (!wallet) {
      return res.status(404).json({
        error: 'Wallet not found',
        details: `No wallet found for address ${address}`,
      });
    }

    res.status(200).json({
      success: true,
      wallet: {
        id: wallet.id,
        agentId: wallet.agentId,
        walletAddress: wallet.walletAddress,
        ensName: wallet.ensName,
        chainId: wallet.chainId,
        balanceUsdc: wallet.balanceUsdc,
        totalEarned: wallet.totalEarned,
        totalSpent: wallet.totalSpent,
        updatedAt: wallet.updatedAt,
      },
      network: {
        name: 'Base',
        chainId: wallet.chainId,
        token: 'USDC',
        tokenAddress: '0x833589fCD6eDb6E436a3436C41499a87E6Dd13',
      },
    });
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    res.status(500).json({
      error: 'Failed to fetch wallet balance',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
