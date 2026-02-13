/**
 * Lethometry Privacy Policy - Memoria Design
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Lethometry privacy policy. How we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4 md:px-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-light tracking-tighter mb-6 font-display text-memoria-text-hero">
          Privacy Policy
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-memoria-text-meta mb-12">
          Last updated: February 2026
        </p>

        <div className="space-y-8 text-memoria-text-whisper leading-relaxed">
          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Data Collection</h2>
            <p className="text-sm">
              Lethometry collects minimal data necessary to provide our existential quantification services. 
              We do not sell or share personal information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Usage Analytics</h2>
            <p className="text-sm">
              We use anonymized analytics to improve our systems. No personally identifiable information 
              is tracked or stored in our analytics systems.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Data Security</h2>
            <p className="text-sm">
              All data transmitted to Lethometry is encrypted using industry-standard TLS encryption. 
              Stored data is protected with AES-256 encryption at rest.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Your Rights</h2>
            <p className="text-sm">
              You have the right to access, correct, or delete your personal data at any time. 
              Contact us at privacy@lethometry.com to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Cookies</h2>
            <p className="text-sm">
              We use essential cookies to maintain session state. No tracking cookies or 
              third-party advertising cookies are used on this platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
