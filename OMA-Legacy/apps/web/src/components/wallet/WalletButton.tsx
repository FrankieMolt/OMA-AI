'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '@/components/ui/button';
import { LogOut, Copy, Check, Wallet, RefreshCw } from 'lucide-react';
import { SolanaCircleColorful } from '@ant-design/web3-icons';
import { WalletModal } from './WalletModal';
import strings from '@/constants/text.json';

export function WalletButton() {
  const { publicKey, connected, connecting, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);
  const [usdcBalance, setUsdcBalance] = useState<number>(0);
  const [creditsBalance, setCreditsBalance] = useState<number>(0);
  const [showBalance, setShowBalance] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWalletBalance = React.useCallback(async () => {
    if (!connected) return;

    try {
      setRefreshing(true);
      const response = await fetch('/api/wallet/balance?includeOnchain=false');
      const data = await response.json();

      if (data.success) {
        setUsdcBalance(data.balances.usdc.amount);
        setCreditsBalance(data.balances.credits.amount);
      }
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    } finally {
      setRefreshing(false);
    }
  }, [connected]);

  useEffect(() => {
    if (connected) {
      fetchWalletBalance();
    }
  }, [connected, fetchWalletBalance]);

  const handleConnect = async () => {
    if (connected) {
      await disconnect();
      setUsdcBalance(0);
      setCreditsBalance(0);
    } else {
      setVisible(true);
    }
  };

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!connected) {
    return (
      <Button
        onClick={handleConnect}
        disabled={connecting}
        size="sm"
        variant="neon"
        className="rounded-xl px-5 font-bold text-[10px] tracking-widest uppercase group"
        aria-label={connecting ? strings.wallet.connecting : strings.wallet.connect}
      >
        <SolanaCircleColorful
          className="size-3.5 mr-2 drop-shadow-[0_0_5px_rgba(var(--primary),0.5)] group-hover:scale-110 transition-transform"
          aria-hidden="true"
        />
        {connecting ? strings.wallet.connecting : strings.wallet.connect}
      </Button>
    );
  }

  const shortAddress = publicKey
    ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`
    : '';

  return (
    <div className="flex items-center gap-1.5 p-1 bg-foreground/[0.03] border border-border/60 rounded-2xl backdrop-blur-xl">
      <WalletModal
        trigger={
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-xl bg-primary/5 border border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/40 transition-all font-mono text-[10px] font-bold tracking-widest uppercase px-3"
            aria-label={
              showBalance
                ? `Wallet balance: ${usdcBalance.toFixed(2)} USDC, ${creditsBalance} credits. Click to manage wallet.`
                : strings.wallet.manage
            }
          >
            <Wallet className="size-3 mr-2" aria-hidden="true" />
            {showBalance ? (
              <div className="flex flex-col items-start gap-0.5 leading-none">
                <span>{usdcBalance.toFixed(2)} USDC</span>
                <span className="text-[8px] opacity-60">{creditsBalance} {strings.wallet.credits}</span>
              </div>
            ) : (
              <span>{strings.wallet.manage}</span>
            )}
          </Button>
        }
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopyAddress}
        className="h-8 font-mono text-[10px] font-bold tracking-widest uppercase bg-foreground/5 border border-border/60 hover:border-primary/30 transition-all text-foreground/70 hover:text-foreground px-3 rounded-xl group"
        aria-label={`Wallet address: ${publicKey?.toString()}. ${copied ? strings.wallet.address_copied : strings.wallet.copy_address_label}`}
      >
        <SolanaCircleColorful
          className="size-3 mr-2 drop-shadow-[0_0_3px_rgba(var(--primary),0.3)] group-hover:scale-110 transition-transform"
          aria-hidden="true"
        />
        {shortAddress}
        {copied ? (
          <Check className="h-3 w-3 ml-2 text-success" aria-hidden="true" />
        ) : (
          <Copy className="h-3 w-3 ml-2 opacity-50 group-hover:opacity-100" aria-hidden="true" />
        )}
      </Button>

      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowBalance(!showBalance)}
          className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
          aria-label={showBalance ? strings.wallet.balance_shown_label : strings.wallet.balance_hidden_label}
          aria-pressed={showBalance}
        >
          {refreshing ? (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <Wallet className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleConnect}
          className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
          aria-label={strings.wallet.disconnect_label}
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
