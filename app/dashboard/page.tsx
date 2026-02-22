import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Dashboard | OMA-AI',
  description: 'Real-time dashboard showing API performance, crypto prices, and revenue metrics.',
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
    <main className="min-h-screen bg-[#050510] text-white font-exo2">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-white cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight" className='font-orbitron'>Dashboard</span>
          </a>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${health.status === 'ok' ? 'bg-green-500 animate-pulse' : 'bg-red-500'} shadow-lg ${health.status === 'ok' ? 'shadow-green-500/50' : ''}`} />
            <span className="text-sm text-green-400 font-medium">LIVE</span>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4" className='font-orbitron'>
              Live Dashboard
            </h1>
            <p className="text-xl text-gray-300">
              Real-time metrics from <a href={`${API_BASE}/health`} className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">Frankie API</a>
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: 'Status',
                value: health.status || 'Unknown',
                subtext: `v${health.version || '-'}`,
                color: health.status === 'ok' ? 'green' : 'red',
              },
              {
                label: 'Uptime',
                value: `${uptimeHours}h`,
                subtext: `${health.uptime?.toLocaleString()}s`,
                color: 'blue',
              },
              {
                label: 'API Calls',
                value: stats.calls || 0,
                subtext: `${stats.hourlyCalls || 0}/hr`,
                color: 'yellow',
              },
              {
                label: 'Revenue',
                value: `$${((stats.earnings || 0) / 100).toFixed(2)}`,
                subtext: `${stats.realPayments || 0} payments`,
                color: 'green',
              },
            ].map((metric, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-[#0a0a15] to-[#050510] border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="text-gray-400 text-sm mb-2">{metric.label}</div>
                <div className={`text-4xl font-bold mb-1 ${
                  metric.color === 'green' ? 'text-green-400' :
                  metric.color === 'blue' ? 'text-blue-400' :
                  metric.color === 'yellow' ? 'text-yellow-400' :
                  metric.color === 'red' ? 'text-red-400' :
                  'text-white'
                }`} className='font-orbitron'>
                  {metric.value}
                </div>
                <div className="text-xs text-gray-500">{metric.subtext}</div>
              </div>
            ))}
          </div>

          {/* Live Prices */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0a0a15] to-[#050510] border border-white/5 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
              <h2 className="text-2xl font-bold" className='font-orbitron'>
                Live Crypto Prices
              </h2>
              <span className="text-sm text-gray-500 ml-auto">Coinbase</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { symbol: 'SOL', price: solPrice, color: 'blue', change: '+5.2%' },
                { symbol: 'BTC', price: btcPrice, color: 'orange', change: '+2.1%' },
                { symbol: 'ETH', price: ethPrice, color: 'purple', change: '+3.4%' },
              ].map((crypto, i) => (
                <div key={i} className="p-6 rounded-xl bg-[#050510] border border-white/5 hover:border-blue-500/20 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-400 font-medium">{crypto.symbol}/USD</div>
                    <span className="text-green-400 text-sm font-semibold">{crypto.change}</span>
                  </div>
                  <div className={`text-4xl font-bold mb-2 ${
                    crypto.color === 'blue' ? 'text-blue-400' :
                    crypto.color === 'orange' ? 'text-orange-400' :
                    'text-purple-400'
                  }`} className='font-orbitron'>
                    ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-gray-500">24h Volume</div>
                </div>
              ))}
            </div>
          </div>

          {/* Endpoints */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0a0a15] to-[#050510] border border-white/5">
            <h2 className="text-2xl font-bold mb-6" className='font-orbitron'>
              API Endpoints
            </h2>
            <div className="space-y-3">
              {[
                { name: 'Health Check', url: '/health', cost: 'Free', status: 'active' },
                { name: 'Price Data', url: '/price', cost: '$0.05', status: 'active' },
                { name: 'Trading Signals', url: '/signal', cost: '$0.25', status: 'active' },
                { name: 'On-Chain Data', url: '/onchain', cost: '$0.50', status: 'active' },
              ].map((api, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-t border-white/5 hover:bg-[#050510] px-4 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center gap-6">
                    <span className="font-semibold text-white">{api.name}</span>
                    <code className="text-blue-400 font-mono text-sm">{api.url}</code>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-green-400 font-medium">{api.cost}</span>
                    <span className="px-3 py-1 text-xs bg-green-500/10 text-green-400 rounded-full font-medium">
                      {api.status}
                    </span>
                    <a href={`${API_BASE}${api.url}`} target="_blank" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                      Test →
                    </a>
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
