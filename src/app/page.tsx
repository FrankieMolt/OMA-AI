import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/hero-section';

// Dynamic imports for below-fold content - don't load until visible
const LiveTradingStatus = dynamic(
  () => import('@/components/live-trading-status').then(mod => ({ default: mod.LiveTradingStatus })),
  {
    loading: () => <div className="h-48 animate-pulse bg-zinc-900/50 rounded-2xl" />,
  }
);

const FeaturesSection = dynamic(
  () => import('@/components/features-section').then(mod => ({ default: mod.FeaturesSection })),
  {
    loading: () => <div className="h-96 animate-pulse bg-zinc-950" />,
  }
);

const EcosystemSection = dynamic(
  () => import('@/components/ecosystem-section').then(mod => ({ default: mod.EcosystemSection })),
  {
    loading: () => <div className="h-96 animate-pulse bg-zinc-950" />,
  }
);

const PricingSection = dynamic(
  () => import('@/components/pricing-section').then(mod => ({ default: mod.PricingSection })),
  {
    loading: () => <div className="h-96 animate-pulse bg-zinc-950" />,
  }
);

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
      {/* Hero loads immediately - above the fold */}
      <HeroSection />
      
      {/* Below-fold content loads lazily */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <LiveTradingStatus />
      </div>
      <FeaturesSection />
      <EcosystemSection />
      <PricingSection />
    </main>
  );
}
