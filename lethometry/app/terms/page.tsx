/**
 * Lethometry Terms of Service - Memoria Design
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Lethometry terms of service. Terms and conditions for using our quantification systems.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20 px-4 md:px-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-light tracking-tighter mb-6 font-display text-memoria-text-hero">
          Terms of Service
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-memoria-text-meta mb-12">
          Last updated: February 2026
        </p>

        <div className="space-y-8 text-memoria-text-whisper leading-relaxed">
          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Acceptance of Terms</h2>
            <p className="text-sm">
              By accessing Lethometry, you agree to these terms of service. If you do not agree, 
              please discontinue use of our platform immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Service Description</h2>
            <p className="text-sm">
              Lethometry provides existential quantification tools, including death clock calculations, 
              memory systems, and philosophical frameworks. These tools are provided for informational 
              and contemplative purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Disclaimer</h2>
            <p className="text-sm">
              Our calculations and analyses are estimates based on available data. They should not be 
              used as the sole basis for medical, financial, or life decisions. Consult appropriate 
              professionals for critical decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Intellectual Property</h2>
            <p className="text-sm">
              All content, algorithms, and systems on Lethometry are the intellectual property of 
              Lethometry and its creators. Unauthorized reproduction or distribution is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Limitation of Liability</h2>
            <p className="text-sm">
              Lethometry is provided "as is" without warranties of any kind. We are not liable for 
              any damages arising from the use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-normal text-memoria-text-hero font-display mb-4">Changes to Terms</h2>
            <p className="text-sm">
              We reserve the right to modify these terms at any time. Continued use after changes 
              constitutes acceptance of the modified terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
