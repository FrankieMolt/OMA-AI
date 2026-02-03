import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { x402Middleware } from '@/lib/x402-middleware';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  internalErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { logger } from '@/lib/logger';

const openai = new OpenAI({
  baseURL: process.env.NEXT_PUBLIC_OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // 1. OMA handles the "Anon" layer via x402 payment verification
    // Price: 0.0001 USDC per request (mock price)
    // Wallet: OMA Treasury
    const treasuryWallet = process.env.NEXT_PUBLIC_TREASURY_WALLET || process.env.OMA_TREASURY_WALLET;
    
    if (!treasuryWallet) {
        logger.error('Treasury wallet not configured', { requestId });
        return internalErrorResponse('Treasury wallet not configured', requestId);
    }

    const paymentCheck = await x402Middleware(request, 0.0001, treasuryWallet);
    if (paymentCheck) return paymentCheck;

    const body = await request.json();
    const {
      model = 'openai/gpt-4-turbo',
      messages = [],
      stream = false,
      temperature = 0.7,
      maxTokens = 1000,
    } = body;

    if (!messages || messages.length === 0) {
      logger.warn('Invalid generate request - messages required', { requestId });
      return validationErrorResponse('Messages array is required', undefined, requestId);
    }

    if (!process.env.OPENROUTER_API_KEY) {
      logger.error('OpenRouter API key not configured', { requestId });
      return errorResponse(
        'OpenRouter API key not configured',
        500,
        'INTERNAL_SERVER_ERROR',
        undefined,
        requestId
      );
    }

    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream,
    });

    if (stream) {
      return new Response(
        new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of completion as unknown as AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>) {
                const text = chunk.choices?.[0]?.delta?.content || '';
                if (text) {
                  controller.enqueue(new TextEncoder().encode(text));
                }
              }
              controller.close();
            } catch (streamError) {
              logger.error('Stream generation error', {
                error: streamError instanceof Error ? streamError.message : String(streamError),
                requestId,
              });
              controller.error(streamError);
            }
          },
        }),
        {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
            'X-Request-ID': requestId,
          },
        }
      );
    }

    logger.info('Completion generated successfully', { model, requestId });
    return successResponse({
      id: completion.id,
      model: completion.model,
      choices: completion.choices,
      usage: completion.usage,
    });
  } catch (error) {
    logger.error('Generate completion error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      requestId,
    });
    return internalErrorResponse('Failed to generate completion', requestId);
  }
}
