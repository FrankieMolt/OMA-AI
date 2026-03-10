// Get user's credit balance
import type { NextApiRequest, NextApiResponse } from 'next';
import { validateApiKey } from '../../../lib/supabase';
import { applyCORS, handleCORSRequest } from '../../../lib/middleware/cors';
import { logError } from '../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS preflight
  if (handleCORSRequest(res)) {
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get API key from header
    const apiKey = req.headers['x-api-key'] as string;
    
    if (!apiKey || !apiKey.startsWith('oma-')) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // Validate API key and get user
    const keyData = await validateApiKey(apiKey);
    
    if (!keyData) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    const user = keyData.users as any;
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user's credit balance
    const balance = {
      credits: user.credits || 0,
      bonusCredits: user.bonus_credits || 0,
      totalCredits: (user.credits || 0) + (user.bonus_credits || 0),
      usedThisMonth: user.used_this_month || 0,
      estimatedCost: `$${((user.credits || 0) / 1000).toFixed(2)}`,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    };

    return res.status(200).json({
      success: true,
      balance
    });

  } catch (error: any) {
    logError('credits/balance', error);
    return res.status(500).json({ 
      error: 'Failed to check balance',
      details: error.message 
    });
  }
}
