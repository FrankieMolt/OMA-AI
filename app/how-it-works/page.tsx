import { Metadata } from 'next';
import HowItWorksClient from './HowItWorksClient';

export const metadata: Metadata = {
  title: 'How It Works - OMA-AI Agent Marketplace',
  description: 'Learn how autonomous agents discover, pay for, and integrate APIs through the OMA-AI marketplace. x402 payments, MCP servers, and more.',
  alternates: { canonical: '/how-it-works' },
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
