import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | OMA-AI',
  description: 'OMA-AI Privacy Policy. Learn how we collect, use, and protect your data.',
  keywords: ['OMA-AI', 'Privacy Policy', 'Data Protection', 'GDPR'],
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 max-w-4xl py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">
          Last Updated: March 12, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              OMA-AI ("we," "our," or "us") is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you use our website and services (the "Service").
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              By using the Service, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">1.1 Personal Information</h3>
            <p className="text-gray-300 mb-4">We collect information you provide directly:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Email Address:</strong> For account creation and communication</li>
              <li><strong>Name/Username:</strong> For your profile and public display</li>
              <li><strong>Password:</strong> Encrypted and never stored in plain text</li>
              <li><strong>Profile Information:</strong> Avatar URL, bio, website (optional)</li>
              <li><strong>Wallet Addresses:</strong> For x402 payments and payouts</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">1.2 Usage Data</h3>
            <p className="text-gray-300 mb-4">We collect data automatically:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Log Data:</strong> IP address, browser type, device, pages visited</li>
              <li><strong>Performance Data:</strong> Page load times, API response times</li>
              <li><strong>Usage Patterns:</strong> Features used, MCPs accessed, search queries</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">1.3 Cookies</h3>
            <p className="text-gray-300 leading-relaxed">
              We use cookies and similar technologies to enhance your experience, analyze usage, and assist in marketing efforts.
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-300">
              <p>We use your information for the following purposes:</p>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mt-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Management:</strong> Create and manage your account</li>
                  <li><strong>Authentication:</strong> Verify your identity and secure your account</li>
                  <li><strong>Service Delivery:</strong> Provide MCP marketplace functionality</li>
                  <li><strong>Payments:</strong> Process x402 payments and payouts</li>
                  <li><strong>Communication:</strong> Send important updates and support messages</li>
                  <li><strong>Analytics:</strong> Improve our services and understand user behavior</li>
                  <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security threats</li>
                  <li><strong>Legal Compliance:</strong> Comply with legal obligations and enforce our Terms</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.1 Third Parties</h3>
            <p className="text-gray-300 mb-4">We share information with the following third parties:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Service Providers:</strong> Supabase (database), Vercel (hosting), Payment processors</li>
              <li><strong>Public Data:</strong> Your profile information (name, bio, avatar) is publicly visible</li>
              <li><strong>MCP Developers:</strong> When you use an MCP, the developer may see your API key</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.2 What We DON'T Share</h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mt-4">
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>We <strong>do not sell</strong> your personal information</li>
                <li>We <strong>do not rent</strong> your personal information</li>
                <li>We <strong>do not trade</strong> your personal information</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.3 Legal Requirements</h3>
            <p className="text-gray-300 leading-relaxed">
              We may disclose information if required by law or to protect our rights, property, or safety,
              including responding to legal process, preventing fraud, or enforcing our Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <div className="space-y-4 text-gray-300">
              <p>We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Encryption:</strong> All data encrypted in transit (HTTPS) and at rest</li>
                <li><strong>Access Control:</strong> RLS (Row Level Security) restricts database access</li>
                <li><strong>Password Hashing:</strong> Passwords hashed using bcrypt</li>
                <li><strong>Regular Audits:</strong> Security audits performed quarterly</li>
                <li><strong>Incident Response:</strong> Prompt notification of any data breaches</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the internet is 100% secure.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
            <div className="space-y-4 text-gray-300">
              <p>We retain your information for as long as necessary:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Active Accounts:</strong> Retained while account is active</li>
                <li><strong>Closed Accounts:</strong> Deleted within 30 days of account closure</li>
                <li><strong>Legal Requirements:</strong> Retained longer if required by law</li>
                <li><strong>MCP Data:</strong> Deleted when MCP is removed</li>
                <li><strong>Analytics:</strong> Aggregated data retained indefinitely</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Your Privacy Rights</h2>
            <p className="text-gray-300 mb-4">Under GDPR and other privacy laws, you have the right to:</p>
            <div className="space-y-4 text-gray-300">
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to processing of your data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at <strong className="font-mono">privacy@oma-ai.com</strong>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              The Service is not intended for children under 18. We do not knowingly collect
              personal information from children under 18. If we become aware of such collection,
              we will take steps to delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. International Data Transfers</h2>
            <p className="text-gray-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own.
              We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of
              significant changes by posting the new policy on the Service and sending you an email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. GDPR Compliance</h2>
            <div className="space-y-4 text-gray-300">
              <p><strong>Legal Basis for Processing:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contractual necessity (providing the Service)</li>
                <li>Legitimate interests (security, analytics)</li>
                <li>Consent (optional features, marketing)</li>
                <li>Legal obligations (compliance, law enforcement)</li>
              </ul>

              <p className="mt-4"><strong>Data Controller:</strong></p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mt-4">
                <p className="font-mono">OMA-AI</p>
                <p className="font-mono">Email: privacy@oma-ai.com</p>
                <p className="font-mono">Address: [Legal Address to be added]</p>
              </div>

              <p className="mt-4"><strong>Right to Complain:</strong></p>
              <p>
                You have the right to lodge a complaint with a supervisory authority in your jurisdiction.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. California Residents</h2>
            <div className="space-y-4 text-gray-300">
              <p>Under the California Consumer Privacy Act (CCPA), California residents have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Know what personal information is collected</li>
                <li>Know if personal information is sold or disclosed</li>
                <li>Request deletion of personal information</li>
                <li>Opt-out of sale of personal information</li>
                <li>Non-discrimination for exercising privacy rights</li>
              </ul>
              <p className="mt-4">
                Note: OMA-AI does not sell personal information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
            <div className="text-gray-300 space-y-2">
              <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              <p className="font-mono">Email: privacy@oma-ai.com</p>
              <p className="font-mono">Discord: discord.gg/oma-ai</p>
              <p className="font-mono">Website: www.oma-ai.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
