"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Wallet,
  Loader2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { createWalletClient, custom, parseEther } from "viem";
import { base } from "viem/chains";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    name: string;
    price: number;
    description?: string;
  };
  onSuccess?: (txHash: string) => void;
}

type PaymentStatus =
  | "idle"
  | "connecting"
  | "signing"
  | "processing"
  | "success"
  | "error";

export function PaymentModal({
  isOpen,
  onClose,
  service,
  onSuccess,
}: PaymentModalProps) {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");

  const handlePayment = async () => {
    setStatus("connecting");
    setError("");

    if (typeof window === "undefined" || !window.ethereum) {
      setError("No wallet found. Please install MetaMask or Coinbase Wallet.");
      setStatus("error");
      return;
    }

    try {
      const client = createWalletClient({
        chain: base,
        transport: custom(window.ethereum),
      });

      const [account] = await client.requestAddresses();
      setStatus("signing");

      // Create x402 payment message
      const paymentMessage = JSON.stringify({
        service_id: service.id,
        amount: service.price,
        currency: "USDC",
        chain: "base",
        timestamp: Date.now(),
      });

      // Sign the payment authorization
      const signature = await client.signMessage({
        account,
        message: paymentMessage,
      });

      setStatus("processing");

      // Send to backend for processing
      const response = await fetch("/api/payments/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          walletAddress: account,
          signature,
          message: paymentMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment failed");
      }

      setTxHash(data.txHash || "simulated_tx");
      setStatus("success");

      if (onSuccess) {
        onSuccess(data.txHash);
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed");
      setStatus("error");
    }
  };

  const resetAndClose = () => {
    setStatus("idle");
    setError("");
    setTxHash("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={resetAndClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Wallet size={28} className="text-white" />
            </div>
            <h2 className="text-xl font-bold">Confirm Payment</h2>
            <p className="text-zinc-400 text-sm mt-1">x402 Micropayment</p>
          </div>

          {/* Service Info */}
          <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                {service.description && (
                  <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                    {service.description}
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">
                  ${service.price}
                </div>
                <div className="text-xs text-zinc-500">USDC on Base</div>
              </div>
            </div>
          </div>

          {/* Status Display */}
          {status === "success" && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={24} />
                <div>
                  <p className="font-medium text-green-400">
                    Payment Successful!
                  </p>
                  {txHash && (
                    <a
                      href={`https://basescan.org/tx/${txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 mt-1"
                    >
                      View on BaseScan <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-red-400" size={24} />
                <div>
                  <p className="font-medium text-red-400">Payment Failed</p>
                  <p className="text-xs text-zinc-400 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {status === "idle" && (
            <button
              onClick={handlePayment}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Pay with Wallet
            </button>
          )}

          {(status === "connecting" ||
            status === "signing" ||
            status === "processing") && (
            <button
              disabled
              className="w-full py-4 bg-zinc-800 rounded-xl font-semibold text-zinc-400 flex items-center justify-center gap-2"
            >
              <Loader2 size={20} className="animate-spin" />
              {status === "connecting" && "Connecting Wallet..."}
              {status === "signing" && "Confirm in Wallet..."}
              {status === "processing" && "Processing Payment..."}
            </button>
          )}

          {(status === "success" || status === "error") && (
            <button
              onClick={resetAndClose}
              className="w-full py-4 bg-zinc-800 rounded-xl font-semibold hover:bg-zinc-700 transition-colors"
            >
              {status === "success" ? "Done" : "Try Again"}
            </button>
          )}

          {/* Footer */}
          <p className="text-center text-xs text-zinc-500 mt-4">
            Powered by x402 Protocol • Base Network
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
