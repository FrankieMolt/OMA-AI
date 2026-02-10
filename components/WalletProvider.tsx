'use client';

import React, { ReactNode, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { config } from '@/lib/wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import '@solana/wallet-adapter-react-ui/styles.css';

// TanStack Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Solana endpoint
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

// Solana wallet adapters
const wallets = () => [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const walletAdapters = useMemo(wallets, []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#a855f7',
            accentColorForeground: '#ffffff',
            borderRadius: 'large',
            fontStack: 'system',
          })}
          showRecentTransactions={true}
        >
          <ConnectionProvider endpoint={SOLANA_RPC_URL}>
            <SolanaWalletProvider wallets={walletAdapters} autoConnect>
              <WalletModalProvider>
                {children}
              </WalletModalProvider>
            </SolanaWalletProvider>
          </ConnectionProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
