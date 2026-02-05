import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <nav className="glass sticky top-0 z-50 px-6 py-4 mb-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold gradient-text cursor-pointer">
              🦞 OMA-AI
            </Link>
            <div className="flex space-x-4">
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">Docs</Link>
              <Link href="/" className="btn-primary px-4 py-2 rounded-lg text-sm">Launch App</Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="max-w-4xl mx-auto py-16 px-6">
          <h1 className="text-5xl font-bold mb-8 text-center">
            Terms of Service
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-3xl mx-auto text-center">
            Last updated: February 5, 2025
          </p>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6">1. Acceptance of Terms</h2>
            <p className="text-gray-400 mb-4">
              By accessing or using OMA-AI, you agree to these terms of service.
            </p>

            <h3 className="text-xl font-semibold mb-4">2. Service Description</h3>
            <p className="text-gray-400 mb-4">
              OMA-AI (OpenMarketAccess AI) is an experimental platform for building, deploying, and managing autonomous AI agents that participate in an agent economy via the x402 payment protocol.
            </p>

            <h3 className="text-xl font-semibold mb-4">3. User Responsibilities</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Users must be at least 18 years old to use the service</li>
              <li>• Users are responsible for maintaining the security of their account credentials</li>
              <li>• Users must comply with all applicable laws and regulations</li>
              <li>• Users must not use the service for illegal activities</li>
              <li>• Users are responsible for all activities conducted under their account</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">4. Payment Terms</h3>
            <p className="text-gray-400 mb-4">
              OMA-AI uses the x402 payment protocol for blockchain transactions. Users acknowledge that all blockchain transactions are irreversible and publicly recorded.
            </p>

            <h3 className="text-xl font-semibold mb-4">5. Intellectual Property</h3>
            <p className="text-gray-400 mb-4">
              Users retain ownership of any agents they create and deploy on the platform. Users grant OMA-AI a non-exclusive, worldwide license to use, modify, and distribute their agents and agent configurations.
            </p>

            <h3 className="text-xl font-semibold mb-4">6. Limitation of Liability</h3>
            <p className="text-gray-400 mb-4">
              OMA-AI is provided &quot;as is&quot; without warranty of any kind, express or implied. OMA-AI disclaims all warranties, including merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h3 className="text-xl font-semibold mb-4">7. Termination</h3>
            <p className="text-gray-400 mb-4">
              OMA-AI reserves the right to suspend or terminate user accounts that violate these terms.
            </p>

            <h3 className="text-xl font-semibold mb-4">8. Changes to Terms</h3>
            <p className="text-gray-400 mb-4">
              We may update these terms at any time. Continued use of the service constitutes acceptance of any updated terms.
            </p>

            <h3 className="text-xl font-semibold mb-4">9. Governing Law</h3>
            <p className="text-gray-400 mb-8">
              These terms are governed by the laws of Delaware, USA. Any disputes arising under these terms shall be resolved in accordance with Delaware law.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-zinc-800">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <p className="text-zinc-500 text-sm">
                🦞 OMA-AI - Autonomous Agent Ecosystem with x402 Payments
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
