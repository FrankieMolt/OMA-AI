import { NextRequest, NextResponse } from 'next/server';
import { calculateCreditsNeeded } from '../credits';
import { validateApiKey } from '../supabase/client';
import { logError, logInfo } from '../logger';

interface CreditCheckResult {
  allowed: boolean;
  creditsNeeded: number;
  error?: string;
}

export async function checkCredits(
  request: NextRequest,
  model: string,
  estimatedInputTokens: number,
  estimatedOutputTokens: number
): Promise<CreditCheckResult> {
  try {
    const apiKey = request.headers.get('x-api-key');
    
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    // Validate API key and get key data
    const keyData = await validateApiKey(apiKey);
    
    if (!keyData || !keyData.users) {
      logError('credits/deductCredits', 'Invalid API key');
      return { success: false };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = keyData.users as any;
    const userId = user.id;
    const currentCredits = user.credits || 0;
    const usedThisMonth = user.used_this_month || 0;

    // Import supabase here to avoid circular dependencies
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // Update user credits
    const { error } = await supabase
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logError('credits/deductCredits', error);
    return { success: false };
  }
}

// Wrapper for API routes with automatic credit deduction
export async function withCredits(
  request: NextRequest,
  handler: (req: NextRequest, creditsNeeded: number) => Promise<NextResponse>,
  options: {
    modelParam?: string;
    estimateTokens?: (req: NextRequest) => { input: number; output: number };
  } = {}
): Promise<NextResponse> {
  // Extract model from request
  let model: string | null = null;
  
  if (options.modelParam && request.method === 'POST') {
    try {
      const body = await request.json();
      model = body[options.modelParam];
    } catch {}
  }
  
  if (!model) {
    return NextResponse.json(
      { error: 'Model not specified' },
      { status: 400 }
    );
  }

  // Estimate tokens
  const tokens = options.estimateTokens 
    ? options.estimateTokens(request)
    : { input: 500, output: 500 }; // Default estimate

  // Check credits
  const check = await checkCredits(request, model, tokens.input, tokens.output);
  
  if (!check.allowed) {
    return NextResponse.json(
      { 
        error: check.error || 'Insufficient credits',
        creditsNeeded: check.creditsNeeded
      },
      { status: 402 }
    );
  }

  // Execute handler with credits info
  return handler(request, check.creditsNeeded);
}
