import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { Shield, Check, X, ExternalLink, FileText, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | OMA-AI - Premier MCP Marketplace',
  description: 'Privacy policy for OMA-AI. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full mb-6">
            <Shield className="w-4 h-4 text-green-300" />
            <span className="text-sm font-semibold text-green-300">Your Privacy Matters</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Last updated: March 12, 2026
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {/* Data Collection */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Data We Collect</h2>
              </div>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Account Information:</strong> Email address, name, optional bio
              </p>
              <p>
                <strong className="text-white">Wallet Addresses:</strong> Public wallet addresses (never private keys)
              </p>
              <p>
                <strong className="text-white">Usage Data:</strong> MCP calls, timestamps, performance metrics
              </p>
              <p>
                <strong className="text-white">Payment Data:</strong> Transaction IDs, amounts (encrypted)
              </p>
              <p>
                <strong className="text-white">Support Data:</strong> Support tickets, chat logs (if enabled)
              </p>
              <GlassCard className="mt-6 p-4 bg-yellow-900/20 border-yellow-700/50">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <div className="text-yellow-100 text-sm">
                    <strong>What We DON'T Collect:</strong> Private keys, full IP addresses (hashed), precise location, browser fingerprinting, or unnecessary personal data.
                  </div>
                </div>
              </GlassCard>
            </div>
          </GlassCard>

          {/* Data Usage */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-blue-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">How We Use Your Data</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p>Provide and improve our services</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p>Process payments and verify transactions</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p>Monitor performance and uptime</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p>Prevent fraud and abuse</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p>Send you notifications (with consent)</p>
              </div>
              <GlassCard className="mt-6 p-4 bg-red-900/20 border-red-700/50">
                <div className="flex gap-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div className="text-red-100 text-sm">
                    <strong>We NEVER:</strong> Sell your data to third parties, share it without consent, or use it for advertising.
                  </div>
                </div>
              </GlassCard>
            </div>
          </GlassCard>

          {/* Data Sharing */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-amber-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Data Sharing</h2>
              </div>
            </div>
            <div className="space-y-4 text-gray-300">
              <p><strong className="text-white">We share data ONLY when:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Required by law (subpoenas, court orders)</li>
                <li>Necessary to protect our rights or property</li>
                <li>With your explicit consent (partners, analytics)</li>
              </ul>
              <p className="mt-4">
                We use <strong className="text-white">aggregated analytics</strong> for insights, which doesn't contain personally identifiable information.
              </p>
            </div>
          </GlassCard>

          {/* Data Security */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Data Security</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p><strong className="text-white">Encryption:</strong> All data encrypted in transit (TLS 1.3)</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p><strong className="text-white">Database:</strong> Supabase PostgreSQL with RLS (Row Level Security)</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p><strong className="text-white">Auth:</strong> JWT-based authentication with expiration</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p><strong className="text-white">Monitoring:</strong> 24/7 uptime monitoring, error tracking</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p><strong className="text-white">Audits:</strong> Regular security audits and penetration testing</p>
              </div>
            </div>
          </GlassCard>

          {/* Your Rights */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-violet-600/20 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-violet-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Your Rights</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p><strong className="text-white">Access:</strong> Download all your data at any time</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p><strong className="text-white">Delete:</strong> Request deletion of all your data (GDPR right to erasure)</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p><strong className="text-white">Opt Out:</strong> Opt out of non-essential data collection</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p><strong className="text-white">Portability:</strong> Export your data in portable formats</p>
              </div>
            </div>
          </GlassCard>

          {/* Contact */}
          <GlassCard className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-pink-300" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Contact Us</h2>
              </div>
            </div>
            <div className="space-y-3 text-gray-300">
              <p>
                For privacy questions, data access requests, or deletion requests, contact us:
              </p>
              <div className="space-y-2">
                <p><strong className="text-white">Email:</strong> privacy@oma-ai.com</p>
                <p><strong className="text-white">Contact Form:</strong> <a href="/contact" className="text-purple-400 hover:text-purple-300 underline">oma-ai.com/contact</a></p>
                <p><strong className="text-white">Response Time:</strong> Within 30 days (GDPR compliant)</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm">
            This policy is effective as of March 12, 2026. We may update this policy occasionally.
            Continued use of OMA-Ai constitutes acceptance of any changes.
          </p>
        </div>
      </div>
    </div>
  );
}
