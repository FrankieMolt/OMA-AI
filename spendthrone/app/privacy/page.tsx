/**
 * Privacy Policy
 */
'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
           Privacy
        </Badge>
        <h1 className="text-4xl md:text-6xl font-light mb-12 font-display text-memoria-text-hero tracking-tighter">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert prose-sm max-w-none text-memoria-text-secondary leading-relaxed font-light space-y-8">
          <p>
            SpendThrone is committed to protecting the privacy of our clients. We collect only the data necessary to facilitate transactions and improve your curation experience.
          </p>
          <h3 className="text-xl font-display font-light text-memoria-text-hero mt-8 mb-4">Data Collection</h3>
          <p>
            We collect transaction data, shipping addresses, and contact information. We do not store payment credentials; these are handled securely by our payment processors.
          </p>
          <h3 className="text-xl font-display font-light text-memoria-text-hero mt-8 mb-4">Third Parties</h3>
          <p>
            We share necessary information with logistics partners to ensure delivery. We do not sell client data to advertisers.
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
