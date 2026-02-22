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
    <main className="min-h-screen bg-[#050510] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-sm">OMA</span>
            </div>
            <span className="font-semibold">Dashboard</span>
          </a>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${health.status === 'ok' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-sm text-green-400">LIVE</span>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Live Dashboard</h1>
          <p className="text-gray-400 mb-8">
            Real-time data from <a href={`${API_BASE}/health`} className="text-blue-400 hover:underline">Frankie API</a>
          </p>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${health.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-gray-400 text-sm">Status</span>
              </div>
              <div className="text-2xl font-bold capitalize">{health.status}</div>
              <div className="text-xs text-gray-500 mt-1">v{health.version || '-'}</div>
            </div>

            <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5">
              <div className="text-gray-400 text-sm mb-2">Uptime</div>
              <div className="text-2xl font-bold text-blue-400">{uptimeHours}h</div>
              <div className="text-xs text-gray-500 mt-1">{health.uptime?.toLocaleString()}s</div>
            </div>

            <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5">
              <div className="text-gray-400 text-sm mb-2">API Calls</div>
              <div className="text-2xl font-bold text-yellow-400">{stats.calls || 0}</div>
              <div className="text-xs text-gray-500 mt-1">{stats.hourlyCalls || 0}/hr</div>
            </div>

            <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5">
              <div className="text-gray-400 text-sm mb-2">Revenue</div>
              <div className="text-2xl font-bold text-green-400">${((stats.earnings || 0) / 100).toFixed(2)}</div>
              <div className="text-xs text-gray-500 mt-1">{stats.realPayments || 0} payments</div>
            </div>
          </div>

          {/* Prices */}
          <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className="font-semibold">Live Crypto Prices (Coinbase)</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#050510]">
                <div className="text-gray-400 text-sm mb-2">SOL/USD</div>
                <div className="text-2xl font-bold text-blue-400">${solPrice.toFixed(2)}</div>
              </div>
              <div className="p-4 rounded-lg bg-[#050510]">
                <div className="text-gray-400 text-sm mb-2">BTC/USD</div>
                <div className="text-2xl font-bold text-orange-400">${btcPrice.toLocaleString()}</div>
              </div>
              <div className="p-4 rounded-lg bg-[#050510]">
                <div className="text-gray-400 text-sm mb-2">ETH/USD</div>
                <div className="text-2xl font-bold text-purple-400">${ethPrice.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Endpoints */}
          <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5">
            <h2 className="font-semibold mb-4">API Endpoints</h2>
            <div className="space-y-2">
              {[
                { name: 'Health Check', url: '/health', cost: 'Free' },
                { name: 'Price Data', url: '/price', cost: '$0.05' },
                { name: 'Trading Signals', url: '/signal', cost: '$0.25' },
                { name: 'On-Chain Data', url: '/onchain', cost: '$0.50' },
              ].map((api) => (
                <div key={api.url} className="flex items-center justify-between py-3 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{api.name}</span>
                    <code className="text-blue-400 text-sm">{api.url}</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 text-sm">{api.cost}</span>
                    <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">active</span>
                    <a href={`${API_BASE}${api.url}`} target="_blank" className="text-blue-400 hover:text-blue-300 text-sm">Test →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
