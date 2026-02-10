'use client';

import React, { memo } from 'react';

const ApiCardSkeleton = memo(() => (
  <div className="glass-card p-6 rounded-xl">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="h-6 w-3/4 bg-zinc-800 rounded mb-2 skeleton" />
        <div className="h-4 w-full bg-zinc-800 rounded mb-3 skeleton" />
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-16 bg-zinc-800 rounded-md skeleton" />
          <div className="h-6 w-16 bg-zinc-800 rounded-md skeleton" />
          <div className="h-6 w-16 bg-zinc-800 rounded-md skeleton" />
        </div>
      </div>
      <div className="text-right ml-4 w-20">
        <div className="h-7 w-full bg-zinc-800 rounded mb-2 skeleton" />
        <div className="h-4 w-2/3 ml-auto bg-zinc-800 rounded skeleton" />
        <div className="h-3 w-full mt-1 bg-zinc-800 rounded skeleton" />
      </div>
    </div>
    <div className="pt-4 border-t border-zinc-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-zinc-800 skeleton" />
          <div className="h-4 w-24 bg-zinc-800 rounded skeleton" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-zinc-800 rounded-lg skeleton" />
          <div className="h-8 w-20 bg-purple-600/50 rounded-lg skeleton" />
        </div>
      </div>
    </div>
  </div>
));

ApiCardSkeleton.displayName = 'ApiCardSkeleton';

export default ApiCardSkeleton;
