'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Star, StarHalf } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const ratingVariants = cva('flex items-center gap-0.5', {
  variants: {
    size: {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface RatingStarsProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ratingVariants> {
  /** Rating value (0-5) */
  rating: number;
  /** Total number of ratings */
  reviewCount?: number;
  /** Maximum rating (default: 5) */
  maxRating?: number;
  /** Show review count */
  showCount?: boolean;
  /** Show as read-only (no hover effects) */
  readonly?: boolean;
  /** On rating change handler (interactive mode) */
  onRatingChange?: (rating: number) => void;
  /** Custom star component */
  starComponent?: React.ComponentType<{ filled: boolean; half?: boolean; className?: string }>;
  /** Allow half-star ratings */
  allowHalf?: boolean;
  /** Show tooltip with rating text */
  showTooltip?: boolean;
}

export function RatingStars({
  rating,
  reviewCount,
  maxRating = 5,
  showCount = false,
  readonly = true,
  onRatingChange,
  starComponent,
  allowHalf = false,
  showTooltip = false,
  size = 'md',
  className,
  ...props
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [internalRating, setInternalRating] = React.useState(rating);

  React.useEffect(() => {
    setInternalRating(rating);
  }, [rating]);

  const getRatingText = (value: number): string => {
    if (value === 0) return 'Not rated';
    if (value <= 1) return 'Poor';
    if (value <= 2) return 'Fair';
    if (value <= 3) return 'Good';
    if (value <= 4) return 'Very Good';
    return 'Excellent';
  };

  const renderStars = () => {
    const stars = [];
    const currentRating = hoverRating !== null ? hoverRating : internalRating;

    for (let i = 1; i <= maxRating; i++) {
      const isFullFilled = currentRating >= i;
      const isHalfFilled = allowHalf && currentRating >= i - 0.5 && currentRating < i;
      const isEmpty = !isFullFilled && !isHalfFilled;

      const StarIcon = starComponent || Star;

      if (starComponent) {
        stars.push(
          <StarIcon
            key={i}
            filled={isFullFilled}
            half={isHalfFilled}
            className={cn(
              ratingVariants({ size }),
              !readonly && 'cursor-pointer transition-transform hover:scale-110',
              className
            )}
            onMouseEnter={() => !readonly && setHoverRating(i)}
            onMouseLeave={() => !readonly && setHoverRating(null)}
            onClick={() => {
              if (!readonly && onRatingChange) {
                onRatingChange(i);
                setInternalRating(i);
              }
            }}
          />
        );
      } else {
        stars.push(
          <div
            key={i}
            className={cn(
              'relative',
              !readonly && 'cursor-pointer transition-transform hover:scale-110'
            )}
            onMouseEnter={() => !readonly && setHoverRating(i)}
            onMouseLeave={() => !readonly && setHoverRating(null)}
            onClick={() => {
              if (!readonly && onRatingChange) {
                onRatingChange(i);
                setInternalRating(i);
              }
            }}
          >
            {isHalfFilled ? (
              <StarHalf
                className={cn(ratingVariants({ size }), 'fill-warning text-warning')}
              />
            ) : (
              <Star
                className={cn(
                  ratingVariants({ size }),
                  isFullFilled
                    ? 'fill-warning text-warning'
                    : 'fill-transparent text-muted-foreground',
                  isEmpty && 'opacity-30'
                )}
              />
            )}
          </div>
        );
      }
    }

    return stars;
  };

  return (
    <div className="inline-flex items-center gap-2" {...props}>
      <div
        className={cn('flex items-center gap-0.5', className)}
        title={showTooltip ? getRatingText(internalRating) : undefined}
      >
        {renderStars()}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">({reviewCount.toLocaleString()})</span>
      )}
      {showTooltip && (
        <span className="text-xs text-muted-foreground hidden sm:inline">
          {getRatingText(internalRating)}
        </span>
      )}
    </div>
  );
}

// Numeric rating badge component
export function RatingBadge({
  rating,
  size = 'md',
  className,
}: {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-2.5 py-1.5',
  };

  const getRatingColor = (value: number): string => {
    if (value >= 4.5)
      return 'bg-success/10 text-success border-success/20';
    if (value >= 3.5) return 'bg-info/10 text-info border-info/20';
    if (value >= 2.5)
      return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-md border font-semibold tabular-nums',
        getRatingColor(rating),
        sizeClasses[size],
        className
      )}
    >
      <Star className="h-3 w-3 fill-current" />
      {rating.toFixed(1)}
    </div>
  );
}
