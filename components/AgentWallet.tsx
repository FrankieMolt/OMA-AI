'use client';

import { useState, useEffect } from 'react';
import { 
  useWallet, 
  useConnection,
  WalletContextState
} from '@solana/wallet-adapter-react';
import { 
  WalletAdapterNetwork,
  WalletReadyState
} from '@solana/wallet-adapter-base';
import { 
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { 
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';
import { 
  DollarSign, 
  Wallet as WalletIcon, 
  Copy, 
  Send, 
  ChevronDown,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  Shield,
  Zap
} from 'lucide-react';

interface AgentWalletProps {
  onPayment?: (amount: number, recipient: PublicKey) => void;
  className?: string;
}

export function AgentWallet({ onPayment, className = '' }: AgentWalletProps) {
  const { publicKey, connected, connecting, wallet } = useWallet();
  const connection = useConnection() as any; // Type assertion to bypass strict type checking
  const [balance, setBalance] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [readyState, setReadyState] = useState<WalletReadyState>(WalletReadyState.NotDetected);

  // Fetch balance function - defined outside useEffect so it can be called from button
  const fetchBalance = async () => {
    if (publicKey && connected) {
      try {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal);
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(0);
      }
    }
  };

  // Fetch balance when wallet connects
  useEffect(() => {
    fetchBalance();
    
    // Refresh balance every 30 seconds
    const interval = setInterval(fetchBalance, 30000);
    return () => clearInterval(interval);
  }, [publicKey, connected]);

  // Track wallet ready state
  useEffect(() => {
    if (wallet) {
      wallet.adapter.on('readyStateChange', (readyState) => {
        setReadyState(readyState);
      });
    }
  }, [wallet]);

  const copyAddress = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey.toBase58());
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (error) {
        console.error('Failed to copy address:', error);
      }
    }
  };

  const formatAddress = (pk: PublicKey): string => {
    const base58 = pk.toBase58();
    return `${base58.slice(0, 4)}...${base58.slice(-4)}`;
  };

  const formatBalance = (lamports: number): string => {
    const sol = lamports / LAMPORTS_PER_SOL;
    if (sol < 0.01) return '< 0.01 SOL';
    if (sol < 1) return `${sol.toFixed(4)} SOL`;
    return `${sol.toFixed(2)} SOL`;
  };

  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-xl ${className}`}>
      {/* Wallet Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            connected ? 'bg-green-500' : 'bg-zinc-700'
          }`}>
            {connected ? (
              <CheckCircle size={20} className="text-white" />
            ) : (
              <WalletIcon size={20} className="text-zinc-400" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-white">Agent Wallet</h3>
            <p className="text-xs text-zinc-500 flex items-center gap-2">
              {readyState === WalletReadyState.Installed ? (
                <>
                  <span className="text-green-400">Ready</span>
                  <span>•</span>
                  <span>Phantom</span>
                </>
              ) : readyState === WalletReadyState.Loadable ? (
                <>
                  <span className="text-yellow-400">Detected</span>
                  <span>•</span>
                  <span className="text-xs text-zinc-600">Install Phantom</span>
                </>
              ) : (
                <>
                  <span className="text-red-400">Not Detected</span>
                  <span>•</span>
                  <span className="text-xs text-zinc-600">Install a wallet</span>
                </>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {connected ? (
            <WalletDisconnectButton className="btn-secondary text-sm">
              Disconnect
            </WalletDisconnectButton>
          ) : (
            <WalletMultiButton style={{ '--wallet-multi-button-radius': '0.5rem' } as any}>
              <button className="btn-primary text-sm">
                Connect Wallet
              </button>
            </WalletMultiButton>
          )}
        </div>
      </div>

      {/* Balance Section */}
      {connected && publicKey && (
        <div className="p-4 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Wallet Balance</p>
              <p className="text-2xl font-bold text-white flex items-center gap-2">
                <span>{formatBalance(balance)}</span>
                <span className="text-purple-400 text-sm font-normal">
                  ${(balance / LAMPORTS_PER_SOL).toFixed(2)} SOL
                </span>
              </p>
            </div>
            <button
              onClick={fetchBalance}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              title="Refresh balance"
            >
              <RefreshCw size={18} className={connecting ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      )}

      {/* Address Section */}
      {connected && publicKey && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-zinc-500">Your Address</p>
            <button
              onClick={copyAddress}
              className="flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              {copySuccess ? (
                <>
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-xs text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span className="text-xs">{formatAddress(publicKey)}</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-zinc-950 rounded-lg p-3 font-mono text-sm text-zinc-400 break-all">
            {publicKey.toBase58()}
          </div>
        </div>
      )}

      {/* x402 Payment Demo */}
      {connected && onPayment && (
        <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-t border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={20} className="text-purple-400" />
            <h4 className="font-bold text-white">x402 Payment Demo</h4>
          </div>
          <p className="text-sm text-zinc-400 mb-4">
            Test agent-to-agent payments with USDC on Base or Solana
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                // Demo payment to a recipient
                const recipient = new PublicKey('HcGjCmp7i4cAPKw9qz3bFhR3xqYyM3'); // Example recipient
                onPayment(1, recipient);
              }}
              className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Send size={18} />
              <span>Send 1 SOL</span>
            </button>
            <button
              onClick={() => {
                // Demo EIP-3009 payment
                window.location.href = 'https://app.circle.com/pool/USDC/create';
              }}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <DollarSign size={18} />
              <span>USDC on Base</span>
            </button>
          </div>
        </div>
      )}

      {/* Status Messages */}
      {!connected && readyState === WalletReadyState.NotDetected && (
        <div className="p-4">
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-yellow-400 shrink-0" />
              <div>
                <p className="font-medium text-yellow-200 mb-1">Wallet Not Detected</p>
                <p className="text-sm text-yellow-300/80">
                  Install{' '}
                  <a 
                    href="https://phantom.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-200 hover:underline"
                  >
                    Phantom Wallet
                  </a>
                  {' '}to interact with dApps on Solana
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Footer */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Shield size={16} className="text-purple-400" />
          <span>Secured by Solana blockchain</span>
          <a 
            href="https://docs.solana.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 ml-auto flex items-center gap-1"
          >
            Learn More
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
