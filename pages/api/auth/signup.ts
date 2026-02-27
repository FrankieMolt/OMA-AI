import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase, getOrCreateUser, generateApiKey } from '../../lib/supabase';

interface SignupRequest {
  email?: string;
  password?: string;
  wallet_address?: string;
}

interface SignupResponse {
  success: boolean;
  user?: {
    id: string;
    email?: string;
    wallet_address?: string;
  };
  api_key?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignupResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { email, password, wallet_address } = req.body as SignupRequest;

    // Wallet-based signup
    if (wallet_address) {
      if (!supabase) {
        // Fallback: generate mock response for demo
        const mockUserId = 'user_' + Math.random().toString(36).substring(2, 15);
        const mockApiKey = 'oma_' + Math.random().toString(36).substring(2, 15) + 
                          Math.random().toString(36).substring(2, 15);
        
        return res.status(200).json({
          success: true,
          user: {
            id: mockUserId,
            wallet_address
          },
          api_key: mockApiKey
        });
      }

      const user = await getOrCreateUser(wallet_address);
      
      if (!user) {
        return res.status(500).json({ success: false, error: 'Failed to create user' });
      }

      // Generate API key
      const keyData = await generateApiKey(user.id, 'Default Key');

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          wallet_address: user.wallet_address
        },
        api_key: keyData?.key
      });
    }

    // Email-based signup
    if (email && password) {
      if (!supabase) {
        // Fallback: generate mock response for demo
        const mockUserId = 'user_' + Math.random().toString(36).substring(2, 15);
        const mockApiKey = 'oma_' + Math.random().toString(36).substring(2, 15) + 
                          Math.random().toString(36).substring(2, 15);
        
        return res.status(200).json({
          success: true,
          user: {
            id: mockUserId,
            email
          },
          api_key: mockApiKey
        });
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return res.status(400).json({ success: false, error: error.message });
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
    console.error('Signup error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}
