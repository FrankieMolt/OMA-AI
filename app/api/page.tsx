import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Reference | OMA-AI',
}

const API_BASE = 'https://frankie-prod.life.conway.tech'

async function getData() {
  try {
    const [health, stats] = await Promise.all([
      fetch(`${API_BASE}/health`, { cache: 'no-store' }).then(r => r.json()),
      fetch(`${API_BASE}/stats`, { cache: 'no-store' }).then(r => r.json()),
    ])
    return { health, stats }
  } catch {
    return { health: { status: 'error' }, stats: { calls: 0 } }
  }
}

export default async function APIPage() {
  const { health, stats } = await getData()

  const endpoints = [
    { method: 'GET', path: '/health', cost: 'Free', desc: 'Health check', status: 'live' },
    { method: 'GET', path: '/price', cost: '$0.05', desc: 'Real-time crypto prices (SOL, BTC, ETH)', status: 'live' },
    { method: 'GET', path: '/signal', cost: '$0.25', desc: 'Trading signals', status: 'live' },
    { method: 'GET', path: '/onchain', cost: '$0.50', desc: 'On-chain analytics', status: 'live' },
    { method: 'GET', path: '/stats', cost: 'Free', desc: 'API statistics', status: 'live' },
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
          <div className="flex gap-4">
            <span className="badge badge-success">API Reference</span>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">API Reference</h1>
          <p className="text-[var(--text-secondary)] mb-8">Live API endpoints with real-time data</p>

          {/* Status Card */}
          <div className="glass-card mb-8">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className={`w-3 h-3 rounded-full ${health.status === 'ok' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="font-semibold">Status: {health.status || 'Unknown'}</span>
              <span className="text-[var(--text-muted)]">|</span>
              <span className="text-[var(--text-secondary)]">Version: {health.version || '-'}</span>
              <span className="text-[var(--text-muted)]">|</span>
              <span className="text-[var(--text-secondary)]">Uptime: {Math.round((health.uptime || 0) / 3600)}h</span>
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <span className="text-[var(--text-muted)]">Total Calls: </span>
                <span className="font-semibold">{stats.calls || 0}</span>
              </div>
              <div>
                <span className="text-[var(--text-muted)]">Real Payments: </span>
                <span className="font-semibold">{stats.realPayments || 0}</span>
              </div>
            </div>
          </div>

          {/* Endpoints Table */}
          <div className="glass-card overflow-hidden p-0">
            <table className="w-full">
              <thead className="bg-[var(--bg-elevated)]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Endpoint</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Description</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Cost</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep) => (
                  <tr key={ep.path} className="border-t border-[var(--border-default)] hover:bg-[var(--bg-elevated)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <code className="text-[var(--color-primary-light)]">{ep.path}</code>
                    </td>
                    <td className="px-6 py-4 text-[var(--text-secondary)]">{ep.desc}</td>
                    <td className="px-6 py-4">
                      <span className="text-[var(--color-accent)] font-semibold">{ep.cost}</span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`${API_BASE}${ep.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost text-sm"
                      >
                        Test →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Code Example */}
          <div className="mt-8 glass-card">
            <h3 className="font-semibold mb-4">Quick Start</h3>
            <pre className="code-block">
{`# Get crypto prices
curl https://frankie-prod.life.conway.tech/price

# Response (if unpaid)
{
  "payment": { "required": true, "amount": "0.05" },
  "data": {
    "sol": { "price": 177.45 },
    "btc": { "price": 98000 },
    "eth": { "price": 2700 }
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </main>
  )
}
