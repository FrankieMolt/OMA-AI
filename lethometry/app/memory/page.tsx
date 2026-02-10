'use client';

import React from 'react';
import MemoryDecayCanvas from '@/components/MemoryDecayCanvas';
import MemoryTips from '@/components/MemoryTips';

export default function MemoryPage() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Memory Preservation</h1>
      <MemoryDecayCanvas />
      <div className="mt-20">
        <MemoryTips />
      </div>
    </div>
  );
}
