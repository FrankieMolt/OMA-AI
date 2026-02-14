/**
 * Terms of Service - SpendThrone
 */

import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Terms of Service | SpendThrone',
  description: 'Rules and regulations for using the SpendThrone marketplace.',
  alternates: {
    canonical: '/terms',
  },
};

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
        
        <div className="prose prose-invert prose-sm max-w-none text-memoria-text-secondary leading-relaxed">
          <p className="text-lg font-light mb-8">
            Last Updated: February 13, 2026
          </p>
          <p>
            By accessing SpendThrone, you agree to abide by these terms. We operate a curated marketplace for exceptional goods.
          </p>
          {/* Placeholder for legal text */}
          <h2>1. Acceptance of Terms</h2>
          <p>Usage of our platform constitutes full acceptance of these terms.</p>
          <h2>2. Purchases</h2>
          <p>All sales of limited edition items are final unless otherwise stated.</p>
        </div>
      </div>
    </div>
  );
}
