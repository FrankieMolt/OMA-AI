import { Metadata } from 'next';
import { Cpu, Sparkles, DollarSign, Zap, ExternalLink, Search } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'AI Models | OMA-AI',
  description: 'Access 50+ language models via OpenRouter with x402 micropayments. Pay per token in USDC.',
};

// OpenRouter free models (no API key needed for browsing)
const FREE_MODELS = [
  { id: 'openchat/openchat-7b', name: 'OpenChat 7B', provider: 'OpenChat', context: '8K', price: 0 },
  { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B', provider: 'Mistral AI', context: '8K', price: 0 },
  { id: 'google/gemma-3-27b-it', name: 'Gemma 3 27B', provider: 'Google', context: '8K', price: 0 },
  { id: 'meta-llama/llama-3-3-70b-instruct', name: 'Llama 3.3 70B', provider: 'Meta', context: '128K', price: 0 },
  { id: 'nvidia/llama-3.3-nemotron-super-49b-v1', name: 'Nemotron Super 49B', provider: 'NVIDIA', context: '128K', price: 0 },
];

const POPULAR_MODELS = [
  { id: 'anthropic/claude-sonnet-4-20250514', name: 'Claude Sonnet 4', provider: 'Anthropic', context: '200K', price: 3 },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', context: '128K', price: 0.15 },
  { id: 'google/gemini-2.5-pro-preview', name: 'Gemini 2.5 Pro', provider: 'Google', context: '1M', price: 1.25 },
  { id: 'mistralai/mistral-small', name: 'Mistral Small', provider: 'Mistral AI', context: '128K', price: 0.2 },
  { id: 'deepseek-ai/deepseek-v3-0324', name: 'DeepSeek V3', provider: 'DeepSeek', context: '64K', price: 0.27 },
  { id: 'meta-llama/llama-4-scout', name: 'Llama 4 Scout', provider: 'Meta', context: '1M', price: 0.59 },
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI', context: '128K', price: 2.5 },
];

export default function LLMsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-cyan-500/20 mb-6">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300/80">OpenRouter Integration</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">AI Models</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            50+ models from OpenAI, Anthropic, Google, Meta and more. Pay per token via x402 — no subscriptions, no API key management.
          </p>
        </div>

        {/* How It Works */}
        <GlassCard className="p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">How x402 Model Access Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">1. Browse Models</h3>
              <p className="text-sm text-zinc-400">Explore 50+ models. Filter by provider, context length, or price.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">2. Get API Key</h3>
              <p className="text-sm text-zinc-400">Connect wallet and get an OMA-AI API key. Your agent uses this to call models.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">3. Pay Per Token</h3>
              <p className="text-sm text-zinc-400">Each token generation costs a fraction of a cent. x402 auto-settles in USDC.</p>
            </div>
          </div>
        </GlassCard>

        {/* Free Models */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Free Models</h2>
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">No API key needed</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FREE_MODELS.map((m) => (
              <GlassCard key={m.id} className="p-5 hover:border-green-500/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-sm">{m.name}</h3>
                    <p className="text-xs text-zinc-500">{m.provider}</p>
                  </div>
                  <span className="text-green-400 text-xs font-bold">FREE</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>Context: {m.context}</span>
                  <a
                    href={`https://openrouter.ai/models/${m.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 ml-auto"
                  >
                    OpenRouter <ExternalLink size={10} />
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Popular Paid Models */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <Cpu className="w-4 h-4 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Popular Models</h2>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">Per-token pricing</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_MODELS.map((m) => (
              <GlassCard key={m.id} className="p-5 hover:border-amber-500/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-sm">{m.name}</h3>
                    <p className="text-xs text-zinc-500">{m.provider}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-400 text-xs font-bold">${m.price}</span>
                    <p className="text-xs text-zinc-600">/1M tokens</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span>Context: {m.context}</span>
                  <a
                    href={`https://openrouter.ai/models/${m.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 ml-auto"
                  >
                    OpenRouter <ExternalLink size={10} />
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* CTA */}
        <GlassCard className="p-8 text-center bg-gradient-to-br from-violet-900/30 to-cyan-900/20 border-violet-500/30">
          <h2 className="text-2xl font-bold text-white mb-3">Get Started with OMA-AI Models</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
            Connect your wallet to get an API key. Your AI agent can then call any model — paying automatically via x402 microtransactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/wallet" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors">
              Connect Wallet
            </a>
            <a href="https://openrouter.ai/docs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-lg transition-colors">
              OpenRouter Docs <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
