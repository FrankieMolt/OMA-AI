/**
 * OMA-AI x402 Payment Widget
 * Add to any website to accept USDC payments via x402 protocol
 * 
 * Usage:
 * <script type="module">
 *   import { initPaymentWidget } from 'https://oma-ai.com/x402-widget/widget.js';
 *   
 *   const widget = initPaymentWidget({
 *     recipient: '0xYOUR_WALLET_ADDRESS',
 *     network: 'base',
 *     price: '$0.01',
 *     title: 'Premium Access',
 *     description: 'Access to xyz feature'
 *   });
 * </script>
 */

const DEFAULT_NETWORKS = {
  base: {
    name: 'Base',
    chainId: 8453,
    usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
  },
  solana: {
    name: 'Solana', 
    chainId: 'solana',
    usdc: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
  }
};

class PaymentWidget {
  constructor(config) {
    this.config = {
      recipient: config.recipient,
      network: config.network || 'base',
      price: config.price || '$0.01',
      title: config.title || 'Premium Content',
      description: config.description || 'Access to premium features',
      successUrl: config.successUrl || window.location.href,
      facilitatorUrl: config.facilitatorUrl || 'https://x402.org/facilitator',
      onSuccess: config.onSuccess || (() => {}),
      onError: config.onError || (() => {}),
      onReady: config.onReady || (() => {})
    };
    
    this.element = null;
    this.walletAddress = null;
    this.init();
  }
  
  async init() {
    this.createUI();
    await this.detectWallet();
    this.config.onReady(this);
  }
  
  createUI() {
    const container = document.createElement('div');
    container.id = 'oma-x402-widget';
    container.innerHTML = `
      <style>
        #oma-x402-widget {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 999999;
        }
        .oma-x402-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .oma-x402-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }
        .oma-x402-button:disabled {
          background: #6b7280;
          cursor: not-allowed;
        }
        .oma-x402-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1000000;
          justify-content: center;
          align-items: center;
        }
        .oma-x402-modal.active {
          display: flex;
        }
        .oma-x402-modal-content {
          background: #1a1a2e;
          padding: 32px;
          border-radius: 16px;
          max-width: 420px;
          width: 90%;
          color: white;
        }
        .oma-x402-price {
          font-size: 32px;
          font-weight: bold;
          color: #10b981;
          margin: 16px 0;
        }
        .oma-x402-network {
          padding: 8px 16px;
          background: #374151;
          border-radius: 8px;
          display: inline-block;
          margin-bottom: 16px;
        }
        .oma-x402-address {
          background: #111827;
          padding: 12px;
          border-radius: 8px;
          font-family: monospace;
          word-break: break-all;
          font-size: 12px;
          margin: 8px 0;
        }
        .oma-x402-qr {
          background: white;
          padding: 16px;
          border-radius: 8px;
          text-align: center;
          margin: 16px 0;
        }
        .oma-x402-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }
        .oma-x402-steps {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }
        .oma-x402-steps li {
          padding: 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .oma-x402-step-num {
          background: #667eea;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }
      </style>
      
      <button class="oma-x402-button" id="payButton">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
        </svg>
        <span>${this.config.price} - Pay with USDC</span>
      </button>
      
      <div class="oma-x402-modal" id="paymentModal">
        <div class="oma-x402-modal-content">
          <button class="oma-x402-close" id="closeModal">&times;</button>
          
          <h2>${this.config.title}</h2>
          <p>${this.config.description}</p>
          
          <div class="oma-x402-price">${this.config.price}</div>
          
          <div class="oma-x402-network">
            Network: ${DEFAULT_NETWORKS[this.config.network]?.name || this.config.network} (USDC)
          </div>
          
          <p><strong>Send USDC to this address:</strong></p>
          <div class="oma-x402-address">${this.config.recipient}</div>
          
          <p><strong>Or use wallet:</strong></p>
          <button class="oma-x402-button" id="connectWalletBtn" style="width: 100%; justify-content: center;">
            Connect Wallet & Pay
          </button>
          
          <div style="margin-top: 16px; opacity: 0.7; font-size: 12px;">
            <strong>How it works:</strong>
            <ol class="oma-x402-steps">
              <li><span class="oma-x402-step-num">1</span> Connect your wallet</li>
              <li><span class="oma-x402-step-num">2</span> Send ${this.config.price} USDC</li>
              <li><span class="oma-x402-step-num">3</span> Access unlocks automatically</li>
            </ol>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(container);
    this.element = container;
    
    // Event listeners
    document.getElementById('payButton').addEventListener('click', () => {
      document.getElementById('paymentModal').classList.add('active');
    });
    
    document.getElementById('closeModal').addEventListener('click', () => {
      document.getElementById('paymentModal').classList.remove('active');
    });
    
    document.getElementById('connectWalletBtn').addEventListener('click', () => {
      this.connectWalletAndPay();
    });
  }
  
  async detectWallet() {
    this.hasWallet = typeof window.ethereum !== 'undefined' || 
                     typeof window.solana !== 'undefined';
    return this.hasWallet;
  }
  
  async connectWalletAndPay() {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        // For now, show address - in production, implement actual payment flow
        alert(`Wallet connected! Please send ${this.config.price} USDC to:\n${this.config.recipient}`);
      } else if (window.solana) {
        const response = await window.solana.connect();
        this.walletAddress = response.publicKey.toString();
        alert(`Solana wallet connected! Please send ${this.config.price} USDC to:\n${this.config.recipient}`);
      } else {
        alert('No wallet detected. Please install MetaMask or Phantom wallet.');
      }
    } catch (error) {
      this.config.onError(error);
      console.error('Payment error:', error);
    }
  }
  
  render(selector) {
    const target = document.querySelector(selector);
    if (target && this.element) {
      target.appendChild(this.element);
    }
    return this;
  }
  
  destroy() {
    if (this.element) {
      this.element.remove();
    }
  }
}

function initPaymentWidget(config) {
  return new PaymentWidget(config);
}

// Export for module usage
if (typeof window !== 'undefined') {
  window.initPaymentWidget = initPaymentWidget;
}

export { initPaymentWidget, PaymentWidget };
