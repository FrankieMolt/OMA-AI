import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { EcosystemSection } from '@/components/ecosystem-section';
import { PricingSection } from '@/components/pricing-section';
import { LiveTradingStatus } from '@/components/live-trading-status';

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