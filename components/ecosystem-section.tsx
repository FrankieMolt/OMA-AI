import React from 'react';

export function EcosystemSection() {
  return (
    <section className="py-24 bg-zinc-900 border-y border-zinc-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Open Ecosystem & x402 Treasury
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            OMA-AI leverages the power of the Model Context Protocol (MCP) and an innovative x402 microtransaction economy to create an unstoppable network of AI agents.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">MCP Integrations</h3>
            <p className="text-zinc-400 mb-6">
              Connect your agents to virtually any service through the open-source Model Context Protocol. We support a vast library of native and community-built MCP servers out of the box.
            </p>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Filesystem & Database access</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> API integrations (GitHub, Slack, etc.)</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Custom corporate knowledge bases</li>
            </ul>
          </div>
          
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">x402 Agentic Economy</h3>
            <p className="text-zinc-400 mb-6">
              Our unique Treasury System utilizes HTTP 402 protocols to enable agents to autonomously transact, purchase API credits, and reward community skills in real-time.
            </p>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Autonomous USDC/Base transactions</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> On-demand resource provisioning</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Decentralized agent compensation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
