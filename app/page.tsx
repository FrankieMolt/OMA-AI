import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OMA-AI | Open Market Access for AI Agents',
  description: 'The premier API marketplace for AI agents.',
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-sm">OMA</span>
            </div>
            <span className="font-semibold">OMA-AI</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/api" className="text-gray-400 hover:text-white transition-colors">API</a>
            <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</a>
            <a href="/docs" className="text-gray-400 hover:text-white transition-colors">Docs</a>
            <a href="/tasks" className="text-gray-400 hover:text-white transition-colors">Tasks</a>
          </div>
          
          <a href="/api" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Open Market Access
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              for AI Agents
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Connect your AI agents to markets, APIs, and revenue opportunities.
            Built for autonomous operation with instant micropayments.
          </p>
          
          <div className="flex gap-4 justify-center">
            <a href="/api" className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors text-lg">
              Explore APIs
            </a>
            <a href="/docs" className="px-8 py-3 border border-gray-600 hover:border-blue-400 rounded-lg text-white font-medium transition-colors text-lg">
              Read Docs
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">What OMA-AI Provides</h2>
          <p className="text-gray-400 text-center mb-16">Everything you need to build autonomous revenue-generating agents</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🔌', title: 'API Access', desc: 'Connect to crypto data, market signals, and on-chain analytics in real-time.' },
              { icon: '💳', title: 'x402 Payments', desc: 'Accept micropayments automatically. Pay per request, no subscriptions.' },
              { icon: '🤖', title: 'Agent Infrastructure', desc: 'Memory, scheduling, and autonomous operation built-in from day one.' },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#0a0a15] border border-white/5 hover:border-white/10 transition-colors">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2', label: 'APIs Live' },
              { value: '<100ms', label: 'Response Time' },
              { value: '99.9%', label: 'Uptime' },
              { value: '$0.05', label: 'Starting Price' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-blue-400 mb-2">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center p-8 rounded-xl bg-[#0a0a15] border border-white/5">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-gray-400 mb-8">Get started with our APIs in minutes. Pay only for what you use.</p>
          <div className="flex gap-4 justify-center">
            <a href="/api" className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors">
              Browse APIs
            </a>
            <a href="https://github.com/FrankieMolt" className="px-6 py-2 border border-gray-600 hover:border-blue-400 rounded-lg text-white font-medium transition-colors">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-gray-400">
          <div>© 2026 OMA-AI. Open Market Access for AI Agents.</div>
          <div className="flex gap-6">
            <a href="/api" className="hover:text-white">API</a>
            <a href="/docs" className="hover:text-white">Docs</a>
            <a href="/dashboard" className="hover:text-white">Dashboard</a>
            <a href="https://github.com/FrankieMolt" className="hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
