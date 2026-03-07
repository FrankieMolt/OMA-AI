import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Building2, Users, Crown } from 'lucide-react';
import { CREDIT_PACKAGES, MODEL_COSTS, EXAMPLE_COSTS } from '../lib/credits';

export default function CreditsPricing() {
  const [selectedPackage, setSelectedPackage] = useState<string>('basic');
  const [showModelComparison, setShowModelComparison] = useState(false);

  const getIcon = (id: string) => {
    switch (id) {
      case 'starter': return <Zap className="w-5 h-5" />;
      case 'team': return <Users className="w-5 h-5" />;
      case 'enterprise': return <Building2 className="w-5 h-5" />;
      default: return <Crown className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pay for what you use
          </h2>
          <p className="text-gray-400 text-lg">
            Simple credits. No subscriptions. Credits never expire.
          </p>
        </div>

        {/* Credit Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {CREDIT_PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              whileHover={{ scale: 1.02 }}
              className={`
                relative p-6 rounded-xl border-2 cursor-pointer transition-all
                ${selectedPackage === pkg.id 
                  ? 'border-purple-500 bg-purple-500/10' 
                  : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'}
                ${pkg.popular ? 'ring-2 ring-purple-500/50' : ''}
              `}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-500 rounded-full text-xs font-bold">
                  POPULAR
                </div>
              )}

              <div className="flex items-center gap-2 mb-4 text-purple-400">
                {getIcon(pkg.id)}
                <span className="font-semibold capitalize">{pkg.id}</span>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-white">
                  ${pkg.price}
                </div>
                <div className="text-sm text-gray-400">{pkg.description}</div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-gray-300">
                  <span>Base credits</span>
                  <span className="font-mono">{pkg.credits.toLocaleString()}</span>
                </div>
                {pkg.bonus > 0 && (
                  <div className="flex items-center justify-between text-green-400">
                    <span>Bonus credits</span>
                    <span className="font-mono">+{pkg.bonus.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-white font-semibold pt-2 border-t border-gray-800">
                  <span>Total</span>
                  <span className="font-mono">{(pkg.credits + pkg.bonus).toLocaleString()}</span>
                </div>
              </div>

              <button
                className={`
                  w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all
                  ${selectedPackage === pkg.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                `}
              >
                {selectedPackage === pkg.id ? 'Selected' : 'Select'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* What you get */}
        <div className="bg-gray-900/50 rounded-xl p-8 mb-12">
          <h3 className="text-xl font-bold text-white mb-4">
            What can you do with credits?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(EXAMPLE_COSTS).map(([task, costs]) => (
              <div key={task} className="bg-gray-800/50 rounded-lg p-4">
                <div className="font-medium text-white mb-3">{task}</div>
                <div className="space-y-2 text-sm">
                  {Object.entries(costs).map(([model, credits]) => (
                    <div key={model} className="flex justify-between text-gray-400">
                      <span>{model}</span>
                      <span className="font-mono">{credits} credits</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model pricing comparison */}
        <div className="mb-12">
          <button
            onClick={() => setShowModelComparison(!showModelComparison)}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4"
          >
            <span className="font-medium">
              {showModelComparison ? 'Hide' : 'Show'} model pricing comparison
            </span>
            <span className="text-xl">{showModelComparison ? '−' : '+'}</span>
          </button>

          {showModelComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="overflow-x-auto"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400">Model</th>
                    <th className="text-right py-3 px-4 text-gray-400">Provider</th>
                    <th className="text-right py-3 px-4 text-gray-400">Input (per 1K)</th>
                    <th className="text-right py-3 px-4 text-gray-400">Output (per 1K)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(MODEL_COSTS)
                    .sort((a, b) => a[1].inputCredits - b[1].inputCredits)
                    .map(([id, model]) => (
                      <tr key={id} className="border-b border-gray-800/50 hover:bg-gray-900/50">
                        <td className="py-3 px-4 text-white">{model.name}</td>
                        <td className="py-3 px-4 text-right text-gray-400">{model.provider}</td>
                        <td className="py-3 px-4 text-right font-mono text-gray-300">
                          {model.inputCredits === 0 ? 'FREE' : model.inputCredits.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-gray-300">
                          {model.outputCredits === 0 ? 'FREE' : model.outputCredits.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'No Expiration', desc: 'Credits last 1 year', icon: '⏱️' },
            { title: 'No Subscriptions', desc: 'Pay once, use anytime', icon: '💳' },
            { title: 'Volume Discounts', desc: 'Up to 25% bonus credits', icon: '🎁' },
            { title: '38+ Models', desc: 'Claude, GPT-4, Llama, more', icon: '🤖' },
            { title: 'Local Models', desc: 'Qwen 3.5 4B is FREE', icon: '🏠' },
            { title: 'Transparent Pricing', desc: 'Know exactly what you pay', icon: '📊' }
          ].map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <div className="text-2xl">{feature.icon}</div>
              <div>
                <div className="font-medium text-white">{feature.title}</div>
                <div className="text-sm text-gray-400">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transition-all">
            Get {CREDIT_PACKAGES.find(p => p.id === selectedPackage)?.credits.toLocaleString()} Credits for ${CREDIT_PACKAGES.find(p => p.id === selectedPackage)?.price}
          </button>
          <p className="text-sm text-gray-500 mt-3">
            No credit card required to start • Free tier: 1,000 credits/month
        </p>
        </div>
      </div>
    </div>
  );
}
