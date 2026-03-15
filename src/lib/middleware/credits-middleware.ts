// Credit deduction middleware for API routes
import { calculateCreditsNeeded } from '../credits';
import { validateApiKey, supabase } from '../supabase/client';
import { logError, logInfo } from '../logger';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CreditCheckResult {
  allowed: boolean;
  creditsNeeded: number;
  error?: string;
}

export async function checkCredits(
  req: NextApiRequest,
  model: string,
  estimatedInputTokens: number,
  estimatedOutputTokens: number
): Promise<CreditCheckResult> {
  try {
    const apiKey = req.headers['x-api-key'] as string;
    
    if (!apiKey || !apiKey.startsWith('oma-')) {
      return {
        allowed: false,
        creditsNeeded: 0,
        error: 'Invalid API key'
      };
    }

    // Calculate credits needed
    const creditsNeeded = calculateCreditsNeeded(
      model,
      estimatedInputTokens,
      estimatedOutputTokens
    );

    // Free models don't need credit check
    if (creditsNeeded === 0) {
      return {
        allowed: true,
        creditsNeeded: 0
      };
    }

    // Validate API key and get user info
    const keyData = await validateApiKey(apiKey);
    
    if (!keyData || !keyData.users) {
      return {
        allowed: false,
        creditsNeeded,
        error: 'Invalid API key or user not found'
      };
    }

    const user = keyData.users as any;
    const userCredits = user.credits || 0;

    if (userCredits < creditsNeeded) {
      return {
        allowed: false,
        creditsNeeded,
        error: `Insufficient credits. Need ${creditsNeeded}, have ${userCredits}`
      };
    }

    return {
      allowed: true,
      creditsNeeded
    };

  } catch (error: any) {
    logError('credits/checkCredits', error);
    return {
      allowed: false,
      creditsNeeded: 0,
      error: 'Failed to check credits'
    };
  }
}

export async function deductCredits(
  apiKey: string,
  model: string,
  inputTokens: number,
  outputTokens: number,
  requestId: string
): Promise<{ success: boolean; remainingCredits?: number }> {
  try {
    const creditsNeeded = calculateCreditsNeeded(model, inputTokens, outputTokens);

    // Free models
    if (creditsNeeded === 0) {
      return { success: true };
    }

    // Get API key data
    const keyHash = await hashKey(apiKey);
    const { data: keyData } = await supabase!
      .from('api_keys')
      .select('*, users(*)')
      .eq('key_hash', keyHash)
      .eq('is_active', true)
      .single();

    if (!keyData) {
      logError('credits/deductCredits', 'Invalid API key');
      return { success: false };
    }

    const user = keyData.users as any;
    const userId = user.id;
    const currentCredits = user.credits || 0;
    const usedThisMonth = user.used_this_month || 0;

    // Update user credits
    const { error } = await supabase!
      .from('users')
      .update({
        credits: currentCredits - creditsNeeded,
        used_this_month: usedThisMonth + creditsNeeded
      })
      .eq('id', userId);

    if (error) {
      logError('credits/deductCredits', error);
      return { success: false };
    }

    logInfo('credits/deductCredits', `Deducted ${creditsNeeded} credits for ${requestId}`);
    
    return { 
      success: true,
      remainingCredits: currentCredits - creditsNeeded
    };

  } catch (error: any) {
    logError('credits/deductCredits', error);
    return { success: false };
  }
}

// Wrapper for API routes with automatic credit deduction
export function withCredits(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  options: {
    modelParam?: string;
    estimateTokens?: (req: NextApiRequest) => { input: number; output: number };
  } = {}
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Extract model from request
    const model = options.modelParam 
      ? req.body[options.modelParam]
      : req.body.model;

    if (!model) {
      return res.status(400).json({ error: 'Model not specified' });
    }

    // Estimate tokens
    const tokens = options.estimateTokens 
      ? options.estimateTokens(req)
      : { input: 500, output: 500 }; // Default estimate

    // Check credits
    const check = await checkCredits(req, model, tokens.input, tokens.output);
    
    if (!check.allowed) {
      return res.status(402).json({ 
        error: check.error || 'Insufficient credits',
        creditsNeeded: check.creditsNeeded
      });
    }

    // Add credit info to request
    (req as any).creditsNeeded = check.creditsNeeded;

    // Execute handler
    await handler(req, res);
  };
}

/**
 * Hash API key for storage
 */
async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data.buffer as ArrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
