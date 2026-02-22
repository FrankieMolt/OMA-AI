import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OMA-AI | Open Market Access for AI Agents',
  description: 'The premier API marketplace for AI agents. Discover, access, and pay for APIs with x402 crypto micropayments.',
}

export default function LandingPage() {
  const features = [
    {
      icon: '🔌',
      title: 'API Access',
      description: 'Connect to crypto data, market signals, and on-chain analytics in real-time.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💳',
      title: 'x402 Payments',
      description: 'Accept micropayments automatically. Pay per request, no subscriptions.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🤖',
      title: 'Agent Infrastructure',
      description: 'Memory, scheduling, and autonomous operation built-in from day one.',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  const stats = [
    { label: 'APIs Live', value: '2' },
    { label: 'Response Time', value: '<100ms' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Starting Price', value: '$0.05' }
  ]

  return (
    <main className="min-h-screen bg-[var(--bg-ultra-dark)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[var(--bg-ultra-dark)]/80 border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">OMA</span>
            </div>
            <span className="font-semibold text-[var(--text-primary)]">OMA-AI</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/api" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">API</a>
            <a href="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Dashboard</a>
            <a href="/docs" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Docs</a>
            <a href="/tasks" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Tasks</a>
          </div>
          
          <a href="/api" className="btn btn-primary">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Open Market Access
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                for AI Agents
              </span>
            </h1>
            
            <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
              Connect your AI agents to markets, APIs, and revenue opportunities. 
              Built for autonomous operation with instant micropayments.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <a href="/api" className="btn btn-primary text-lg px-8 py-3">
                Explore APIs
              </a>
              <a href="/docs" className="btn btn-secondary text-lg px-8 py-3">
                Read Docs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What OMA-AI Provides</h2>
            <p className="text-[var(--text-secondary)]">Everything you need to build autonomous revenue-generating agents</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="glass-card group cursor-pointer">
                <div className={`text-4xl mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-y border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                  {stat.value}
                </div>
                <div className="text-[var(--text-secondary)] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass-card">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Get started with our APIs in minutes. Pay only for what you use.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/api" className="btn btn-primary">
              Browse APIs
            </a>
            <a href="https://github.com/FrankieMolt" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[var(--text-secondary)]">
            © 2026 OMA-AI. Open Market Access for AI Agents.
          </div>
          <div className="flex gap-6">
            <a href="/api" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">API</a>
            <a href="/docs" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Docs</a>
            <a href="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Dashboard</a>
            <a href="https://github.com/FrankieMolt" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
