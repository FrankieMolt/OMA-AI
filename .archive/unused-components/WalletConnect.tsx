'use client';

import React, { useState, useEffect } from 'react';
import { createWalletClient, custom } from 'viem';
import { base } from 'viem/chains';
import { Wallet, Loader2, AlertCircle } from 'lucide-react';

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  className?: string;
  label?: string;
}

export function WalletConnect({ onConnect, className, label = 'Connect Wallet' }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');

  // Check for existing connection
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            if (onConnect) onConnect(accounts[0]);
          }
        })
        .catch(console.error);
    }
  }, [onConnect]);

  const connectWallet = async () => {
    setIsConnecting(true);
    setError('');

    if (typeof window === 'undefined' || !window.ethereum) {
      setError('No wallet found. Please install MetaMask or Coinbase Wallet.');
      setIsConnecting(false);
      return;
    }

    try {
      const client = createWalletClient({
        chain: base,
        transport: custom(window.ethereum)
      });

      const [account] = await client.requestAddresses();
      setAddress(account);
      
      // Request signature for authentication
      const message = `Sign this message to connect to OMA-AI: ${Date.now()}`;
      const signature = await client.signMessage({ 
        account, 
        message 
      });

      // Verify with backend
      const response = await fetch('/api/auth/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'verify',
          walletAddress: account,
          signature,
          message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      // Store token (if returned)
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      if (onConnect) onConnect(account);
      
      // Redirect to dashboard if on login page
      if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
        window.location.href = '/dashboard';
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-sm text-red-300">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
      
      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/50 text-purple-300 rounded-lg hover:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isConnecting ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Wallet size={20} />
        )}
        <span>{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : label}</span>
      </button>
    </div>
  );
}
