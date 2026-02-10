/**
 * Privacy Policy Page
 */

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8">
          ← Back to Marketplace
        </Link>

        <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase">
          Privacy Policy
        </h1>

        <div className="prose prose-invert prose-lg space-y-8">
          <p className="text-zinc-400">
            Last updated: February 8, 2026
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p className="text-zinc-400">
              At SpendThrone, we take your privacy seriously. This policy explains how we collect, use, and protect your information when you use our marketplace for weird and wonderful products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <ul className="list-disc list-inside text-zinc-400 space-y-2">
              <li>Account information (if you create one)</li>
              <li>Shopping cart and wishlist data (stored locally on your device)</li>
              <li>Browsing data for analytics</li>
              <li>Product preferences and search history</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Data</h2>
            <p className="text-zinc-400">
              We use your information to provide and improve our services, process orders (when we implement real checkout), and personalize your browsing experience. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Local Storage</h2>
            <p className="text-zinc-400">
              Your cart, wishlist, and browsing history are stored in your browser&apos;s local storage. This data stays on your device and is not transmitted to our servers unless you complete a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
            <p className="text-zinc-400">
              We use essential cookies to maintain your session and optional analytics cookies to understand how you use our site. You can manage cookie preferences in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
            <p className="text-zinc-400">
              You have the right to access, correct, or delete your personal data. For requests, contact us at hello@spendthrone.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
            <p className="text-zinc-400">
              We may update this privacy policy from time to time. Changes will be posted on this page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
