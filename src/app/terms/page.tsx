import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { Scale, Check, AlertCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | OMA-AI - Premier MCP Marketplace',
  description: 'Terms of service for OMA-AI. Understand your rights and responsibilities when using our platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6">
            <Scale className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-semibold text-purple-300">Legal Terms</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Last updated: March 12, 2026
          </p>
        </div>

        {/* Disclaimer */}
        <GlassCard className="p-6 bg-yellow-900/20 border-yellow-700/50 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            <div className="text-yellow-100 text-sm">
              <strong>IMPORTANT:</strong> By using OMA-Ai, you agree to these terms. If you disagree, do not use the platform.
            </div>
          </div>
        </GlassCard>

        {/* Terms Sections */}
        <div className="space-y-8">
          {/* Acceptance */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-green-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">1. Acceptance of Terms</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                By accessing or using OMA-Ai, you agree to be bound by these Terms of Service.
                If you do not agree to these Terms, please do not use the Platform.
              </p>
              <p>
                We reserve the right to modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance.
                We will notify users of material changes via email or platform announcements.
              </p>
            </div>
          </GlassCard>

          {/* Account Creation */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-blue-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">2. Account Creation & Use</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">Eligibility:</strong> You must be at least 13 years old to create an account.
              </p>
              <p>
                <strong className="text-white">Accuracy:</strong> You must provide accurate, complete, and current information during registration.
              </p>
              <p>
                <strong className="text-white">Security:</strong> You are responsible for maintaining the confidentiality of your account credentials.
              </p>
              <p>
                <strong className="text-white">Notifications:</strong> You agree to receive emails regarding your account, transactions, and platform updates.
              </p>
              <GlassCard className="mt-6 p-4 bg-red-900/20 border-red-700/50">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div className="text-red-100 text-sm">
                    <strong>Prohibited:</strong> Creating multiple accounts, sharing accounts, or impersonating others will result in immediate termination.
                  </div>
                </div>
              </GlassCard>
            </div>
          </GlassCard>

          {/* MCP Publishing */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-purple-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">3. MCP Publishing Guidelines</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">Real MCPs Only:</strong> Only functional, deployable MCPs may be published. No placeholders or mocks.
              </p>
              <p>
                <strong className="text-white">Security:</strong> MCPs must follow security best practices and not contain malicious code.
              </p>
              <p>
                <strong className="text-white">Documentation:</strong> All MCPs must include clear documentation, usage examples, and API references.
              </p>
              <p>
                <strong className="text-white">Pricing:</strong> You set your own pricing (Free, Low, Medium, High tiers). OMA-Ai charges a 5% platform fee.
              </p>
              <p>
                <strong className="text-white">Verification:</strong> MCPs go through manual review. Approval typically takes 24-48 hours.
              </p>
            </div>
          </GlassCard>

          {/* Payments */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-amber-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">4. Payments & Revenue</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">Platform Fee:</strong> OMA-Ai charges a 5% fee on all MCP call revenue.
              </p>
              <p>
                <strong className="text-white">Your Share:</strong> Developers receive 95% of all revenue.
              </p>
              <p>
                <strong className="text-white">Payouts:</strong> Minimum payout is $10 USDC. Payouts processed monthly on the 1st.
              </p>
              <p>
                <strong className="text-white">Gasless:</strong> x402 protocol enables gasless payments. Users pay 0 gas fees.
              </p>
              <p>
                <strong className="text-white">Multi-Chain:</strong> Payouts available in USDC on Base and Solana networks.
              </p>
            </div>
          </GlassCard>

          {/* User Conduct */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-red-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">5. Acceptable Use Policy</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <p><strong className="text-white">Allowed:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Using MCPs for legitimate purposes</li>
                <li>Publishing original MCPs you own</li>
                <li>Providing constructive feedback and reviews</li>
                <li>Engaging in community discussions</li>
              </ul>
              <p><strong className="text-white">Prohibited:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Reverse engineering or decompiling MCPs</li>
                <li>Using automated tools to abuse the platform</li>
                <li>Sharing exploits or vulnerabilities publicly without disclosure</li>
                <li>Harassing other users or the team</li>
                <li>Violating laws or regulations</li>
              </ul>
            </div>
          </GlassCard>

          {/* Intellectual Property */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-violet-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">6. Intellectual Property</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">Your Content:</strong> You retain ownership of all MCPs, documentation, and content you publish.
              </p>
              <p>
                <strong className="text-white">License to OMA-Ai:</strong> By publishing, you grant OMA-Ai a non-exclusive, royalty-free license to host, display, and distribute your MCPs.
              </p>
              <p>
                <strong className="text-white">Platform IP:</strong> OMA-Ai&apos;s technology, branding, and code remain our exclusive property.
              </p>
              <p>
                <strong className="text-white">User-Generated Content:</strong> Users retain IP in reviews, feedback, and discussions.
              </p>
            </div>
          </GlassCard>

          {/* Termination */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-pink-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">7. Termination</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                <strong className="text-white">By User:</strong> You may terminate your account at any time. Your data will be deleted within 30 days.
              </p>
              <p>
                <strong className="text-white">By OMA-Ai:</strong> We may terminate access for violation of these Terms, fraud, abuse, or inactivity.
              </p>
              <p>
                <strong className="text-white">Consequences:</strong> Upon termination, all access, MCPs, and pending payouts are forfeited.
              </p>
            </div>
          </GlassCard>

          {/* Limitation of Liability */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-zinc-600/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-zinc-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">8. Limitation of Liability</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                OMA-Ai is provided &quot;as is&quot; without warranties of any kind, express or implied.
              </p>
              <p>
                We are not liable for: (a) MCP functionality or performance, (b) user-developed content, (c) third-party services, or (d) loss of data or revenue.
              </p>
              <p>
                <strong className="text-white">Maximum Liability:</strong> Total liability is limited to the amount you paid to OMA-Ai in the past 12 months.
              </p>
            </div>
          </GlassCard>

          {/* Contact */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-indigo-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">9. Contact & Disputes</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                For questions about these Terms, disputes, or legal matters, contact us:
              </p>
              <div className="space-y-2">
                <p><strong className="text-white">Email:</strong> legal@oma-ai.com</p>
                <p><strong className="text-white">Contact Form:</strong> <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline">oma-ai.com/contact</Link></p>
                <p><strong className="text-white">Response Time:</strong> We will respond to legal inquiries within 30 days.</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            These terms constitute the entire agreement between you and OMA-Ai regarding your use of the Platform.
            By using OMA-Ai, you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>
        </div>
      </div>
    </div>
  );
}
