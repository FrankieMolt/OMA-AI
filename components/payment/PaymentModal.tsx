'use client';

import { useState } from 'react';
import { useX402, X402PaymentRequest } from '@/lib/x402';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, CreditCard, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  service: {
    id: string;
    name: string;
    price_per_call: number;
    provider: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentModal({ service, onClose, onSuccess }: PaymentModalProps) {
  const { payForAPI, getWalletBalance } = useX402();
  const [calls, setCalls] = useState(100);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<X402PaymentRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totalCost = service.price_per_call * calls;
  const recipientAddress = '0x8888888888888888888888888888888888888888'; // OMA-AI treasury

  const handleConnectWallet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In production, connect to wallet (MetaMask, Coinbase Wallet, etc.)
      // For demo, use a mock address
      const mockAddress = '0x' + crypto.randomUUID().replace(/-/g, '').slice(0, 40);
      setWalletAddress(mockAddress);
      
      const bal = await getWalletBalance(mockAddress);
      setBalance(bal);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!walletAddress) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await payForAPI({
        serviceId: service.id,
        serviceName: service.name,
        pricePerCall: service.price_per_call,
        calls,
        recipientAddress,
      });

      setPayment(result);
      
      if (result.status === 'completed') {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm max-w-md w-full">
        <CardHeader className="border-b border-memoria-border-muted">
          <CardTitle className="text-xl font-light text-memoria-text-hero">
            Pay for {service.name}
          </CardTitle>
          <p className="text-memoria-text-whisper text-sm">
            by {service.provider}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {payment ? (
            <div className="text-center py-8">
              {payment.status === 'completed' ? (
                <>
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-light text-memoria-text-hero mb-2">Payment Successful!</h3>
                  <p className="text-memoria-text-whisper text-sm">
                    {calls} API calls now available
                  </p>
                  <p className="text-memoria-text-meta text-xs mt-2">
                    Tx: {payment.txHash?.slice(0, 10)}...
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-light text-memoria-text-hero mb-2">Payment Failed</h3>
                  <p className="text-memoria-text-whisper text-sm">
                    Please try again
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Wallet Connection */}
              {!walletAddress ? (
                <Button
                  onClick={handleConnectWallet}
                  disabled={loading}
                  className="w-full bg-memoria-text-hero text-memoria-bg-ultra-dark hover:bg-memoria-text-secondary h-12 rounded-sm"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Wallet className="h-4 w-4 mr-2" />
                  )}
                  Connect Wallet
                </Button>
              ) : (
                <div className="bg-memoria-bg-ultra-dark rounded-sm p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-memoria-text-meta text-xs uppercase tracking-widest">Wallet</span>
                    <span className="text-memoria-text-whisper text-xs">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-memoria-text-meta text-xs uppercase tracking-widest">Balance</span>
                    <span className="text-memoria-text-hero font-light">{balance} USDC</span>
                  </div>
                </div>
              )}

              {/* Call Quantity */}
              <div>
                <label className="text-[10px] uppercase tracking-widest text-memoria-text-meta block mb-2">
                  Number of API Calls
                </label>
                <input
                  type="number"
                  value={calls}
                  onChange={(e) => setCalls(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-full bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm px-4 py-3 text-memoria-text-hero text-sm focus:outline-none focus:border-memoria-text-hero"
                />
              </div>

              {/* Pricing Summary */}
              <div className="bg-memoria-bg-ultra-dark rounded-sm p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-memoria-text-whisper text-sm">Price per call</span>
                  <span className="text-memoria-text-hero">${service.price_per_call.toFixed(4)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-memoria-text-whisper text-sm">Quantity</span>
                  <span className="text-memoria-text-hero">{calls.toLocaleString()}</span>
                </div>
                <div className="border-t border-memoria-border-muted pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-memoria-text-hero text-sm font-medium">Total</span>
                    <span className="text-memoria-text-hero text-lg font-light">${totalCost.toFixed(4)} USDC</span>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-900/20 text-red-400 p-3 rounded-sm text-sm">
                  {error}
                </div>
              )}

              {/* Payment Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-memoria-border-muted text-memoria-text-secondary hover:bg-memoria-bg-surface h-12 rounded-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={loading || !walletAddress}
                  className="flex-1 bg-memoria-text-hero text-memoria-bg-ultra-dark hover:bg-memoria-text-secondary h-12 rounded-sm"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CreditCard className="h-4 w-4 mr-2" />
                  )}
                  Pay ${totalCost.toFixed(2)}
                </Button>
              </div>

              {/* Network Info */}
              <p className="text-center text-memoria-text-meta text-xs">
                Powered by x402 • Base Network • USDC
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
