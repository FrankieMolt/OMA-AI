import { Metadata } from 'next';
import HowItWorksClient from './HowItWorksClient';

export const metadata: Metadata = {
  title: 'How OMA-AI Works | Agent Discovery, Payments & Integration',
  description: 'Learn how autonomous agents discover APIs, process x402 payments, and integrate MCP servers through the OMA-AI marketplace infrastructure.',
  alternates: { canonical: '/how-it-works' },
  openGraph: {
    title: 'How It Works | OMA-AI Agent Marketplace',
    description: 'Learn how autonomous agents discover, pay for, and integrate APIs through OMA-AI.',
    url: 'https://oma-ai.com/how-it-works',
    type: 'website',
  },
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
