export const metadata = {
  title: 'API Endpoints | OMA-AI Documentation',
  description: 'Complete API endpoint reference for Frankie API.',
}

export default function EndpointsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">API Endpoints</h1>
      
      <div className="space-y-8">
        {/* Price Endpoint */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">GET</span>
            <code className="text-lg text-white">/price</code>
          </div>
          <p className="text-zinc-400 mb-4">Get real-time cryptocurrency prices for BTC, ETH, and SOL.</p>
          
          <h3 className="text-sm font-semibold text-white mb-2">Query Parameters</h3>
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b border-zinc-700">
                <th className="text-left py-2 text-zinc-500">Parameter</th>
                <th className="text-left py-2 text-zinc-500">Type</th>
                <th className="text-left py-2 text-zinc-500">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 text-zinc-300">coin</td>
                <td className="py-2 text-zinc-400">string</td>
                <td className="py-2 text-zinc-400">BTC, ETH, or SOL (default: all)</td>
              </tr>
            </tbody>
          </table>
          
          <h3 className="text-sm font-semibold text-white mb-2">Response</h3>
          <pre className="bg-zinc-950 p-4 rounded text-sm text-zinc-300 overflow-x-auto">
{JSON.stringify({
  "btc": { "price": 66351.20, "source": "coinbase" },
  "eth": { "price": 1928.43, "source": "coinbase" },
  "sol": { "price": 80.89, "source": "coinbase" },
  "timestamp": 1771854582303
}, null, 2)}
          </pre>
          
          <h3 className="text-sm font-semibold text-white mb-2 mt-4">Pricing</h3>
          <p className="text-zinc-400">\$0.01 per request (x402 payment required)</p>
        </div>

        {/* Stats Endpoint */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">GET</span>
            <code className="text-lg text-white">/stats</code>
          </div>
          <p className="text-zinc-400 mb-4">Get API usage statistics and earnings.</p>
          <p className="text-zinc-500 text-sm">Free. No authentication required.</p>
        </div>

        {/* Health Endpoint */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-mono">GET</span>
            <code className="text-lg text-white">/health</code>
          </div>
          <p className="text-zinc-400 mb-4">Health check endpoint for monitoring.</p>
          <p className="text-zinc-500 text-sm">Free. No authentication required.</p>
        </div>
      </div>
    </div>
  )
}
