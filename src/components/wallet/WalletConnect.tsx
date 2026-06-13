'use client';

import { useState, useEffect } from 'react';

export function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasProvider, setHasProvider] = useState(false);
  const [copied, setCopied] = useState(false);

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
          // Also check localStorage for persistence
          const saved = localStorage.getItem('walletAddress');
          if (saved) setAddress(saved);
        }
      } catch {
        // provider exists but may need permission
      }
    }
  };

  const fetchBalance = async (addr: string) => {
    try {
      // Try to fetch USDC balance via Conway wallet tool if available
      // For now, show a placeholder or call the balance API
      const res = await fetch(`/api/wallet/${addr}/balance`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data?.balance_usdc) {
          setBalance(data.data.balance_usdc);
        }
      }
    } catch {
      // Balance fetch failed, that's ok
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
        const acc = accounts[0];
        setAddress(acc);
        localStorage.setItem('walletAddress', acc);
        fetchBalance(acc);
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
    setBalance(null);
    localStorage.removeItem('walletAddress');
  };

  const handleCopyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Copy failed
    }
  };

  // Connected state
  if (address) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 text-white rounded-lg border border-zinc-700">
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="text-xs font-mono text-zinc-400">
          {address.slice(0, 4)}...{address.slice(-3)}
        </span>
        {balance !== null && (
          <span className="text-xs font-mono text-green-400">
            ${balance.toFixed(2)}
          </span>
        )}
        <button
          onClick={handleCopyAddress}
          className="ml-1 text-zinc-500 hover:text-white transition-colors p-0.5"
          title={copied ? 'Copied!' : 'Copy address'}
        >
          {copied ? (
            <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
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
      <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/80 text-white rounded-lg border border-zinc-700">
        <div className="w-5 h-5 bg-zinc-700/50 rounded-full flex items-center justify-center shrink-0 border border-zinc-600/50">
          <svg className="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-xs text-zinc-400">Wallet Ready</span>
        <button
          onClick={handleConnect}
          disabled={loading}
          className="ml-2 text-xs bg-violet-600 hover:bg-violet-500 text-white px-2.5 py-1 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? '…' : 'Connect'}
        </button>
      </div>
    );
  }

  // No provider — show generic connect button
  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="px-3 py-1.5 bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg disabled:opacity-50 transition-colors flex items-center gap-1.5 text-sm"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          …
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m-6 4l2 2m0-2l-2 2" />
          </svg>
          Connect
        </>
      )}
    </button>
  );
}
