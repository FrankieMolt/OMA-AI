import { motion } from 'framer-motion';
import Link from 'next/link';
import { Database, DollarSign, TrendingUp, Check, ArrowRight, Zap, Globe } from 'lucide-react';

const models = [
  { name: 'GPT-5.2', provider: 'OpenAI', tier: 'premium', inputPrice: 0.05, outputPrice: 0.15, context: '1M' },
  { name: 'Claude 4 Opus', provider: 'Anthropic', tier: 'premium', inputPrice: 0.075, outputPrice: 0.225, context: '200K' },
  { name: 'Gemini 2.5 Pro', provider: 'Google', tier: 'premium', inputPrice: 0.025, outputPrice: 0.10, context: '2M' },
  { name: 'DeepSeek V3', provider: 'DeepSeek', tier: 'standard', inputPrice: 0.014, outputPrice: 0.028, context: '64K' },
  { name: 'Llama 4', provider: 'Meta', tier: 'standard', inputPrice: 0.01, outputPrice: 0.03, context: '128K' },
  { name: 'Kimi K2.5', provider: 'Moonshot', tier: 'standard', inputPrice: 0.005, outputPrice: 0.015, context: '200K' },
  { name: 'Qwen 3', provider: 'Alibaba', tier: 'standard', inputPrice: 0.003, outputPrice: 0.008, context: '32K' },
  { name: 'GLM 4.7 Flash', provider: 'Zhipu', tier: 'budget', inputPrice: 0.002, outputPrice: 0.006, context: '128K' },
];

export const metadata = {
  title: 'OpenRouter Integration - OMA-AI',
  description: 'Access 50+ AI models through one unified API. Automatic cost optimization, model variety, and zero configuration.',
};

export default function OpenRouterPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-[#12121f]">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-cyan-600/5 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border border-cyan-500/20 mb-6">
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-200/80">Model Catalog</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                OpenRouter
              </span>
              <span className="block mt-2 text-zinc-100">Integration</span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              One API key. 50+ models. Automatic routing to the cheapest option.
              Zero configuration required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/models"
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-semibold text-base hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center gap-2 group"
              >
                <span>View All Models</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 glass-card text-zinc-300 border border-zinc-700 rounded-full font-medium text-base hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all"
              >
                Get API Key
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Model Catalog */}
      <section className="py-24 px-4 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Model Pricing
              </h2>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                Compare costs and capabilities across all available models
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl glass-card border border-zinc-800">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="p-4 text-zinc-400 font-semibold">Model</th>
                    <th className="p-4 text-zinc-400 font-semibold">Provider</th>
                    <th className="p-4 text-zinc-400 font-semibold">Tier</th>
                    <th className="p-4 text-zinc-400 font-semibold text-right">Input ($/1K)</th>
                    <th className="p-4 text-zinc-400 font-semibold text-right">Output ($/1K)</th>
                    <th className="p-4 text-zinc-400 font-semibold">Context</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model, i) => (
                    <motion.tr
                      key={model.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Check className="w-4 h-4 text-cyan-400" />
                          <span className="font-semibold text-white">{model.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-zinc-400">{model.provider}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          model.tier === 'premium' ? 'bg-purple-500/20 text-purple-400' :
                          model.tier === 'standard' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {model.tier}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono text-zinc-300">${model.inputPrice.toFixed(3)}</td>
                      <td className="p-4 text-right font-mono text-zinc-300">${model.outputPrice.toFixed(3)}</td>
                      <td className="p-4 text-zinc-400">{model.context}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="rounded-xl glass-card border border-zinc-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white text-lg">Cost Optimization</h3>
                </div>
                <p className="text-sm text-zinc-400">
                  OpenRouter automatically routes your requests to the cheapest available model for your needs.
                </p>
              </div>

              <div className="rounded-xl glass-card border border-zinc-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h3 className="font-semibold text-white text-lg">Unified Billing</h3>
                </div>
                <p className="text-sm text-zinc-400">
                  One invoice across all models. No multiple subscriptions or complex setup.
                </p>
              </div>

              <div className="rounded-xl glass-card border border-zinc-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-white text-lg">Global Edge</h3>
                </div>
                <p className="text-sm text-zinc-400">
                  Deployed on edge networks worldwide with sub-100ms latency.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                One Key, Endless Models
              </h2>
            </div>

            <div className="rounded-2xl glass-card border border-zinc-800 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="font-semibold text-xl text-white mb-4">Quick Start</h3>
                  <pre className="bg-black/50 p-4 rounded-lg text-sm text-zinc-300 overflow-x-auto">
                    <code className="text-cyan-300">
{`npm install @oma-ai/sdk

// Single configuration
const oma = new OMA({
  apiKey: 'your-api-key'
});

// Any model, automatically routed
const response = await oma.chat({
  model: 'auto', // or specific model
  messages: [{ role: 'user', content: 'Hello!' }]
});`}
                    </code>
                  </pre>
                  <p className="text-sm text-zinc-400 mt-4">
                    No need to switch providers. OpenRouter handles it all.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="font-semibold text-xl text-white mb-4">Why OpenRouter?</h3>
                  <ul className="space-y-3">
                    {[
                      'One API key for 50+ models',
                      'Automatic cost optimization',
                      'No provider switching needed',
                      'Unified billing and invoices',
                      'Built-in rate limiting',
                      'Edge deployment for speed'
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:col-span-2 text-center mt-8 pt-8 border-t border-zinc-800">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all"
                >
                  <span>Get Your API Key</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
