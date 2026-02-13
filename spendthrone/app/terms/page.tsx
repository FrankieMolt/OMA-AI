/**
 * Terms of Service
 */
'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
           Legal
        </Badge>
        <h1 className="text-4xl md:text-6xl font-light mb-12 font-display text-memoria-text-hero tracking-tighter">
          Terms of Service
        </h1>
        
        <div className="prose prose-invert prose-sm max-w-none text-memoria-text-secondary leading-relaxed font-light space-y-8">
          <p>
            By accessing SpendThrone, you agree to be bound by these Terms of Service. Our platform connects buyers with independent sellers and authorized retailers of luxury goods.
          </p>
          <h3 className="text-xl font-display font-light text-memoria-text-hero mt-8 mb-4">Platform Role</h3>
          <p>
            SpendThrone acts as a curated interface and intermediary. We are not the manufacturer of the items listed, unless explicitly stated under the SpendThrone Originals label.
          </p>
          <h3 className="text-xl font-display font-light text-memoria-text-hero mt-8 mb-4">User Conduct</h3>
          <p>
            Users agree to provide accurate information during purchase and to respect the intellectual property rights of the creators featured on our platform.
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
