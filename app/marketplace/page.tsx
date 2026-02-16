/**
 * OMA-AI Marketplace
 * SEO: Unique metadata, single H1
 */

import { Metadata } from 'next'
import MarketplacePage from './MarketplaceClient';

export const metadata: Metadata = {
  title: 'API Marketplace - Discover 450+ APIs & MCP Servers',
  description: 'The definitive marketplace for autonomous AI agents. Browse 450+ verified APIs, MCP servers, and blockchain services. Pay with x402 protocol for seamless crypto transactions.'
  keywords: ['API marketplace', 'MCP servers', 'AI tools', 'blockchain APIs', 'autonomous discovery', 'agent tools'],
}

export default function Page() {
  return <MarketplacePage />;
}
