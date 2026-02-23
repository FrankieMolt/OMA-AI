import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Reference | OMA-AI',
  description: 'Complete API reference for OMA-AI marketplace. Access crypto prices, trading signals, and on-chain data.',
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
    { method: 'GET', path: '/health', cost: 'Free', desc: 'API health check and status', color: 'green' },
    { method: 'GET', path: '/price', cost: '$0.05', desc: 'Real-time SOL, BTC, ETH prices from Coinbase', color: 'blue' },
    { method: 'GET', path: '/signal', cost: '$0.25', desc: 'AI-powered trading signals and indicators', color: 'purple' },
    { method: 'GET', path: '/onchain', cost: '$0.50', desc: 'On-chain analytics and blockchain metrics', color: 'orange' },
    { method: 'GET', path: '/stats', cost: 'Free', desc: 'API usage statistics and metrics', color: 'gray' },
  ]

  const colorClasses: Record<string, string> = {
    green: 'bg-green-500/10 text-green-400',
    blue: 'bg-blue-500/10 text-blue-400',
    purple: 'bg-purple-500/10 text-purple-400',
    orange: 'bg-orange-500/10 text-orange-400',
    gray: 'bg-gray-500/10 text-gray-400',
  }

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
            <span className="font-orbitron font-bold text-lg tracking-tight">OMA-AI</span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="font-orbitron text-5xl font-bold mb-4">
              API Reference
            </h1>
            <p className="text-xl text-gray-300">
              Complete documentation for OMA-AI marketplace APIs
            </p>
          </div>

          {/* Status */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0a0a15] to-[#050510] border border-white/5 mb-8">
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <div className={`w-3 h-3 rounded-full ${health.status === 'ok' ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-red-500'}`} />
              <span className="font-semibold text-lg">Status: {health.status || 'Unknown'}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">v{health.version || '-'}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">Uptime: {Math.round((health.uptime || 0) / 3600)}h</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-[#050510] border border-white/5">
                <div className="font-orbitron text-3xl font-bold text-white mb-1">{stats.calls || 0}</div>
                <div className="text-gray-400">Total Calls</div>
              </div>
              <div className="p-4 rounded-xl bg-[#050510] border border-white/5">
                <div className="font-orbitron text-3xl font-bold text-green-400 mb-1">{stats.realPayments || 0}</div>
                <div className="text-gray-400">Payments</div>
              </div>
              <div className="p-4 rounded-xl bg-[#050510] border border-white/5">
                <div className="font-orbitron text-3xl font-bold text-blue-400 mb-1">${((stats.earnings || 0) / 100).toFixed(2)}</div>
                <div className="text-gray-400">Revenue</div>
              </div>
            </div>
          </div>

          {/* Endpoints */}
          <div className="rounded-2xl bg-[#0a0a15] border border-white/5 overflow-hidden mb-8">
            <div className="p-6 border-b border-white/5">
              <h2 className="font-orbitron text-2xl font-bold">Available Endpoints</h2>
            </div>
            <table className="w-full">
              <thead className="bg-[#050510]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Method</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Endpoint</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Description</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Cost</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Test</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-[#050510] transition-colors">
                    <td className="px-6 py-5">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${colorClasses[ep.color]}`}>
                        {ep.method}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <code className="text-blue-400 font-mono text-sm">{ep.path}</code>
                    </td>
                    <td className="px-6 py-5 text-gray-300">{ep.desc}</td>
                    <td className="px-6 py-5 text-green-400 font-semibold">{ep.cost}</td>
                    <td className="px-6 py-5">
                      <a href={`${API_BASE}${ep.path}`} target="_blank" className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg text-blue-400 text-sm font-medium transition-colors cursor-pointer">
                        Test →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Code Example */}
          <div className="rounded-2xl bg-[#0a0a15] border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="font-orbitron text-2xl font-bold">Quick Start</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-300 mb-4">
                Get real-time crypto prices with a simple API call:
              </p>
              <pre className="p-6 rounded-xl bg-[#050510] border border-white/5 text-sm overflow-x-auto font-mono text-gray-300">
{`# Get crypto prices
curl https://frankie-prod.life.conway.tech/price

# Response
{
  "payment": { "required": true, "amount": "0.05" },
  "data": {
    "sol": { "price": 177.45, "change_24h": 5.2 },
    "btc": { "price": 98000, "change_24h": 2.1 },
    "eth": { "price": 2700, "change_24h": 3.4 }
  }
}`}
              </pre>
              <p className="text-gray-400 text-sm mt-4">
                💡 Payments are handled automatically via x402 micropayment protocol
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
