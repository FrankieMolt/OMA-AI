'use client';

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { TipLinkWalletAdapter } from '@tiplink/wallet-adapter';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { ThemeProvider } from '@/components/providers/theme-provider';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

export function ClientWalletProvider({ children }: { children: React.ReactNode }) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new TipLinkWalletAdapter({
        title: 'OMA',
        clientId:
          process.env.NEXT_PUBLIC_TIPLINK_CLIENT_ID || 'da463870-1376-4d29-9233-049836374026',
        theme: 'dark',
      }),
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    [] // Dependencies removed as they are stable
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </QueryClientProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
