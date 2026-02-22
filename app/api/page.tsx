import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Reference | OMA-AI',
}

const API_BASE = 'https://frankie-prod.life.conway.tech'

// Server-side fetch for real data
async function getHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { cache: 'no-store' })
    return res.json()
  } catch {
    return { status: 'error' }
  }
}

async function getStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`, { cache: 'no-store' })
    return res.json()
  } catch {
    return { calls: 0, realPayments: 0 }
  }
}

export default async function APIPage() {
  const health = await getHealth()
  const stats = await getStats()

  const endpoints = [
    { method: 'GET', path: '/health', cost: 'Free', desc: 'Health check' },
    { method: 'GET', path: '/price', cost: '$0.05', desc: 'Real-time crypto prices (SOL, BTC, ETH)' },
    { method: 'GET', path: '/signal', cost: '$0.25', desc: 'Trading signals' },
    { method: 'GET', path: '/onchain', cost: '$0.50', desc: 'On-chain analytics' },
    { method: 'GET', path: '/stats', cost: 'Free', desc: 'API statistics' },
  ]

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <a href="/" className="text-xl font-semibold"><span className="text-blue-400">OMA</span>-AI</a>
          <span className="ml-8 text-sm text-slate-400">API Reference</span>
        </div>
      </nav>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">API Reference</h1>
        <p className="text-slate-400 mb-8">Live API with real data.</p>
        
        {/* Live Status */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-3 h-3 rounded-full ${health.status === 'ok' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="font-semibold">Status: {health.status || 'Unknown'}</span>
            <span className="text-slate-400 text-sm">|</span>
            <span className="text-slate-400 text-sm">Version: {health.version || '-'}</span>
            <span className="text-slate-400 text-sm">|</span>
            <span className="text-slate-400 text-sm">Uptime: {Math.round((health.uptime || 0) / 3600)}h</span>
          </div>
          <div className="text-sm text-slate-400">
            Total calls: {stats.calls || 0} | Real payments: {stats.realPayments || 0}
          </div>
        </div>

        {/* Endpoints */}
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left px-6 py-3 text-sm">Endpoint</th>
                <th className="text-left px-6 py-3 text-sm">Description</th>
                <th className="text-left px-6 py-3 text-sm">Cost</th>
                <th className="text-left px-6 py-3 text-sm">Try</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {endpoints.map((ep) => (
                <tr key={ep.path} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 font-mono text-sm text-blue-400">{ep.path}</td>
                  <td className="px-6 py-4 text-slate-300">{ep.desc}</td>
                  <td className="px-6 py-4 text-green-400">{ep.cost}</td>
                  <td className="px-6 py-4">
                    <a 
                      href={`${API_BASE}${ep.path}`}
                      target="_blank"
                      className="text-blue-400 hover:underline text-sm"
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
        <div className="mt-8 bg-slate-800 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Quick Start</h3>
          <pre className="bg-slate-900 rounded p-4 text-sm overflow-x-auto">
{`# Get crypto prices
curl https://frankie-prod.life.conway.tech/price

# Response
{
  "payment": { "required": true, "amount": "0.05" },
  "data": { "sol": { "price": 177.45 }, "btc": { "price": 98000 }, "eth": { "price": 2700 } }
}`}
          </pre>
        </div>
      </div>
    </main>
  )
}
