import { Metadata } from 'next';
import { 
  Link2, Check, X, Sparkles, Zap, Globe, Users, 
  ArrowRight, HelpCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing | Shorty URL Shortener',
  description: 'Choose the perfect plan for your link management needs.',
};

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    features: [
      '100 links per month',
      'Basic analytics',
      'QR code generation',
      'API access (100 req/hr)',
      '7-day click history'
    ],
    notIncluded: [
      'Custom domains',
      'Team collaboration',
      'Priority support'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 5,
    description: 'Best for individuals',
    features: [
      '1,000 links per month',
      'Advanced analytics',
      'QR code generation',
      'API access (1,000 req/hr)',
      '30-day click history',
      '1 custom domain',
      'Email support'
    ],
    notIncluded: [
      'Team collaboration',
      'Priority support'
    ],
    cta: 'Start Basic Plan',
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 20,
    description: 'For power users & teams',
    features: [
      'Unlimited links',
      'Full analytics suite',
      'QR code generation',
      'API access (10,000 req/hr)',
      'Unlimited click history',
      '5 custom domains',
      'Team access (5 members)',
      'Priority support',
      'Webhooks'
    ],
    notIncluded: [],
    cta: 'Start Pro Plan',
    popular: false
  }
];

const faqs = [
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and you\'ll be prorated for the remainder of your billing period.'
  },
  {
    question: 'What happens if I exceed my monthly link limit?',
    answer: 'Free users will need to wait until the next month or upgrade. Paid users can purchase additional link packs or upgrade to Pro for unlimited links.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 14-day money-back guarantee on all paid plans. If you\'re not satisfied, contact support for a full refund.'
  },
  {
    question: 'Can I use my own domain?',
    answer: 'Yes! Basic plans include 1 custom domain, and Pro plans include up to 5. You\'ll need to add a CNAME record to your DNS settings.'
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="/shorten" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Shorty</span>
              </a>
            </div>
            
            <nav className="flex items-center gap-6">
              <a href="/shorten" className="text-gray-300 hover:text-white transition-colors">
                Shorten
              </a>
              <a href="/shorten/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="/shorten/api" className="text-gray-300 hover:text-white transition-colors">
                API
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">Simple Pricing</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular 
                  ? 'bg-gradient-to-b from-purple-600/20 to-pink-600/20 border-2 border-purple-500' 
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                
                <a
                  href={plan.id === 'free' ? '/signup' : `/checkout?plan=${plan.id}`}
                  className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
              
              <div className="px-8 pb-8">
                <p className="text-sm text-gray-400 mb-4">Features included:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-500">
                      <X className="w-5 h-5 text-gray-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Feature Comparison</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Feature</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Free</th>
                  <th className="px-6 py-4 text-center text-purple-400 font-semibold">Basic</th>
                  <th className="px-6 py-4 text-center text-pink-400 font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Links per month', free: '100', basic: '1,000', pro: 'Unlimited' },
                  { name: 'Custom domains', free: '—', basic: '1', pro: '5' },
                  { name: 'Team members', free: '—', basic: '—', pro: '5' },
                  { name: 'Click history', free: '7 days', basic: '30 days', pro: 'Unlimited' },
                  { name: 'API rate limit', free: '100/hr', basic: '1,000/hr', pro: '10,000/hr' },
                  { name: 'QR codes', free: '✓', basic: '✓', pro: '✓' },
                  { name: 'Analytics', free: 'Basic', basic: 'Advanced', pro: 'Full Suite' },
                  { name: 'Webhooks', free: '—', basic: '—', pro: '✓' },
                  { name: 'Support', free: 'Community', basic: 'Email', pro: 'Priority' }
                ].map((row, index) => (
                  <tr key={row.name} className={index % 2 === 0 ? 'bg-white/5' : ''}>
                    <td className="px-6 py-4 text-gray-300">{row.name}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{row.free}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{row.basic}</td>
                    <td className="px-6 py-4 text-center text-white font-medium">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                  {faq.question}
                </h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need more?</h2>
          <p className="text-gray-300 mb-6">
            Contact us for custom enterprise plans with dedicated support, SLA guarantees, and more.
          </p>
          <a
            href="mailto:enterprise@shorty.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
          >
            Contact Sales
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Link2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">Shorty</span>
          </div>
          
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Shorty. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
