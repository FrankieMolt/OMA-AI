'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export function SuccessStep() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
        <Zap className="w-10 h-10 text-green-500" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">MCP Submitted!</h2>
      <p className="text-gray-400 mb-8 max-w-md mx-auto">
        Your MCP has been submitted for review. We&apos;ll verify it and make it live in the marketplace.
      </p>
      <Link href="/dashboard"
        className="inline-flex items-center gap-2 px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
        Go to Dashboard
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
