# Web3 Integrations

Integrate OpenMarketAccess with blockchain and cryptocurrency technologies.

## Overview

OpenMarketAccess supports Web3 integration through:

- Ethereum and EVM-compatible chains
- Non-EVM chains (Solana, Polkadot)
- Wallet connections (MetaMask, WalletConnect)
- NFT payments
- Smart contract interactions

## Supported Networks

### EVM-Compatible Chains

| Network | Chain ID | Currency | Status |
|---------|----------|----------|--------|
| Ethereum | 1 | ETH | Supported |
| Polygon | 137 | MATIC | Supported |
| BSC | 56 | BNB | Supported |
| Avalanche | 43114 | AVAX | Supported |
| Arbitrum | 42161 | ETH | Supported |
| Optimism | 10 | ETH | Supported |

### Non-EVM Chains

| Network | Currency | Status |
|---------|----------|--------|
| Solana | SOL | Beta |
| Polkadot | DOT | Beta |
| Cosmos | ATOM | Coming Soon |

## Configuration

### EVM Network Setup

```typescript
const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY,
  web3: {
    enabled: true,
    networks: {
      ethereum: {
        chainId: 1,
        rpcUrl: process.env.ETHEREUM_RPC_URL,
        currency: 'ETH'
      },
      polygon: {
        chainId: 137,
        rpcUrl: process.env.POLYGON_RPC_URL,
        currency: 'MATIC'
      }
    }
  }
});
```

## Wallet Integration

### MetaMask Connection

```typescript
import { ethers } from 'ethers';

async function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    return {
      address: accounts[0],
      provider,
      signer
    };
  }
  throw new Error('MetaMask not installed');
}
```

### WalletConnect

```typescript
import WalletConnect from '@walletconnect/web3-provider';

async function connectWalletConnect() {
  const provider = new WalletConnect({
    infuraId: process.env.INFURA_ID,
    qrcode: true
  });

  await provider.enable();
  const web3 = new Web3(provider);

  return {
    address: web3.eth.accounts[0],
    provider: web3.currentProvider
  };
}
```

## Cryptocurrency Payments

### Create ETH Payment

```typescript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 0.005,
  currency: 'ETH',
  paymentMethod: {
    provider: 'web3',
    type: 'eth',
    network: 'ethereum',
    fromAddress: '0x123...'
  }
});

// Send transaction
const tx = await signer.sendTransaction({
  to: payment.recipientAddress,
  value: ethers.utils.parseEther(payment.amount.toString())
});

await tx.wait();

// Execute payment
await oma.payments.execute(payment.id, {
  confirmationCode: tx.hash
});
```

### Create Polygon Payment

```typescript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 10,
  currency: 'MATIC',
  paymentMethod: {
    provider: 'web3',
    type: 'matic',
    network: 'polygon',
    fromAddress: '0x123...'
  }
});
```

## Smart Contract Integration

### Payment Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openmarketaccess/contracts/IPayment.sol";

contract PaymentContract is IPayment {
    mapping(bytes32 => Payment) public payments;

    function createPayment(
        bytes32 paymentId,
        address recipient,
        uint256 amount,
        string memory currency
    ) external {
        payments[paymentId] = Payment({
            id: paymentId,
            sender: msg.sender,
            recipient: recipient,
            amount: amount,
            currency: currency,
            status: PaymentStatus.Created,
            createdAt: block.timestamp
        });

        emit PaymentCreated(paymentId, msg.sender, recipient, amount);
    }

    function executePayment(bytes32 paymentId) external payable {
        Payment storage payment = payments[paymentId];

        require(payment.status == PaymentStatus.Funded, "Payment not funded");
        require(msg.value == payment.amount, "Incorrect amount");

        payment.recipient.transfer(msg.value);
        payment.status = PaymentStatus.Completed;

        emit PaymentExecuted(paymentId, msg.value);
    }
}
```

### Interact with Contract

```typescript
const contract = new ethers.Contract(
  contractAddress,
  abi,
  signer
);

// Create payment
const tx = await contract.createPayment(
  paymentId,
  recipientAddress,
  ethers.utils.parseEther('0.5'),
  'ETH'
);

