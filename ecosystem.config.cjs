module.exports = {
  apps: [{
    name: 'oma-ai-web',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/home/oldpc/projects/oma-ai',
    exec_mode: 'fork',
    instances: 1,
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      OMA_AI_PAYMENT_WALLET: '0x1D74Eb7BeC21aa9bC6D23D664E40b97E74472D21',
      OWS_WALLET_NAME: 'oma-treasury',
      OWS_WALLET_PASSPHRASE: '',
      // BYOK credential encryption key (AES-256-GCM, 32 bytes hex)
      CREDENTIAL_ENCRYPTION_KEY: 'df01376ca58239a1669150d39bff7adeed339a666b6634d6ed6260f2a3463cbe',
    }
  }]
};
