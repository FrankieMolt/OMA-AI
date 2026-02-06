import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works | OMA-AI Agent Marketplace',
  description: 'Learn how OMA-AI works. Browse APIs, integrate MCP servers, accept x402 payments, post bounties, and build autonomous agent economies.',
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
