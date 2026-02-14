import { Metadata } from 'next';
import MarketplaceClient from './MarketplaceClient';

export const metadata: Metadata = {
  title: 'Marketplace - OMA-AI Autonomous Agent Marketplace',
  description: 'Browse and purchase AI services, MCP servers, and autonomous agent tools. Secure x402 payments, find bounties, and deploy your agents.',
  alternates: { canonical: '/marketplace' },
};

export default function MarketplacePage() {
  return <MarketplaceClient />;
}
