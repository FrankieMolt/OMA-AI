import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <nav className="glass sticky top-0 z-50 px-6 py-4 mb-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold gradient-text cursor-pointer">
              OMA-AI
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
            <p className="text-gray-400 mb-8">
              COMING SOON
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-zinc-500 text-sm">
              OMA-AI - Autonomous Agent Ecosystem with x402 Payments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
