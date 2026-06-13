/**
 * OMA-AI x402 Embed
 * 
 * JavaScript embed for websites to accept x402 payments
 * Supports Base and Solana networks
 * 
 * @example
 * <script src="https://oma-ai.com/embed/x402.js"></script>
 * <script>
 *   OMA402.init({
 *     recipient: '0x...',
 *     network: 'base',
 *     currency: 'USDC'
 *   });
 * </script>
 */

(function() {
  'use strict';

  const DEFAULT_NETWORKS = {
    base: {
      chainId: '0x2105', // 8453
      rpc: 'https://mainnet.base.org',
      usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
    },
    solana: {
      chainId: 'solana:101',
      rpc: 'https://api.mainnet-beta.solana.com',
      usdc: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    }
  };

  class OMA402 {
    constructor(options) {
      this.options = {
        recipient: options.recipient,
        network: options.network || 'base',
        currency: options.currency || 'USDC',
        amount: options.amount || '0.001',
        description: options.description || 'API Access',
        onPaymentRequired: options.onPaymentRequired || null,
        onPaymentComplete: options.onPaymentComplete || null,
        onError: options.onError || null
      };
      
      this.wallet = null;
      this.provider = null;
    }

    /**
     * Initialize the embed
     */
    static init(options) {
      return new OMA402(options);
    }

    /**
     * Check if wallet is available
     */
    hasWallet() {
      return typeof window !== 'undefined' && !!window.ethereum;
    }

    /**
     * Connect wallet
     */
    async connect() {
      if (!this.hasWallet()) {
        throw new Error('No wallet found. Please install MetaMask or Coinbase Wallet.');
      }

      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        this.wallet = accounts[0];
        
        // Get chain ID
        const chainId = await window.ethereum.request({ 
          method: 'eth_chainId' 
        });
        
        // Switch to correct network if needed
        const targetChain = DEFAULT_NETWORKS[this.options.network];
        if (parseInt(chainId, 16) !== parseInt(targetChain.chainId, 16)) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: targetChain.chainId }]
            });
          } catch (e) {
            // Chain not added
            throw new Error(`Please switch to ${this.options.network} network`);
          }
        }
        
        return this.wallet;
      } catch (error) {
        if (this.options.onError) {
          this.options.onError(error);
        }
        throw error;
      }
    }

    /**
     * Make a request with automatic payment
     */
    async fetch(url, options = {}) {
      // First try without payment
      let response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Content-Type': 'application/json'
        }
      });

      // If 402, need to pay
      if (response.status === 402) {
        const paymentReq = await response.json();
        
        if (this.options.onPaymentRequired) {
          this.options.onPaymentRequired(paymentReq.payment);
        }

        // Get payment authorization
        const auth = await this.createPaymentHeader(paymentReq.payment);
        
        // Retry with payment
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Content-Type': 'application/json',
            'X-Payment': auth
          }
        });

        if (response.ok && this.options.onPaymentComplete) {
          this.options.onPaymentComplete();
        }
      }

      return response;
    }

    /**
     * Create payment authorization header
     */
    async createPaymentHeader(payment) {
      // In production, sign the payment with wallet
      // This is a simplified version
      return btoa(JSON.stringify({
        recipient: payment.recipient,
        amount: payment.amount,
        currency: payment.currency,
        network: payment.network,
        timestamp: Date.now()
      }));
    }

    /**
     * Get USDC balance
     */
    async getBalance() {
      if (!this.wallet) await this.connect();

      // Simplified - in production use proper contract calls
      return '0.00';
    }
  }

  // Export to global
  if (typeof window !== 'undefined') {
    window.OMA402 = OMA402;
  }

  // CommonJS export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = OMA402;
  }
})();