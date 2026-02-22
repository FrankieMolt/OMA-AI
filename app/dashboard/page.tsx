import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | OMA-AI',
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

export default async function DashboardPage() {
  const { health, stats } = await getData()
  const uptimeHours = Math.round((health.uptime || 0) / 3600)

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <a href="/" className="text-xl font-semibold"><span className="text-blue-400">OMA</span>-AI</a>
          <span className="ml-8 text-sm text-slate-400">Dashboard</span>
        </div>
      </nav>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Live Dashboard</h1>
        
        {/* Status Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${health.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-slate-400">Status</span>
            </div>
            <div className="text-2xl font-bold capitalize">{health.status}</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="text-slate-400 mb-2">Uptime</div>
            <div className="text-2xl font-bold text-blue-400">{uptimeHours}h</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="text-slate-400 mb-2">API Calls</div>
            <div className="text-2xl font-bold text-yellow-400">{stats.calls || 0}</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="text-slate-400 mb-2">Revenue</div>
            <div className="text-2xl font-bold text-green-400">${((stats.earnings || 0) / 100).toFixed(2)}</div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4">API Endpoints</h2>
          <div className="space-y-2">
            {[
              { name: 'Health Check', url: '/health', status: 'active' },
              { name: 'Price Data', url: '/price', status: 'active' },
              { name: 'Trading Signals', url: '/signal', status: 'active' },
              { name: 'On-Chain Data', url: '/onchain', status: 'active' },
            ].map((api) => (
              <div key={api.url} className="flex items-center justify-between py-2 border-b border-slate-700">
                <div>
                  <span className="font-medium">{api.name}</span>
                  <code className="text-blue-400 ml-4 text-sm">{api.url}</code>
                </div>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">{api.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-8 text-center text-slate-500 text-sm">
          <p>Version: {health.version || 'unknown'} | Network: Base | Refresh for live data</p>
        </div>
      </div>
    </main>
  )
}
