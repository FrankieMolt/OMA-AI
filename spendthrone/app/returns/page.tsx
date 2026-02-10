/**
 * Returns Policy Page
 */
import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
          Returns & Refunds
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-zinc-300 mb-6">
            Return policies are set by our retail partners.
          </p>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Amazon Purchases</h2>
            <p className="text-zinc-400 mb-4">
              Most Amazon products qualify for their 30-day return policy. Items must be in 
              original condition with all packaging and accessories.
            </p>
            <a 
              href="https://www.amazon.com/gp/help/customer/display.html?nodeId=GKM69DUUYKQWKWX7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              View Amazon Return Policy →
            </a>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Direct from Manufacturer</h2>
            <p className="text-zinc-400">
              Products purchased directly from manufacturers (like Herman Miller, Dyson, etc.) 
              follow their individual return policies. Please check the specific retailer's 
              website for details.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">How to Initiate a Return</h2>
            <ol className="space-y-3 text-zinc-400 list-decimal list-inside">
              <li>Visit the website where you made your purchase</li>
              <li>Log into your account and find your order</li>
              <li>Select the item(s) you want to return</li>
              <li>Follow the return instructions provided</li>
              <li>Print the return label and ship the item back</li>
            </ol>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-zinc-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Back to Kingdom
          </Link>
        </div>
      </div>
    </div>
  );
}
