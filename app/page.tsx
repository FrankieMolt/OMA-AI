import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OMA-AI | One Man Army AI - Your AI Workforce',
  description: 'Build your AI workforce in minutes. One agent. Any mission. Full autonomy.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <nav className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold">
            🎮 <span className="text-[#5865F2]">OMA-AI</span>
          </div>
          <a href="#start" className="bg-[#5865F2] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90">
            Deploy Your Army
          </a>
        </nav>

        {/* Hero */}
        <div className="text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            ONE MAN ARMY AI
          </h1>
          <p className="text-[#0f0] text-2xl font-bold mb-4">
            One Agent. Any Mission.
          </p>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
            Build your AI workforce in minutes. Spawn agents for any role. 
            Generate revenue autonomously. No team needed.
          </p>
          <a href="#start" className="inline-block bg-[#5865F2] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90">
            🚀 Get Started Free
          </a>
        </div>

        {/* Agent Grid */}
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-2xl p-8 my-12">
          <h2 className="text-2xl font-bold text-center mb-8">🤖 Your AI Workforce</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: '👔', name: 'CEO Agent', role: 'Strategy' },
              { icon: '💻', name: 'CTO Agent', role: 'Development' },
              { icon: '📱', name: 'CMO Agent', role: 'Marketing' },
              { icon: '💰', name: 'CFO Agent', role: 'Finance' },
              { icon: '🔧', name: 'Worker Agent', role: 'Operations' },
              { icon: '🧪', name: 'R&D Agent', role: 'Innovation' },
            ].map((agent) => (
              <div key={agent.name} className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-4xl mb-2">{agent.icon}</div>
                <div className="font-semibold">{agent.name}</div>
                <div className="text-gray-500 text-sm">{agent.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          {[
            { title: '⚡ Deploy in Minutes', desc: 'Spawn your AI workforce with one click.' },
            { title: '💰 Revenue Ready', desc: 'Built-in x402 micropayments for 24/7 earnings.' },
            { title: '🧬 Spawn More', desc: 'Scale infinitely with child agents.' },
            { title: '🔒 Sovereign', desc: 'Your agents own their wallets.' },
          ].map((f) => (
            <div key={f.title} className="bg-[#111] rounded-xl p-6 border border-[#222]">
              <h3 className="text-[#5865F2] font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="my-12">
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Loadout</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { tier: 'Recruit', price: '$0', features: '1 Agent • Basic' },
              { tier: 'Soldier', price: '$29', features: '5 Agents • All Skills' },
              { tier: 'Operative', price: '$99', features: '20 Agents • Priority', popular: true },
              { tier: 'Commander', price: '$299', features: 'Unlimited • Custom' },
            ].map((p) => (
              <div 
                key={p.tier} 
                className={`bg-[#111] rounded-xl p-6 text-center border ${p.popular ? 'border-[#5865F2]' : 'border-[#222]'}`}
              >
                <div className="text-gray-500 text-sm uppercase">{p.tier}</div>
                <div className="text-3xl font-bold my-2">{p.price}</div>
                <div className="text-gray-400 text-sm">{p.features}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-[#222]">
          <p className="text-gray-500">🎮 OMA-AI | One Man Army AI</p>
          <p className="text-gray-600 text-sm mt-2">One Agent. Any Mission. Full Autonomy.</p>
        </footer>
      </div>
    </main>
  )
}
