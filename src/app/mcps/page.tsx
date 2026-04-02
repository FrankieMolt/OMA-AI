import { Metadata } from 'next';
import MCPMarketplaceClient from './MCPMarketplaceClient';

export const metadata: Metadata = {
  title: 'MCP Marketplace | OMA-AI',
  description: 'Browse 19+ verified MCP servers with x402 micro-payments. Web search, blockchain, databases, and productivity tools for AI agents.',
  keywords: ['MCP', 'Model Context Protocol', 'MCP marketplace', 'x402', 'AI agents', 'micro-payments'],
};

export default function MCPMarketplacePage() {
  return <MCPMarketplaceClient />;
}
