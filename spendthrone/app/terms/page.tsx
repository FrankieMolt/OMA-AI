/**
 * Terms of Service Page
 */

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8">
          ← Back to Marketplace
        </Link>

        <h1 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter uppercase">
          Terms of Service
        </h1>

        <div className="prose prose-invert prose-lg space-y-8">
          <p className="text-zinc-400">
            Last updated: February 8, 2026
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
            <p className="text-zinc-400">
              By accessing or using SpendThrone, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Products and Pricing</h2>
            <p className="text-zinc-400">
              All products listed on SpendThrone are for entertainment purposes unless otherwise stated. Prices are in USD and are subject to change without notice. We strive for accuracy but cannot guarantee all product details are current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
            <p className="text-zinc-400">
              You are responsible for maintaining the confidentiality of your account information. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
            <p className="text-zinc-400">
              All content on SpendThrone, including product images, descriptions, and designs, is protected by intellectual property laws. You may not use our content without express permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Disclaimer of Warranties</h2>
            <p className="text-zinc-400">
              Many of our products are novelty items and come with no warranties expressed or implied. Use common sense and caution when operating levitating desks, quantum technology, or AI-powered haunted dolls.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p className="text-zinc-400">
              SpendThrone shall not be liable for any damages arising from the use of our products or services. This includes but is not limited to temporal paradoxes, gravity-related injuries, or haunting incidents.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Refunds and Returns</h2>
            <p className="text-zinc-400">
              Refund policies vary by product. Novelty items may be non-refundable once used or unboxed. Contact customer service for specific product return policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
            <p className="text-zinc-400">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which SpendThrone operates. Any disputes will be resolved in our courts, preferably in a dimension where weirdness is appreciated.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
