import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * OMA-AI API Index
 * 
 * Lists all available endpoints and their status
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.status(200).json({
    name: 'OMA-AI API',
    version: '2.0.0',
    status: 'operational',
    
    authentication: {
      signup: {
        endpoint: '/api/auth/signup',
        method: 'POST',
        description: 'Create new account',
        auth_required: false
      },
      login: {
        endpoint: '/api/auth/login',
        method: 'POST',
        description: 'Login to account',
        auth_required: false
      }
    },

    llm: {
      v1: {
        endpoint: '/api/llm',
        method: 'POST',
        description: 'LLM inference (legacy)',
        auth_required: false,
        x402_enabled: true
      },
      v2: {
        endpoint: '/api/llm-v2',
        method: 'POST',
        description: 'LLM inference with auth + rate limiting',
        auth_required: false,
        x402_enabled: true,
        features: ['authentication', 'rate_limiting', 'token_tracking']
      }
    },

    payments: {
      stripe: {
        endpoint: '/api/payments/stripe',
        method: 'POST',
        description: 'Stripe subscription checkout',
        auth_required: false
      },
      x402: {
        endpoint: '/api/payment-status',
        method: 'POST',
        description: 'X402 micropayment processing',
        auth_required: false,
        networks: ['base', 'solana']
      }
    },

    user: {
      dashboard: {
        endpoint: '/api/dashboard',
        method: 'GET',
        description: 'User dashboard & stats',
        auth_required: true
      },
      usage: {
        endpoint: '/api/usage',
        method: 'GET',
        description: 'Usage tracking & history',
        auth_required: true
      }
    },

    other: {
      health: '/api/health',
      models: '/api/llms',
      prices: '/api/prices'
    },

    rate_limits: {
      free: { rpm: 5, rpd: 50 },
      starter: { rpm: 20, rpd: 500 },
      pro: { rpm: 60, rpd: 5000 },
      enterprise: { rpm: 200, rpd: 50000 }
    },

    pricing: {
      subscription: {
        free: '$0/month',
        starter: '$29/month',
        pro: '$99/month',
        enterprise: '$299/month'
      },
      x402: {
        llm: '$0.01-0.05 per request',
        search: '$0.005 per request',
        weather: '$0.002 per request'
      }
    },

    docs: 'https://oma-ai.com/docs',
    support: 'support@oma-ai.com'
  });
}
