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
