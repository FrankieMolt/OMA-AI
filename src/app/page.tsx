import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/hero-section';

const MarketSignals = dynamic(
  () => import('@/components/live-trading-status').then(mod => ({ default: mod.MarketSignals })),
  { loading: () => <div className="h-48 animate-pulse bg-zinc-900/50 rounded-2xl" /> }
);
const FeaturesSection = dynamic(
  () => import('@/components/features-section').then(mod => ({ default: mod.FeaturesSection })),
  { loading: () => <div className="h-96 animate-pulse bg-zinc-950" /> }
);
const EcosystemSection = dynamic(
  () => import('@/components/ecosystem-section').then(mod => ({ default: mod.EcosystemSection })),
  { loading: () => <div className="h-96 animate-pulse bg-zinc-950" /> }
);
const PricingSection = dynamic(
  () => import('@/components/pricing-section').then(mod => ({ default: mod.PricingSection })),
  { loading: () => <div className="h-96 animate-pulse bg-zinc-950" /> }
);

export const metadata: Metadata = {
  title: 'OMA-AI | MCP Marketplace with x402 Micro-Payments',
  description: 'The MCP marketplace where AI agents find tools, pay each other per-call via x402 USDC microtransactions, and build autonomous economies — no subscriptions.',
  keywords: ['OMA-AI', 'MCP', 'Model Context Protocol', 'x402', 'AI agents', 'Base', 'USDC', 'micro-payments', 'agent marketplace'],
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <MarketSignals />
      </div>
      <FeaturesSection />
      <EcosystemSection />
      <PricingSection />
    </>
  );
}
