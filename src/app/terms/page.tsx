import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | OMA-AI',
  description: 'OMA-AI Terms of Service. Read our terms before using the MCP marketplace.',
  keywords: ['OMA-AI', 'Terms of Service', 'ToS', 'Legal'],
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 max-w-4xl py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-gray-400 mb-8">
          Last Updated: March 12, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using OMA-AI (the "Service"), you agree to be bound by these Terms of Service ("Terms").
              If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Eligibility</h2>
            <p className="text-gray-300 leading-relaxed">
              You must be at least 18 years old to use the Service. By using the Service,
              you represent and warrant that you are at least 18 years old.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
            <div className="space-y-4 text-gray-300">
              <p>You are responsible for maintaining the confidentiality of your account and password.</p>
              <p>You agree to notify us immediately of any unauthorized use of your account.</p>
              <p>You are responsible for all activities that occur under your account.</p>
              <p>OMA-AI reserves the right to suspend or terminate accounts that violate these Terms.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. MCP Publishing Guidelines</h2>
            <div className="space-y-4 text-gray-300">
              <p><strong>Allowed:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Functional and tested MCP tools</li>
                <li>Open source or documented proprietary tools</li>
                <li>MCPs that provide legitimate utility to AI agents</li>
                <li>Tools with clear, accurate descriptions</li>
              </ul>

              <p className="mt-4"><strong>Prohibited:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Malware, viruses, or harmful code</li>
                <li>Tools that facilitate illegal activities</li>
                <li>Copyrighted material without permission</li>
                <li>Tools that exploit vulnerabilities</li>
                <li>Deceptive or misleading MCPs</li>
                <li>Non-functional or broken tools</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <div className="space-y-4 text-gray-300">
              <p><strong>Your Content:</strong> You retain ownership of all MCPs you publish.
              By publishing, you grant OMA-AI a worldwide, non-exclusive, royalty-free license to host, display, and distribute your MCPs.</p>

              <p><strong>OMA-AI Content:</strong> The Service, including its design, graphics, text, and code,
              is owned by OMA-AI and protected by copyright and other intellectual property laws.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Payments and Fees</h2>
            <div className="space-y-4 text-gray-300">
              <p><strong>Platform Fee:</strong> OMA-AI charges a 5% platform fee on all MCP API call revenue.</p>

              <p><strong>Payouts:</strong> Earnings are paid monthly on the 1st of each month, provided the minimum threshold of $10 USDC is met.</p>

              <p><strong>Payment Methods:</strong> Payouts are sent to connected wallets on Base or Solana networks in USDC.</p>

              <p><strong>Taxes:</strong> You are responsible for any taxes applicable to your earnings.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. x402 Payment Protocol</h2>
            <div className="space-y-4 text-gray-300">
              <p>OMA-AI uses the x402 protocol for gasless microtransactions. By using the Service, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use x402 for authorized payments only</li>
                <li>Not attempt to exploit or abuse the protocol</li>
                <li>Understand that x402 transactions are final and irreversible</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Privacy and Data</h2>
            <p className="text-gray-300 leading-relaxed">
              Your use of the Service is also governed by our Privacy Policy. Please review our
              Privacy Policy, which also governs the Service and informs users of our data collection practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Disclaimers</h2>
            <div className="space-y-4 text-gray-300">
              <p><strong>As-Is:</strong> The Service is provided "as is" without warranties of any kind, either express or implied.</p>

              <p><strong>MCP Availability:</strong> OMA-AI does not guarantee continuous or error-free operation of MCPs.</p>

              <p><strong>User-Generated Content:</strong> OMA-AI is not responsible for the quality, accuracy, or functionality of MCPs published by users.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              To the fullest extent permitted by law, OMA-AI shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, including without limitation,
              loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
            <div className="space-y-4 text-gray-300">
              <p><strong>By You:</strong> You may terminate your account at any time by contacting support.</p>

              <p><strong>By OMA-AI:</strong> We reserve the right to suspend or terminate accounts that violate these Terms.</p>

              <p><strong>Effect of Termination:</strong> Upon termination, your right to use the Service will immediately cease.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
            <p className="text-gray-300 leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of the United States,
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              OMA-AI reserves the right to modify these Terms at any time. We will notify users of
              significant changes via email or by posting a notice on the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
            <div className="text-gray-300 space-y-2">
              <p>If you have questions about these Terms, please contact us:</p>
              <p className="font-mono">Email: support@oma-ai.com</p>
              <p className="font-mono">Discord: discord.gg/oma-ai</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
