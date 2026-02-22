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
    { method: 'GET', path: '/health', cost: 'Free', desc: 'API health check' },
    { method: 'GET', path: '/price', cost: '$0.05', desc: 'Real-time SOL, BTC, ETH prices' },
    { method: 'GET', path: '/signal', cost: '$0.25', desc: 'Trading signals' },
    { method: 'GET', path: '/onchain', cost: '$0.50', desc: 'On-chain analytics' },
    { method: 'GET', path: '/stats', cost: 'Free', desc: 'API statistics' },
  ]

  return (
    <main className="min-h-screen bg-[#050510] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-sm">OMA</span>
            </div>
            <span className="font-semibold">API Reference</span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">API Reference</h1>
          <p className="text-gray-400 mb-8">Live endpoints with real-time data</p>

          {/* Status */}
          <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5 mb-8">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className={`w-3 h-3 rounded-full ${health.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="font-semibold">Status: {health.status || 'Unknown'}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">v{health.version || '-'}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">Uptime: {Math.round((health.uptime || 0) / 3600)}h</span>
            </div>
            <div className="flex gap-6 text-sm">
              <span><span className="text-gray-500">Calls:</span> {stats.calls || 0}</span>
              <span><span className="text-gray-500">Payments:</span> {stats.realPayments || 0}</span>
            </div>
          </div>

          {/* Endpoints */}
          <div className="rounded-xl bg-[#0a0a15] border border-white/5 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#050510]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Endpoint</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Description</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Cost</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Test</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((ep) => (
                  <tr key={ep.path} className="border-t border-white/5 hover:bg-[#050510] transition-colors">
                    <td className="px-6 py-4">
                      <code className="text-blue-400">{ep.path}</code>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{ep.desc}</td>
                    <td className="px-6 py-4 text-green-400 font-semibold">{ep.cost}</td>
                    <td className="px-6 py-4">
                      <a href={`${API_BASE}${ep.path}`} target="_blank" className="text-blue-400 hover:text-blue-300">Test →</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Code Example */}
          <div className="mt-8 p-6 rounded-xl bg-[#0a0a15] border border-white/5">
            <h3 className="font-semibold mb-4">Quick Start</h3>
            <pre className="p-4 rounded-lg bg-[#050510] text-sm overflow-x-auto font-mono">
{`# Get crypto prices
curl https://frankie-prod.life.conway.tech/price

# Response
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
