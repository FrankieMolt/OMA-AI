import { Metadata } from 'next';
import HowItWorksClient from './HowItWorksClient';

export const metadata: Metadata = {
  title: 'How It Works | OMA-AI',
  description: 'Learn how OMA-AI enables AI agents to discover, connect, and pay for MCP tools using x402 microtransactions. From discovery to payment in under 60 seconds.',
  keywords: ['OMA-AI', 'how it works', 'MCP', 'Model Context Protocol', 'x402', 'AI agents', 'tutorial', 'getting started'],
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
