'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketplaceGrid } from '@/components/marketplace/MarketplaceGrid';
import { Listing } from '@/lib/types';
import strings from '@/constants/text.json';

type DirectoryCategory = {
  id: string;
  label: string;
  description?: string;
};

interface ListingDirectoryPageProps {
  title: string;
  description: string;
  categories: DirectoryCategory[];
  defaultCategory: string;
  basePath?: string;
  generateHref?: string;
  extraParams?: Record<string, string>;
}

export function ListingDirectoryPage({
  title,
  description,
  categories,
  defaultCategory,
  basePath = '/marketplace',
  generateHref = '/generate',
  extraParams = {},
}: ListingDirectoryPageProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategory),
    [categories, selectedCategory]
  );

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setErrorMessage(null);

      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '18',
        });

        if (searchTerm) {
          params.set('search', searchTerm);
        }

        if (selectedCategory && selectedCategory !== 'all') {
          params.set('category', selectedCategory);
        }

        // Add extra parameters
        Object.entries(extraParams).forEach(([key, value]) => {
          params.set(key, value);
        });

        const response = await fetch(`/api/listings?${params}`);
        if (!response.ok) {
          // Attempt to parse error but fallback gracefully
          const text = await response.text();
          try {
             const data = JSON.parse(text);
             throw new Error(data?.error || 'Unable to fetch listings');
          } catch {
             throw new Error(`Server Error: ${response.statusText}`);
          }
        }
        
        const data = await response.json();
        setListings(data.data || []);
        setTotalPages(data.meta?.totalPages || 1);
      } catch (error) {
        console.error("Marketplace fetch error:", error);
        setListings([]);
        setErrorMessage(strings.listing_directory.error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentPage, extraParams, searchTerm, selectedCategory]);

  return (
    <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-24 pb-20 relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 uppercase tracking-[0.3em] text-[10px] font-bold px-3 py-1">
                  {strings.listing_directory.badges.directory}
                </Badge>
                <Badge className="bg-foreground/5 text-muted-foreground border-border/60 text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-mono">
                  {loading
                    ? strings.listing_directory.badges.loading
                    : strings.listing_directory.badges.results.replace(
                        '{count}',
                        listings.length.toString()
                      )}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">
                {title}
              </h1>
              <p className="text-muted-foreground max-w-2xl mt-4 text-lg font-medium leading-relaxed">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-black px-8 h-12 rounded-xl shadow-neon transition-all">
                <Link href={generateHref}>{strings.listing_directory.actions.deploy_agent}</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 font-bold"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(defaultCategory);
                  setCurrentPage(1);
                }}
              >
                {strings.listing_directory.actions.reset}
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 bg-foreground/5 p-2 rounded-2xl border border-border/60 backdrop-blur-md">
            <div className="relative flex-1">
              <Input
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder={strings.listing_directory.search_placeholder}
                className="h-12 pl-4 bg-transparent border-none text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
              />
            </div>
            <div className="flex flex-wrap gap-2 p-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  size="sm"
                  variant="ghost"
                  className={
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-lg shadow-glow-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5 font-bold rounded-lg'
                  }
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentPage(1);
                  }}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {activeCategory?.description && (
            <div className="rounded-lg border border-border/60 bg-foreground/5 px-4 py-3 text-sm text-muted-foreground">
              {activeCategory.description}
            </div>
          )}
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-destructive-foreground">
            {errorMessage}
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-64 rounded-xl bg-foreground/5 border border-border/60 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <MarketplaceGrid listings={listings} basePath={basePath} />
        )}

        {!loading && !errorMessage && listings.length === 0 && (
          <div className="rounded-xl border border-border/60 bg-foreground/5 p-10 text-center text-muted-foreground">
            <p className="text-lg font-semibold">{strings.listing_directory.empty.title}</p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              {strings.listing_directory.empty.subtitle}
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              className="border-border/60 text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              {strings.listing_directory.pagination.previous}
            </Button>
            <span className="text-sm text-muted-foreground">
              {strings.listing_directory.pagination.page
                .replace('{current}', currentPage.toString())
                .replace('{total}', totalPages.toString())}
            </span>
            <Button
              variant="outline"
              className="border-border/60 text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              {strings.listing_directory.pagination.next}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
