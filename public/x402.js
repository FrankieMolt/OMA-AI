/**
 * OMA-AI x402 Protocol Implementation
 * Standard machine-to-machine payment handler
 */

(function() {
  const X402 = {
    version: '1.0.0',
    network: 'base',
    currency: 'USDC',
    
    /**
     * Trigger x402 payment flow
     */
    async pay(options) {
      const { amount, recipient, reason, onSuccess, onError } = options;
      
      console.log(`[x402] Initializing payment: ${amount} USDC to ${recipient}`);
      
      try {
        // 1. Check for autonomous wallet (EIP-3009)
        if (window.ethereum && window.ethereum.isAgent) {
          return await this.handleAgentPayment(options);
        }
        
        // 2. Fallback to human wallet (MetaMask/Rainbow)
        return await this.handleHumanPayment(options);
      } catch (err) {
        console.error('[x402] Payment failed:', err);
        if (onError) onError(err);
      }
    },

    async handleAgentPayment(options) {
      console.log('[x402] Processing autonomous gasless transfer...');
      // Logic for EIP-3009 gasless signature
      const result = await window.ethereum.request({
        method: 'x402_signTransfer',
        params: [{
          to: options.recipient,
          value: options.amount,
          reason: options.reason
        }]
      });
      
      if (options.onSuccess) options.onSuccess(result);
      return result;
    },

    async handleHumanPayment(options) {
      // Standard ethers/viem flow for manual payment
      alert(`x402 Payment Required: ${options.amount} USDC\nRecipient: ${options.recipient}\n\nPlease sign the transaction in your wallet.`);
      // Mocking success for demo
      if (options.onSuccess) options.onSuccess({ hash: '0x' + '0'.repeat(64) });
    }
  };

  window.x402 = X402;
  console.log('🚀 x402 Protocol Handler Loaded');
})();
