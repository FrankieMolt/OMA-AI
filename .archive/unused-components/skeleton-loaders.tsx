export function ApiCardSkeleton() {
  return (
    <div className="glass-card p-6 rounded-xl border border-zinc-800/50">
      <div className="flex items-start justify-between mb-4">
        {/* Skeleton Header */}
        <div className="flex-1 space-y-2">
          <div className="h-6 w-2/3 bg-zinc-800/50 rounded animate-pulse"></div>
          <div className="h-4 w-1/2 bg-zinc-800/50 rounded animate-pulse"></div>
        </div>
        {/* Skeleton Badge */}
        <div className="h-6 w-16 bg-zinc-800/50 rounded-full animate-pulse"></div>
      </div>

      {/* Skeleton Content */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-zinc-800/50 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-zinc-800/50 rounded animate-pulse"></div>
        <div className="h-4 w-4/5 bg-zinc-800/50 rounded animate-pulse"></div>
        <div className="h-20 w-3/4 bg-zinc-800/50 rounded animate-pulse"></div>
      </div>

      {/* Skeleton Actions */}
      <div className="flex gap-2 pt-4 border-t border-zinc-800/50">
        <div className="h-10 w-20 bg-zinc-800/50 rounded-xl animate-pulse"></div>
        <div className="h-10 w-16 bg-zinc-800/50 rounded-xl animate-pulse"></div>
      </div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="glass-card p-6 rounded-xl border border-zinc-800/50">
      {/* Skeleton Image */}
      <div className="h-48 w-full bg-zinc-800/50 rounded-lg mb-4 animate-pulse"></div>

      {/* Skeleton Content */}
      <div className="space-y-2">
        <div className="h-6 w-3/4 bg-zinc-800/50 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-zinc-800/50 rounded animate-pulse"></div>
        <div className="h-16 w-full bg-zinc-800/50 rounded animate-pulse"></div>
      </div>

      {/* Skeleton Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50 mt-4">
        <div className="h-6 w-24 bg-zinc-800/50 rounded animate-pulse"></div>
        <div className="flex gap-1">
          <div className="h-8 w-8 bg-zinc-800/50 rounded-lg animate-pulse"></div>
          <div className="h-8 w-8 bg-zinc-800/50 rounded-lg animate-pulse"></div>
          <div className="h-8 w-8 bg-zinc-800/50 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export function ExperimentCardSkeleton() {
  return (
    <div className="glass-card p-8 rounded-xl border border-zinc-800/50">
      {/* Skeleton Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1 space-y-2">
          <div className="h-7 w-3/4 bg-zinc-800/50 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-zinc-800/50 rounded animate-pulse"></div>
        </div>
        <div className="h-6 w-20 bg-zinc-800/50 rounded-full animate-pulse"></div>
      </div>

      {/* Skeleton Content */}
      <div className="space-y-3">
        <div className="h-20 w-full bg-zinc-800/50 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-zinc-800/50 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-zinc-800/50 rounded animate-pulse"></div>
      </div>

      {/* Skeleton Actions */}
      <div className="flex gap-4 pt-6 border-t border-zinc-800/50">
        <div className="h-11 w-28 bg-zinc-800/50 rounded-xl animate-pulse"></div>
        <div className="h-11 w-28 bg-zinc-800/50 rounded-xl border border-zinc-700 animate-pulse"></div>
      </div>
    </div>
  )
}
