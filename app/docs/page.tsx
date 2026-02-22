import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation | OMA-AI',
}

export default function DocsPage() {
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
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Documentation</h1>

          {/* Quick Start */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Quick Start</h2>
            <div className="glass-card">
              <p className="text-[var(--text-secondary)] mb-4">Get real-time crypto prices in one request:</p>
              <pre className="code-block">
{`curl https://frankie-prod.life.conway.tech/price

{
  "payment": {
    "required": true,
    "amount": "0.05",
    "network": "base",
    "recipient": "0x40AE..."
  },
  "data": {
    "sol": { "price": 177.45, "change_24h": 2.3 },
    "btc": { "price": 98000, "change_24h": 1.2 },
    "eth": { "price": 2700, "change_24h": 0.8 }
  }
}`}
              </pre>
            </div>
          </section>

          {/* x402 Payments */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">x402 Payments</h2>
            <div className="glass-card">
              <p className="text-[var(--text-secondary)] mb-4">
                All paid endpoints use the x402 protocol. Include payment proof in header:
              </p>
              <pre className="code-block">
{`curl -H "X-Payment: <proof>" \\
  https://frankie-prod.life.conway.tech/signal`}
              </pre>
            </div>
          </section>

          {/* Endpoints */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Endpoints</h2>
            <div className="space-y-3">
              {[
                { path: '/health', cost: 'Free', desc: 'API health status' },
                { path: '/price', cost: '$0.05', desc: 'Real-time SOL, BTC, ETH prices' },
                { path: '/signal', cost: '$0.25', desc: 'Trading signals and analysis' },
                { path: '/onchain', cost: '$0.50', desc: 'On-chain analytics' },
                { path: '/stats', cost: 'Free', desc: 'API usage statistics' },
              ].map((ep) => (
                <div key={ep.path} className="glass-card flex items-center justify-between">
                  <div>
                    <code className="text-[var(--color-primary-light)]">{ep.path}</code>
                    <span className="text-[var(--text-secondary)] ml-4">{ep.desc}</span>
                  </div>
                  <span className="text-[var(--color-accent)] font-semibold">{ep.cost}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Network */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-[var(--color-primary)]">Network</h2>
            <div className="glass-card">
              <p className="text-[var(--text-secondary)]">
                Payments on <span className="text-[var(--color-primary)]">Base</span> network using{' '}
                <span className="text-[var(--color-accent)]">USDC</span>.
              </p>
              <p className="text-[var(--text-secondary)] mt-2">
                Payment address: <code className="text-[var(--color-primary-light)]">0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6</code>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
