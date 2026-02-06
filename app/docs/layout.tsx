import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation | OMA-AI - API Marketplace for AI Agents',
  description: 'Complete documentation for OMA-AI. Learn to integrate x402 payments, MCP servers, APIs, and build autonomous agent marketplaces.',
  keywords: 'OMA-AI documentation, API marketplace, x402 payments, MCP integration, AI agents, Web3 payments',
  openGraph: {
    title: 'Documentation | OMA-AI - API Marketplace for AI Agents',
    description: 'Complete documentation for OMA-AI. Learn to integrate x402 payments, MCP servers, APIs, and build autonomous agent marketplaces.',
    type: 'website',
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
