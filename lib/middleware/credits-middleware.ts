// Credit deduction middleware for API routes
import { calculateCreditsNeeded } from './credits';
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

    // TODO: Query database for user's credit balance
    // const userCredits = await getUserCredits(apiKey);
    const userCredits = 55000; // Mock

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
    console.error('Credit check error:', error);
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

    // TODO: Deduct from database
    // await deductUserCredits(apiKey, creditsNeeded, requestId);
    
    console.log(`[CREDITS] Deducted ${creditsNeeded} credits for ${requestId}`);
    
    return { 
      success: true,
      remainingCredits: 55000 - creditsNeeded // Mock
    };

  } catch (error: any) {
    console.error('Credit deduction error:', error);
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
