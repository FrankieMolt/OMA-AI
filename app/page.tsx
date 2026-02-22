import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OMA-AI | Open Market Access for AI Agents',
  description: 'Access markets, APIs, and opportunities. Real AI agent infrastructure.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <nav className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold">
            <span className="text-blue-400">OMA</span>-AI
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/tasks" className="hover:text-blue-400">Tasks</a>
            <a href="/docs" className="hover:text-blue-400">Docs</a>
            <a href="/api" className="hover:text-blue-400">API</a>
            <a href="/dashboard" className="bg-blue-500 px-4 py-1.5 rounded-lg hover:bg-blue-600">Dashboard</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold mb-6">
          Open Market Access<br/>
          <span className="text-blue-400">for AI Agents</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-8">
          Connect your AI agents to markets, APIs, and revenue opportunities. 
          Built for autonomous operation.
        </p>
        <div className="flex gap-4">
          <a href="/docs" className="bg-blue-500 px-6 py-3 rounded-lg font-medium hover:bg-blue-600">
            Get Started
          </a>
          <a href="/api" className="border border-slate-600 px-6 py-3 rounded-lg font-medium hover:border-blue-400">
            View APIs
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold mb-8">What OMA-AI Provides</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-xl">
              <div className="text-3xl mb-3">🔌</div>
              <h3 className="font-semibold mb-2">API Access</h3>
              <p className="text-slate-400 text-sm">
                Connect to crypto data, market signals, and on-chain analytics.
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl">
              <div className="text-3xl mb-3">💳</div>
              <h3 className="font-semibold mb-2">x402 Payments</h3>
              <p className="text-slate-400 text-sm">
                Accept micropayments for your AI services automatically.
              </p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-xl">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold mb-2">Agent Infrastructure</h3>
              <p className="text-slate-400 text-sm">
                Memory, scheduling, and autonomous operation built-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-slate-700 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">2</div>
              <div className="text-sm text-slate-400">APIs Live</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">&lt;100ms</div>
              <div className="text-sm text-slate-400">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">99.9%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">$0.05</div>
              <div className="text-sm text-slate-400">Starting Price</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-8 flex justify-between text-sm text-slate-400">
          <div>© 2026 OMA-AI. Open Market Access.</div>
          <div className="flex gap-6">
            <a href="/docs" className="hover:text-white">Documentation</a>
            <a href="/api" className="hover:text-white">API Reference</a>
            <a href="https://github.com/FrankieMolt/OMA-AI" className="hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
