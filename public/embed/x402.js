/**
 * OMA-AI x402 Paywall Embed Script
 * 
 * Embed on any site to accept x402 crypto payments
 * Supports Base, Ethereum, and Solana networks
 * 
 * Usage:
 * <div id="x402-paywall" data-amount="0.001" data-currency="USDC">
 *   <script src="https://oma-ai.com/embed/x402.js"></script>
 * </div>
 * 
 * @license MIT
 * @author OMA Systems
 */

(function() {
  'use strict';

  // Configuration from data attributes
  const config = {
    amount: 0,
    currency: 'USDC',
    network: 'base',
    description: '',
    redirectUrl: '',
    webhookUrl: '',
    apiKey: '',
    theme: 'dark'
  };

  // --- DOM Helper ---

  function getPaywallElement() {
    const paywall = document.getElementById('x402-paywall');
    if (!paywall) {
      console.error('x402: No element with id="x402-paywall" found');
      return null;
    }
    return paywall;
  }

  // --- Load Config ---

  function loadConfig(element) {
    // Parse data attributes
    config.amount = parseFloat(element.getAttribute('data-amount') || '0');
    config.currency = element.getAttribute('data-currency') || 'USDC';
    config.network = element.getAttribute('data-network') || 'base';
    config.description = element.getAttribute('data-description') || '';
    config.redirectUrl = element.getAttribute('data-redirect') || '';
    config.webhookUrl = element.getAttribute('data-webhook') || '';
    config.apiKey = element.getAttribute('data-api-key') || '';
    config.theme = element.getAttribute('data-theme') || 'dark';
    
    if (!config.amount || config.amount <= 0) {
      console.error('x402: Invalid amount');
      return false;
    }

    if (!config.apiKey) {
      console.error('x402: No API key provided. Get one at https://oma-ai.com');
      return false;
    }

    return true;
  }

  // --- Theme Styles ---

  function injectStyles() {
    const styleId = 'x402-paywall-styles';
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    
    const styles = config.theme === 'dark' ? `
      #x402-paywall {
        position: relative;
        z-index: 9999;
      }
      
      #x402-paywall-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(9, 9, 11, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
      }
      
      #x402-paywall-modal {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border-radius: 16px;
        padding: 32px;
        max-width: 420px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        border: 1px solid rgba(168, 85, 247, 0.2);
      }
      
      #x402-paywall-header {
        text-align: center;
        margin-bottom: 24px;
      }
      
      #x402-paywall-title {
        font-size: 28px;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 8px;
      }
      
      #x402-paywall-description {
        color: #a1a1aa;
        font-size: 14px;
      }
      
      #x402-paywall-amount {
        font-size: 48px;
        font-weight: bold;
        color: #10b981;
        text-align: center;
        margin: 24px 0;
      }
      
      #x402-paywall-amount span {
        font-size: 24px;
        color: #6b7280;
      }
      
      #x402-paywall-network {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 24px;
        color: #6b7280;
        font-size: 14px;
      }
      
      #x402-paywall-network-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      
      #x402-paywall-network.base {
        background: #0052ff;
      }
      
      #x402-paywall-network.ethereum {
        background: #627eea;
      }
      
      #x402-paywall-network.solana {
        background: #14f195;
      }
      
      #x402-paywall-actions {
        display: flex;
        gap: 12px;
      }
      
      #x402-paywall-btn {
        flex: 1;
        padding: 16px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: all 0.2s;
      }
      
      #x402-paywall-btn-primary {
        background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
        color: white;
      }
      
      #x402-paywall-btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(139, 92, 246, 0.3);
      }
      
      #x402-paywall-btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      #x402-paywall-btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      #x402-paywall-qr {
        margin: 20px auto;
        padding: 16px;
        background: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      #x402-paywall-qr img {
        width: 200px;
        height: 200px;
      }
      
      #x402-paywall-status {
        text-align: center;
        padding: 12px;
        border-radius: 8px;
        margin-top: 16px;
        font-size: 14px;
      }
      
      #x402-paywall-status.pending {
        background: rgba(59, 130, 246, 0.1);
        color: #60a5fa;
      }
      
      #x402-paywall-status.confirmed {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
      }
      
      #x402-paywall-status.failed {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
      }
      
      @media (max-width: 640px) {
        #x402-paywall-modal {
          padding: 24px;
          max-width: 95%;
        }
        
        #x402-paywall-amount {
          font-size: 36px;
        }
      }
    ` : `
      /* Light theme styles */
      #x402-paywall-overlay {
        background: rgba(255, 255, 255, 0.95);
      }
      
      #x402-paywall-modal {
        background: white;
      }
      
      #x402-paywall-title {
        color: #1f2937;
      }
      
      #x402-paywall-description {
        color: #6b7280;
      }
      
      #x402-paywall-status.pending {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
      }
      
      #x402-paywall-status.confirmed {
        background: rgba(16, 185, 129, 0.1);
        color: #059669;
      }
      
      #x402-paywall-status.failed {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
      }
    `;

    style.textContent = styles;
    document.head.appendChild(style);
  }

  // --- Create Modal ---

  function createModal() {
    const overlay = document.createElement('div');
    overlay.id = 'x402-paywall-overlay';
    
    const modal = document.createElement('div');
    modal.id = 'x402-paywall-modal';
    
    // Network label
    const networkColors = {
      base: '#0052ff',
      ethereum: '#627eea',
      solana: '#14f195'
    };

    const networkLabel = document.createElement('div');
    networkLabel.id = 'x402-paywall-network';
    networkLabel.innerHTML = `
      <span id="x402-paywall-network-icon" class="${config.network}" 
            style="background: ${networkColors[config.network]}"></span>
      <span>Paying on ${config.network.toUpperCase()}</span>
    `;

    modal.appendChild(networkLabel);

    return { overlay, modal };
  }

  // --- Payment Flow ---

  async function initiatePayment() {
    try {
      // Show loading state
      showStatus('pending', 'Processing payment...');

      // Create payment via OMA-AI API
      const response = await fetch('https://oma-ai.com/api/x402/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          amount: config.amount,
          currency: config.currency,
          network: config.network,
          description: config.description,
          redirectUrl: config.redirectUrl,
          webhookUrl: config.webhookUrl
        })
      });

      if (!response.ok) {
        throw new Error('Payment creation failed');
      }

      const data = await response.json();

      // Show QR code for scanning
      if (data.qrCode) {
        showQRCode(data.qrCode, data.paymentUrl);
      }

      // Poll for payment confirmation
      pollPaymentStatus(data.paymentId);

    } catch (error) {
      console.error('x402 Payment error:', error);
      showStatus('failed', `Payment failed: ${error.message}`);
    }
  }

  function showQRCode(qrData, paymentUrl) {
    const paywall = getPaywallElement();
    
    // Add QR code container
    const qrContainer = document.createElement('div');
    qrContainer.id = 'x402-paywall-qr';
    qrContainer.innerHTML = `
      <img id="x402-paywall-qr-img" 
           src="${qrData}" 
           alt="Scan to pay with ${config.currency}"
           style="width: 200px; height: 200px;">
    `;
    
    paywall.appendChild(qrContainer);
  }

  function showStatus(status, message) {
    const paywall = getPaywallElement();
    
    // Remove existing status
    const existingStatus = document.getElementById('x402-paywall-status');
    if (existingStatus) {
      existingStatus.remove();
    }

    // Add new status
    const statusEl = document.createElement('div');
    statusEl.id = 'x402-paywall-status';
    statusEl.className = status;
    statusEl.textContent = message;
    
    paywall.appendChild(statusEl);
  }

  async function pollPaymentStatus(paymentId) {
    const maxAttempts = 30; // 5 minutes max
    let attempts = 0;

    const pollInterval = setInterval(async () => {
      attempts++;

      if (attempts > maxAttempts) {
        clearInterval(pollInterval);
        showStatus('failed', 'Payment timed out');
        return;
      }

      try {
        const response = await fetch(`https://oma-ai.com/api/x402/payments/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${config.apiKey}`
          }
        });

        const data = await response.json();

        if (data.status === 'confirmed') {
          clearInterval(pollInterval);
          showStatus('confirmed', 'Payment successful!');

          // Redirect if configured
          if (config.redirectUrl) {
            setTimeout(() => {
              window.location.href = config.redirectUrl;
            }, 2000);
          }

          // Trigger webhook if configured
          if (config.webhookUrl) {
            fetch(config.webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                paymentId,
                status: 'confirmed',
                amount: config.amount,
                currency: config.currency,
                network: config.network
              })
            });
          }

          // Dispatch custom event for listeners
          const event = new CustomEvent('x402PaymentConfirmed', {
            detail: { paymentId, amount: config.amount }
          });
          window.dispatchEvent(event);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 10000); // Check every 10 seconds
  }

  // --- Initialization ---

  function init() {
    const paywall = getPaywallElement();
    if (!paywall || !loadConfig(paywall)) {
      return;
    }

    injectStyles();
    paywall.innerHTML = '';

    // Create modal
    const { overlay, modal } = createModal();
    
    // Header
    const header = document.createElement('div');
    header.id = 'x402-paywall-header';
    header.innerHTML = `
      <div id="x402-paywall-title">x402 Payment Required</div>
      ${config.description ? `<div id="x402-paywall-description">${config.description}</div>` : ''}
    `;
    modal.appendChild(header);

    // Amount display
    const amountEl = document.createElement('div');
    amountEl.id = 'x402-paywall-amount';
    amountEl.innerHTML = `
      ${config.amount} <span>${config.currency}</span>
    `;
    modal.appendChild(amountEl);

    // Action buttons
    const actions = document.createElement('div');
    actions.id = 'x402-paywall-actions';
    
    const primaryBtn = document.createElement('button');
    primaryBtn.id = 'x402-paywall-btn-primary';
    primaryBtn.className = 'x402-paywall-btn';
    primaryBtn.textContent = `Pay ${config.amount} ${config.currency}`;
    primaryBtn.onclick = initiatePayment;
    
    const secondaryBtn = document.createElement('button');
    secondaryBtn.id = 'x402-paywall-btn-secondary';
    secondaryBtn.className = 'x402-paywall-btn';
    secondaryBtn.textContent = 'Cancel';
    secondaryBtn.onclick = () => {
      document.body.removeChild(overlay);
    };
    
    actions.appendChild(primaryBtn);
    actions.appendChild(secondaryBtn);
    modal.appendChild(actions);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  // --- Auto-init on load ---

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // --- Expose API for manual control ---

  window.x402Paywall = {
    show: init,
    hide: () => {
      const overlay = document.getElementById('x402-paywall-overlay');
      if (overlay) {
        document.body.removeChild(overlay);
      }
    },
    pay: initiatePayment,
    on: (event, callback) => {
      window.addEventListener(`x402${event}`, callback);
    }
  };

})();
