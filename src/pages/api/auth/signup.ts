import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/**
 * OMA-AI User Registration
 * 
 * Creates user account, generates API key, sets tier
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS
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
    const { email, password, wallet_address, tier = 'free' } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password required' 
      });
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({ 
        error: 'User already exists' 
      });
    }

    // Generate API key
    const apiKey = `oma-${generateApiKey()}`;

    // Create user in Supabase
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email,
        password_hash: await hashPassword(password),
        wallet_address,
        api_key: apiKey,
        tier,
        tokens_used: 0,
        tokens_limit: getTierLimit(tier),
        balance: 0,
        created_at: new Date().toISOString(),
        last_active: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        error: 'Failed to create user' 
      });
    }

    // Return user info (without password)
    return res.status(201).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        wallet_address: user.wallet_address,
        api_key: user.api_key,
        tier: user.tier,
        tokens_limit: user.tokens_limit,
        balance: user.balance
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}

// Helper functions
function generateApiKey(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function getTierLimit(tier: string): number {
  const limits = {
    free: 100000,      // 100K tokens
    starter: 1000000,  // 1M tokens
    pro: 10000000,     // 10M tokens
    enterprise: 100000000 // 100M tokens
  };
  return limits[tier as keyof typeof limits] || limits.free;
}
