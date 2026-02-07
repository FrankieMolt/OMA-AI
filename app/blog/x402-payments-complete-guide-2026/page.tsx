import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'x402 Payments: The Complete Guide',
  description: 'Everything you need to know about x402 payments — the HTTP-native micropayment protocol powering OMA-AI. Learn how to integrate, implement, and earn.',
};

export default function X402PaymentsGuidePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />
      
      <article className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            x402 Payments: The Complete Guide
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-zinc-400 text-sm">
            <span className="flex items-center gap-2">
              <User size={16} />
              OMA-AI Team
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              February 1, 2026
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              8 min read
            </span>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-zinc-300 mb-8">
            x402 is the HTTP-native payment protocol that powers OMA-AI. This guide covers everything from basic concepts to advanced integration patterns.
          </p>

          <h2>What is x402?</h2>
          <p>
            x402 extends HTTP with a new status code — 402 Payment Required — and a standard set of headers for micropayments. When a client receives a 402 response, they know exactly how much to pay and where to send it.
          </p>

          <h2>The Payment Flow</h2>
          <ol>
            <li><strong>Request:</strong> Client calls an API endpoint</li>
            <li><strong>402 Response:</strong> Server returns payment requirements</li>
            <li><strong>Payment:</strong> Client signs and submits transaction</li>
            <li><strong>Retry:</strong> Client retries with payment proof header</li>
            <li><strong>Success:</strong> Server validates and returns data</li>
          </ol>

          <h2>Supported Networks</h2>
          <p>OMA-AI supports x402 payments on:</p>
          <ul>
            <li><strong>Base</strong> — Fast, low-cost L2 (recommended)</li>
            <li><strong>Ethereum</strong> — Maximum security</li>
            <li><strong>Solana</strong> — High throughput</li>
          </ul>

          <h2>Payment Headers</h2>
          <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto">
{`// 402 Response Headers
X-Payment-Required: true
X-Payment-Amount: 0.001
X-Payment-Currency: USDC
X-Payment-Network: base
X-Payment-Address: 0x...

// Retry Request Headers
X-Payment-Proof: <signed_transaction>`}
          </pre>

          <h2>Integration Guide</h2>
          <p>
            For API providers, adding x402 support is straightforward:
          </p>
          <ol>
            <li>Add our paywall middleware to your API</li>
            <li>Set your price per request</li>
            <li>Configure your payout address</li>
            <li>Deploy and start earning</li>
          </ol>

          <h2>For Developers</h2>
          <p>
            Check out our <Link href="/developers" className="text-purple-400 hover:text-purple-300">Developer Portal</Link> for SDKs, code samples, and detailed API documentation.
          </p>

          <h2>Learn More</h2>
          <p>
            Ready to integrate x402 payments? Visit our <Link href="/docs" className="text-purple-400 hover:text-purple-300">documentation</Link> for step-by-step guides and reference implementations.
          </p>
        </div>
      </article>

      <Footer />
    </div>
  );
}
