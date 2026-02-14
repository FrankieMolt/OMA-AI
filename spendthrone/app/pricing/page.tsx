import { Metadata } from 'next';
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing - OMA-AI Agent Marketplace',
  description: 'Affordable pricing for AI services, bounties, and MCP servers. Pay only for what you use with transparent per-use pricing and volume discounts for enterprises.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return <PricingClient />;
}
