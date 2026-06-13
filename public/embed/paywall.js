/**
 * OMA-AI x402 Paywall Embed Script
 * Version: 1.0.0
 * 
 * Embed this script on your website to create a paywall for your APIs or MCPs
 * 
 * Usage:
 * <script src="https://oma-ai.com/embed/paywall.js" data-api-key="your-api-key" data-price="0.01"></script>
 * 
 * Options:
 * - data-api-key: Your OMA-AI API key (required)
 * - data-price: Price per call in USDC (required)
 * - data-currency: Currency symbol (default: "USDC")
 * - data-title: Custom title (default: "Unlock with x402 Payment")
 * - data-button-text: Custom button text (default: "Unlock Now")
 */

(function() {
  'use strict';

  // Configuration
  const script = document.currentScript || document.querySelector('script[src*="paywall.js"]');
  const config = {
    apiKey: script.getAttribute('data-api-key'),
    price: script.getAttribute('data-price'),
    currency: script.getAttribute('data-currency') || 'USDC',
    title: script.getAttribute('data-title') || 'Unlock with x402 Payment',
    buttonText: script.getAttribute('data-button-text') || 'Unlock Now',
    position: script.getAttribute('data-position') || 'top',
    backgroundColor: script.getAttribute('data-background') || '#000000',
    textColor: script.getAttribute('data-text') || '#ffffff',
    accentColor: script.getAttribute('data-accent') || '#8b5cf6',
  };

  // Validation
  if (!config.apiKey) {
    console.error('[OMA-AI Paywall] Error: data-api-key is required');
    return;
  }
  if (!config.price) {
    console.error('[OMA-AI Paywall] Error: data-price is required');
    return;
  }

  // x402 Payment Protocol
  class x402Payment {
    constructor(config) {
      this.config = config;
      this.paymentId = this.generatePaymentId();
    }

    generatePaymentId() {
      return 'oma_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    async initiatePayment() {
      try {
        // Create payment request
        const paymentRequest = {
          id: this.paymentId,
          apiKey: this.config.apiKey,
          amount: parseFloat(this.config.price),
          currency: this.config.currency,
          timestamp: Date.now(),
        };

        // Call OMA-AI payment endpoint
        const response = await fetch('https://oma-ai.com/api/payments/init', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentRequest),
        });

        if (!response.ok) {
          throw new Error('Payment initialization failed');
        }

        const data = await response.json();
        
        if (data.paymentUrl) {
          // Redirect to payment page
          window.location.href = data.paymentUrl;
        } else if (data.walletAddress) {
          // For advanced users: direct wallet connection
          this.connectWallet(data.walletAddress, data.amount);
        } else {
          throw new Error('Invalid payment response');
        }
      } catch (error) {
        console.error('[OMA-AI Paywall] Payment error:', error);
        this.showError(error.message);
      }
    }

    connectWallet(walletAddress, amount) {
      // Wallet connection logic for direct payments
      console.log('[OMA-AI Paywall] Connecting to wallet:', walletAddress);
      // This would integrate with your preferred wallet provider
      // (WalletConnect, MetaMask, Phantom, etc.)
    }

    showError(message) {
      const errorEl = document.getElementById('oma-paywall-error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        setTimeout(() => {
          errorEl.style.display = 'none';
        }, 5000);
      }
    }

    verifyPayment() {
      // Poll for payment confirmation
      const checkInterval = setInterval(async () => {
        try {
          const response = await fetch(`https://oma-ai.com/api/payments/status/${this.paymentId}`);
          const data = await response.json();
          
          if (data.status === 'confirmed') {
            clearInterval(checkInterval);
            this.onPaymentSuccess();
          } else if (data.status === 'failed') {
            clearInterval(checkInterval);
            this.showError('Payment failed. Please try again.');
          }
        } catch (error) {
          console.error('[OMA-AI Paywall] Status check error:', error);
        }
      }, 2000);
    }

    onPaymentSuccess() {
      // Hide paywall
      const paywall = document.getElementById('oma-paywall');
      if (paywall) {
        paywall.style.opacity = '0';
        setTimeout(() => {
          paywall.remove();
        }, 500);
      }

      // Trigger callback if provided
      if (window.OMAPaywallSuccess) {
        window.OMAPaywallSuccess(this.paymentId);
      }

      // Dispatch event
      const event = new CustomEvent('oma-paywall-success', {
        detail: { paymentId: this.paymentId }
      });
      document.dispatchEvent(event);
    }
  }

  // UI Creation
  function createPaywall() {
    const paywall = document.createElement('div');
    paywall.id = 'oma-paywall';
    paywall.style.cssText = \`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: \${config.backgroundColor};
      background: linear-gradient(135deg, \${config.backgroundColor} 0%, rgba(20, 20, 40, 0.95) 100%);
      color: \${config.textColor};
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      animation: omaFadeIn 0.5s ease-out;
    \`;

    paywall.innerHTML = \`
      <div style="
        max-width: 500px;
        width: 90%;
        padding: 40px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        backdrop-filter: blur(20px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
      ">
        <div style="
          text-align: center;
          margin-bottom: 30px;
        ">
          <div style="
            font-size: 48px;
            margin-bottom: 15px;
          ">🔒</div>
          <h2 style="
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 15px 0;
            background: linear-gradient(135deg, #8b5cf6, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          ">\${config.title}</h2>
          <p style="
            font-size: 16px;
            color: rgba(255, 255, 255, 0.7);
            margin: 0 0 25px 0;
            line-height: 1.6;
          ">
            Unlock full access with a one-time payment of <strong>\${config.price} \${config.currency}</strong>
          </p>
        </div>

        <div style="
          display: flex;
          flex-direction: column;
          gap: 15px;
        ">
          <button
            id="oma-paywall-button"
            style="
              background: linear-gradient(135deg, \${config.accentColor}, #3b82f6);
              color: white;
              border: none;
              padding: 16px 32px;
              font-size: 16px;
              font-weight: 600;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
            "
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'"
          >
            \${config.buttonText}
          </button>

          <div id="oma-paywall-error" style="
            display: none;
            color: #ef4444;
            background: rgba(239, 68, 68, 0.1);
            padding: 12px;
            border-radius: 6px;
            font-size: 14px;
          "></div>

          <p style="
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            text-align: center;
            margin-top: 10px;
          ">
            Powered by <strong style="color: \${config.accentColor}">OMA-AI x402</strong> Protocol
          </p>
        </div>
      </div>

      <style>
        @keyframes omaFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      </style>
    \`;

    return paywall;
  }

  // Initialize
  function init() {
    // Check if already paid
    const paymentStatus = localStorage.getItem('oma_paywall_status_' + config.apiKey);
    
    if (paymentStatus === 'unlocked') {
      console.log('[OMA-AI Paywall] Already unlocked');
      // Trigger success callback
      if (window.OMAPaywallSuccess) {
        window.OMAPaywallSuccess(localStorage.getItem('oma_paywall_id_' + config.apiKey));
      }
      return;
    }

    // Create and inject paywall
    const paywall = createPaywall();
    document.body.appendChild(paywall);

    // Setup payment handler
    const payment = new x402Payment(config);
    const button = document.getElementById('oma-paywall-button');
    
    if (button) {
      button.addEventListener('click', () => {
        payment.initiatePayment();
        payment.verifyPayment();
      });
    }

    // Store config for later use
    window.OMAPaywall = payment;
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
