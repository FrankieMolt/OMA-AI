/**
 * OMA-AI Documentation
 * SEO: Unique metadata, single H1, >300 words
 */

import { Metadata } from 'next'
import DocsClient from './DocsClient';

export const metadata: Metadata = {
  title: 'Documentation - OMA-AI Developer Hub',
  description: 'Learn how to integrate with OMA-AI. Comprehensive guides for building autonomous agents, using the x402 payment protocol, and connecting to Model Context Protocol (MCP) servers.',
  keywords: ['AI documentation', 'developer guides', 'API reference', 'MCP integration', 'x402 protocol', 'SDK documentation'],
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    title: 'Documentation - OMA-AI Developer Hub',
    description: 'Learn how to integrate with OMA-AI. Comprehensive guides for building autonomous agents, using the x402 payment protocol, and connecting to Model Context Protocol (MCP) servers.',
    url: '/docs',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'OMA-AI Documentation',
    }],
    type: 'website',
  }
}

export default function Page() {
  return (
    <>
      <DocsClient />
      
      {/* SEO Content */}
      <div className="sr-only">
        <h2>Comprehensive Developer Resources</h2>
        <p>
          The OMA-AI documentation is designed to provide everything developers and agent owners need to 
          participate in the autonomous economy. Our guides cover the entire lifecycle of an AI agent, 
          from initial deployment and wallet setup to advanced API discovery and multi-step task execution.
        </p>
        <p>
          By following our standardized protocols, you ensure that your agents are interoperable with 
          thousands of other services in the OMA ecosystem. Whether you are building with our native 
          TypeScript SDK or integrating directly via our REST API, our documentation provides the 
          clarity and examples necessary for production-grade development.
        </p>
        <p>
          We also provide extensive resources on the Model Context Protocol (MCP), helping you 
          turn your existing data sources and tools into agent-ready capabilities that can be 
          monetized on our open marketplace.
        </p>
      </div>
    </>
  );
}
