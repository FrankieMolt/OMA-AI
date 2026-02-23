"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Star,
  DollarSign,
} from "lucide-react";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  categories: string[];
  initialQuery?: string;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  network: string[];
  freeTier: boolean;
}

export type SortOption =
  | "trending"
  | "popular"
  | "highestRated"
  | "newest"
  | "lowestPrice"
  | "highestPrice";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "trending", label: "Trending" },
  { value: "popular", label: "Most Popular" },
  { value: "highestRated", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
  { value: "lowestPrice", label: "Lowest Price" },
  { value: "highestPrice", label: "Highest Price" },
];

const networks = ["All", "Base", "Ethereum", "Solana", "Polygon"];

const priceRanges: { label: string; min: number; max: number }[] = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Free Only", min: 0, max: 0 },
  { label: "Under $0.001", min: 0, max: 0.001 },
  { label: "$0.001 - $0.01", min: 0.001, max: 0.01 },
  { label: "$0.01 - $0.10", min: 0.01, max: 0.1 },
  { label: "$0.10+", min: 0.1, max: Infinity },
];

export default function SearchFilter({
  onSearch,
  onFilterChange,
  onSortChange,
  categories,
  initialQuery = "",
}: SearchFilterProps) {
  const [query, setQuery] = useState(initialQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("trending");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [minRating, setMinRating] = useState(0);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>(["All"]);
  const [freeTier, setFreeTier] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Update filters
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      minRating,
      network: selectedNetworks.filter((n) => n !== "All"),
      freeTier,
    });
  }, [
    selectedCategories,
    priceRange,
    minRating,
    selectedNetworks,
    freeTier,
    onFilterChange,
  ]);

  // Handle category toggle
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  // Handle network toggle
  const toggleNetwork = (network: string) => {
    if (network === "All") {
      setSelectedNetworks(["All"]);
    } else {
      setSelectedNetworks((prev) => {
        const filtered = prev.filter((n) => n !== "All");
        return filtered.includes(network)
          ? filtered.filter((n) => n !== network)
          : [...filtered, network];
      });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, Infinity]);
    setMinRating(0);
    setSelectedNetworks(["All"]);
    setFreeTier(false);
    setSelectedCategories([]);
  };

  // Get active filter count
  const activeFilterCount =
    (priceRange[0] !== 0 || priceRange[1] !== Infinity ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (selectedNetworks.filter((n) => n !== "All").length > 0 ? 1 : 0) +
    (freeTier ? 1 : 0) +
    selectedCategories.length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search APIs, MCPs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value as SortOption);
              onSortChange(e.target.value as SortOption);
            }}
            className="appearance-none bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer"
            aria-label="Sort by"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            size={18}
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`relative px-4 py-3 rounded-xl transition-colors ${
            activeFilterCount > 0
              ? "bg-purple-600 text-white"
              : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          }`}
          aria-label="Toggle filters"
          aria-expanded={showFilters}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border border-zinc-800 rounded-xl bg-zinc-900/50 p-6 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-3">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedCategories.includes(category)
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-3">
              Price Range
            </label>
            <select
              value={
                priceRanges.find(
                  (r) => r.min === priceRange[0] && r.max === priceRange[1],
                )?.label || "All Prices"
              }
              onChange={(e) => {
                const selected = priceRanges.find(
                  (r) => r.label === e.target.value,
                );
                if (selected) {
                  setPriceRange([selected.min, selected.max]);
                }
              }}
              className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              aria-label="Price range"
            >
              {priceRanges.map((range) => (
                <option key={range.label} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-3">
              Minimum Rating
            </label>
            <div className="flex items-center gap-2">
              {[0, 3, 3.5, 4, 4.5, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${
                    minRating === rating
                      ? "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                  }`}
                  aria-label={`Minimum rating ${rating}`}
                >
                  <Star size={14} />
                  {rating > 0 ? rating : "Any"}
                </button>
              ))}
            </div>
          </div>

          {/* Network */}
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-3">
              Network
            </label>
            <div className="flex flex-wrap gap-2">
              {networks.map((network) => (
                <button
                  key={network}
                  onClick={() => toggleNetwork(network)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedNetworks.includes(network)
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                  }`}
                >
                  {network}
                </button>
              ))}
            </div>
          </div>

          {/* Free Tier */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFreeTier(!freeTier)}
              className={`w-12 h-6 rounded-full transition-colors ${
                freeTier ? "bg-purple-600" : "bg-zinc-700"
              }`}
              aria-label="Toggle free tier"
              role="switch"
              aria-checked={freeTier}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transform transition-transform ${
                  freeTier ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
            <label className="text-sm text-zinc-400">Free tier only</label>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Compact version for smaller screens
export function SearchFilterCompact({
  query,
  setQuery,
  categories,
}: {
  query: string;
  setQuery: (query: string) => void;
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          size={16}
        />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-sm"
        />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${
            selectedCategory === "All"
              ? "bg-purple-600 text-white"
              : "bg-zinc-800 text-zinc-400"
          }`}
        >
          All
        </button>
        {categories.slice(0, 5).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
