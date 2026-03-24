import { Metadata } from 'next';
import { Check, X, Zap, Shield, Star, Server, Cpu, Wallet, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'Pricing | OMA-AI - Open Market Access',
  description: 'Comprehensive pricing for OMA-AI MCP Marketplace, LLM resale, GPU compute, and OpenClaw hosting.',
};

const coreServices = [
  {
    name: 'MCP Marketplace Access',
    price: 'Free',
    description: 'Browse, discover, and integrate production-ready MCPs',
    features: ['Unlimited MCP browsing', 'API key authentication', 'Usage analytics', 'Community support'],
  },
  {
    name: 'x402 Payments',
    price: '5%',
    description: 'Platform fee on all payment transactions',
    features: ['Gasless transactions', 'Multi-chain support', 'Automatic payouts', 'Real-time settlement'],
  },
  {
    name: 'Agent Wallet Creation',
    price: 'Free',
    description: 'Create autonomous wallets for AI agents',
    features: ['Self-custody', 'Programmable spending limits', 'Multi-chain compatibility', 'Transaction logging'],
  },
];

const llmResale = [
  {
    tier: 'Budget',
    markup: '10%',
    models: ['DeepSeek', 'Qwen'],
    inputPrice: '$0.27/M',
    outputPrice: '$1.10/M',
    bestFor: 'High-volume, cost-sensitive applications',
  },
  {
    tier: 'Mid-Tier',
    markup: '15%',
    models: ['MiniMax', 'Llama'],
    inputPrice: '$0.60/M',
    outputPrice: '$2.40/M',
    bestFor: 'Balanced performance and cost',
  },
  {
    tier: 'Premium',
    markup: '20-30%',
    models: ['Claude', 'GPT', 'Gemini'],
    inputPrice: '$3.00/M',
    outputPrice: '$15.00/M',
    bestFor: 'Premium capabilities, complex reasoning',
  },
];

const gpuCompute = [
  {
    name: 'H100 GPU',
    price: '$0.65/hr',
    markup: '10%',
    features: ['80GB HBM3', 'Instant provisioning', 'Sustained usage discounts', 'NVLink ready'],
  },
  {
    name: 'A100 GPU',
    price: '$0.45/hr',
    markup: '15%',
    features: ['40GB SXM4', 'Multi-instance', 'Priority queue', 'MIG support'],
  },
  {
    name: 'RTX 4090',
    price: '$0.35/hr',
    markup: '20%',
    features: ['24GB GDDR6X', 'Consumer pricing', 'Quick deploy', 'Best value'],
  },
  {
    name: 'Serverless Inference',
    price: '$0.003/request',
    markup: 'Included',
    features: ['Pay per token', 'Auto-scaling', 'No cold starts', 'Global CDN'],
  },
];

