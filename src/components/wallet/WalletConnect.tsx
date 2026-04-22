'use client';

import { useState, useEffect } from 'react';

export function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    const ethereum = typeof window !== 'undefined'
      ? (window as Window & { ethereum?: { request: (req: { method: string }) => Promise<string[]> } }).ethereum
      : undefined;
    if (ethereum) {
      setHasProvider(true);
      try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      } catch {
        // provider exists but may need permission
      }
    }
  };

  const handleConnect = async () => {
    const ethereum = typeof window !== 'undefined'
      ? (window as Window & { ethereum?: { request: (req: { method: string }) => Promise<string[]> } }).ethereum
      : undefined;
    if (!ethereum) {
      alert('Please install MetaMask or another wallet');
      return;
    }

    setLoading(true);
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code !== 4001) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setAddress(null);
    localStorage.removeItem('walletAddress');
  };

  // Connected state
  if (address) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg border border-zinc-700">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-sm font-mono text-green-400">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          onClick={handleDisconnect}
          className="ml-1 text-zinc-500 hover:text-white transition-colors p-0.5"
          title="Disconnect"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  // Disconnected but provider available — show "ready" indicator
  if (hasProvider) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg border border-zinc-700">
        <div className="w-6 h-6 bg-green-500/30 rounded-full flex items-center justify-center shrink-0 border border-green-500/50">
          <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-sm text-zinc-400">Wallet Ready</span>
        <button
          onClick={handleConnect}
          disabled={loading}
          className="ml-2 text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-1 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Connecting…' : 'Connect'}
        </button>
      </div>
    );
  }

  // No provider — show generic connect button
  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="px-4 py-2 bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg disabled:opacity-50 transition-colors flex items-center gap-2"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Connecting…
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m-6 4l2 2m0-2l-2 2" />
          </svg>
          Connect Wallet
        </>
      )}
    </button>
  );
}