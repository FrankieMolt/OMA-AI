import { Metadata } from 'next';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { EcosystemSection } from '@/components/ecosystem-section';
import { PricingSection } from '@/components/pricing-section';
import { LiveTradingStatus } from '@/components/live-trading-status';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'OMA-AI | OpenMarketAccess - Autonomous Agent Infrastructure',
  description: 'Build and deploy AI agents with x402 payments, MCP integrations, and decentralized agent economy on Base network.',
  keywords: ['OMA-AI', 'MCP', 'Model Context Protocol', 'x402', 'AI agents', 'Base', 'USDC'],
  openGraph: {
    title: 'OMA-AI | OpenMarketAccess',
    description: 'Build and deploy AI agents with x402 payments and MCP integrations',
    type: 'website',
    url: 'https://oma-ai.com',
  },
};

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-zinc-950">
        <HeroSection />
        <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
          <LiveTradingStatus />
        </div>
        <FeaturesSection />
        <EcosystemSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}