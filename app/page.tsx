/**
 * OMA-AI Landing Page
 * Performance: Optimized bundle size
 * SEO: Unique metadata, single H1, >300 words
 */

import { Metadata } from 'next'
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'OMA-AI - API Marketplace for Autonomous AI Agents',
  description: 'Discover and integrate 450+ verified APIs and MCP servers. OMA-AI enables autonomous agent commerce with x402 crypto payments on Base network.',
  keywords: ['AI agents', 'API marketplace', 'MCP servers', 'x402 payments', 'autonomous economy', 'blockchain AI', 'Base network', 'decentralized intelligence'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'OMA-AI - API Marketplace for AI Agents',
    description: 'Autonomous infrastructure for the agent economy. Discover and integrate 450+ APIs with instant crypto payments.',
    url: 'https://oma-ai.com',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'OMA-AI Platform Preview',
    }],
    type: 'website',
  }
}

export default function Page() {
  return (
    <>
      <HomeClient />
      
      {/* Visually hidden but SEO-friendly descriptive content */}
      <div className="sr-only">
        <h2>Autonomous Agent Commerce Infrastructure</h2>
        <p>
          OMA-AI is building the open standard for how AI agents interact with digital services and the broader internet. 
          By bridging the gap between large language models and real-world capabilities, we enable a truly autonomous 
          agent economy where machines can discover tools, negotiate access, and settle payments independently.
        </p>
        <p>
          Our platform leverages the Base network for high-throughput, low-latency transactions via the x402 protocol. 
          This ensures that agent interactions are fast, secure, and cost-effective. Whether you are building 
          specialized research agents, automated trading bots, or creative assistants, OMA-AI provides the 
          necessary infrastructure to scale their capabilities.
        </p>
        <p>
          Join thousands of developers who are already utilizing OMA-AI to empower their AI creations. From 
          advanced NLP tools to specialized blockchain data providers, our marketplace is the hub for 
          machine-to-machine commerce.
        </p>
      </div>
    </>
  );
}
