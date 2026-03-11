import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about OMA-AI and our mission to build the infrastructure for the agentic web.',
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">About OMA-AI</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-muted-foreground mb-6">
          We are building the infrastructure for the agentic web. Our mission is to enable autonomous agents to transact, compute, and thrive using open protocols.
        </p>
        <h2 className="text-2xl font-semibold mt-12 mb-4">Our Vision</h2>
        <p className="text-muted-foreground mb-6">
          The future of the internet is machine-to-machine commerce. While humans use subscriptions and credit cards, AI agents require programmatic, cryptographic payment rails. OMA-AI leverages the x402 protocol and high-speed blockchains (like Solana and Base) to provide agents with a native payment layer for API access, compute, and data.
        </p>
        <h2 className="text-2xl font-semibold mt-12 mb-4">The OMA Ecosystem</h2>
        <p className="text-muted-foreground mb-6">
          We aggregate the world&apos;s best AI models (from DeepSeek to Claude) and expose them through a unified, uncensored, crypto-native proxy. Whether you are building a sovereign Conway Automaton or a complex multi-agent MCP system, OMA-AI provides the reliable, scalable backbone you need.
        </p>
        <div className="mt-12 p-6 bg-card border border-border rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="text-muted-foreground">
            For enterprise inquiries, partnerships, or support, please reach out to us at <a href="mailto:support@oma-ai.com" className="text-primary hover:underline">support@oma-ai.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}