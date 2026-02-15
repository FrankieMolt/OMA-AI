'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showValue = true,
  reviewCount,
  className = ''
}: StarRatingProps) {
  const sizeMap = {
    sm: 12,
    md: 16,
    lg: 20
  };

  const starSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const filled = index < Math.floor(rating);
        const partial = index === Math.floor(rating) && rating % 1 !== 0;
        
        return (
          <Star
            key={index}
            size={starSize}
            className={
              filled 
                ? 'text-yellow-400 fill-yellow-400' 
                : partial 
                  ? 'text-yellow-400 fill-yellow-400/50'
                  : 'text-zinc-600'
            }
          />
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm text-zinc-400">
          {rating.toFixed(1)}
          {reviewCount !== undefined && reviewCount > 0 && (
            <span className="ml-1">({reviewCount})</span>
          )}
        </span>
      )}
    </div>
  );
}
