'use client';

import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { Wallet as WalletIcon, Copy, Check, Coins, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export function WalletConnect() {
  // Solana
  const { publicKey: solPublicKey, connected: solConnected, wallet: solWallet } = useWallet();
  
  // Base (EVM)
  const { address: evmAddress, isConnected: evmConnected } = useAccount();
  const { disconnect: evmDisconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeAddress = solConnected ? solPublicKey?.toBase58() : evmAddress;
  const shortAddress = activeAddress ? `${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}` : '';
  const networkName = solConnected ? 'Solana' : evmConnected ? 'Base' : null;

  const copyAddress = () => {
    if (activeAddress) {
      navigator.clipboard.writeText(activeAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEvmConnect = () => {
    const injectedConnector = connectors.find(c => c.type === 'injected') || connectors[0];
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  if (!mounted) return null;

  if (!solConnected && !evmConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-[2.5rem] bg-zinc-900 border border-white/10 shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-8 text-left">
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
            <WalletIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-black text-white uppercase tracking-tight">Access Node</h3>
            <p className="text-sm text-gray-500 font-medium">
              Initialize connection via Solana or Base
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="group relative">
            <WalletMultiButton className="!w-full !justify-center !bg-white !text-black !rounded-2xl !py-4 !font-black !text-xs !uppercase !tracking-[0.2em] !h-auto !border-none hover:!bg-primary transition-all shadow-xl" />
          </div>
          
          <div className="relative py-2 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative px-4 bg-zinc-900 text-[10px] font-black text-gray-600 uppercase tracking-widest">
              OR EVM
            </span>
          </div>
          
          <button 
            onClick={handleEvmConnect}
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <ShieldCheck className="w-4 h-4 text-primary" />
            Connect Base
          </button>
        </div>

        <p className="text-[10px] text-gray-600 text-center mt-8 font-black uppercase tracking-widest leading-relaxed">
          Autonomous agents detected via x402 headers<br/>will bypass manual connection
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 rounded-[2.5rem] bg-zinc-900 border border-primary/20 shadow-2xl relative overflow-hidden"
    >
      {/* Background Pulse */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            {solConnected ? (
              <img src={solWallet?.adapter.icon} alt="Wallet" className="w-6 h-6" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-primary" />
            )}
          </div>
          <div>
            <div className="font-black text-white uppercase tracking-tight">{networkName} Node</div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Authorized</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Address */}
        <div className="p-4 rounded-2xl bg-black border border-white/5 flex items-center justify-between group">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">Identity</span>
            <span className="font-mono text-xs text-gray-300">{shortAddress}</span>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={copyAddress}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Balance Display */}
        <div className="p-6 rounded-[1.5rem] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Credits Available</span>
            <Coins className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-4xl font-black text-white tracking-tighter">12,450</div>
            <div className="text-xs font-black text-gray-500 uppercase tracking-widest">OMA Credits</div>
          </div>
          <div className="text-[10px] font-bold text-emerald-400 mt-2 flex items-center gap-1.5 uppercase">
            <Zap className="w-3 h-3" />
            Auto-refill enabled (Base)
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-xl">
            Add Funds
            <ArrowRight className="w-3 h-3" />
          </button>
          <button 
            onClick={() => solConnected ? solWallet?.adapter.disconnect() : evmDisconnect()}
            className="py-4 bg-white/5 text-gray-400 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/20 transition-all"
          >
            Disconnect
          </button>
        </div>
      </div>
    </motion.div>
  );
}
