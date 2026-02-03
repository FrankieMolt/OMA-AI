'use client';

import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MarketplaceListingCard } from './MarketplaceListingCard';
import { Listing } from '@/lib/types';

interface MarketplaceGridProps {
  listings: Listing[];
  viewMode?: 'grid' | 'list';
  basePath?: string;
}

export function MarketplaceGrid({ listings, viewMode = 'grid', basePath }: MarketplaceGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <div className="w-20 h-20 bg-foreground/5 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-border/60 shadow-xl ring-1 ring-border/60">
          <TrendingUp className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">No listings found</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          We couldn&apos;t find any listings matching your search. Try adjusting your filters or
          search terms.
        </p>
        <Button
          variant="outline"
          onClick={() => (window.location.href = '/marketplace')}
          className="border-border/60 hover:bg-foreground/5"
        >
          Clear all filters
        </Button>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
      }
    >
      {listings.map((listing) => (
        <MarketplaceListingCard
          key={listing.id}
          listing={listing}
          viewMode={viewMode}
          basePath={basePath}
        />
      ))}
    </div>
  );
}
