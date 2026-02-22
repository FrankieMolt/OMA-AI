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
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <a href="/" className="text-xl font-semibold"><span className="text-blue-400">OMA</span>-AI</a>
          <span className="ml-8 text-sm text-slate-400">Dashboard</span>
          <span className="float-right text-sm text-green-400">● LIVE</span>
        </div>
      </nav>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Live Dashboard</h1>
        <p className="text-slate-400 mb-8">Real-time data from <a href={`${API_BASE}/health`} className="text-blue-400 hover:underline">Frankie API</a></p>
        
        {/* Status Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${health.status === 'ok' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-slate-400">Status</span>
            </div>
            <div className="text-2xl font-bold capitalize">{health.status}</div>
            <div className="text-xs text-slate-500 mt-1">v{health.version}</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="text-slate-400 mb-2">Uptime</div>
            <div className="text-2xl font-bold text-blue-400">{uptimeHours}h</div>
            <div className="text-xs text-slate-500 mt-1">{health.uptime?.toLocaleString()}s</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="text-slate-400 mb-2">API Calls</div>
            <div className="text-2xl font-bold text-yellow-400">{stats.calls || 0}</div>
            <div className="text-xs text-slate-500 mt-1">{stats.hourlyCalls || 0}/hr</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="text-slate-400 mb-2">Revenue</div>
            <div className="text-2xl font-bold text-green-400">${((stats.earnings || 0) / 100).toFixed(2)}</div>
            <div className="text-xs text-slate-500 mt-1">{stats.realPayments || 0} payments</div>
          </div>
        </div>

        {/* Live Prices */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live Crypto Prices (Coinbase)
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="text-slate-400 text-sm">SOL/USD</div>
              <div className="text-2xl font-bold text-blue-400">${solPrice.toFixed(2)}</div>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="text-slate-400 text-sm">BTC/USD</div>
              <div className="text-2xl font-bold text-orange-400">${btcPrice.toLocaleString()}</div>
            </div>
            <div className="bg-slate-900 rounded-lg p-4">
              <div className="text-slate-400 text-sm">ETH/USD</div>
              <div className="text-2xl font-bold text-purple-400">${ethPrice.toFixed(2)}</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-4">Source: {price.data?.sol?.source || 'coinbase'} • Refresh for latest</div>
        </div>

        {/* API Endpoints */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4">API Endpoints</h2>
          <div className="space-y-2">
            {[
              { name: 'Health Check', url: '/health', cost: 'Free', status: 'active' },
              { name: 'Price Data', url: '/price', cost: '$0.05', status: 'active' },
              { name: 'Trading Signals', url: '/signal', cost: '$0.25', status: 'active' },
              { name: 'On-Chain Data', url: '/onchain', cost: '$0.50', status: 'active' },
            ].map((api) => (
              <div key={api.url} className="flex items-center justify-between py-2 border-b border-slate-700">
                <div>
                  <span className="font-medium">{api.name}</span>
                  <code className="text-blue-400 ml-4 text-sm">{api.url}</code>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-sm">{api.cost}</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">{api.status}</span>
                  <a href={`${API_BASE}${api.url}`} target="_blank" className="text-blue-400 hover:underline text-sm">Test →</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Version: {health.version || 'unknown'} | Network: Base | x402: {health.x402Verified ? '✅ Verified' : '❌'}</p>
        </div>
      </div>
    </main>
  )
}
