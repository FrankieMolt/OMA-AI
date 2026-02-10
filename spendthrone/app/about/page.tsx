/**
 * About Page - About SpendThrone
 */

import { Sparkles, Crown, Globe, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8">
          ← Back to Marketplace
        </Link>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Crown size={10} />
            Our Story
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.9] uppercase italic">
            The Kingdom of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">Weird</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            Welcome to SpendThrone, where the ordinary ends and the extraordinary begins.
          </p>
        </header>

        <section className="space-y-12">
          <div className="prose prose-invert prose-lg">
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Born from a simple question: <em className="text-white">"What if weird things were actually for sale?"</em> SpendThrone has evolved into the world&apos;s premier marketplace for the bizarre, the extreme, and the delightfully WTF.
            </p>

            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Sparkles className="text-purple-400" size={32} />
              Our Mission
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              We believe in the power of weirdness to inspire, amuse, and occasionally terrify. Every product in our curated collection has been vetted for maximum strangeness and minimum utility. We don&apos;t sell boring things. That&apos;s not who we are.
            </p>

            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Globe className="text-purple-400" size={32} />
              Global Weirdness
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              From quantum levitation desks in Tokyo to AI-powered haunted dolls in Silicon Valley, we scour the globe (and occasionally other dimensions) for the most extraordinary products humanity has ever conceived. If it&apos;s weird, we&apos;re selling it.
            </p>

            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Heart className="text-purple-400" size={32} />
              Made with Love
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              SpendThrone was created by Nosyt LLC, a company dedicated to making the internet a more interesting place, one strange product at a time. We promise: no boring stuff, no compromise on weirdness, and customer service that&apos;s actually useful (unlike some of our products).
            </p>
          </div>

          <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl text-center">
            <p className="text-2xl font-bold text-white mb-4">Ready to get weird?</p>
            <p className="text-zinc-500 mb-6">Explore our collection of bizarre and beautiful products.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Browse Products
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
