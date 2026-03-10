/**
 * Wallet API - Create Agent Wallet
 * POST /api/wallet/create
 */

import type { NextApiRequest, NextApiResponse } from 'next';

// Mock database for MVP (replace with real Supabase queries)
const AGENT_WALLETS: Record<string, any> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { agentId, walletAddress, ensName } = req.body;

    // Validate required fields
    if (!agentId || !walletAddress) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: {
          agentId: agentId ? 'present' : 'missing',
          walletAddress: walletAddress ? 'present' : 'missing',
        },
      });
    }

    // Validate wallet address format
    if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      return res.status(400).json({
        error: 'Invalid wallet address format',
        details: 'Expected 0x followed by 40 hexadecimal characters',
      });
    }

    // Check if wallet already exists for this agent
    const existingWallet = AGENT_WALLETS[agentId];
    if (existingWallet) {
      return res.status(409).json({
        error: 'Wallet already exists for this agent',
        wallet: {
          ...existingWallet,
          walletAddress: existingWallet.walletAddress,
        },
      });
    }

    // Create new wallet
    const wallet = {
      id: `wallet_${Date.now()}`,
      agentId,
      walletAddress: walletAddress.toLowerCase(),
      ensName: ensName || null,
      chainId: 8453, // Base network
      balanceUsdc: 0,
      totalEarned: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    AGENT_WALLETS[agentId] = wallet;

    res.status(201).json({
      success: true,
      wallet: {
        ...wallet,
        walletAddress: wallet.walletAddress,
      },
      message: 'Wallet created successfully',
    });
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({
      error: 'Failed to create wallet',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
