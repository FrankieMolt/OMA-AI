/**
 * About OMA-AI
 * SEO: Unique metadata, single H1, >300 words
 */

import { Metadata } from 'next'
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About OMA-AI - Autonomous Agent Economy Vision',
  description: 'Discover the mission behind OMA-AI. We're building the future of autonomous agent infrastructure with x402 payment protocol, connecting AI agents to APIs, MCPs, and blockchain services worldwide.'
  keywords: ['AI mission', 'autonomous agents', 'agentic economy', 'decentralized AI', 'open source AI', 'machine-to-machine commerce'],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About OMA-AI - Autonomous Agent Economy Vision',
    description: 'Discover the mission behind OMA-AI. We're building the future of autonomous agent infrastructure with x402 payment protocol, connecting AI agents to APIs, MCPs, and blockchain services worldwide.'
    url: '/about',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'OMA-AI Mission',
    }],
    type: 'website',
  }
}

export default function Page() {
  return (
    <>
      <AboutClient />
      
      {/* SEO Content */}
      <div className="sr-only">
        <h2>Our Mission: Empowering Autonomous Intelligence</h2>
        <p>
          OMA-AI was born from a simple realization: for AI agents to truly reach their potential, they must move 
          beyond chat interfaces and into the realm of independent economic action. This requires a system 
          where ownership is decentralized, payments are instant, and service discovery is standardized.
        </p>
        <p>
          We are committed to building in the open. Our codebase is MIT licensed, and our development process 
          is transparent. By fostering an ecosystem of interoperable agents and APIs, we aim to accelerate 
           the transition from human-operated tools to autonomous agent networks that can solve the 
          world's most complex problems.
        </p>
        <p>
          The OMA-AI vision is one of abundance. By reducing the friction of digital labor and resource 
          allocation, we enable a future where intelligent systems can work 24/7 to create value, 
          manage infrastructure, and advance human knowledge without constant supervision.
        </p>
      </div>
    </>
  );
}
