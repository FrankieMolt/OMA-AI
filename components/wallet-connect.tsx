'use client';

import { motion } from 'framer-motion';
import { Wallet, useWallet } from '@solana/wallet-adapter-react';
import { 
  WalletMultiButton,
  WalletDisconnectButton 
} from '@solana/wallet-adapter-react-ui';
import { 
  Wallet as WalletIcon, 
  Copy, 
  Check, 
  ExternalLink,
  Coins,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function WalletConnect() {
  const { publicKey, connected, wallet } = useWallet();
  const [copied, setCopied] = useState(false);

  const address = publicKey?.toBase58() || '';
  const shortAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!connected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-card border border-border"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <WalletIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Connect Wallet</h3>
            <p className="text-sm text-muted-foreground">
              Pay with USDC on Solana or Base
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <WalletMultiButton className="!w-full !justify-center !bg-primary !text-primary-foreground !rounded-xl !py-3 !font-semibold" />
          
          <div className="text-center text-sm text-muted-foreground">
            or connect with MetaMask for Base
          </div>
          
          <button className="w-full py-3 bg-muted hover:bg-muted/80 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
            <img src="/metamask.svg" alt="MetaMask" className="w-5 h-5" />
            Connect MetaMask
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By connecting, you agree to our Terms of Service
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-2xl bg-card border border-primary/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {wallet?.adapter.icon && (
            <img src={wallet.adapter.icon} alt={wallet.adapter.name} className="w-8 h-8" />
          )}
          <div>
            <div className="font-semibold">{wallet?.adapter.name}</div>
            <div className="text-sm text-muted-foreground">Connected</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-green-500">Active</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Address */}
        <div className="p-3 rounded-lg bg-muted flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Address:</span>
            <span className="font-mono text-sm">{shortAddress}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyAddress}
              className="p-1 hover:bg-background rounded transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <a
              href={`https://solscan.io/account/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-background rounded transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Balance */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">USDC Balance</span>
            <Coins className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">0.00 USDC</div>
          <div className="text-xs text-muted-foreground mt-1">
            ≈ $0.00 USD
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            Add Funds
            <ArrowRight className="w-4 h-4" />
          </button>
          <WalletDisconnectButton className="!w-full !justify-center !bg-muted !text-foreground !rounded-xl !py-3 !font-semibold" />
        </div>

        {/* Usage Stats */}
        <div className="pt-4 border-t border-border">
          <div className="text-sm font-medium mb-3">This Month</div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold">0</div>
              <div className="text-xs text-muted-foreground">Requests</div>
            </div>
            <div>
              <div className="text-xl font-bold">0</div>
              <div className="text-xs text-muted-foreground">Tokens</div>
            </div>
            <div>
              <div className="text-xl font-bold">$0.00</div>
              <div className="text-xs text-muted-foreground">Spent</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
