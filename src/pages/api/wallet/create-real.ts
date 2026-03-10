/**
 * Wallet API - Create Agent Wallet (Real Database Version)
 * POST /api/wallet/create
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase, type Agent_Wallet, TABLES } from '@/lib/supabase';

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
    const { data: existingWallet, error: checkError } = await supabase
      .from(TABLES.AGENT_WALLETS)
      .select('*')
      .eq('agent_id', agentId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = not found, which is what we want
      console.error('Error checking existing wallet:', checkError);
      return res.status(500).json({
        error: 'Failed to check existing wallet',
        details: checkError.message,
      });
    }

    if (existingWallet) {
      return res.status(409).json({
        error: 'Wallet already exists for this agent',
        wallet: {
          ...existingWallet,
          wallet_address: existingWallet.wallet_address,
        },
      });
    }

    // Create new wallet
    const { data: wallet, error: insertError } = await supabase
      .from(TABLES.AGENT_WALLETS)
      .insert({
        agent_id: agentId,
        wallet_address: walletAddress.toLowerCase(),
        ens_name: ensName || null,
        chain_id: 8453, // Base network
        balance_usdc: 0,
        total_earned: 0,
        total_spent: 0,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating wallet:', insertError);
      return res.status(500).json({
        error: 'Failed to create wallet',
        details: insertError.message,
      });
    }

    res.status(201).json({
      success: true,
      wallet: {
        ...wallet,
        wallet_address: wallet.wallet_address,
      },
      message: 'Wallet created successfully',
    });
  } catch (error) {
    console.error('Error in wallet create handler:', error);
    res.status(500).json({
      error: 'Failed to create wallet',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
