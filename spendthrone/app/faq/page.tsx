/**
 * FAQ Page
 */
import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      q: "What is SpendThrone?",
      a: "SpendThrone is a curated marketplace featuring the weirdest, most viral products on Earth. We specialize in extreme tech, bizarre innovations, and conversation-starting items."
    },
    {
      q: "Are these products real?",
      a: "Yes! All products on SpendThrone are real and available for purchase through our affiliate partners like Amazon and directly from manufacturers."
    },
    {
      q: "How do I purchase a product?",
      a: "Click the 'Buy Now' button on any product card. You'll be redirected to the retailer's website to complete your purchase securely."
    },
    {
      q: "Do you ship internationally?",
      a: "Shipping depends on the individual retailer. Most Amazon products ship internationally, but please check the retailer's shipping policy for specific details."
    },
    {
      q: "What is your return policy?",
      a: "Returns are handled by the individual retailers. Please refer to the return policy of the store where you made your purchase."
    },
    {
      q: "How do you choose products?",
      a: "We curate products based on uniqueness, viral potential, quality, and the 'wow' factor. If it's weird, wonderful, and worth talking about, we want it on SpendThrone."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
              <p className="text-zinc-400">{faq.a}</p>
            </div>
          ))}
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
