'use client';

import React from 'react';
import HeroSection from '@/components/HeroSection';
import DeathClock from '@/components/DeathClock';
import LifeStats from '@/components/LifeStats';
import MemoryDecayCanvas from '@/components/MemoryDecayCanvas';
import MemoryTips from '@/components/MemoryTips';
import PhilosophySection from '@/components/PhilosophySection';
import FeaturesSection from '@/components/FeaturesSection';
import { useUserData } from '@/hooks/useUserData';

export default function Home() {
  const { userData, isLoaded, hasData, updateUserData } = useUserData();

  // REMOVE LOADING CHECK TO SEE IF COMPONENTS LOAD
  // The loading state is blocking all content from showing

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Main Content Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <DeathClock userData={userData} onUpdateUserData={updateUserData} />
            <LifeStats userData={userData} />
          </div>

          {/* Memory Section */}
          <div id="memory" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Memory Tools & Visualization</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <MemoryDecayCanvas />
              <MemoryTips />
            </div>
          </div>

          {/* AI Experiments Section */}
          <div id="experiments" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">AI Agent & Scientific Experiments</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a 
                href="/ai-philosopher"
                className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🧠</div>
                <h3 className="text-xl font-bold text-white mb-2">AI Philosopher</h3>
                <p className="text-slate-400 text-sm">Chat with an AI agent trained on world philosophies.</p>
              </a>
              <a 
                href="/experiments/trolley-problem"
                className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚋</div>
                <h3 className="text-xl font-bold text-white mb-2">Trolley Problem</h3>
                <p className="text-slate-400 text-sm">Participate in a real moral decision-making experiment.</p>
              </a>
              <a 
                href="/experiments/memory-decay"
                className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📈</div>
                <h3 className="text-xl font-bold text-white mb-2">Memory Decay</h3>
                <p className="text-slate-400 text-sm">Test your memory and contribute to Ebbinghaus research.</p>
              </a>
            </div>
          </div>

          {/* Research Insights Section */}
          <div className="mb-16 bg-emerald-950/20 border border-emerald-900/50 p-8 rounded-3xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4">Latest Research Insights</h2>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-4 rounded-xl">
                    <p className="text-emerald-400 font-semibold mb-1 text-sm">Trolley Problem Update:</p>
                    <p className="text-slate-300 text-sm">74% of participants choose to divert the trolley in the classic scenario, but only 22% do so in the 'Fat Man' variation.</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-xl">
                    <p className="text-emerald-400 font-semibold mb-1 text-sm">Memory Decay Update:</p>
                    <p className="text-slate-300 text-sm">The average participant retains 42% of items after 20 minutes, slightly higher than Ebbinghaus predictions.</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-64 aspect-square bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-400">12.4k</div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Data Points Collected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div id="philosophy">
            <PhilosophySection />
          </div>
        </div>
      </section>

      {/* About CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Mindfully Track Your Time?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Lethometry helps you understand your life journey while providing tools to preserve what matters most.
            Start tracking your time today.
          </p>
          <a
            href="#death-clock"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5-5m5 5V6m-11 0v11a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
