import { ModelMarketplace } from '@/components/model-marketplace';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Model Marketplace',
  description: 'Access 50+ AI models with transparent, pay-per-call pricing via x402.',
};

export default function ModelsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Model Marketplace</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Browse our curated catalog of text, code, and image models. 
          Connect your wallet and pay only for the tokens you consume.
        </p>
      </div>
      
      <ModelMarketplace />
    </main>
  );
}