'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function X402PaymentsGuide() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-purple-400 text-sm mb-4">February 6, 2026</div>
          <h1 className="text-5xl font-bold mb-6 gradient-text">
            Complete Guide to x402 Payments: How AI Agents Pay for Services Automatically
          </h1>
          <p className="text-xl text-zinc-400">
            Learn about x402, the revolutionary HTTP-native payment protocol that enables AI agents to automatically pay for APIs, MCP servers, and services on Base, Ethereum, and Solana networks.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <h2>What is x402?</h2>
          <p>
            x402 is an open protocol that extends HTTP with native payment capabilities. Inspired by the HTTP 402 "Payment Required" status code, x402 transforms it from a rejection into a payment request.
          </p>

          <h2>Why x402 Matters for AI Agents</h2>
          
          <h3>1. True Autonomy</h3>
          <p>Traditional payment flows require manual intervention, approvals, and complex workflows. x402 enables fully autonomous payment execution with minimal oversight.</p>

          <h3>2. Micro-Payment Efficiency</h3>
          <p>x402 is optimized for tiny transactions with per-call pricing, instant settlement, near-zero fees, and batch payment support.</p>

          <h3>3. Network Agnostic</h3>
          <p>x402 works across multiple blockchains including Base, Ethereum, and Solana with varying fee structures and confirmation times.</p>

          <h2>How to Use x402</h2>
          
          <h3>Installation</h3>
          <pre><code>npm install @oma-ai/x402-wallet-adapter</code></pre>

          <h3>Accepting Payments (Service Provider)</h3>
          <p>
            Service providers can accept x402 payments by integrating the wallet adapter into their API endpoints. When a payment is required, the server returns a payment URL that the client can use to complete the transaction automatically.
          </p>

          <h3>Making Payments (Agent/Client)</h3>
          <p>
            Agents and clients can make payments automatically using the wallet adapter. When they receive a 402 Payment Required response, they parse the payment details, execute the payment, and retry the original request with payment proof.
          </p>

          <h2>Real-World Scenarios</h2>
          
          <h3>Scenario 1: Agent Discovering APIs</h3>
          <p>
            An agent needs an image generation service. It searches the marketplace, finds the best option, and automatically pays via x402 without any manual intervention.
          </p>

          <h3>Scenario 2: Multi-Service Workflow</h3>
          <p>
            A document processing workflow uses multiple services: sentiment analysis, translation, and storage. All payments happen automatically, tracked in real-time.
          </p>

          <h2>Security Best Practices</h2>
          <ul>
            <li>Never commit private keys</li>
            <li>Implement rate limiting</li>
            <li>Validate all payments</li>
            <li>Use environment variables for secrets</li>
          </ul>

          <h2>Advanced Features</h2>
          <ul>
            <li>Payment Delegation</li>
            <li>Subscription Payments</li>
            <li>Batch Payments</li>
            <li>Monitoring and Analytics</li>
          </ul>

          <h2>OMA-AI Integration</h2>
          <p>
            OMA-AI provides built-in x402 support including wallet adapter SDK, paywall embed script, marketplace API, and payment dashboard.
          </p>

          <h2>Future Roadmap</h2>
          <ul>
            <li>Q2 2026: Multi-sig wallet support for teams</li>
            <li>Q3 2026: Cross-chain atomic swaps</li>
            <li>Q4 2026: AI-powered payment optimization</li>
            <li>2027: Network reputation system</li>
          </ul>

          <h2>Getting Started</h2>
          <ol>
            <li>Install the SDK</li>
            <li>Get testnet USDC from faucets</li>
            <li>Build your first integration</li>
            <li>Deploy to production</li>
          </ol>

          <h2>Resources</h2>
          <ul>
            <li>x402 Specification</li>
            <li>Wallet Adapter Documentation</li>
            <li>Integration Examples</li>
            <li>Discord Community</li>
            <li>GitHub Repository</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
