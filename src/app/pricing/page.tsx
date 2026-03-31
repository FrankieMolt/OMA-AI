'use client';
import { useState } from 'react';
import Link from 'next/link';

const TIERS = [
  { name: 'Free', price: '$0', period: 'forever', calls: '1,000', description: 'Perfect for hobbyists and small projects', features: ['1,000 API calls/month', 'All free MCP servers', 'Community support', 'Basic analytics', '5 concurrent connections'], cta: 'Get Started', highlight: false },
  { name: 'Pro', price: '$19', period: '/month', calls: '50,000', description: 'For developers and growing projects', features: ['50,000 API calls/month', 'All MCP servers + premium', 'Priority support', 'Advanced analytics', '25 concurrent connections', 'x402 payments', 'Custom rate limits'], cta: 'Start Free Trial', highlight: true },
  { name: 'Enterprise', price: 'Custom', period: '', calls: 'Unlimited', description: 'For teams and production deployments', features: ['Unlimited API calls', 'Dedicated MCP servers', '24/7 support', 'Custom SLA', 'SSO / SAML', 'Volume discounts', 'Custom integrations'], cta: 'Contact Sales', highlight: false },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">Pay only for what you use. All plans include access to the MCP marketplace and free skills.</p>
          <button onClick={() => setAnnual(!annual)} className="mt-6 flex items-center gap-3 mx-auto text-sm text-zinc-400 hover:text-white transition-colors">
            <span className={`w-10 h-6 rounded-full p-1 transition-colors ${annual ? 'bg-purple-600' : 'bg-zinc-700'}`}><span className={`block w-4 h-4 rounded-full bg-white transition-transform ${annual ? 'translate-x-4' : 'translate-x-0'}`} /></span>
            <span>Annual billing <span className="text-emerald-400 font-medium">Save 20%</span></span>
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TIERS.map(tier => (
            <div key={tier.name} className={`rounded-2xl p-8 border ${tier.highlight ? 'bg-purple-950/40 border-purple-500/50 relative' : 'bg-zinc-900 border-zinc-800'}`}>
              {tier.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">Most Popular</div>}
              <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-zinc-500">{tier.period}</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6">{tier.description}</p>
              <div className="space-y-3 mb-8">
                {tier.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-zinc-300"><svg className="w-4 h-4 text-purple-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>{f}</div>
                ))}
              </div>
              <Link href={tier.name === 'Enterprise' ? '/contact' : '/account'} className={`block text-center py-3 rounded-lg font-medium transition-colors ${tier.highlight ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}>{tier.cta}</Link>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: 'What counts as an API call?', a: 'Each request to an MCP server tool counts as one API call. Webhooks and internal tool-to-tool calls are free.' },
              { q: 'Can I roll over unused calls?', a: 'Pro plan calls roll over for 30 days. Free tier resets monthly.' },
              { q: 'How do x402 payments work?', a: 'x402 is a crypto payment header that allows per-request payments. You can pay for premium MCPs with USDC without a subscription.' },
              { q: 'Are there rate limits?', a: 'Free tier: 10 calls/min. Pro: 100 calls/min. Enterprise: custom limits.' },
              { q: 'Can I self-host MCP servers?', a: 'Yes. The OMA-AI stack includes Docker Compose configs for running all MCP servers on your own infrastructure.' },
              { q: 'What chains are supported?', a: 'Solana, Ethereum, Base, Polygon, Arbitrum, Optimism, and BNB Chain.' },
            ].map(item => (
              <div key={item.q} className="bg-zinc-800/50 rounded-xl p-5">
                <h4 className="text-white font-medium mb-2">{item.q}</h4>
                <p className="text-zinc-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
