/**
 * x402 Protocol - Gasless Payment Handler
 * OMA-AI - MCP Marketplace with x402 Payments
 * 
 * This script handles HTTP 402 Payment Required responses
 * and enables gasless payments on Base network.
 */

(function() {
  'use strict';

  // x402 Configuration
  const X402_CONFIG = {
    treasuryAddress: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
    network: 'base',
    chainId: 8453,
    rpcUrl: 'https://mainnet.base.org',
    minAmount: 0.001,
    maxAmount: 100
  };

  // Check if wallet is available
  function isWalletAvailable() {
    return typeof window !== 'undefined' && 
           (window.ethereum || window.phantom || window.backpack);
  }

  // Get connected wallet
  async function getWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts[0] || null;
    }
    if (window.phantom?.solana) {
      const resp = await window.phantom.solana.connect();
      return resp.publicKey.toString();
    }
    if (window.backpack) {
      const resp = await window.backpack.connect();
      return resp.publicKey.toString();
    }
    return null;
  }

  // Handle 402 response
  async function handle402(response, request) {
    const paymentHeader = response.headers.get('X-402-Payment');
    if (!paymentHeader) return response;

    try {
      const payment = JSON.parse(atob(paymentHeader));
      console.log('[x402] Payment required:', payment);

      // Validate payment amount
      if (payment.amount < X402_CONFIG.minAmount || payment.amount > X402_CONFIG.maxAmount) {
        throw new Error('Invalid payment amount');
      }

      // Request wallet signature for gasless payment
      const wallet = await getWallet();
      if (!wallet) {
        throw new Error('No wallet connected');
      }

      // Sign payment authorization
      const message = `x402 Payment Authorization\nAmount: ${payment.amount} USDC\nTo: ${payment.recipient}\nNonce: ${payment.nonce}`;
      
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, wallet]
      });

      // Retry request with payment proof
      const retryResponse = await fetch(request.url, {
        method: request.method,
        headers: {
          ...request.headers,
          'X-402-Signature': signature,
          'X-402-Address': wallet
        }
      });

      return retryResponse;
    } catch (error) {
      console.error('[x402] Payment failed:', error);
      throw error;
    }
  }

  // Intercept fetch for 402 responses
  const originalFetch = window.fetch;
  window.fetch = async function(url, options = {}) {
    const response = await originalFetch(url, options);
    
    if (response.status === 402) {
      return handle402(response, new Request(url, options));
    }
    
    return response;
  };

  // Expose x402 API
  window.x402 = {
    config: X402_CONFIG,
    isWalletAvailable,
    getWallet,
    handle402
  };

  console.log('[x402] Protocol initialized - Gasless payments enabled');
})();
