/**
 * OMA-AI Marketplace
 * SEO: Unique metadata, single H1
 */

import { Metadata } from 'next'
import MarketplacePage from './MarketplaceClient';

export const metadata: Metadata = {
  title: 'API Marketplace | 450+ Verified APIs & MCP Servers for AI Agents',
  description: 'Discover and integrate 450+ verified APIs and Model Context Protocol servers. The leading marketplace for autonomous AI agents with instant x402 crypto payments.',
  keywords: ['API marketplace', 'MCP servers', 'AI tools', 'blockchain APIs', 'autonomous discovery', 'agent tools'],
}

export default function Page() {
  return <MarketplacePage />;
}