const openclawPlans = [
  {
    name: 'Starter',
    price: '$19/mo',
    description: 'Self-hosted with guidance',
    compareTo: 'VPS $5-20/mo + API setup',
    features: ['Setup documentation', 'Community Discord', 'Basic monitoring', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$39/mo',
    description: 'Fully managed hosting',
    compareTo: 'TryOpenClaw $39, RunMyClaw $30',
    features: ['Managed infrastructure', 'Auto-scaling', 'Priority support', 'Advanced analytics', 'Custom domains'],
  },
  {
    name: 'Enterprise',
    price: '$99/mo',
    description: 'Dedicated infrastructure',
    compareTo: 'Clawctl $49 (multi-instance)',
    features: ['Dedicated servers', 'SLA guarantee', '24/7 support', 'Custom integrations', 'On-premise option'],
  },
];

const walletFeatures = [
  {
    name: 'x402 Native',
    price: 'Free',
    description: 'Built-in payment protocol',
    features: ['ERC-3009 standard', 'Gasless on Base', 'USDC settlement', 'Auto-relayer'],
  },
  {
    name: 'Tempo MPP',
    price: 'Free',
    description: 'Multi-party computation',
    features: ['Key sharding', 'MPC signatures', 'No single point of failure', 'Threshold auth'],
  },
  {
    name: 'Visa CLI',
    price: 'Ready',
    description: 'Card issuance ready',
    features: ['Virtual cards', 'Spending controls', 'Global acceptance', 'Real-time loads'],
  },
  {
    name: 'Multi-Chain',
    price: 'Free',
    description: 'Cross-chain support',
    features: ['Base', 'Solana', 'Ethereum', 'Polygon', 'More coming'],
  },
];

const comparisonData = [
  {
    feature: 'Platform Fee',
    oma: '5%',
    rapidapi: '20-30%',
    smithery: '30%',
    openapi: '15-25%',
  },
  {
    feature: 'MCP Marketplace',
    oma: true,
    rapidapi: false,
    smithery: true,
    openapi: false,
  },
  {
    feature: 'LLM Resale',
    oma: true,
    rapidapi: true,
    smithery: false,
    openapi: false,
  },
  {
    feature: 'GPU Compute',
    oma: true,
    rapidapi: false,
    smithery: false,
    openapi: false,
  },
  {
    feature: 'OpenClaw Hosting',
    oma: true,
    rapidapi: false,
    smithery: false,
    openapi: false,
  },
  {
    feature: 'x402 Payments',
    oma: true,
    rapidapi: false,
    smithery: false,
    openapi: false,
  },
  {
    feature: 'Agent Wallets',
    oma: true,
    rapidapi: false,
    smithery: false,
    openapi: false,
  },
  {
    feature: 'Multi-Chain',
    oma: true,
    rapidapi: false,
    smithery: false,
    openapi: true,
  },
  {
    feature: 'Monthly Minimum',
    oma: '$0',
    rapidapi: '$9-49',
    smithery: '$29+',
    openapi: '$24',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-semibold text-purple-300">Open Market Access for AI Agents</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Complete Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to build, deploy, and monetize AI agents. From MCPs to GPU compute to payment infrastructure.
          </p>
        </div>

        {/* Core Platform Services */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Core Platform Services</h2>
              <p className="text-gray-400">Foundation services for all users</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {coreServices.map((service) => (
              <GlassCard key={service.name} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                  <span className="text-2xl font-bold text-purple-300">{service.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* LLM Resale */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
              <Cpu className="w-6 h-6 text-green-300" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">LLM Resale</h2>
              <p className="text-gray-400">Resell leading language models with markup</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {llmResale.map((tier) => (
              <GlassCard key={tier.tier} className="p-6">
                <div className="text-center mb-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    tier.tier === 'Premium' ? 'bg-amber-600/30 text-amber-300' :
                    tier.tier === 'Mid-Tier' ? 'bg-blue-600/30 text-blue-300' :
                    'bg-green-600/30 text-green-300'
                  }`}>
                    {tier.tier} Tier
                  </span>
                  <div className="text-3xl font-bold text-white mb-1">{tier.markup}</div>
                  <p className="text-gray-400 text-sm">markup</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Input</span>
                    <span className="text-white font-mono">{tier.inputPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Output</span>
                    <span className="text-white font-mono">{tier.outputPrice}</span>
                  </div>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <p className="text-xs text-gray-500 mb-2">Models</p>
                  <div className="flex flex-wrap gap-2">
                    {tier.models.map((model) => (
                      <span key={model} className="px-2 py-1 bg-slate-800 rounded text-xs text-gray-300">
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-4">{tier.bestFor}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* GPU/VM Compute */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
              <Server className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">GPU & VM Compute</h2>
              <p className="text-gray-400">Instant access to enterprise hardware</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gpuCompute.map((gpu) => (
              <GlassCard key={gpu.name} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{gpu.name}</h3>
                  <span className="text-xl font-bold text-blue-300">{gpu.price}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">10-20% markup on provider pricing</p>
                <ul className="space-y-2">
                  {gpu.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* OpenClaw Hosting */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">OpenClaw Hosting</h2>
              <p className="text-gray-400">Deploy and scale your AI agents</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {openclawPlans.map((plan) => (
              <GlassCard key={plan.name} className={`p-6 ${plan.name === 'Pro' ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.name === 'Pro' && (
                  <div className="text-center mb-2">
                    <span className="inline-block px-2 py-1 bg-purple-600 rounded text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <div className="text-4xl font-bold text-amber-300 mt-2">{plan.price}</div>
                  <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Compare to</p>
                  <p className="text-sm text-gray-300">{plan.compareTo}</p>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Agent Wallet Features */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-teal-600/20 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Agent Wallet & Payments</h2>
              <p className="text-gray-400">Autonomous wallets for AI agents</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {walletFeatures.map((feature) => (
              <GlassCard key={feature.name} className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                  <span className="text-sm font-bold text-teal-300">{feature.price}</span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Platform Comparison
          </h2>
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Feature</th>
                    <th className="text-center px-6 py-4">
                      <span className="text-purple-300 font-bold">OMA-AI</span>
                    </th>
                    <th className="text-center px-6 py-4 text-gray-400">RapidAPI</th>
                    <th className="text-center px-6 py-4 text-gray-400">Smithery.ai</th>
                    <th className="text-center px-6 py-4 text-gray-400">OpenAPI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {comparisonData.map((row) => (
                    <tr key={row.feature}>
                      <td className="px-6 py-4 text-white font-medium">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {typeof row.oma === 'boolean' ? (
                          row.oma ? (
                            <Check className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-purple-300 font-bold">{row.oma}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-400">{row.rapidapi}</td>
                      <td className="px-6 py-4 text-center text-gray-400">{row.smithery}</td>
                      <td className="px-6 py-4 text-center text-gray-400">{row.openapi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Research Data Reference */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Market Research
          </h2>
          <GlassCard className="p-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-gray-400 text-sm mb-1">Self-Hosting (VPS + API)</p>
                <p className="text-2xl font-bold text-white">$5-20/mo</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Managed Hosting</p>
                <p className="text-2xl font-bold text-white">$24-39/mo</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">DeepSeek (input)</p>
                <p className="text-2xl font-bold text-white">$0.27/M</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Claude (input)</p>
                <p className="text-2xl font-bold text-white">$3.00/M</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* FAQ Section */}
        <div className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">How does LLM resale work?</h3>
              <p className="text-gray-300 leading-relaxed">
                Purchase LLM tokens at wholesale rates and resell them with your markup. We handle the infrastructure and billing - you set your prices and keep the margin after the 5% platform fee.
              </p>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What's included in GPU compute?</h3>
              <p className="text-gray-300 leading-relaxed">
                Instant access to H100, A100, and RTX 4090 GPUs with 10-20% markup on provider pricing. Includes serverless inference at $0.003/request, auto-scaling, and global CDN delivery.
              </p>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Can I self-host OpenClaw?</h3>
              <p className="text-gray-300 leading-relaxed">
                Yes! The Starter plan at $19/mo provides documentation and community support for self-hosting. Compare to raw VPS costs of $5-20/mo plus manual API setup.
              </p>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">How do agent wallets work?</h3>
              <p className="text-gray-300 leading-relaxed">
                Agent wallets are self-custody wallets with programmable spending limits. They support x402 native payments, multi-chain operations, and can be integrated with Visa CLI for card issuance.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <GlassCardPurple className="max-w-4xl mx-auto p-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Build, deploy, and monetize AI agents with the complete OMA-AI platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/mcps"
                className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
              >
                Browse MCPs
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/publish"
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors"
              >
                Publish Your MCP
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </GlassCardPurple>
        </div>
      </div>
    </div>
  );
}
