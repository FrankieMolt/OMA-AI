/**
 * OMA-AI OpenRouter AI Services API
 *
 * Provides access to various LLM models via OpenRouter
 */

import { NextRequest, NextResponse } from 'next/server';
import { addSecurityHeaders } from '@/lib/security';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

/**
 * Available LLM Models
 */
export const AVAILABLE_MODELS = {
  'openai/gpt-4-turbo': {
    id: 'openai/gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    price_per_1k_input: 0.01,
    price_per_1k_output: 0.03,
    context_length: 128000,
    capabilities: ['chat', 'code', 'analysis'],
  },
  'openai/gpt-3.5-turbo': {
    id: 'openai/gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    price_per_1k_input: 0.0005,
    price_per_1k_output: 0.0015,
    context_length: 16385,
    capabilities: ['chat', 'code'],
  },
  'anthropic/claude-3-opus': {
    id: 'anthropic/claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    price_per_1k_input: 0.015,
    price_per_1k_output: 0.075,
    context_length: 200000,
    capabilities: ['chat', 'code', 'analysis', 'creative'],
  },
  'anthropic/claude-3-sonnet': {
    id: 'anthropic/claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    price_per_1k_input: 0.003,
    price_per_1k_output: 0.015,
    context_length: 200000,
    capabilities: ['chat', 'code', 'analysis'],
  },
  'google/gemini-pro': {
    id: 'google/gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    price_per_1k_input: 0.0005,
    price_per_1k_output: 0.0015,
    context_length: 91728,
    capabilities: ['chat', 'code', 'multimodal'],
  },
  'meta-llama/llama-3-70b-chat': {
    id: 'meta-llama/llama-3-70b-chat',
    name: 'Llama 3 70B',
    provider: 'Meta',
    price_per_1k_input: 0.0007,
    price_per_1k_output: 0.0007,
    context_length: 8192,
    capabilities: ['chat', 'code', 'open-source'],
  },
};

/**
 * GET: List available models
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let models = Object.values(AVAILABLE_MODELS);

  // Filter by category
  if (category) {
    models = models.filter((model) => model.capabilities.includes(category));
  }

  return NextResponse.json({
    success: true,
    models,
    count: models.length,
  });
}

/**
 * POST: Generate completion
 */
export async function POST(request: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: 'OpenRouter API key not configured' },
      { status: 503 }
    );
  }

  try {
    const { model, messages, max_tokens, temperature, stream } = await request.json();

    // Validate required fields
    if (!model || !messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Missing required fields: model, messages' },
        { status: 400 }
      );
    }

    // Check if model is available
    if (!AVAILABLE_MODELS[model as keyof typeof AVAILABLE_MODELS]) {
      return NextResponse.json(
        { error: 'Model not available', availableModels: Object.keys(AVAILABLE_MODELS) },
        { status: 400 }
      );
    }

    // Call OpenRouter API
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://oma-ai.com',
        'X-Title': 'OMA-AI',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: max_tokens || 1024,
        temperature: temperature || 0.7,
        stream: stream || false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error?.message || 'OpenRouter API error' },
        { status: response.status }
      );
    }

    const data = await response.json();

    const apiResponse = NextResponse.json({
      success: true,
      model: data.model,
      choices: data.choices,
      usage: data.usage,
      created: data.created,
    });

    return addSecurityHeaders(apiResponse);
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
