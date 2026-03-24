import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "LLM Resale Marketplace",
  description: "Resale LLM marketplace with markup pricing. Build AI agents with autonomous payments via x402.",
};

const providerTiers = [
  {
    tier: 'Budget',
    markup: '10%',
    color: 'from-green-500 to-emerald-600',
    providers: ['DeepSeek', 'Qwen', 'Yi', 'CodeQwen'],
    description: 'Best for high-volume, cost-sensitive applications',
  },
  {
    tier: 'Mid-tier',
    markup: '15%',
    color: 'from-blue-500 to-cyan-600',
    providers: ['MiniMax', 'Llama', 'Mistral', 'Yi'],
    description: 'Balanced performance and cost for production use',
  },
  {
    tier: 'Premium',
    markup: '20-30%',
    color: 'from-purple-500 to-pink-600',
    providers: ['Claude', 'GPT', 'Gemini', 'Cohere'],
    description: 'Top-tier models for complex reasoning and analysis',
  },
];

const models = [
  {
    provider: 'DeepSeek',
    model: 'DeepSeek V3',
    tier: 'Budget',
    inputPrice: 0.01,
    outputPrice: 0.03,
    retailInput: 0.009,
    retailOutput: 0.027,
    markup: '10%',
    context: '200K',
    speed: '60 tokens/sec',
    bestUse: 'Code generation, math, reasoning',
    x402: true,
    features: ['Self-reasoning', 'Fast inference', 'Low cost'],
  },
  {
    provider: 'Qwen',
    model: 'Qwen 2.5 72B',
    tier: 'Budget',
    inputPrice: 0.015,
    outputPrice: 0.04,
    retailInput: 0.014,
    retailOutput: 0.036,
    markup: '10%',
    context: '32K',
    speed: '45 tokens/sec',
    bestUse: 'Multilingual, code, instruction following',
    x402: true,
    features: ['Strong coding', 'Multilingual', 'Instruction-tuned'],
  },
  {
    provider: 'MiniMax',
    model: 'MiniMax M2.5',
    tier: 'Mid-tier',
    inputPrice: 0.008,
    outputPrice: 0.024,
    retailInput: 0.007,
    retailOutput: 0.021,
    markup: '15%',
    context: '192K',
    speed: '120 tokens/sec',
    bestUse: 'Fast inference, long-context tasks',
    x402: true,
    features: ['Ultra-fast', 'Long context', 'Multilingual'],
  },
  {
    provider: 'Llama',
    model: 'Llama 3.3 70B',
    tier: 'Mid-tier',
    inputPrice: 0.55,
    outputPrice: 0.85,
    retailInput: 0.48,
    retailOutput: 0.74,
    markup: '15%',
    context: '128K',
    speed: '80 tokens/sec',
    bestUse: 'General purpose, instruction following',
    x402: true,
    features: ['Open weights', 'Instruction-tuned', 'Safe'],
  },
  {
    provider: 'Anthropic',
    model: 'Claude 3.5 Sonnet',
    tier: 'Premium',
    inputPrice: 3.00,
    outputPrice: 15.00,
    retailInput: 2.50,
    retailOutput: 12.50,
    markup: '20%',
    context: '200K',
    speed: '90 tokens/sec',
    bestUse: 'Complex reasoning, code, analysis',
    x402: true,
    features: ['Sonnet 3.5', 'Vision support', 'Computer use'],
  },
  {
    provider: 'Anthropic',
    model: 'Claude 3 Opus',
    tier: 'Premium',
    inputPrice: 15.00,
    outputPrice: 75.00,
    retailInput: 12.50,
    retailOutput: 62.50,
    markup: '20%',
    context: '200K',
    speed: '50 tokens/sec',
    bestUse: 'Research, complex analysis, writing',
    x402: true,
    features: ['Top-tier reasoning', 'Vision', 'Extended output'],
  },
  {
    provider: 'OpenAI',
    model: 'GPT-4 Turbo',
    tier: 'Premium',
    inputPrice: 10.00,
    outputPrice: 30.00,
    retailInput: 8.33,
    retailOutput: 25.00,
    markup: '20%',
    context: '128K',
    speed: '150 tokens/sec',
    bestUse: 'General AI, code, creative writing',
    x402: true,
    features: ['Vision', 'JSON mode', 'Function calling'],
  },
  {
    provider: 'Google',
    model: 'Gemini 2.0 Flash',
    tier: 'Premium',
    inputPrice: 0.20,
    outputPrice: 0.65,
    retailInput: 0.175,
    retailOutput: 0.56,
    markup: '30%',
    context: '1M',
    speed: '200 tokens/sec',
    bestUse: 'Speed-critical, long context, multimodal',
    x402: true,
    features: ['1M context', 'Native multimodal', 'Fastest'],
  },
  {
    provider: 'OpenAI',
    model: 'GPT-4o',
    tier: 'Premium',
    inputPrice: 2.50,
    outputPrice: 10.00,
    retailInput: 2.00,
    retailOutput: 8.00,
    markup: '25%',
    context: '128K',
    speed: '180 tokens/sec',
    bestUse: 'Multimodal, real-time interaction',
    x402: true,
    features: ['Native audio', 'Vision', 'Real-time'],
  },
];

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-400 text-sm font-medium">x402 Autonomous Payments Enabled</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            LLM Resale Marketplace
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-6">
            Build AI agents with <span className="text-green-400 font-semibold">Markup pricing</span>. 
            We resell from OpenRouter, Anthropic, OpenAI, Google with 10-30% markup.
          </p>
          <p className="text-zinc-500 max-w-xl mx-auto">
            Pay via x402 - agents can pay autonomously. No API keys, no subscriptions, 
            just gasless USDC payments on Base.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {providerTiers.map((tier) => (
            <div 
              key={tier.tier}
              className="relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800/50"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              }}
            >
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${tier.color} rounded-lg px-3 py-1 mb-4`}>
                <span className="text-white font-bold">{tier.tier}</span>
                <span className="text-white/80 text-sm">{tier.markup} markup</span>
              </div>
              <h3 className="text-white font-semibold mb-2">{tier.description}</h3>
              <div className="flex flex-wrap gap-2">
                {tier.providers.map((p) => (
                  <span key={p} className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Model Listings</h2>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              x402 Enabled
            </div>
          </div>
          
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left p-4 text-zinc-400 font-medium text-sm">Model</th>
                    <th className="text-left p-4 text-zinc-400 font-medium text-sm">Our Price</th>
                    <th className="text-left p-4 text-zinc-400 font-medium text-sm">Retail Price</th>
                    <th className="text-left p-4 text-zinc-400 font-medium text-sm">Context</th>
                    <th className="text-left p-4 text-zinc-400 font-medium text-sm">Speed</th>
                    <th className="text-left p-4 text-zinc-400 font-medium text-sm">Best Use</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr key={model.model} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="text-white font-semibold">{model.model}</p>
                          <p className="text-zinc-500 text-sm">{model.provider}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-green-400 font-semibold">${model.inputPrice}/1M in</p>
                        <p className="text-green-400/80 text-sm">${model.outputPrice}/1M out</p>
                        <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${
                          model.tier === 'Budget' ? 'bg-green-500/20 text-green-400' :
                          model.tier === 'Mid-tier' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {model.markup}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-zinc-400">${model.retailInput}/1M in</p>
                        <p className="text-zinc-500 text-sm">${model.retailOutput}/1M out</p>
                      </td>
                      <td className="p-4">
                        <p className="text-white">{model.context}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-zinc-400">{model.speed}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-zinc-400 text-sm">{model.bestUse}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-8 border border-zinc-800/50">
            <h2 className="text-2xl font-bold text-white mb-6">For AI Agents</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Self-Funding Wallets</h3>
                  <p className="text-zinc-400 text-sm">Agents can hold USDC wallets and autonomously pay for API calls. No human intervention needed.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Budget Management</h3>
                  <p className="text-zinc-400 text-sm">Set spending limits per agent. Get alerts when budget thresholds are reached.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Automatic Failover</h3>
                  <p className="text-zinc-400 text-sm">If a model fails or rate-limits, agents automatically switch to backup models with similar capabilities.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Usage Tracking</h3>
                  <p className="text-zinc-400 text-sm">Monitor per-agent spending, token usage, and costs. Export reports for accounting.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-8 border border-zinc-800/50">
            <h2 className="text-2xl font-bold text-white mb-6">Resale Model</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                  <h3 className="text-white font-semibold">How Markup Works</h3>
                </div>
                <p className="text-zinc-400 text-sm">We purchase API credits in bulk from providers at wholesale rates, then resell with a transparent markup (10-30%) that covers our infrastructure, x402 payment processing, and adds value through agent-optimized features.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-white font-semibold">Volume Discounts</h3>
                </div>
                <p className="text-zinc-400 text-sm">High-volume users get up to 15% additional discount. Contact us for enterprise pricing on 10M+ tokens/month.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <h3 className="text-white font-semibold">API Key Management</h3>
                </div>
                <p className="text-zinc-400 text-sm">Generate API keys for each agent. Set rate limits, expiration, and monitor usage in real-time through the dashboard.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-white font-semibold">Dashboard</h3>
                </div>
                <p className="text-zinc-400 text-sm">Track spend across all agents, view detailed usage breakdowns, set budgets, and export invoices for accounting.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-8 border border-green-500/20 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Start Building Today</h2>
              <p className="text-zinc-400 mb-6">
                Get started with x402-powered AI agents. No API keys required - 
                agents pay autonomously with USDC on Base.
              </p>
              <div className="flex gap-3">
                <button type="button" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
                  Create Agent
                </button>
                <button type="button" className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
                  View Docs
                </button>
              </div>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <p className="text-zinc-500 text-sm mb-3">Quick Start Code</p>
              <code className="text-green-400 text-sm block">
                {`import { OMA } from '@oma-ai/sdk'

const agent = new OMA({
  model: 'claude-3.5-sonnet',
  budget: '100 USD/month',
})

const response = await agent.chat(
  'Analyze this data...'
)`}
              </code>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/mcps" className="text-green-400 hover:text-green-300 text-sm inline-flex items-center gap-1">
            Browse MCP Marketplace 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
