/**
 * Privacy Policy - SpendThrone
 */

import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Privacy Policy | SpendThrone',
  description: 'How we collect, use, and protect your data.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
           Legal
        </Badge>
        <h1 className="text-4xl md:text-6xl font-light mb-12 font-display text-memoria-text-hero tracking-tighter">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert prose-sm max-w-none text-memoria-text-secondary leading-relaxed">
          <p className="text-lg font-light mb-8">
            Last Updated: February 13, 2026
          </p>
          <p>
            At SpendThrone, we value precision and discretion. This policy outlines how we handle your information within our curated ecosystem.
          </p>
          {/* Placeholder for legal text */}
          <h3>1. Data Collection</h3>
          <p>We collect only what is necessary to process your orders and improve your experience.</p>
          <h3>2. Security</h3>
          <p>Your data is secured with industry-standard encryption protocols.</p>
        </div>
      </div>
    </div>
  );
}
