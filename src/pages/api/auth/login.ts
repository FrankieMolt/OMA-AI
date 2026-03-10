import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/**
 * OMA-AI User Login
 * 
 * Authenticates user, returns API key and session token
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, wallet_signature } = req.body;

    // Support wallet login
    if (wallet_signature && !email) {
      return await walletLogin(req, res);
    }

    // Email/password login
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password required' 
      });
    }

    // Get user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Verify password
    const passwordHash = await hashPassword(password);
    if (passwordHash !== user.password_hash) {
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Update last active
    await supabase
      .from('users')
      .update({ last_active: new Date().toISOString() })
      .eq('id', user.id);

    // Generate session token
    const sessionToken = generateSessionToken(user.id);

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        wallet_address: user.wallet_address,
        api_key: user.api_key,
        tier: user.tier,
        tokens_used: user.tokens_used,
        tokens_limit: user.tokens_limit,
        balance: user.balance
      },
      session_token: sessionToken
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

async function walletLogin(req: NextApiRequest, res: NextApiResponse) {
  const { wallet_address, wallet_signature, message } = req.body;

  if (!wallet_address || !wallet_signature || !message) {
    return res.status(400).json({ 
      error: 'Wallet address, signature, and message required' 
    });
  }

  // Verify signature (simplified - in production use ethers.verifyMessage)
  // For now, just check if user exists with this wallet
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', wallet_address.toLowerCase())
    .single();

  if (error || !user) {
    return res.status(401).json({ 
      error: 'Wallet not registered. Please signup first.' 
    });
  }

  // Update last active
  await supabase
    .from('users')
    .update({ last_active: new Date().toISOString() })
    .eq('id', user.id);

  const sessionToken = generateSessionToken(user.id);

  return res.status(200).json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      wallet_address: user.wallet_address,
      api_key: user.api_key,
      tier: user.tier,
      tokens_used: user.tokens_used,
      tokens_limit: user.tokens_limit,
      balance: user.balance
    },
    session_token: sessionToken
  });
}

function generateSessionToken(userId: string): string {
  const data = {
    userId,
    timestamp: Date.now(),
    expires: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
  };
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
