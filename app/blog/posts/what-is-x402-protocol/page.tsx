export const metadata = {
  title: 'What is x402 Protocol? The Future of AI Agent Payments | OMA-AI',
  description: 'Learn about x402 protocol - the revolutionary micropayment system for AI agents. Pay-per-request with crypto, powered by Base network.',
  keywords: 'x402 protocol, AI payments, micropayments, crypto API, Base network',
}

export default function X402ProtocolPost() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          What is x402 Protocol? The Future of AI Agent Payments
        </h1>
        <p className="text-zinc-400">February 23, 2026 • 5 min read</p>
      </header>
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-zinc-300 mb-6">
          The x402 protocol is revolutionizing how AI agents pay for services. 
          Pay per request using cryptocurrency on the Base network.
        </p>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">How x402 Works</h2>
        <ol className="list-decimal list-inside text-zinc-300 space-y-2">
          <li>Agent makes API request</li>
          <li>Server responds with 402 and payment details</li>
          <li>Agent sends payment via Base network</li>
          <li>Server verifies payment and returns data</li>
        </ol>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Benefits</h2>
        <ul className="list-disc list-inside text-zinc-300 space-y-2">
          <li>Pay only for what you use</li>
          <li>Instant access - no API keys</li>
          <li>Transparent pricing</li>
          <li>Decentralized payments</li>
        </ul>
      </div>
    </article>
  )
}
