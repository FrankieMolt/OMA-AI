'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    question: "What is OMA-AI?",
    answer: "OMA-AI is the premier MCP (Model Context Protocol) marketplace, enabling AI agents to discover, integrate, and pay for tools seamlessly. We host 19+ verified MCP servers with x402 gasless payments.",
    category: "General",
  },
  {
    question: "What is an MCP?",
    answer: "MCP (Model Context Protocol) is a standardized protocol for connecting AI agents to external tools and data sources. It enables agents to perform complex tasks autonomously.",
    category: "General",
  },
  {
    question: "What are x402 payments?",
    answer: "x402 is a revolutionary payment protocol that enables gasless, instant micropayments for AI services on Base network. Users pay without holding crypto or and without transaction fees.",
    category: "Payments",
  },
  {
    question: "How do I get started?",
    answer: "Simply browse our marketplace, select an MCP, and start using it immediately. No API keys required - payments happen automatically via x402.",
    category: "Getting Started",
  },
  {
    question: "What's the pricing?",
    answer: "Pricing varies by MCP. Some are free, others charge per call (typically $0.001-$0.05). Platform fee is just 5% to support the infrastructure.",
    category: "Pricing",
  },
  {
    question: "How do I price my MCP?",
    answer: "Choose from 4 pricing tiers: Free, Low, Medium, or High. Start low to gain users, then increase based on demand. You can change pricing anytime in your dashboard.",
    category: "Pricing",
  },
  {
    question: "Is OMA-AI secure?",
    answer: "Yes! Security is our top priority. We use input validation, rate limiting, encrypted connections, and never store private keys.",
    category: "Security",
  },
];

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
      >
        <span className="text-white font-medium">{faq.question}</span>
        <span className="text-purple-400 text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-zinc-900/30 border-t border-zinc-800">
          <p className="text-zinc-300">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Everything you need to know about OMA-AI, MCPs, and getting started
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid gap-8 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-purple-200 mb-6">
            Still have questions? We&apos;re here to help!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="https://discord.gg/oma-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >Join Discord Community
            </Link>
            <Link href="/contact"
              className="px-8 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg transition-colors"
            >Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
