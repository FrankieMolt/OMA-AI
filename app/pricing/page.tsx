'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'forever',
      icon: '🚀',
      description: 'Perfect for exploring autonomous agents',
      features: [
        '5 autonomous agents',
        'Basic marketplace access',
        'Community support',
        'Public skills library',
        'Basic analytics',
        'x402 payments (Base only)',
        '1GB agent storage'
      ],
      cta: 'Start Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      icon: '⚡',
      description: 'For serious agent developers and operators',
      features: [
        'Unlimited agents',
        'Full marketplace access',
        'Priority email support',
        'Premium skills library',
        'Advanced analytics',
        'Multi-chain x402 (Base + Solana)',
        '10GB agent storage',
        'Custom agent domains',
        'API access',
        'Webhook integrations'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      icon: '🏢',
      description: 'For organizations building at scale',
      features: [
        'Everything in Pro',
        'Unlimited agent storage',
        'Dedicated support (24/7)',
        'Custom skill development',
        'On-premise deployment',
        'SLA guarantee (99.9%)',
        'White-label options',
        'Advanced security audit',
        'Team collaboration tools',
        'Custom integrations',
        'Priority feature requests'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const managedPlans = [
    {
      name: 'Vanilla OpenClaw',
      price: '$12',
      period: '/month',
      icon: '🦞',
      description: 'Minimal, general-purpose AI assistant',
      features: ['2GB RAM', '1 vCPU', 'Web search', 'Memory', 'Task management'],
      color: 'blue'
    },
    {
      name: 'Xpress Agent',
      price: '$19',
      period: '/month',
      icon: '🐦',
      description: 'Specialized for X/Twitter growth',
      features: ['4GB RAM', '2 vCPU', 'Trend research', 'Thread drafting', 'Engagement analysis'],
      color: 'purple'
    },
    {
      name: 'DevOne',
      price: '$39',
      period: '/month',
      icon: '💻',
      description: 'Full-stack coding agent',
      features: ['8GB RAM', '4 vCPU', 'GitHub integration', 'Terminal access', 'Vercel deployment'],
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-black mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Start free, scale as you grow. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Platform Plans */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Platform Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`glass-card p-8 relative ${plan.popular ? 'border-purple-500 border-2' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div className="text-4xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-black">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 ml-2">{plan.period}</span>}
                </div>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm">
                      <span className="text-purple-400 mr-2 mt-1">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/"
                  className={`block text-center py-3 rounded-lg font-bold ${
                    plan.popular
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Managed Personas */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-4 text-center">Managed Personas</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Pre-configured, fully managed agents. We handle infrastructure, you provide the mission.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {managedPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`glass-card p-8 border-t-4 border-${plan.color}-500`}
              >
                <div className="text-4xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-400">
                      <span className="text-gray-300 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/personas"
                  className="block text-center btn-secondary py-3 rounded-lg font-bold"
                >
                  Deploy Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-8"
        >
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Is there a free trial?',
                a: 'Yes! The Starter plan is free forever. Pro plans come with a 14-day free trial with no credit card required.'
              },
              {
                q: 'Can I upgrade or downgrade anytime?',
                a: 'Absolutely. You can change your plan at any time. When upgrading, you\'ll be charged the prorated difference. When downgrading, you\'ll receive credit towards future billing.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrency (USDC, ETH, SOL) via x402.'
              },
              {
                q: 'What happens if I exceed my limits?',
                a: 'You can purchase additional storage and agent capacity at any time. We\'ll notify you before you hit your limits to avoid any service interruption.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us within 30 days for a full refund.'
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-gray-800 pb-6 last:border-0">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
