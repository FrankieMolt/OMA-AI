import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bounties | OMA-AI',
  description: 'Earn rewards by contributing to the OMA-AI ecosystem.',
}

export default function BountiesPage() {
  const bounties = [
    {
      title: 'API Integration',
      reward: '$500',
      description: 'Integrate OMA-AI with a new blockchain',
      difficulty: 'Medium',
      status: 'open',
    },
    {
      title: 'Documentation',
      reward: '$200',
      description: 'Write comprehensive API documentation',
      difficulty: 'Easy',
      status: 'open',
    },
    {
      title: 'Bug Bounty',
      reward: '$1000',
      description: 'Find and report critical security issues',
      difficulty: 'Hard',
      status: 'open',
    },
  ]

  return (
    <main className="min-h-screen bg-[#050510] text-white font-exo2">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="font-orbitron font-bold text-lg">Bounties</span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-orbitron text-5xl font-bold mb-4">Bounties</h1>
          <p className="text-xl text-gray-300 mb-12">
            Earn rewards by contributing to the OMA-AI ecosystem
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {bounties.map((bounty, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0a0a15] border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-orbitron text-xl font-bold">{bounty.title}</h3>
                  <span className="font-orbitron text-green-400 font-bold">{bounty.reward}</span>
                </div>
                <p className="text-gray-400 mb-4">{bounty.description}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded">
                    {bounty.difficulty}
                  </span>
                  <span className="px-2 py-1 text-xs bg-green-500/10 text-green-400 rounded">
                    {bounty.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
