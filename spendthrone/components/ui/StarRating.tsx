/**
 * StarRating Component - Display product ratings
 */

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export function StarRating({ 
  rating, 
  reviewCount, 
  size = 'sm', 
  showCount = true,
  className 
}: StarRatingProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalfStar;
          
          return (
            <div key={i} className="relative">
              <Star
                className={cn(
                  sizes[size],
                  'text-zinc-700',
                  isFilled && 'text-amber-400 fill-amber-400',
                  isHalf && 'text-amber-400'
                )}
              />
              {isHalf && (
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className={cn(sizes[size], 'text-amber-400 fill-amber-400')} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="text-sm text-zinc-500 font-medium">
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className="text-sm text-zinc-600">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
}
