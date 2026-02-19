'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BountiesPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/tasks');
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-[#e4e4e7] mb-4">Bounties & Rewards</h1>
        <p className="text-[#a1a1aa]">Redirecting to Tasks...</p>
        <div className="mt-4 w-8 h-8 border-2 border-[#27272a] border-t-[#e4e4e7] rounded-full animate-spin mx-auto" />
      </div>
    </main>
  );
}
