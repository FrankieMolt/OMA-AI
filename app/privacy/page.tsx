import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for OMA-AI',
};

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: March 2026</p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Zero Data Retention</h2>
        <p className="text-muted-foreground mb-4">
          OMA-AI operates on a strict zero-data-retention policy for all inference APIs. Your prompts, inputs, and the generated outputs are processed in memory and are <strong>never written to disk</strong>. We do not use your data to train our models, nor do we allow our upstream providers to use your data for training.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
        <p className="text-muted-foreground mb-4">
          We collect minimal information necessary to provide the service:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
          <li><strong>Wallet Addresses:</strong> If using x402, we record public wallet addresses for payment verification.</li>
          <li><strong>Usage Metrics:</strong> We log aggregate RPC call volumes (e.g., token counts) for billing purposes.</li>
          <li><strong>Account Info:</strong> Email addresses for users opting into Stripe subscriptions.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Web3 & Anonymity</h2>
        <p className="text-muted-foreground mb-4">
          By utilizing the x402 protocol, you have the option to interact with our infrastructure completely anonymously. Payments settled on-chain via USDC do not require KYC or personal identification.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
        <p className="text-muted-foreground">
          If you have questions about this Privacy Policy, please contact us at privacy@oma-ai.com.
        </p>
      </div>
    </main>
  );
}