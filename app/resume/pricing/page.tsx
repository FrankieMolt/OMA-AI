'use client';

import { Check, X, Zap, Star, Crown, Building2 } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for trying out the service',
    icon: Zap,
    features: [
      { text: '5 resumes/month', included: true },
      { text: 'Basic parsing', included: true },
      { text: 'PDF, DOCX support', included: true },
      { text: 'Email support', included: false },
      { text: 'AI scoring', included: false },
      { text: 'Batch processing', included: false },
      { text: 'API access', included: false },
      { text: 'Priority support', included: false }
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    name: 'Starter',
    price: 29,
    description: 'Best for small teams and startups',
    icon: Star,
    features: [
      { text: '100 resumes/month', included: true },
      { text: 'Advanced parsing', included: true },
      { text: 'All file formats', included: true },
      { text: 'Email support', included: true },
      { text: 'AI-powered scoring', included: true },
      { text: 'Batch processing (up to 20)', included: true },
      { text: 'API access', included: false },
      { text: 'Priority support', included: false }
    ],
    cta: 'Start Free Trial',
    popular: true
  },
  {
    name: 'Pro',
    price: 99,
    description: 'For growing teams and agencies',
    icon: Crown,
    features: [
      { text: '1,000 resumes/month', included: true },
      { text: 'Advanced parsing', included: true },
      { text: 'All file formats', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Advanced AI scoring', included: true },
      { text: 'Batch processing (up to 50)', included: true },
      { text: 'Full API access', included: true },
      { text: 'Priority support', included: true }
    ],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    icon: Building2,
    features: [
      { text: 'Unlimited resumes', included: true },
      { text: 'Custom parsing rules', included: true },
      { text: 'All file formats', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom AI models', included: true },
      { text: 'Unlimited batch processing', included: true },
      { text: 'Enterprise API with SLA', included: true },
      { text: '24/7 phone support', included: true }
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

const comparisonFeatures = [
  { name: 'Monthly resumes', free: '5', starter: '100', pro: '1,000', enterprise: 'Unlimited' },
  { name: 'File formats', free: 'PDF, DOCX', starter: 'All formats', pro: 'All formats', enterprise: 'All formats' },
  { name: 'AI scoring', free: '—', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
  { name: 'Batch processing', free: '—', starter: 'Up to 20', pro: 'Up to 50', enterprise: 'Unlimited' },
  { name: 'API access', free: '—', starter: '—', pro: '✓', enterprise: '✓' },
  { name: 'Rate limit', free: '1/min', starter: '10/min', pro: '60/min', enterprise: 'Custom' },
  { name: 'Support', free: 'Community', starter: 'Email', pro: 'Priority', enterprise: '24/7 Dedicated' },
  { name: 'Data retention', free: '7 days', starter: '30 days', pro: '90 days', enterprise: 'Custom' }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 ${
                plan.popular
                  ? 'bg-gradient-to-b from-blue-600/20 to-purple-600/20 border-2 border-blue-500'
                  : 'bg-gray-800 border border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                  plan.popular ? 'bg-blue-500' : 'bg-gray-700'
                }`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </span>
                  {typeof plan.price === 'number' && plan.price > 0 && (
                    <span className="text-gray-400">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.name === 'Enterprise' ? '/contact' : '/resume'}
                className={`block w-full py-3 rounded-lg font-medium text-center transition ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-800 rounded-2xl overflow-hidden mb-16">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Feature Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Feature</th>
                  <th className="px-6 py-4 text-center text-gray-400 font-medium">Free</th>
                  <th className="px-6 py-4 text-center text-blue-400 font-medium">Starter</th>
                  <th className="px-6 py-4 text-center text-purple-400 font-medium">Pro</th>
                  <th className="px-6 py-4 text-center text-yellow-400 font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-gray-700 last:border-0">
                    <td className="px-6 py-4 text-gray-300">{feature.name}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{feature.free}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{feature.starter}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{feature.pro}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{feature.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Calculator */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Revenue Potential</h2>
            <p className="text-gray-400">See how much you could save with AI resume screening</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 rounded-xl p-6 text-center">
              <p className="text-gray-400 mb-2">Manual Screening Time</p>
              <p className="text-3xl font-bold text-white">15 min</p>
              <p className="text-gray-500 text-sm">per resume</p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 text-center">
              <p className="text-gray-400 mb-2">AI Screening Time</p>
              <p className="text-3xl font-bold text-green-400">30 sec</p>
              <p className="text-gray-500 text-sm">per resume</p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 text-center">
              <p className="text-gray-400 mb-2">Time Saved</p>
              <p className="text-3xl font-bold text-blue-400">97%</p>
              <p className="text-gray-500 text-sm">on screening time</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-300">
              For a team screening <strong className="text-white">100 resumes/month</strong>, AI screening saves <strong className="text-green-400">24+ hours</strong> of manual work.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: 'Can I upgrade or downgrade my plan?',
                a: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your billing cycle.'
              },
              {
                q: 'What happens if I exceed my monthly limit?',
                a: 'You\'ll receive a notification when you reach 80% of your limit. Additional usage is charged at $0.50 per resume (Starter) or $0.20 per resume (Pro).'
              },
              {
                q: 'Is my data secure?',
                a: 'Absolutely. We use bank-level encryption, and your data is never used to train AI models. You can delete your data at any time.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with our service.'
              },
              {
                q: 'Can I integrate with my ATS?',
                a: 'Yes, our Pro and Enterprise plans include API access and webhooks for integration with popular ATS systems.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to automate your hiring?</h2>
          <p className="text-gray-400 mb-8">Start free today. No credit card required.</p>
          <Link
            href="/resume"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
