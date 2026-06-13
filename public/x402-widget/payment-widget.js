/**
 * OMA-AI x402 Payment Widget
 * Standalone script for embedding payment functionality on ANY website
 * 
 * USAGE:
 * <script src="https://oma-ai.com/x402-widget/payment-widget.js"></script>
 * <script>
 *   OMA402.init({
 *     recipient: '0xYOUR_WALLET',
 *     price: '$0.01',
 *     network: 'base',
 *     title: 'Premium Content',
 *     onSuccess: (txHash) => console.log('Paid!', txHash)
 *   });
 * </script>
 */

(function() {
  'use strict';

  // Network configurations
  const NETWORKS = {
    base: {
      id: 'eip155:8453',
      name: 'Base',
      usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      rpc: 'https://mainnet.base.org'
    },
    solana: {
      id: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
      name: 'Solana',
      usdc: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      rpc: 'https://api.mainnet-beta.solana.com'
    }
  };

  // State
  let config = {};
  let widgetId = null;

  // Generate unique ID for this widget instance
  function generateId() {
    return 'oma402-' + Math.random().toString(36).substr(2, 9);
  }

  // Create widget UI
  function createWidget() {
    widgetId = generateId();
    
    const container = document.createElement('div');
    container.id = widgetId;
    container.innerHTML = `
      <style>
        #${widgetId} {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999999;
        }
        #${widgetId} .oma402-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        #${widgetId} .oma402-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
        }
        #${widgetId} .oma402-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          z-index: 10000000;
          justify-content: center;
          align-items: center;
        }
        #${widgetId} .oma402-modal.active {
          display: flex;
        }
        #${widgetId} .oma402-content {
          background: linear-gradient(145deg, #1e1e2e, #2d2d3d);
          padding: 32px;
          border-radius: 20px;
          max-width: 450px;
          width: 90%;
          color: white;
          position: relative;
        }
        #${widgetId} .oma402-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: #888;
          font-size: 24px;
          cursor: pointer;
        }
        #${widgetId} .oma402-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        #${widgetId} .oma402-price {
          font-size: 36px;
          font-weight: bold;
          color: #10b981;
          margin: 16px 0;
        }
        #${widgetId} .oma402-network {
          display: inline-block;
          padding: 6px 14px;
          background: rgba(102, 126, 234, 0.2);
          border-radius: 20px;
          font-size: 13px;
          color: #a5b4fc;
          margin-bottom: 20px;
        }
        #${widgetId} .oma402-address {
          background: #161620;
          padding: 14px;
          border-radius: 10px;
          font-family: 'Monaco', 'Menlo', monospace;
          word-break: break-all;
          font-size: 12px;
          color: #10b981;
          margin: 12px 0;
        }
        #${widgetId} .oma402-btn-pay {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 16px;
        }
        #${widgetId} .oma402-btn-pay:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }
        #${widgetId} .oma402-steps {
          background: rgba(0,0,0,0.3);
          padding: 16px;
          border-radius: 12px;
          margin-top: 16px;
        }
        #${widgetId} .oma402-steps h4 {
          margin: 0 0 12px 0;
          font-size: 14px;
          color: #aaa;
        }
        #${widgetId} .oma402-step {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 8px 0;
          font-size: 13px;
          color: #ccc;
        }
        #${widgetId} .oma402-step-num {
          width: 22px;
          height: 22px;
          background: #667eea;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          flex-shrink: 0;
        }
        #${widgetId} .oma402-qr {
          background: white;
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          margin: 16px 0;
        }
        #${widgetId} .oma402-status {
          padding: 12px;
          border-radius: 8px;
          margin-top: 16px;
          text-align: center;
          font-size: 14px;
        }
        #${widgetId} .oma402-status.pending {
          background: rgba(245, 158, 11, 0.2);
          color: #fbbf24;
        }
        #${widgetId} .oma402-status.success {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        #${widgetId} .oma402-status.error {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
      </style>
      
      <button class="oma402-btn" id="oma402-paybtn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.41c.1 1.02 1.36 1.89 2.69 1.89 1.49 0 2.32-.86 2.32-1.98 0-1.07-.84-1.56-2.24-2.03l-1.72-.36c-2.18-.46-3.45-1.54-3.45-3.54 0-1.95 1.67-3.26 3.83-3.57v-1.89h2.67v1.89c1.76.34 3 .98 3.34 2.41h-1.41c-.2-1.13-1.19-1.95-2.62-1.95-1.27 0-2.2.63-2.2 1.67 0 .93.84 1.47 2.28 1.98l1.72.37c2.24.47 3.45 1.55 3.45 3.55 0 2.04-1.71 3.32-3.84 3.62v1.89z"/>
        </svg>
        <span id="oma402-btntext">${config.price} - Pay with USDC</span>
      </button>
      
      <div class="oma402-modal" id="oma402-modal">
        <div class="oma402-content">
          <button class="oma402-close" id="oma402-close">&times;</button>
          
          <div class="oma402-title">${config.title || 'Premium Content'}</div>
          <div class="oma402-price">${config.price}</div>
          
          <div class="oma402-network">
            ${NETWORKS[config.network]?.name || 'Base'} (USDC)
          </div>
          
          <p style="color:#aaa;font-size:14px;margin: 8px 0;">
            Send exactly <strong style="color:#10b981">${config.price}</strong> USDC to:
          </p>
          <div class="oma402-address" id="oma402-address">
            ${config.recipient}
          </div>
          
          <div style="margin-top:12px;font-size:13px;color:#888;">
            Or connect wallet for automatic payment:
          </div>
          
          <button class="oma402-btn-pay" id="oma402-connect">
            Connect Wallet & Pay
          </button>
          
          <div class="oma402-status" id="oma402-status" style="display:none;">
            Waiting for payment...
          </div>
          
          <div class="oma402-steps">
            <h4>How it works:</h4>
            <div class="oma402-step">
              <span class="oma402-step-num">1</span>
              <span>Copy the address above</span>
            </div>
            <div class="oma402-step">
              <span class="oma402-step-num">2</span>
              <span>Send ${config.price} USDC</span>
            </div>
            <div class="oma402-step">
              <span class="oma402-step-num">3</span>
              <span>Access unlocks automatically</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Append to page
    (config.container || document.body).appendChild(container);
    
    // Add event listeners
    document.getElementById('oma402-paybtn').addEventListener('click', () => {
      document.getElementById('oma402-modal').classList.add('active');
    });
    
    document.getElementById('oma402-close').addEventListener('click', () => {
      document.getElementById('oma402-modal').classList.remove('active');
    });
    
    document.getElementById('oma402-connect').addEventListener('click', handleWalletConnect);
  }

  // Handle wallet connection
  async function handleWalletConnect() {
    const statusEl = document.getElementById('oma402-status');
    const btn = document.getElementById('oma402-connect');
    
    if (typeof window.ethereum === 'undefined') {
      statusEl.textContent = 'No wallet found. Please install MetaMask.';
      statusEl.className = 'oma402-status error';
      statusEl.style.display = 'block';
      return;
    }
    
    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      statusEl.textContent = 'Connected! Initiating payment...';
      statusEl.className = 'oma402-status pending';
      statusEl.style.display = 'block';
      btn.disabled = true;
      
      // Get USDC contract
      const provider = new window.ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const usdcAbi = [
        'function transfer(address to, uint256 amount) public returns (bool)'
      ];
      
      const network = NETWORKS[config.network] || NETWORKS.base;
      const usdcContract = new window.ethers.Contract(
        network.usdc,
        usdcAbi,
        signer
      );
      
      // Parse amount (USDC has 6 decimals)
      const amount = window.ethers.utils.parseUnits(
        config.price.replace('$', ''),
        6
      );
      
      // Send USDC transfer
      const tx = await usdcContract.transfer(config.recipient, amount);
      
      statusEl.textContent = 'Payment submitted! Waiting for confirmation...';
      
      // Wait for transaction
      await tx.wait();
      
      statusEl.textContent = 'Payment confirmed! Access granted.';
      statusEl.className = 'oma402-status success';
      
      // Call success callback
      if (config.onSuccess) {
        config.onSuccess(tx.hash);
      }
      
      // Close modal after success
      setTimeout(() => {
        document.getElementById('oma402-modal').classList.remove('active');
      }, 3000);
      
    } catch (error) {
      console.error('Payment error:', error);
      statusEl.textContent = 'Error: ' + (error.message || 'Payment failed');
      statusEl.className = 'oma402-status error';
      btn.disabled = false;
    }
  }

  // Initialize widget
  window.OMA402 = {
    init: function(options) {
      config = {
        recipient: options.recipient,
        price: options.price || '$0.01',
        network: options.network || 'base',
        title: options.title || 'Premium Content',
        container: options.container ? document.querySelector(options.container) : null,
        onSuccess: options.onSuccess || function() {},
        onError: options.onError || function() {}
      };
      
      createWidget();
      return this;
    },
    
    // Update price dynamically
    setPrice: function(price) {
      config.price = price;
      document.getElementById('oma402-btntext').textContent = price + ' - Pay with USDC';
      document.querySelector('.oma402-price').textContent = price;
    },
    
    // Show the payment modal
    show: function() {
      document.getElementById('oma402-modal').classList.add('active');
    },
    
    // Hide the payment modal
    hide: function() {
      document.getElementById('oma402-modal').classList.remove('active');
    },
    
    // Destroy widget
    destroy: function() {
      if (widgetId) {
        const el = document.getElementById(widgetId);
        if (el) el.remove();
        widgetId = null;
      }
    }
  };

})();
