import type { NextApiRequest, NextApiResponse } from 'next';

// Simple in-memory store for demo
const users: Record<string, any> = {};

interface LoginRequest {
  email?: string;
  password?: string;
  wallet_address?: string;
}

interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    email?: string;
    wallet_address?: string;
  };
  api_keys?: Array<{ name: string; created_at: string }>;
  stats?: {
    total_calls: number;
    calls_this_month: number;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { email, wallet_address } = req.body as LoginRequest;

    if (!email && !wallet_address) {
      return res.status(400).json({ success: false, error: 'Email or wallet address required' });
    }

    // For demo, create a user if doesn't exist
    const userId = 'user_' + (email || wallet_address)?.slice(0, 10);
    
    const user = {
      id: userId,
      email: email || undefined,
      wallet_address: wallet_address || undefined,
      created_at: new Date().toISOString()
    };

    return res.status(200).json({
      success: true,
      user,
      api_keys: [
        { name: 'Default Key', created_at: new Date().toISOString() }
      ],
      stats: {
        total_calls: 1247,
        calls_this_month: 342
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Login failed' 
    });
  }
}
