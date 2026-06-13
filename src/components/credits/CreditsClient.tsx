'use client';

import { useState, useCallback } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Coins, Sparkles, Check, AlertCircle, Loader2 } from 'lucide-react';

interface CreditPackage {
  id: string;
  name: string;
  credits: string;
  price: string;
  bonus: string | null;
  costPerCall: string;
  savings: string | null;
  description: string;
  popular?: boolean;
}

interface CreditsClientProps {
  packages: CreditPackage[];
  treasuryAddress: string;
}

type PurchaseState = 'idle' | 'connecting' | 'signing' | 'confirming' | 'success' | 'error';

interface PurchaseResult {
  success: boolean;
  creditsAdded?: number;
  newBalance?: number;
  txHash?: string;
  error?: string;
}

// Wallet type
interface WalletProvider {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  isMetaMask?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: Window & { ethereum?: WalletProvider };

export function CreditsClient({ packages, treasuryAddress }: CreditsClientProps) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [hasProvider, setHasProvider] = useState(false);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [purchaseState, setPurchaseState] = useState<PurchaseState>('idle');
  const [purchaseResult, setPurchaseResult] = useState<PurchaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check for existing wallet on mount
  useState(() => {
    const eth = window.ethereum;
    if (eth) {
      setHasProvider(true);
      eth.request({ method: 'eth_accounts' }).then((accounts) => {
        if (Array.isArray(accounts) && accounts.length > 0) {
          setWalletAddress(accounts[0] as string);
        }
      }).catch(() => {});
    }
  });

  const connectWallet = useCallback(async () => {
    const eth = window.ethereum;
    if (!eth) {
      setError('MetaMask or a Web3 wallet is required. Please install it first.');
      return;
    }

    setPurchaseState('connecting');
    setError(null);

    try {
      const accounts = await eth.request({ method: 'eth_requestAccounts' }) as string[];
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setPurchaseState('idle');
      }
    } catch (err) {
      setError('Wallet connection rejected. Please approve the connection request.');
      setPurchaseState('error');
    }
  }, []);

  const handleBuy = useCallback(async (pkg: CreditPackage) => {
    const eth = window.ethereum;
    if (!eth) {
      setError('No wallet detected. Please install MetaMask or a Web3 wallet.');
      return;
    }

    if (!walletAddress) {
      await connectWallet();
      return;
    }

    setError(null);
    setPurchasing(pkg.id);
    setPurchaseState('signing');

    try {
      // Step 1: Initiate purchase — get payment requirement from server
      const purchaseRes = await fetch('/api/credits/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: pkg.id,
          walletAddress,
          network: 'base',
        }),
      });

      if (!purchaseRes.ok) {
        const err = await purchaseRes.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(err.error || 'Failed to initiate purchase');
      }

      const purchaseData = await purchaseRes.json();

      // Step 2: Request signature from wallet (EIP-712 / EIP-3009)
      setPurchaseState('signing');
      
      // Trigger wallet signing for payment authorization
      let signature: string;
      try {
        // For EIP-3009, we use eth_signTypedData_v4
        const signResult = await eth.request({
          method: 'eth_signTypedData_v4',
          params: [walletAddress, JSON.stringify(purchaseData.paymentRequirement)],
        }) as string;
        signature = signResult;
      } catch (signErr) {
        // Fallback: simple personal sign as demonstration
        const msg = `Purchase credits: ${pkg.name} for $${pkg.price} USDC to ${treasuryAddress}`;
        signature = await eth.request({
          method: 'personal_sign',
          params: [msg, walletAddress],
        }) as string;
      }

      // Step 3: Confirm purchase on server
      setPurchaseState('confirming');
      const confirmRes = await fetch('/api/credits/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purchaseId: purchaseData.purchaseId,
          signature,
          walletAddress,
          network: 'base',
        }),
      });

      const result = await confirmRes.json();

      if (!confirmRes.ok || !result.success) {
        throw new Error(result.error || 'Purchase confirmation failed');
      }

      setPurchaseResult({
        success: true,
        creditsAdded: result.creditsAdded,
        newBalance: result.newBalance,
      });
      setPurchaseState('success');

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Purchase failed';
      setError(msg);
      setPurchaseResult({ success: false, error: msg });
      setPurchaseState('error');
    } finally {
      setPurchasing(null);
    }
  }, [walletAddress, connectWallet, treasuryAddress]);

  const isLoading = (pkgId: string) => purchasing === pkgId;

  return (
    <div>
      {/* Wallet Connection Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-between max-w-6xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4">
          <div className="flex items-center gap-3">
            {walletAddress ? (
              <>
                <div className="w-10 h-10 bg-emerald-600/20 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Connected Wallet</p>
                  <p className="text-white font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                  <Coins className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">No wallet connected</p>
                  <p className="text-white">Connect to purchase credits</p>
                </div>
              </>
            )}
          </div>
          {!walletAddress && (
            <button
              onClick={connectWallet}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>

        {/* Success Banner */}
        {purchaseState === 'success' && purchaseResult?.success && (
          <div className="max-w-6xl mx-auto mt-4 p-4 bg-emerald-600/10 border border-emerald-500/30 rounded-xl flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <p className="text-emerald-300">
              <strong>+{purchaseResult.creditsAdded?.toLocaleString()} credits added!</strong>
              {purchaseResult.newBalance && ` New balance: ${purchaseResult.newBalance.toLocaleString()} credits.`}
            </p>
          </div>
        )}

        {/* Error Banner */}
        {purchaseState === 'error' && error && (
          <div className="max-w-6xl mx-auto mt-4 p-4 bg-red-600/10 border border-red-500/30 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-300">{error}</p>
          </div>
        )}
      </div>

      {/* Credit Packages */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {packages.map((pkg) => (
          <GlassCard
            key={pkg.id}
            className={`p-6 flex flex-col ${pkg.popular ? 'border-amber-500/50 ring-1 ring-amber-500/30 relative' : ''}`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="px-4 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
            <p className="text-gray-400 text-sm mb-6">{pkg.description}</p>

            <div className="mb-6">
              <div className="text-4xl font-bold text-white">{pkg.credits}</div>
              <div className="text-gray-500 text-sm">credits</div>
              {pkg.bonus && (
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400">{pkg.bonus} free</span>
                </div>
              )}
              <div className="mt-4">
                <span className="text-3xl font-bold text-amber-400">{pkg.price}</span>
                <span className="text-gray-500 text-sm ml-1">one-time</span>
              </div>
            </div>

            <div className="space-y-2 mb-6 flex-grow">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Cost per call</span>
                <span className="text-white font-mono">{pkg.costPerCall}</span>
              </div>
              {pkg.savings && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Savings vs pay-per-call</span>
                  <span className="text-emerald-400 font-bold">{pkg.savings}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Expiration</span>
                <span className="text-white">Never</span>
              </div>
            </div>

            <button
              onClick={() => { void handleBuy(pkg); }}
              disabled={isLoading(pkg.id) || purchaseState === 'signing' || purchaseState === 'confirming'}
              className="w-full px-4 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800/50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isLoading(pkg.id) ? (
                purchaseState === 'signing' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sign in Wallet...</>
                ) : purchaseState === 'confirming' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Confirming...</>
                ) : (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                )
              ) : (
                <><Coins className="w-4 h-4" /> Buy {pkg.name} Package</>
              )}
            </button>
          </GlassCard>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm max-w-6xl mx-auto px-4">
        Credits are paid via USDC on Base. Purchases are non-refundable. Credits never expire.
      </p>
    </div>
  );
}