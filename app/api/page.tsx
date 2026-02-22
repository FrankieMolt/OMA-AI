import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Reference | OMA-AI',
}

export default function APIPage() {
  const endpoints = [
    { method: 'GET', path: '/health', cost: 'Free', desc: 'Health check', auth: false },
    { method: 'GET', path: '/price', cost: '$0.05', desc: 'Real-time crypto prices', auth: true },
    { method: 'GET', path: '/signal', cost: '$0.25', desc: 'Trading signals', auth: true },
    { method: 'GET', path: '/onchain', cost: '$0.50', desc: 'On-chain analytics', auth: true },
    { method: 'GET', path: '/whale-watch', cost: '$0.50', desc: 'Whale tracking', auth: true },
    { method: 'GET', path: '/defi/yields', cost: '$1.00', desc: 'DeFi yield data', auth: true },
    { method: 'GET', path: '/premium', cost: '$5.00', desc: 'Full analysis bundle', auth: true },
  ]

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold">
            <span className="text-blue-400">OMA</span>-AI
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/" className="hover:text-blue-400">Home</a>
            <a href="/tasks" className="hover:text-blue-400">Tasks</a>
            <a href="/docs" className="hover:text-blue-400">Docs</a>
            <a href="/api" className="text-blue-400">API</a>
          </div>
        </div>
      </nav>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">API Reference</h1>
        <p className="text-slate-400 mb-8">Complete API documentation for OMA-AI services.</p>
        
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium">Method</th>
                <th className="text-left px-6 py-3 text-sm font-medium">Endpoint</th>
                <th className="text-left px-6 py-3 text-sm font-medium">Description</th>
                <th className="text-left px-6 py-3 text-sm font-medium">Cost</th>
                <th className="text-left px-6 py-3 text-sm font-medium">Auth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {endpoints.map((ep, i) => (
                <tr key={i} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-mono">
                      {ep.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-blue-400">{ep.path}</td>
                  <td className="px-6 py-4 text-slate-300">{ep.desc}</td>
                  <td className="px-6 py-4 text-green-400">{ep.cost}</td>
                  <td className="px-6 py-4">
                    {ep.auth ? (
                      <span className="text-yellow-400 text-sm">x402</span>
                    ) : (
                      <span className="text-slate-500 text-sm">None</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Authentication</h3>
            <p className="text-slate-400 text-sm mb-4">
              All paid endpoints require x402 payment. Include the payment proof in the X-Payment header.
            </p>
            <div className="bg-slate-900 rounded p-4 font-mono text-xs">
              <p>curl -H "X-Payment: proof" \</p>
              <p className="ml-4">https://api.oma-ai.com/price</p>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Base URL</h3>
            <p className="text-slate-400 text-sm mb-4">
              Production API endpoint for all requests.
            </p>
            <div className="bg-slate-900 rounded p-4 font-mono text-sm text-blue-400">
              https://frankie-prod.life.conway.tech
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
