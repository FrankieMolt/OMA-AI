/**
 * Skeleton Component - Loading placeholder
 */

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className, 
  variant = 'text',
  width,
  height 
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-zinc-800/50';
  
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      style={style}
    />
  );
}

// Pre-built skeleton layouts
export function ProductCardSkeleton() {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden">
      <div className="aspect-[4/3] bg-zinc-800/50" />
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width={60} height={12} />
          <Skeleton variant="text" width={50} height={12} />
        </div>
        <Skeleton variant="rounded" width="80%" height={24} />
        <Skeleton variant="text" width="100%" height={40} />
        <div className="flex items-center gap-2">
          <Skeleton variant="text" width={80} height={28} />
          <Skeleton variant="text" width={60} height={12} />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rounded" className="flex-1" height={40} />
          <Skeleton variant="rounded" width={60} height={40} />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
