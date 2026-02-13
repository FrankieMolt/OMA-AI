/**
 * Shipping Policy
 */
'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
           Logistics
        </Badge>
        <h1 className="text-4xl md:text-6xl font-light mb-12 font-display text-memoria-text-hero tracking-tighter">
          Shipping & Delivery
        </h1>
        
        <div className="prose prose-invert prose-sm max-w-none text-memoria-text-secondary leading-relaxed font-light space-y-8">
          <p>
            SpendThrone coordinates logistics for exceptional items worldwide. Our partners utilize premium carriers to ensure the secure transport of high-value goods.
          </p>
          <h3 className="text-xl font-display font-light text-memoria-text-hero mt-8 mb-4">Global Fulfillment</h3>
          <p>
            We ship to over 140 countries. Shipping rates and transit times are calculated at checkout based on the item's origin and your destination.
          </p>
          <h3 className="text-xl font-display font-light text-memoria-text-hero mt-8 mb-4">White Glove Service</h3>
          <p>
            For furniture, large art pieces, and fragile items, we offer white-glove delivery service, including in-home placement and debris removal. This option will be presented at checkout for eligible items.
          </p>
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
