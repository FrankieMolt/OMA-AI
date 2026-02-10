'use client';

import React, { useState } from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { useAccount as useEvmAccount } from 'wagmi';
import { Wallet, ChevronDown } from 'lucide-react';

interface WalletConnectButtonProps {
  className?: string;
}

export function WalletConnectButton({ className = '' }: WalletConnectButtonProps) {
  const [activeChain, setActiveChain] = useState<'evm' | 'solana'>('evm');
  const { connected: solanaConnected, publicKey } = useSolanaWallet();
  const { isConnected: evmConnected, address: evmAddress } = useEvmAccount();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Chain Selector */}
      <button
        onClick={() => setActiveChain(activeChain === 'evm' ? 'solana' : 'evm')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
      >
        <Wallet size={18} className={activeChain === 'evm' ? 'text-purple-400' : 'text-green-400'} />
        <span className="text-sm font-medium">
          {activeChain === 'evm' ? 'EVM' : 'Solana'}
        </span>
        <ChevronDown size={14} className="text-zinc-500" />
      </button>

      {/* EVM Wallet Connect (RainbowKit) */}
      {activeChain === 'evm' ? (
        <RainbowConnectButton />
      ) : (
        <SolanaWalletButton />
      )}
    </div>
  );
}

// Solana Wallet Button Component
function SolanaWalletButton() {
  const { connected, publicKey, connect, disconnect, connecting } = useSolanaWallet();

  if (connected && publicKey) {
    return (
      <button
        onClick={disconnect}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600/20 border border-green-500/50 text-green-400 hover:bg-green-600/30 transition-colors"
      >
        <span className="text-sm font-medium">
          {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => connect()}
      disabled={connecting}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
    >
      {connecting ? (
        <span className="text-sm">Connecting...</span>
      ) : (
        <span className="text-sm">Connect Solana</span>
      )}
    </button>
  );
}
