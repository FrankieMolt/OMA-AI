'use client';
/**
 * FAQ Page
 */
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: "What defines the SpendThrone collection?",
      a: "Our collection represents the pinnacle of craftsmanship and innovation. We curate items based on material integrity, engineering precision, and aesthetic scarcity."
    },
    {
      q: "Are these items available immediately?",
      a: "Availability varies by piece. Limited editions and bespoke commissions may require lead times. Specific details are listed on each product page."
    },
    {
      q: "How is authenticity verified?",
      a: "Every item in our marketplace undergoes rigorous verification. We partner directly with artisans and authorized distributors to guarantee provenance."
    },
    {
      q: "Do you facilitate international logistics?",
      a: "Yes. Our partners offer secure global shipping for high-value items, often including white-glove delivery services."
    },
    {
      q: "What is the return protocol?",
      a: "Given the bespoke nature of many items, return policies are determined by the individual creator or brand. Please consult the specific terms on the product page."
    },
    {
      q: "How can I feature my work?",
      a: "We accept submissions from exceptional creators. Please contact our curation team through the Contact page for consideration."
    }
  ];

  return (
    <div  className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero selection:bg-memoria-text-hero selection:text-memoria-bg-ultra-dark">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
           Support
        </Badge>
        <h1 className="text-4xl md:text-6xl font-light mb-12 font-display text-memoria-text-hero tracking-tighter">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-memoria-bg-surface border border-memoria-border-muted rounded-sm p-8 hover:border-memoria-border-default transition-colors">
              <h3 className="text-xl font-light font-display text-memoria-text-hero mb-4">{faq.q}</h3>
              <p className="text-memoria-text-secondary leading-relaxed font-light text-sm">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-memoria-border-muted">
          <Link href="/">
            <Button variant="outline" className="rounded-sm uppercase tracking-widest text-[10px] border-memoria-border-muted text-memoria-text-meta hover:text-memoria-text-hero hover:border-memoria-text-hero bg-transparent px-6 h-12">
              <ArrowLeft size={14} className="mr-2" /> Back to Collection
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
