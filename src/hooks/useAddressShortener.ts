'use client';

import { useMemo } from 'react';

/**
 * useAddressShortener - Hook for shortening Ethereum/Base wallet addresses
 * 
 * Provides consistent address shortening throughout the app.
 * Uses 6 chars on each side for good balance between readability and brevity.
 * 
 * @param address - Full wallet address to shorten
 * @returns Shortened address (e.g., "0x742d...E000")
 * 
 * @example
 * const shortened = useAddressShortener(walletAddress);
 * // "0x742d35Cc6634C0532925a3b844Bc9e7595f0bE" → "0x742d...0bE"
 */
export function useAddressShortener(address: string | null | undefined): string {
  return useMemo(() => {
    if (!address) return '';
    if (address.length < 12) return address; // Don't shorten already short strings
    
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}...${end}`;
  }, [address]);
}

/**
 * Format a full address for display (e.g., in modals or tooltips)
 */
export function formatFullAddress(address: string | null | undefined): string {
  if (!address) return '';
  return address;
}
