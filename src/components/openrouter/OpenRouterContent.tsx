"use client";

import { motion } from 'framer-motion';
import { Database, DollarSign, TrendingUp, ArrowRight, Zap, Globe } from 'lucide-react';

const models = [
  { name: 'GPT-5.2', provider: 'OpenAI', tier: 'premium', inputPrice: 0.05, outputPrice: 0.15, context: '1M' },
  { name: 'Claude 4 Opus', provider: 'Anthropic', tier: 'premium', inputPrice: 0.075, outputPrice: 0.225, context: '200K' },
  { name: 'Gemini 2.5 Pro', provider: 'Google', tier: 'premium', inputPrice: 0.025, outputPrice: 0.10, context: '2M' },
  { name: 'DeepSeek V3', provider: 'DeepSeek', tier: 'standard', inputPrice: 0.014, outputPrice: 0.028, context: '64K' },
  { name: 'Llama 4', provider: 'Meta', tier: 'standard', inputPrice: 0.01, outputPrice: 0.03, context: '128K' },
  { name: 'Mistral Large 2', provider: 'Mistral', tier: 'standard', inputPrice: 0.012, outputPrice: 0.036, context: '128K' },
  { name: 'Mixtral 8x22B', provider: 'Mistral', tier: 'standard', inputPrice: 0.007, outputPrice: 0.021, context: '32K' },
  { name: 'Gemma 2', provider: 'Google', tier: 'standard', inputPrice: 0.008, outputPrice: 0.024, context: '100K' },
];

export default function OpenRouterContent() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mr-4">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                OpenRouter Integration
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Access 50+ AI models through one unified API. Automatic cost optimization, model variety, and zero configuration.
            </p>
          </motion.div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Smart Cost Optimization",
                description: "Automatically routes to the cheapest model that meets your quality requirements."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Model Variety",
                description: "Switch between GPT, Claude, Gemini, and more without changing code."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Zero Configuration",
                description: "One API key, one endpoint. Start using models in seconds."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mr-4 text-cyan-400">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing Table */}
          <motion.div
            {...fadeInUp}
            className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-16 overflow-x-auto"
          >
            <div className="flex items-center mb-4">
              <Database className="w-5 h-5 text-cyan-400 mr-2" />
              <h3 className="text-lg font-semibold">Model Catalog</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4">Model</th>
                  <th className="text-left py-3 px-4">Provider</th>
                  <th className="text-left py-3 px-4">Tier</th>
                  <th className="text-right py-3 px-4">Input</th>
                  <th className="text-right py-3 px-4">Output</th>
                  <th className="text-right py-3 px-4">Context</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 font-medium">{model.name}</td>
                    <td className="py-3 px-4 text-gray-400">{model.provider}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        model.tier === 'premium' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {model.tier}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">${model.inputPrice.toFixed(3)}/1M</td>
                    <td className="py-3 px-4 text-right">${model.outputPrice.toFixed(3)}/1M</td>
                    <td className="py-3 px-4 text-right text-gray-400">{model.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Code Example */}
          <motion.div
            {...fadeInUp}
            className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-16"
          >
            <div className="flex items-center mb-4">
              <Globe className="w-5 h-5 text-cyan-400 mr-2" />
              <h3 className="text-lg font-semibold">Quick Start</h3>
            </div>
            <pre className="text-sm bg-black/50 rounded-lg p-4 overflow-x-auto">
              <code className="text-gray-300">
{`import OpenRouter from '@oma-ai/openrouter';

const client = new OpenRouter({ apiKey: 'your-key' });

const response = await client.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  model: 'auto'  // Automatically selects best model
});

// Smart routing: Chooses cheapest model that meets requirements`}
              </code>
            </pre>
          </motion.div>

          {/* CTA */}
          <motion.div
            {...fadeInUp}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Start Using AI Models</h2>
              <p className="text-gray-400 mb-6">One API, 50+ models, zero configuration.</p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center mx-auto">
                Get API Key
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
