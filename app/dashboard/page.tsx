import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | OMA-AI',
}

const API_BASE = 'https://frankie-prod.life.conway.tech'

async function getData() {
  try {
    const [health, stats, price] = await Promise.all([
      fetch(`${API_BASE}/health`, { cache: 'no-store' }).then(r => r.json()),
      fetch(`${API_BASE}/stats`, { cache: 'no-store' }).then(r => r.json()),
      fetch(`${API_BASE}/price`, { cache: 'no-store' }).then(r => r.json()),
    ])
    return { health, stats, price }
  } catch {
    return { health: { status: 'error' }, stats: { calls: 0 }, price: { data: {} } }
  }
}

export default async function DashboardPage() {
  const { health, stats, price } = await getData()
  const uptimeHours = Math.round((health.uptime || 0) / 3600)
  const solPrice = price.data?.sol?.price || 0
  const btcPrice = price.data?.btc?.price || 0
  const ethPrice = price.data?.eth?.price || 0

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
          <div className="flex gap-4 items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-400">LIVE</span>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Live Dashboard</h1>
          <p className="text-[var(--text-secondary)] mb-8">
            Real-time data from <a href={`${API_BASE}/health`} className="text-[var(--color-primary-light)] hover:underline">Frankie API</a>
          </p>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${health.status === 'ok' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-[var(--text-secondary)] text-sm">Status</span>
              </div>
              <div className="text-2xl font-bold capitalize">{health.status}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">v{health.version || '-'}</div>
            </div>

            <div className="glass-card">
              <div className="text-[var(--text-secondary)] text-sm mb-2">Uptime</div>
              <div className="text-2xl font-bold text-[var(--color-primary)]">{uptimeHours}h</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{health.uptime?.toLocaleString()}s</div>
            </div>

            <div className="glass-card">
              <div className="text-[var(--text-secondary)] text-sm mb-2">API Calls</div>
              <div className="text-2xl font-bold text-yellow-400">{stats.calls || 0}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{stats.hourlyCalls || 0}/hr</div>
            </div>

            <div className="glass-card">
              <div className="text-[var(--text-secondary)] text-sm mb-2">Revenue</div>
              <div className="text-2xl font-bold text-[var(--color-accent)]">
                ${((stats.earnings || 0) / 100).toFixed(2)}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{stats.realPayments || 0} payments</div>
            </div>
          </div>

          {/* Live Prices */}
          <div className="glass-card mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className="font-semibold">Live Crypto Prices (Coinbase)</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[var(--bg-dark)] rounded-lg p-4">
                <div className="text-[var(--text-secondary)] text-sm mb-2">SOL/USD</div>
                <div className="text-2xl font-bold text-[var(--color-primary)]">${solPrice.toFixed(2)}</div>
              </div>
              <div className="bg-[var(--bg-dark)] rounded-lg p-4">
                <div className="text-[var(--text-secondary)] text-sm mb-2">BTC/USD</div>
                <div className="text-2xl font-bold text-orange-400">${btcPrice.toLocaleString()}</div>
              </div>
              <div className="bg-[var(--bg-dark)] rounded-lg p-4">
                <div className="text-[var(--text-secondary)] text-sm mb-2">ETH/USD</div>
                <div className="text-2xl font-bold text-purple-400">${ethPrice.toFixed(2)}</div>
              </div>
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-4">
              Source: {price.data?.sol?.source || 'coinbase'} • Refresh for latest
            </div>
          </div>

          {/* Endpoints */}
          <div className="glass-card">
            <h2 className="font-semibold mb-4">API Endpoints</h2>
            <div className="space-y-2">
              {[
                { name: 'Health Check', url: '/health', cost: 'Free' },
                { name: 'Price Data', url: '/price', cost: '$0.05' },
                { name: 'Trading Signals', url: '/signal', cost: '$0.25' },
                { name: 'On-Chain Data', url: '/onchain', cost: '$0.50' },
              ].map((api) => (
                <div key={api.url} className="flex items-center justify-between py-3 border-t border-[var(--border-default)]">
                  <div>
                    <span className="font-medium">{api.name}</span>
                    <code className="text-[var(--color-primary-light)] ml-4 text-sm">{api.url}</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--color-accent)] text-sm">{api.cost}</span>
                    <span className="badge badge-success">active</span>
                    <a href={`${API_BASE}${api.url}`} target="_blank" className="btn btn-ghost text-sm">Test →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-[var(--text-muted)] text-sm">
            Version: {health.version || 'unknown'} | Network: Base | x402: {health.x402Verified ? '✅ Verified' : '❌'}
          </div>
        </div>
      </div>
    </main>
  )
}
