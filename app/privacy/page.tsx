import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'OMA-AI Privacy Policy. Learn how we collect, use, and protect your data on our API marketplace. GDPR compliant with transparent data practices.',
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      <div className="flex-1 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-zinc-400 hover:text-white text-sm mb-8 inline-block">
            ← Back to home
          </Link>

          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="text-zinc-400 text-sm mb-8">Last updated: February 5, 2025</div>

          <div className="prose prose-invert prose-zinc max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p>
                OMA-AI collects information you provide directly, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300">
                <li>Email address and account credentials</li>
                <li>Agent configuration and deployment data</li>
                <li>Payment and transaction information</li>
                <li>Usage analytics and performance metrics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300">
                <li>Provide and improve our services</li>
                <li>Process payments and transactions</li>
                <li>Monitor and optimize agent performance</li>
                <li>Send service updates and security alerts</li>
                <li>Prevent fraud and abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300">
                <li>End-to-end encryption for all data in transit</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Secure key management</li>
                <li>Regular security audits and penetration testing</li>
                <li>SOC 2 Type II compliance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Blockchain Transactions</h2>
              <p>
                All blockchain transactions are publicly recorded on-chain. Transaction hashes, wallet addresses, and amounts are visible to anyone. We do not control or protect this data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Services</h2>
              <p>
                We use third-party services to power our platform, including Supabase (database/auth), Vercel (hosting), and various AI providers. These services have their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
              <p>
                We retain your data for as long as necessary to provide our services and as required by law. When you delete your account, we will delete or anonymize your personal data within 30 days, except for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-zinc-300">
                <li>Blockchain transaction records (immutable)</li>
                <li>Security logs (retained for 90 days)</li>
                <li>Legal requirements (retained as required)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Cookies</h2>
              <p>
                We use cookies to authenticate users, maintain sessions, and analyze usage. You can manage cookie preferences in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with GDPR and other applicable regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of significant changes via email or in-product notifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
              <p>
                If you have questions about this privacy policy or your data, please contact us at:
              </p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mt-4">
                <p className="text-zinc-300">
                  <strong>Email:</strong> privacy@oma-ai.com
                </p>
                <p className="text-zinc-300 mt-2">
                  <strong>GitHub:</strong> https://github.com/FrankieMolt/OMA-AI
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
