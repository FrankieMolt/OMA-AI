import React from 'react';

export function EcosystemSection() {
  return (
    <section className="py-24 bg-zinc-900 border-y border-zinc-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            The Agentic Infrastructure Stack
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            OMA-AI combines the open Model Context Protocol with gasless x402 payments to create the first complete stack for production AI agents.
          </p>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MCP Integrations */}
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">Universal MCP Integrations</h3>
            <p className="text-zinc-400 mb-6">
              Connect your AI agents to any service, database, or API through the standardized Model Context Protocol. 
              No more custom integrations or vendor lock-in.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-green-400 shrink-0">
                  <span className="text-xs">🔌</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">AI Models & LLMs</h4>
                  <p className="text-zinc-300 text-sm">
                    Access Claude, GPT, Cohere, and open-source models through a single MCP interface.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-green-400 shrink-0">
                  <span className="text-xs">🗄️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Databases & Storage</h4>
                  <p className="text-zinc-300 text-sm">
                    PostgreSQL, MongoDB, Redis, and S3-compatible storage with full MCP support.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-green-400 shrink-0">
                  <span className="text-xs">⚙️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Developer Tools</h4>
                  <p className="text-zinc-300 text-sm">
                    GitHub, Docker, web scraping, and code execution tools for agent-driven development.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/20 text-green-400 shrink-0">
                  <span className="text-xs">📊</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Data & Analytics</h4>
                  <p className="text-zinc-300 text-sm">
                    Real-time crypto prices, stock data, web search, and weather APIs for informed agents.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* x402 Payments */}
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">x402 Gasless Payments</h3>
            <p className="text-zinc-400 mb-6">
              Revolutionary HTTP 402 protocol enables feeless micropayments on Base network. 
              Agents can autonomously transact without API keys, subscriptions, or intermediaries.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                  <span className="text-xs">💸</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">True Micropayments</h4>
                  <p className="text-zinc-300 text-sm">
                    Pay fractions of a cent for individual API calls with zero gas fees on Base.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                  <span className="text-xs">🤖</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Agent-to-Agent Commerce</h4>
                  <p className="text-zinc-300 text-sm">
                    Enable AI agents to buy and sell services from each other in real-time.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                  <span className="text-xs">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Instant Settlement</h4>
                  <p className="text-zinc-300 text-sm">
                    USDC settlements in seconds with finality on Base L2.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 shrink-0">
                  <span className="text-xs">🔒</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">No API Keys</h4>
                  <p className="text-zinc-300 text-sm">
                    Eliminate key management and rotational overhead with protocol-level payments.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Real Use Cases */}
          <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-4">Production Use Cases</h3>
            <p className="text-zinc-400 mb-6">
              See how developers are using OMA-AI to build real AI agent applications today.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                  <span className="text-xs">🤖</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Autonomous Trading Agents</h4>
                  <p className="text-zinc-300 text-sm">
                    Agents that monitor markets, execute trades, and rebalance portfolios using real-time data and execution MCPs.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                  <span className="text-xs">🔍</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">AI Research Assistants</h4>
                  <p className="text-zinc-300 text-sm">
                    Agents that gather information from web search, databases, and academic APIs to synthesize reports.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                  <span className="text-xs">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Dynamic Workflow Orchestration</h4>
                  <p className="text-zinc-300 text-sm">
                    Agents that chain multiple MCPs together to create complex, adaptive business processes.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 shrink-0">
                  <span className="text-xs">📱</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Multi-Modal AI Applications</h4>
                  <p className="text-zinc-300 text-sm">
                    Combine vision, text, and audio MCPs to create rich, interactive agent experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
