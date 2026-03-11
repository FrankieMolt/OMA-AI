// Deduct credits after API call
import type { NextApiRequest, NextApiResponse } from 'next';
import { calculateCreditsNeeded } from '../../../lib/credits';
import { handleCORSRequest } from '../../../lib/middleware/cors';
import { supabase } from '../../../lib/supabase';
import { createHash } from 'crypto';
import { logError } from '../../../lib/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS preflight
  if (handleCORSRequest(res)) {
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!supabase) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const apiKey = req.headers['x-api-key'] as string;
    const { model, inputTokens, outputTokens, requestId } = req.body;

    if (!apiKey || !apiKey.startsWith('oma-')) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    if (!model || !inputTokens || !outputTokens) {
      return res.status(400).json({ 
        error: 'Missing required fields: model, inputTokens, outputTokens' 
      });
    }

    // Calculate credits needed
    const creditsNeeded = calculateCreditsNeeded(model, inputTokens, outputTokens);

    // Get API key data with user info
    const keyHash = hashKey(apiKey);
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('*, users(*)')
      .eq('key_hash', keyHash)
      .eq('is_active', true)
      .single();

    if (keyError || !keyData) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    const user = keyData.users as { id: string; credits: number };
    const userId = user.id;
    const currentCredits = user.credits || 0;

    // Check if user has enough credits
    if (currentCredits < creditsNeeded) {
      return res.status(402).json({
        error: 'Insufficient credits',
        required: creditsNeeded,
        available: currentCredits
      });
    }

    // Deduct from database
    const { error: updateError } = await supabase
      .from('users')
      .update({
        credits: currentCredits - creditsNeeded,
        used_this_month: (user.used_this_month || 0) + creditsNeeded
      })
      .eq('id', userId);

    if (updateError) {
      logError('credits/deduct', updateError);
      return res.status(500).json({ error: 'Failed to deduct credits' });
    }

    const deduction = {
      requestId: requestId || `req_${Date.now()}`,
      model,
      inputTokens,
      outputTokens,
      creditsUsed: creditsNeeded,
      estimatedCost: `$${(creditsNeeded / 1000).toFixed(4)}`,
      remainingCredits: currentCredits - creditsNeeded,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json({
      success: true,
      deduction
    });

  } catch (error: unknown) {
    logError('credits/deduct', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      error: 'Failed to deduct credits',
      details: errorMessage
    });
  }
}

/**
 * Hash API key for storage
 */
function hashKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}
