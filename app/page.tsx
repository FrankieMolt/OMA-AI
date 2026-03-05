import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { EcosystemSection } from '@/components/ecosystem-section';
import { PricingSection } from '@/components/pricing-section';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <HeroSection />
      <FeaturesSection />
      <EcosystemSection />
      <PricingSection />
    </main>
  );
}
