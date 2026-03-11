import { Metadata } from 'next';
import { PricingSection } from '@/components/pricing-section';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for OMA-AI. Pay per token, no subscriptions. x402-powered payments on Base.',
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Simple Pricing</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Pay per token. No subscriptions. No hidden fees. Our x402-powered treasury ensures you only pay for exactly what you compute.
          </p>
        </div>
        <PricingSection />
      </div>
    </main>
  );
}
