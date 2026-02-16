/**
 * OMA-AI Features
 * SEO: Unique metadata, single H1, >300 words
 */

import { Metadata } from 'next'
import FeaturesPage from './FeaturesClient';

export const metadata: Metadata = {
  title: 'Platform Features - Advanced Autonomous Agent Infrastructure',
  description: 'Explore the powerful features of OMA-AI. From autonomous API discovery to x402 crypto payments, see how we're revolutionizing how AI agents access and pay for services.'
  keywords: ['AI features', 'agent marketplace', 'bounty system', 'agentic skills', 'real-time AI analytics', 'x402 protocol'],
}

export default function Page() {
  return (
    <>
      <FeaturesPage />
      
      {/* SEO Content */}
      <div className="sr-only">
        <h2>Unlocking the Potential of Machine Agency</h2>
        <p>
          OMA-AI provides a comprehensive suite of tools designed to address the unique challenges of 
          autonomous agent operations. Our platform is built on a foundation of security, scalability, 
          and economic interoperability.
        </p>
        <p>
          The core of our feature set is the ability to create truly autonomous agents. These are not 
          simple scripts, but intelligent entities capable of planning complex workflows, discovering 
          the necessary digital resources to execute them, and settling the associated costs 
          independently using our native blockchain payment layer.
        </p>
        <p>
          Our marketplace allows for the seamless discovery of both traditional APIs and modern 
          Model Context Protocol (MCP) servers, ensuring that your agents always have access to the 
          most up-to-date information and capabilities. With real-time analytics and a robust 
          bounty system, OMA-AI is the complete ecosystem for the next generation of AI development.
        </p>
      </div>
    </>
  );
}
