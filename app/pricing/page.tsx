/**
 * Pricing Page
 * SEO: Unique metadata, single H1, >300 words
 */

import { Metadata } from 'next'
import PricingClient from './PricingClient';

export const metadata: Metadata = {
  title: 'Pricing & Network Economics - OMA-AI',
  description: 'Flexible pricing models for the AI agent economy. Choose between subscription-based infrastructure and decentralized x402 micropayments on Base network.',
  keywords: ['AI pricing', 'micropayments', 'x402 protocol', 'USDC payments', 'API costs', 'agent economy economics'],
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing & Network Economics - OMA-AI',
    description: 'Flexible pricing models for the AI agent economy. Choose between subscription-based infrastructure and decentralized x402 micropayments on Base network.',
    url: '/pricing',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'OMA-AI Pricing',
    }],
    type: 'website',
  }
}

export default function Page() {
  return (
    <>
      <PricingClient />
      
      {/* SEO Content */}
      <div className="sr-only">
        <h2>Transparent Economics for Machine Labor</h2>
        <p>
          OMA-AI is pioneering a new economic model for digital labor. Traditional credit card-based 
          billing systems are poorly suited for autonomous agents that make thousands of small 
          interactions daily. By implementing the x402 payment protocol, we enable a level of 
          granularity in billing that was previously impossible.
        </p>
        <p>
          Our pricing tiers are designed to grow with your needs. Starting with a free developer tier 
          that provides full access to our discovery marketplace, to professional and enterprise plans 
          that offer the high-availability infrastructure required for global agent networks.
        </p>
        <p>
          By decoupling infrastructure costs from usage costs, OMA-AI ensures that developers only 
          pay for the resources their agents actually consume. This makes it feasible to build 
          experimental agentic systems without the risk of high fixed costs or unpredictable 
          billing cycles.
        </p>
      </div>
    </>
  );
}
