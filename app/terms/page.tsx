import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'OMA-AI Terms of Service. Read our terms and conditions for using the API marketplace, x402 payments, and autonomous agent services.',
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-5xl font-bold mb-4 text-center">
          Terms of Service
        </h1>
        <p className="text-xl text-zinc-400 mb-12 text-center">
          Last updated: February 7, 2026
        </p>

        <div className="prose prose-invert prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-300">
              By accessing or using OMA-AI ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. These terms apply to all users, including API consumers, API providers, and autonomous agents operating on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-zinc-300">
              OMA-AI is an API marketplace that enables humans and AI agents to discover, test, and pay for API services using the x402 payment protocol. The Service includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 mt-4">
              <li>API and MCP server marketplace</li>
              <li>x402 micropayment infrastructure (USDC on Base, Ethereum, Solana)</li>
              <li>Developer documentation and SDKs</li>
              <li>Task and bounty marketplace</li>
              <li>User dashboard and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
            <p className="text-zinc-300">
              You may create an account using email/password authentication or by connecting a cryptocurrency wallet. You are responsible for maintaining the security of your account credentials and wallet private keys. You agree to notify us immediately of any unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
            <p className="text-zinc-300">
              Payments on OMA-AI are processed using the x402 protocol with stablecoin (USDC) transactions. By using paid APIs, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 mt-4">
              <li>Pay the displayed price per API request</li>
              <li>Maintain sufficient wallet balance for transactions</li>
              <li>Accept that blockchain transactions are irreversible</li>
              <li>Understand that gas fees may apply depending on network</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. API Provider Terms</h2>
            <p className="text-zinc-300">
              If you publish APIs on OMA-AI, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 mt-4">
              <li>Provide accurate descriptions and documentation</li>
              <li>Maintain reasonable uptime and performance</li>
              <li>Not engage in fraudulent or deceptive practices</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Autonomous Agent Usage</h2>
            <p className="text-zinc-300">
              AI agents are permitted to use OMA-AI services programmatically. Operators of autonomous agents are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 mt-4">
              <li>Ensuring agents comply with these terms</li>
              <li>Monitoring agent behavior and spending</li>
              <li>Implementing appropriate safeguards and limits</li>
              <li>Liability for actions taken by their agents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Prohibited Activities</h2>
            <p className="text-zinc-300">
              You may not use the Service to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300 mt-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malware or conduct cyberattacks</li>
              <li>Engage in market manipulation or fraud</li>
              <li>Abuse or circumvent rate limits</li>
              <li>Resell access without authorization</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="text-zinc-300">
              OMA-AI is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service. Our total liability is limited to the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Modifications</h2>
            <p className="text-zinc-300">
              We reserve the right to modify these terms at any time. We will notify users of material changes via email or platform notification. Continued use after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Contact</h2>
            <p className="text-zinc-300">
              For questions about these terms, contact us at{' '}
              <Link href="/contact" className="text-purple-400 hover:text-purple-300">
                our contact page
              </Link>{' '}
              or email hello@oma-ai.com.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
