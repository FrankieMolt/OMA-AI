import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, size = 16, className = '' }: StarRatingProps) {
  const roundedRating = Math.round(rating);
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={
            star <= roundedRating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-600'
          }
        />
      ))}
      <span className="ml-1 text-sm text-gray-400">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
