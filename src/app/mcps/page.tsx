import { Metadata } from 'next';
import MCPMarketplaceClient from './MCPMarketplaceClient';

export const metadata: Metadata = {
  title: 'MCP Marketplace - Discover and Deploy AI Agent Tools | OMA-AI',
  description: 'Browse 34+ verified MCP servers. Web search, blockchain, databases & productivity tools for AI agents. Pay-per-use with x402 micro-payments on Base.',
  keywords: ['MCP Marketplace', 'Model Context Protocol', 'AI agent tools', 'MCP servers', 'x402 payments'],
};

export default function MCPMarketplacePage() {
  return <MCPMarketplaceClient />;
}
