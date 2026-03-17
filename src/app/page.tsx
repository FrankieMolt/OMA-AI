import { Metadata } from 'next';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { EcosystemSection } from '@/components/ecosystem-section';
import { PricingSection } from '@/components/pricing-section';
import { LiveTradingStatus } from '@/components/live-trading-status';

export const metadata: Metadata = {
  title: 'OMA-AI | Premier MCP Marketplace with x402 Gasless Payments',
  description: 'Discover, deploy, and monetize AI agents with 19+ verified MCP servers. Gasless x402 payments on Base network - no API keys, no subscriptions.',
  keywords: ['OMA-AI', 'MCP', 'Model Context Protocol', 'x402', 'AI agents', 'Base', 'USDC', 'gasless payments', 'agent economy'],
  openGraph: {
    title: 'OMA-AI | Premier MCP Marketplace with x402 Gasless Payments',
    description: 'Discover, deploy, and monetize AI agents with 19+ verified MCP servers. Gasless x402 payments on Base network - no API keys, no subscriptions.',
    type: 'website',
    url: 'https://oma-ai.com',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <LiveTradingStatus />
      </div>
      <FeaturesSection />
      <EcosystemSection />
      <PricingSection />
    </main>
  );
}