await tx.wait();
```

## NFT Payments

### Create NFT Payment

```typescript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 1,
  currency: 'NFT',
  paymentMethod: {
    provider: 'web3',
    type: 'nft',
    network: 'ethereum',
    nftContract: '0xabc123...',
    tokenId: '123456',
    fromAddress: '0x123...'
  }
});
```

### Transfer NFT

```typescript
const nftContract = new ethers.Contract(
  nftContractAddress,
  nftAbi,
  signer
);

// Transfer NFT
const tx = await nftContract.transferFrom(
  fromAddress,
  recipientAddress,
  tokenId
);

await tx.wait();
```

## Token Payments

### ERC-20 Token Payment

```typescript
const payment = await oma.payments.create({
  protocol: 'x402',
  amount: 100,
  currency: 'USDC',
  paymentMethod: {
    provider: 'web3',
    type: 'erc20',
    network: 'ethereum',
    tokenContract: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    fromAddress: '0x123...'
  }
});

// Transfer tokens
const tokenContract = new ethers.Contract(
  tokenContractAddress,
  erc20Abi,
  signer
);

const tx = await tokenContract.transfer(
  recipientAddress,
  ethers.utils.parseUnits('100', 6) // USDC uses 6 decimals
);

await tx.wait();
```

## Gas Optimization

### Gas Estimation

```typescript
const gasPrice = await provider.getGasPrice();
const estimatedGas = await contract.estimateGas.createPayment(
  paymentId,
  recipientAddress,
  amount,
  'ETH'
);

console.log('Estimated gas:', estimatedGas.toString());
console.log('Gas price:', ethers.utils.formatUnits(gasPrice, 'gwei'));
```

### Gasless Transactions

```typescript
import { GelatoRelayPack } from '@gelatonetwork/relay-sdk';

const relay = new GelatoRelayPack();

const transaction = {
  to: contractAddress,
  data: contract.interface.encodeFunctionData('createPayment', [
    paymentId,
    recipientAddress,
    amount,
    'ETH'
  ])
};

const response = await relay.relay(transaction);
```

## Transaction Monitoring

### Listen for Transactions

```typescript
provider.on('block', async (blockNumber) => {
  const block = await provider.getBlock(blockNumber);

  for (const txHash of block.transactions) {
    const tx = await provider.getTransaction(txHash);

    if (tx && tx.to === contractAddress) {
      console.log('Transaction detected:', txHash);
      await processTransaction(tx);
    }
  }
});
```

### Transaction Receipt

```typescript
async function waitForTransaction(txHash) {
  const receipt = await provider.waitForTransaction(txHash, 1, 60000); // 60 second timeout

  if (receipt.status === 0) {
    throw new Error('Transaction failed');
  }

  return receipt;
}
```

## Error Handling

### Web3 Error Handling

```typescript
try {
  const tx = await contract.createPayment(...);
  await tx.wait();
} catch (error) {
  if (error.code === ethers.errors.UNPREDICTABLE_GAS_LIMIT) {
    console.error('Gas estimation failed');
  } else if (error.code === ethers.errors.INSUFFICIENT_FUNDS) {
    console.error('Insufficient funds');
  } else if (error.code === ethers.errors.REJECTED) {
    console.error('Transaction rejected by user');
  }
}
```

## Testing

### Local Testing with Hardhat

```typescript
import { ethers } from 'hardhat';

async function testPayment() {
  const [sender, recipient] = await ethers.getSigners();

  const payment = await oma.payments.create({
    protocol: 'x402',
    amount: ethers.utils.parseEther('1'),
    currency: 'ETH',
    paymentMethod: {
      provider: 'web3',
      type: 'eth',
      network: 'localhost',
      fromAddress: sender.address
    }
  });

  const tx = await sender.sendTransaction({
    to: payment.recipientAddress,
    value: ethers.utils.parseEther('1')
  });

  await tx.wait();
}
```

### Testnet Testing

```typescript
const testnetProvider = new ethers.providers.JsonRpcProvider(
  'https://goerli.infura.io/v3/YOUR_INFURA_ID'
);
```

## Security Best Practices

1. **Verify contract addresses** before interaction
2. **Use hardware wallets** for large transactions
3. **Implement multi-sig** for critical operations
4. **Audit smart contracts** before deployment
5. **Use approved token lists** for ERC-20 payments
6. **Verify transaction data** before signing
7. **Keep private keys secure** - never expose them
8. **Use HTTPS** for all API calls

## See Also

- [Payment Providers](payment-providers.md)
- [x402 Protocol](../protocols/x402.md)
- [Custom Integrations](custom.md)
