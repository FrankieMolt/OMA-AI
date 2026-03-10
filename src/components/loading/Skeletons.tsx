'use client';

export function SkillCardSkeleton() {
  return (
    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="h-6 bg-zinc-800 rounded w-3/4 mb-2" />
          <div className="h-4 bg-zinc-800 rounded w-1/2 mb-2" />
        </div>
        <div className="h-4 bg-zinc-800 rounded w-20" />
      </div>

      <div className="h-16 bg-zinc-800 rounded mb-4" />

      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-zinc-800 rounded w-16" />
        <div className="h-6 bg-zinc-800 rounded w-16" />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <div>
          <div className="h-7 bg-zinc-800 rounded w-20 mb-1" />
          <div className="h-3 bg-zinc-800 rounded w-16" />
        </div>
        <div className="text-right">
          <div className="h-6 bg-zinc-800 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl animate-pulse">
      <div className="h-4 bg-zinc-800 rounded w-24 mb-2" />
      <div className="h-8 bg-zinc-800 rounded w-16 mb-1" />
      <div className="h-3 bg-zinc-800 rounded w-16" />
    </div>
  );
}

export function TransactionCardSkeleton() {
  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-zinc-800 rounded-lg w-12 h-12" />
          <div>
            <div className="h-5 bg-zinc-800 rounded w-24 mb-1" />
            <div className="h-4 bg-zinc-800 rounded w-40" />
          </div>
        </div>
        <div className="text-right">
          <div className="h-7 bg-zinc-800 rounded w-20 mb-1" />
          <div className="h-4 bg-zinc-800 rounded w-24 mb-1" />
          <div className="h-3 bg-zinc-800 rounded w-20" />
        </div>
      </div>
    </div>
  );
}
