import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Building2, Sparkles } from 'lucide-react';

/**
 * OMA-AI Credits-Only Pricing
 * No subscriptions - Pay as you go
 */

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    credits: '10,000',
    price: 10,
    bonus: null,
    description: 'Perfect for trying out',
    icon: Zap,
    color: 'from-blue-600 to-blue-700',
    features: [
      '10K credits',
      'All models included',
      'No expiry',
      'Priority support',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    credits: '55,000',
    price: 45,
    bonus: '+5K bonus',
    description: 'Most popular',
    icon: Sparkles,
    color: 'from-purple-600 to-purple-700',
    popular: true,
    features: [
      '55K credits',
      '+5K bonus credits',
      'All models included',
      'Priority support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: '115,000',
    price: 85,
    bonus: '+15K bonus',
    description: 'Best value',
    icon: Crown,
    color: 'from-yellow-600 to-orange-600',
    features: [
      '115K credits',
      '+15K bonus credits',
      'All models included',
      'Priority support',
      'Early access',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    credits: '600,000',
    price: 400,
    bonus: '+100K bonus',
    description: 'For teams',
    icon: Building2,
    color: 'from-green-600 to-emerald-700',
    features: [
      '600K credits',
      '+100K bonus credits',
      'All models included',
      'Priority support',
      'Team dashboard',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: '1.25M',
    price: 750,
    bonus: '+250K bonus',
    description: 'For enterprises',
    icon: Building2,
    color: 'from-gray-700 to-gray-800',
    features: [
      '1.25M credits',
      '+250K bonus credits',
      'All models included',
      'Priority support',
      'Team dashboard',
      'Custom models',
      'SLA guarantee',
    ],
  },
];

export default function CreditsPricing() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState('basic');

  return (
    <div className="min-h-screen bg-gray-950 text-white py-20 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-4"
        >
          <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text text-sm font-semibold uppercase tracking-wider">
            Pay As You Go
          </span>
        </motion.div>
        
        <h1 className="text-5xl font-bold mb-4">
          Simple, Credit-Based Pricing
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          No subscriptions. No commitments. Buy credits and use them whenever you want.
          <span className="block mt-2 text-green-400 font-semibold">
            Local models are FREE (0 credits)
          </span>
        </p>
      </div>

      {/* Credit Info */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">How Credits Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">1 credit</div>
              <div className="text-gray-400">≈ $0.001 USD</div>
              <div className="text-sm text-gray-500 mt-2">1,000 credits = $1</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">0 credits</div>
              <div className="text-gray-400">Local models cost</div>
              <div className="text-sm text-gray-500 mt-2">Qwen, Llama local = FREE</div>
            </div>
            
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">Never expire</div>
              <div className="text-gray-400">Credits don't expire</div>
              <div className="text-sm text-gray-500 mt-2">Use them anytime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, index) => {
            const Icon = pkg.icon;
            
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(pkg.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className={`relative bg-gray-900 rounded-2xl border-2 transition-all ${
                  pkg.popular 
                    ? 'border-purple-500 shadow-xl shadow-purple-500/20' 
                    : 'border-gray-800 hover:border-gray-700'
                } ${hoveredCard === pkg.id ? 'transform scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className={`bg-gradient-to-r ${pkg.color} p-6 rounded-t-xl`}>
                  <Icon className="w-10 h-10 mb-4" />
                  <h3 className="text-2xl font-bold">{pkg.name}</h3>
                  <p className="text-sm opacity-90">{pkg.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-5xl font-bold">
                      {pkg.credits}
                    </div>
                    {pkg.bonus && (
                      <div className="text-green-400 font-semibold mt-1">
                        {pkg.bonus}
                      </div>
                    )}
                    <div className="text-gray-400 mt-2">
                      ${pkg.price} one-time
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setSelectedPlan(pkg.id)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    Get {pkg.name}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Model Pricing Table */}
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">Model Pricing</h2>
        
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left">Model</th>
                <th className="px-6 py-4 text-right">Input (per 1K)</th>
                <th className="px-6 py-4 text-right">Output (per 1K)</th>
                <th className="px-6 py-4 text-center">Provider</th>
              </tr>
            </thead>
            <tbody>
              {/* Local Models */}
              <tr className="border-t border-gray-800 bg-green-900/10">
                <td className="px-6 py-4">
                  <span className="font-semibold">Qwen 3.5 4B</span>
                  <span className="ml-2 text-xs bg-green-700 px-2 py-1 rounded">LOCAL</span>
                </td>
                <td className="px-6 py-4 text-right text-green-400 font-semibold">0 credits</td>
                <td className="px-6 py-4 text-right text-green-400 font-semibold">0 credits</td>
                <td className="px-6 py-4 text-center text-green-400">Your device</td>
              </tr>
              <tr className="border-t border-gray-800 bg-green-900/10">
                <td className="px-6 py-4">
                  <span className="font-semibold">Llama 3.2 3B</span>
                  <span className="ml-2 text-xs bg-green-700 px-2 py-1 rounded">LOCAL</span>
                </td>
                <td className="px-6 py-4 text-right text-green-400 font-semibold">0 credits</td>
                <td className="px-6 py-4 text-right text-green-400 font-semibold">0 credits</td>
                <td className="px-6 py-4 text-center text-green-400">Your device</td>
              </tr>
              
              {/* Cloud Models */}
              <tr className="border-t border-gray-800">
                <td className="px-6 py-4 font-semibold">Llama 3.2 1B</td>
                <td className="px-6 py-4 text-right">0.02 credits</td>
                <td className="px-6 py-4 text-right">0.08 credits</td>
                <td className="px-6 py-4 text-center text-blue-400">Venice</td>
              </tr>
              <tr className="border-t border-gray-800 bg-blue-900/5">
                <td className="px-6 py-4 font-semibold">DeepSeek v3.2</td>
                <td className="px-6 py-4 text-right">0.30 credits</td>
                <td className="px-6 py-4 text-right">1.20 credits</td>
                <td className="px-6 py-4 text-center text-blue-400">Venice</td>
              </tr>
              <tr className="border-t border-gray-800">
                <td className="px-6 py-4 font-semibold">GPT-4o</td>
                <td className="px-6 py-4 text-right">2.50 credits</td>
                <td className="px-6 py-4 text-right">10.00 credits</td>
                <td className="px-6 py-4 text-center text-orange-400">OpenRouter</td>
              </tr>
              <tr className="border-t border-gray-800 bg-orange-900/5">
                <td className="px-6 py-4 font-semibold">Claude 3.5 Sonnet</td>
                <td className="px-6 py-4 text-right">3.00 credits</td>
                <td className="px-6 py-4 text-right">15.00 credits</td>
                <td className="px-6 py-4 text-center text-orange-400">OpenRouter</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-center text-gray-400 mt-6">
          1 credit ≈ $0.001 USD • Local models are 100% FREE • No minimum commitment
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="font-semibold text-lg mb-2">Do credits expire?</h3>
            <p className="text-gray-400">No! Your credits never expire. Use them whenever you want.</p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="font-semibold text-lg mb-2">Can I earn credits for free?</h3>
            <p className="text-gray-400">
              Yes! Run local models and process requests from other users to earn credits.
              <span className="text-green-400"> Mining coming Q2 2026.</span>
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="font-semibold text-lg mb-2">Why are local models free?</h3>
            <p className="text-gray-400">
              When you use local models, you're using your own compute. No cloud costs = no credits needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
