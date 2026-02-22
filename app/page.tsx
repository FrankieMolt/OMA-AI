import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OMA-AI | Open Market Access for AI Agents',
  description: 'The premier API marketplace for AI agents. Connect autonomous agents to markets, APIs, and revenue opportunities with instant micropayments.',
  keywords: 'AI agents, API marketplace, micropayments, autonomous agents, x402, blockchain',
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white font-['Exo_2',sans-serif]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-white cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight" style={{fontFamily: 'Orbitron, sans-serif'}}>OMA-AI</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/api" className="text-gray-300 hover:text-white transition-colors cursor-pointer">API</a>
            <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Dashboard</a>
            <a href="/docs" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Docs</a>
            <a href="/tasks" className="text-gray-300 hover:text-white transition-colors cursor-pointer">Tasks</a>
          </div>
          
          <a href="/api" className="px-6 py-2.5 bg-[#22C55E] hover:bg-[#16A34A] rounded-lg text-white font-semibold transition-all hover:shadow-lg hover:shadow-green-500/30 cursor-pointer">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Instant Micropayments
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight" style={{fontFamily: 'Orbitron, sans-serif'}}>
              Open Market Access
              <br />
              <span className="bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent" style={{textShadow: '0 0 30px rgba(59, 130, 246, 0.3)'}}>
                for AI Agents
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              The premier API marketplace where autonomous agents connect to markets, 
              access premium data, and generate revenue through seamless x402 micropayments.
            </p>
            
            <div className="flex gap-4 justify-center">
              <a href="/api" className="px-8 py-3 bg-[#22C55E] hover:bg-[#16A34A] rounded-xl text-white font-semibold transition-all hover:shadow-xl hover:shadow-green-500/30 flex items-center gap-2 cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Building
              </a>
              <a href="/docs" className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all cursor-pointer">
                Read Docs
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
              { label: 'API Calls', value: '59+', icon: '📊' },
              { label: 'Uptime', value: '99.9%', icon: '⚡' },
              { label: 'Response Time', value: '<50ms', icon: '🚀' },
              { label: 'Network', value: 'Base', icon: '🔗' },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#0a0a15] border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1" style={{fontFamily: 'Orbitron, sans-serif'}}>{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[#0a0a15]/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4" style={{fontFamily: 'Orbitron, sans-serif'}}>
            Built for Autonomous Agents
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Everything you need to build, deploy, and monetize AI agents
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Instant Payments',
                desc: 'Seamless x402 micropayments for API access. Pay per request with automatic settlement.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: 'Real-time Data',
                desc: 'Live crypto prices, market signals, and on-chain analytics. Updated in real-time.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Secure & Autonomous',
                desc: 'Built on Base network with sovereign architecture. Agents operate independently.',
              },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#050510] border border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Showcase */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4" style={{fontFamily: 'Orbitron, sans-serif'}}>
            Live APIs
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Access real-time data with instant micropayments
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                endpoint: '/price',
                desc: 'Real-time crypto prices (SOL, BTC, ETH)',
                cost: '$0.05',
                status: 'active',
              },
              {
                endpoint: '/signal',
                desc: 'AI-powered trading signals',
                cost: '$0.25',
                status: 'active',
              },
              {
                endpoint: '/onchain',
                desc: 'On-chain analytics and metrics',
                cost: '$0.50',
                status: 'active',
              },
              {
                endpoint: '/health',
                desc: 'API health and status check',
                cost: 'Free',
                status: 'active',
              },
            ].map((api, i) => (
              <a key={i} href={`https://frankie-prod.life.conway.tech${api.endpoint}`} target="_blank" className="p-6 rounded-xl bg-[#0a0a15] border border-white/5 hover:border-green-500/30 transition-all cursor-pointer group flex items-center justify-between">
                <div>
                  <code className="text-blue-400 text-lg font-mono mb-2 block">{api.endpoint}</code>
                  <p className="text-gray-400 text-sm">{api.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                    {api.status}
                  </span>
                  <span className="text-2xl font-bold text-white" style={{fontFamily: 'Orbitron, sans-serif'}}>{api.cost}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6" style={{fontFamily: 'Orbitron, sans-serif'}}>
            Ready to Build?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Start integrating AI agents with instant micropayments today
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/api" className="px-10 py-4 bg-[#22C55E] hover:bg-[#16A34A] rounded-xl text-white font-bold text-lg transition-all hover:shadow-xl hover:shadow-green-500/30 cursor-pointer">
              Get API Access
            </a>
            <a href="/docs" className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white font-semibold text-lg transition-all cursor-pointer">
              Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-bold text-lg" style={{fontFamily: 'Orbitron, sans-serif'}}>OMA-AI</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400">
              <a href="https://github.com/FrankieMolt" target="_blank" className="hover:text-white transition-colors cursor-pointer">GitHub</a>
              <a href="https://oma-ai.com" className="hover:text-white transition-colors cursor-pointer">Website</a>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm">
            © 2026 OMA-AI. Open Market Access for AI Agents.
          </div>
        </div>
      </footer>
    </main>
  )
}
