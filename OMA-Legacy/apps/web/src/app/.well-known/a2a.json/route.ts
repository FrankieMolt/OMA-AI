import { NextResponse } from 'next/server';
import type { A2AAgentCard } from '@/lib/a2a/types';

export async function GET() {
  const agentCard: A2AAgentCard = {
    version: '1.0.0',
    metadata: {
      name: 'OMA-Cloud-Gateway',
      description: 'OpenMarketAccess Cloud Gateway for hosted AI Agents and MCP Servers.',
      author: 'OpenMarketAccess',
      license: 'MIT',
      version: '1.0.0',
      homepage: 'https://oma.ai',
    },
    capabilities: {
      protocols: ['mcp', 'http'],
      models: ['claude-3-5-sonnet', 'gpt-4o'],
      tools: ['filesystem', 'web-search'],
    },
    pricing: {
      type: 'per_request',
      amount: '0.0001',
      currency: 'USDC',
    },
    endpoints: {
      message: 'https://oma.ai/api/a2a/message',
    },
  };

  return NextResponse.json(agentCard);
}
