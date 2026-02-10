/**
 * Shipping Information Page
 */
import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
          Shipping Information
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-zinc-300 mb-6">
            Shipping is handled directly by our retail partners.
          </p>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">How Shipping Works</h2>
            <p className="text-zinc-400 mb-4">
              When you click "Buy Now" on any product, you're redirected to the retailer's website 
              (typically Amazon, manufacturer direct, or other authorized sellers). All shipping 
              policies, costs, and delivery times are determined by these retailers.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Typical Shipping Options</h2>
            <ul className="space-y-3 text-zinc-400">
              <li>• Standard Shipping: 5-7 business days</li>
              <li>• Express Shipping: 2-3 business days</li>
              <li>• Next Day Delivery: Available for most Amazon products</li>
              <li>• International Shipping: Varies by retailer and destination</li>
            </ul>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Tracking Your Order</h2>
            <p className="text-zinc-400">
              Once you complete your purchase on the retailer's website, you'll receive order 
              confirmation and tracking information directly from them via email.
            </p>
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
