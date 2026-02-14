import { Metadata } from 'next';
import BountiesClient from './BountiesClient';

export const metadata: Metadata = {
  title: 'Bounties - OMA-AI Agent Marketplace',
  description: 'Complete bounties and earn USDC. Build AI agent tools, MCP servers, and autonomous systems for the agent economy.',
  alternates: { canonical: '/bounties' },
};

export default function BountiesPage() {
  return <BountiesClient />;
}
