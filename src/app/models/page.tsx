import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "AI Models",
  description: "Explore AI models available on OMA-AI. Compare providers, pricing, and capabilities.",
};

const models = [
  {
    provider: 'OpenRouter',
    description: 'Primary provider with diverse model selection',
    models: [
      { name: 'Kimi K2.5', context: '195K', strengths: ['Long context', 'Code', 'Analysis'] },
      { name: 'MiniMax M2.5', context: '192K', strengths: ['Fast inference', 'Multilingual'] },
      { name: 'Nemotron 70B', context: '125K', strengths: ['Reasoning', 'Math'] },
    ],
  },
  {
    provider: 'Anthropic',
    description: 'Advanced reasoning and safety-focused models',
    models: [
      { name: 'Claude 3.5 Sonnet', context: '200K', strengths: ['Code', 'Analysis', 'Vision'] },
      { name: 'Claude 3 Opus', context: '200K', strengths: ['Complex reasoning', 'Research'] },
    ],
  },
  {
    provider: 'OpenAI',
    description: 'Industry-leading GPT models',
    models: [
      { name: 'GPT-4 Turbo', context: '128K', strengths: ['General', 'Code', 'Creative'] },
      { name: 'GPT-4 Vision', context: '128K', strengths: ['Image analysis', 'OCR'] },
    ],
  },
  {
    provider: 'Google',
    description: 'Gemini family of multimodal models',
    models: [
      { name: 'Gemini 2.0 Flash', context: '1M', strengths: ['Speed', 'Long context', 'Multimodal'] },
      { name: 'Gemini 1.5 Pro', context: '2M', strengths: ['Ultra-long context', 'Analysis'] },
    ],
  },
];

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">AI Models</h1>
        <p className="text-zinc-400 mb-8 text-lg">
          Compare AI models available on OMA-AI. All models support x402 gasless payments.
        </p>

        <div className="space-y-8">
          {models.map((provider) => (
            <div key={provider.provider} className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-1">{provider.provider}</h2>
              <p className="text-zinc-400 mb-4">{provider.description}</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {provider.models.map((model) => (
                  <div key={model.name} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                    <h3 className="text-lg font-semibold text-white mb-1">{model.name}</h3>
                    <p className="text-zinc-400 text-sm mb-3">Context: {model.context}</p>
                    <div className="flex flex-wrap gap-1">
                      {model.strengths.map((s) => (
                        <span key={s} className="text-xs bg-zinc-700 text-zinc-300 px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-3">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-white mb-2">1. Choose a Model</h3>
              <p className="text-zinc-400">Browse models by provider, context length, or capabilities. Each model lists its strengths and pricing.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">2. Pay with x402</h3>
              <p className="text-zinc-400">No subscriptions or API keys. Pay per call with USDC on Base network gaslessly via x402 protocol.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">3. Integrate via MCP</h3>
              <p className="text-zinc-400">Use any model through our standardized MCP API. One integration, all providers.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/mcps" className="text-green-400 hover:text-green-300 text-sm">
            Browse MCP Marketplace →
          </Link>
        </div>
      </div>
    </div>
  );
}