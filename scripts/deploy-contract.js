/**
 * Deploy OMAEscrow Contract to Base Mainnet
 * 
 * Prerequisites:
 * 1. Set PRIVATE_KEY in .env.local (NEW wallet with ETH for gas)
 * 2. Set TREASURY_WALLET_BASE (your platform wallet)
 * 3. Have ETH on Base for gas (~$10-20 worth)
 * 
 * Usage: node scripts/deploy-contract.js
 */

const { ethers } = require('ethers');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

// Contract bytecode and ABI (from compilation)
const CONTRACT_SOURCE = fs.readFileSync('./contracts/OMAEscrow.sol', 'utf8');

// Minimal ABI for deployment
const OMA_ESCROW_ABI = [
  "constructor(address _platformWallet, address _usdcToken)",
  "function deposit(uint256 amount) external",
  "function processPayment(address user, string calldata apiId) external returns (uint256)",
  "function balances(address) view returns (uint256)",
  "function platformWallet() view returns (address)",
  "event Deposit(address indexed user, uint256 amount)",
  "event Payment(address indexed from, address indexed to, uint256 amount, string apiId)"
];

// Base Mainnet Config
const BASE_CONFIG = {
  rpcUrl: 'https://mainnet.base.org',
  chainId: 8453,
  usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  explorer: 'https://basescan.org'
};

async function deploy() {
  console.log('🔐 Deploying OMAEscrow to Base Mainnet...\n');
  
  // Check prerequisites
  const privateKey = process.env.PRIVATE_KEY;
  const treasuryWallet = process.env.TREASURY_WALLET_BASE;
  
  if (!privateKey || privateKey === '0xYOUR_NEW_WALLET_PRIVATE_KEY') {
    console.error('❌ Error: Set PRIVATE_KEY in .env.local');
    console.error('Generate a NEW wallet with: npx ethers@5 wallet.createRandom()');
    console.error('Fund it with ETH on Base for gas (~$10-20)');
    process.exit(1);
  }
  
  if (!treasuryWallet || treasuryWallet === '0xYOUR_NEW_WALLET_ADDRESS') {
    console.error('❌ Error: Set TREASURY_WALLET_BASE in .env.local');
    console.error('This is the wallet that receives the 10% platform fee');
    process.exit(1);
  }
  
  console.log('📋 Deployment Config:');
  console.log(`  Platform Wallet: ${treasuryWallet}`);
  console.log(`  USDC Token: ${BASE_CONFIG.usdcAddress}`);
  console.log(`  Chain: Base Mainnet (${BASE_CONFIG.chainId})`);
  console.log('');
  
  // Connect to Base
  const provider = new ethers.providers.JsonRpcProvider(BASE_CONFIG.rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  
  console.log(`🔑 Deployer: ${wallet.address}`);
  
  // Check balance
  const balance = await wallet.getBalance();
  console.log(`💰 Balance: ${ethers.utils.formatEther(balance)} ETH`);
  
  if (balance.lt(ethers.utils.parseEther('0.01'))) {
    console.error('❌ Error: Insufficient ETH for gas');
    console.error(`Need at least 0.01 ETH, have ${ethers.utils.formatEther(balance)} ETH`);
    process.exit(1);
  }
  
  // Note: In real deployment, you'd compile the contract with Hardhat/Foundry
  // and get the bytecode. This is a placeholder showing the structure.
  console.log('\n⚠️ IMPORTANT: Contract bytecode needed!');
  console.log('Compile contracts/OMAEscrow.sol with Hardhat:');
  console.log('  npx hardhat compile');
  console.log('Then update this script with the actual bytecode from artifacts/');
  
  // Deployment logic would go here after compilation
  console.log('\n📄 Next Steps:');
  console.log('1. Compile contract: npx hardhat compile');
  console.log('2. Update this script with bytecode from artifacts/');
  console.log('3. Run: node scripts/deploy-contract.js');
  console.log('4. Save deployed address to .env.local: CONTRACT_ADDRESS=0x...');
}

deploy().catch(console.error);