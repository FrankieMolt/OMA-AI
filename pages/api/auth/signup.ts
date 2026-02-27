import type { NextApiRequest, NextApiResponse } from 'next';

// Simple in-memory store for demo (would use database in production)
const users: Record<string, any> = {};

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
    const { email, password, wallet_address } = req.body as SignupRequest;

    // Validate input
    if (!email && !wallet_address) {
      return res.status(400).json({ success: false, error: 'Email or wallet address required' });
    }

    // Generate user ID
    const userId = 'user_' + Math.random().toString(36).substring(2, 15);
    
    // Generate API key
    const apiKey = 'oma_' + Math.random().toString(36).substring(2, 15) + 
                   Math.random().toString(36).substring(2, 15);
    
    // Store user
    const user = {
      id: userId,
      email: email || undefined,
      wallet_address: wallet_address || undefined,
      created_at: new Date().toISOString()
    };
    
    users[userId] = user;

    // Return success
    return res.status(200).json({
      success: true,
      user,
      api_key: apiKey
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Signup failed' 
    });
  }
}
