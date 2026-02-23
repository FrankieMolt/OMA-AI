async function getAPIs() {
  const res = await fetch('http://localhost:3000/api/apis', { cache: 'no-store' });
  return res.json();
}

export const metadata = {
  title: 'API Marketplace | OMA-AI',
  description: 'Browse and discover x402-enabled APIs for AI agents.',
}

export default async function MarketplacePage() {
  const { apis } = await getAPIs();

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">API Marketplace</h1>
            <p className="text-zinc-400">{apis.length} APIs available with x402 payments</p>
          </div>
          <a href="/marketplace/submit" className="px-6 py-3 bg-[#22C55E] rounded-lg font-semibold hover:bg-[#16A34A] transition">
            + List Your API
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apis.map((api: any) => (
            <a 
              key={api.id}
              href={`/marketplace/${api.id}`}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">{api.category}</span>
                {api.featured && <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded">Featured</span>}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{api.name}</h3>
              <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{api.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">by {api.owner}</span>
                <span className="text-green-400 font-mono">${api.price.toFixed(2)}/call</span>
              </div>
              
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800 text-sm text-zinc-500">
                <span>⭐ {api.rating}</span>
                <span>{api.calls.toLocaleString()} calls</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
