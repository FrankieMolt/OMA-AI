import { Metadata } from 'next';
import MCPMarketplace from '@/components/mcp-marketplace/MCPMarketplace';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'MCP Marketplace | OMA-AI',
  description: 'Discover and integrate MCP (Model Context Protocol) tools for AI agents. Monetize your tools with x402 payments.',
  keywords: ['MCP', 'Model Context Protocol', 'AI agents', 'x402', 'marketplace'],
};

export default function MCPMarketplacePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-zinc-950 pt-16">
        <MCPMarketplace />
      </main>
      <Footer />
    </>
  );
}
