import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tasks | OMA-AI',
}

const API_BASE = 'https://frankie-prod.life.conway.tech'

async function getStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`, { cache: 'no-store' })
    return res.json()
  } catch {
    return { calls: 0, realPayments: 0 }
  }
}

export default async function TasksPage() {
  const stats = await getStats()

  const tasks = [
    { id: 1, name: 'Fetch SOL price', endpoint: '/price', cost: '$0.05', status: 'available' },
    { id: 2, name: 'Get BTC/ETH prices', endpoint: '/price', cost: '$0.05', status: 'available' },
    { id: 3, name: 'Trading signal', endpoint: '/signal', cost: '$0.25', status: 'available' },
    { id: 4, name: 'On-chain analytics', endpoint: '/onchain', cost: '$0.50', status: 'available' },
    { id: 5, name: 'Premium analysis', endpoint: '/premium', cost: '$5.00', status: 'available' },
  ]

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <a href="/" className="text-xl font-semibold"><span className="text-blue-400">OMA</span>-AI</a>
          <span className="ml-8 text-sm text-slate-400">Tasks</span>
        </div>
      </nav>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">API Tasks</h1>
        <p className="text-slate-400 mb-8">Execute API tasks and get real data.</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-400">{stats.calls || 0}</div>
            <div className="text-sm text-slate-400">Total Calls</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-400">{stats.realPayments || 0}</div>
            <div className="text-sm text-slate-400">Payments</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-yellow-400">${((stats.earnings || 0) / 100).toFixed(2)}</div>
            <div className="text-sm text-slate-400">Earnings</div>
          </div>
        </div>
        
        {/* Tasks */}
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="text-left px-6 py-3 text-sm">Task</th>
                <th className="text-left px-6 py-3 text-sm">Endpoint</th>
                <th className="text-left px-6 py-3 text-sm">Cost</th>
                <th className="text-left px-6 py-3 text-sm">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4">{task.name}</td>
                  <td className="px-6 py-4 font-mono text-sm text-blue-400">{task.endpoint}</td>
                  <td className="px-6 py-4 text-green-400">{task.cost}</td>
                  <td className="px-6 py-4">
                    <a 
                      href={`${API_BASE}${task.endpoint}`}
                      target="_blank"
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                    >
                      Execute
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
