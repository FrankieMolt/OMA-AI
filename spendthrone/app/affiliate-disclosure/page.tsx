import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | SpendThrone',
  description: 'Affiliate disclosure and advertising transparency for SpendThrone marketplace.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 md:px-14">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-8 font-display text-memoria-text-hero">
          Affiliate Disclosure
        </h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-memoria-text-secondary">
          <p className="text-memoria-text-whisper leading-relaxed">
            <strong>Last updated:</strong> February 2026
          </p>
          
          <section>
            <h2 className="text-2xl font-light text-memoria-text-hero mb-4">What This Means</h2>
            <p className="text-memoria-text-whisper leading-relaxed">
              SpendThrone participates in affiliate marketing programs. This means that when you click on certain links on our website and make a purchase, we may earn a commission at no additional cost to you.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-light text-memoria-text-hero mb-4">Amazon Associates Program</h2>
            <p className="text-memoria-text-whisper leading-relaxed">
              SpendThrone is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>
            <p className="text-memoria-text-whisper leading-relaxed">
              As an Amazon Associate, we earn from qualifying purchases. Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply to the purchase of the product.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-light text-memoria-text-hero mb-4">How We Choose Products</h2>
            <p className="text-memoria-text-whisper leading-relaxed">
              Our editorial team selects products based on quality, value, and relevance to our audience. Affiliate relationships do not influence our product recommendations. We only recommend products we genuinely believe in.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-light text-memoria-text-hero mb-4">Identifying Affiliate Links</h2>
            <p className="text-memoria-text-whisper leading-relaxed">
              Affiliate links on SpendThrone typically include tracking parameters such as <code className="bg-memoria-bg-card px-2 py-1 rounded text-xs">?tag=spendthrone-20</code> or similar identifiers. These links redirect through affiliate networks before reaching the retailer&apos;s website.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-light text-memoria-text-hero mb-4">Your Support Matters</h2>
            <p className="text-memoria-text-whisper leading-relaxed">
              When you use our affiliate links, you support SpendThrone at no extra cost. This helps us continue providing quality content and maintaining our marketplace. Thank you for your support!
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-light text-memoria-text-hero mb-4">Questions?</h2>
            <p className="text-memoria-text-whisper leading-relaxed">
              If you have questions about our affiliate relationships or this disclosure, please contact us through our <a href="/contact" className="text-memoria-text-hero hover:underline">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
