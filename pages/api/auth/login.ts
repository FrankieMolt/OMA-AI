import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase, getUserByWallet } from '../../lib/supabase';

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
  api_keys?: Array<{ name: string; created_at: string; last_used?: string }>;
  stats?: {
    total_calls: number;
    calls_this_month: number;
    earnings: number;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { email, password, wallet_address } = req.body as LoginRequest;

    // Wallet-based login
    if (wallet_address) {
      if (!supabase) {
        // Fallback: generate mock response for demo
        return res.status(200).json({
          success: true,
          user: {
            id: 'user_demo_' + Math.random().toString(36).substring(2, 10),
            wallet_address
          },
          api_keys: [
            { name: 'Default Key', created_at: new Date().toISOString(), last_used: new Date().toISOString() }
          ],
          stats: {
            total_calls: 1247,
            calls_this_month: 342,
            earnings: 12.47
          }
        });
      }

      const user = await getUserByWallet(wallet_address);
      
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      // Get API keys
      const { data: apiKeys } = await supabase
        .from('api_keys')
        .select('name, created_at, last_used')
        .eq('user_id', user.id);

      // Get stats
      const { count: totalCalls } = await supabase
        .from('api_calls')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          wallet_address: user.wallet_address
        },
        api_keys: apiKeys || [],
        stats: {
          total_calls: totalCalls || 0,
          calls_this_month: 0,
          earnings: 0
        }
      });
    }

    // Email-based login
    if (email && password) {
      if (!supabase) {
        // Fallback: generate mock response for demo
        return res.status(200).json({
          success: true,
          user: {
            id: 'user_demo_' + Math.random().toString(36).substring(2, 10),
            email
          },
          api_keys: [
            { name: 'Default Key', created_at: new Date().toISOString() }
          ],
          stats: {
            total_calls: 1247,
            calls_this_month: 342,
            earnings: 12.47
          }
        });
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return res.status(401).json({ success: false, error: error.message });
      }

      return res.status(200).json({
        success: true,
        user: {
          id: data.user?.id || '',
          email: data.user?.email
        }
      });
    }

    return res.status(400).json({ success: false, error: 'Email/password or wallet_address required' });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}
