import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for OMA-AI',
};

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-muted-foreground mb-4">Last updated: March 2026</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground mb-4">
          By accessing or using the OMA-AI API and infrastructure, you agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
        <p className="text-muted-foreground mb-4">
          OMA-AI provides API access to various Large Language Models (LLMs), tools, and MCP servers. The service is provided "as is" and "as available".
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. x402 Protocol & Payments</h2>
        <p className="text-muted-foreground mb-4">
          For users utilizing the x402 micropayment protocol, you are responsible for ensuring sufficient funds (USDC) in your wallet. Transactions settled on-chain are final and non-refundable. OMA-AI is not responsible for network fees (gas) incurred on the Base or Solana networks.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Acceptable Use</h2>
        <p className="text-muted-foreground mb-4">
          While we provide uncensored models, you agree not to use the service for:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
          <li>Generating child sexual abuse material (CSAM).</li>
          <li>Conducting automated cyberattacks or network exploitation.</li>
          <li>Mass generation of spam or fraudulent content.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
        <p className="text-muted-foreground">
          OMA-AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
        </p>
      </div>
    </main>
  );
}