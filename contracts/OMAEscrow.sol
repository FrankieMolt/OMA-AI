/**
 * OMA-AI x402 Escrow Contract
 * 
 * This contract handles payments for API calls on the Base network.
 * Publishers receive 90%, platform receives 10%.
 * 
 * Deployment:
 * Network: Base Mainnet (chainId: 8453)
 * USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title OMAEscrow
 * @dev x402-compatible escrow contract for API payments
 * 
 * Flow:
 * 1. User sends USDC to contract (deposit)
 * 2. When API is called, contract transfers to publisher
 * 3. Platform takes 10% fee
 */
contract OMAEscrow {
    
    // Events
    event Deposit(address indexed user, uint256 amount);
    event Payment(address indexed from, address indexed to, uint256 amount, string apiId);
    event Withdrawal(address indexed user, uint256 amount);
    
    // Configuration
    address public platformWallet;      // Platform treasury (10%)
    address public usdcToken;            // USDC on Base
    
    // Fee: 10% to platform
    uint256 public constant PLATFORM_FEE_BPS = 1000; // 1000 bps = 10%
    
    // User deposits
    mapping(address => uint256) public balances;
    
    // API pricing (in USDC cents)
    mapping(string => uint256) public apiPrices;
    
    // Authorized publishers
    mapping(address => bool) public publishers;
    
    modifier onlyPublisher() {
        require(publishers[msg.sender], "Not authorized publisher");
        _;
    }
    
    constructor(address _platformWallet, address _usdcToken) {
        platformWallet = _platformWallet;
        usdcToken = _usdcToken;
    }
    
    /**
     * @dev Deposit USDC for future API calls
     */
    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        
        // Transfer USDC from user
        require(
            IERC20(usdcToken).transferFrom(msg.sender, address(this), amount),
            "USDC transfer failed"
        );
        
        balances[msg.sender] += amount;
        emit Deposit(msg.sender, amount);
    }
    
    /**
     * @dev Process payment for API call
     * @param user User making the request
     * @param apiId API identifier
     * @return amountPaid Total amount paid
     */
    function processPayment(address user, string calldata apiId) 
        external 
        onlyPublisher 
        returns (uint256 amountPaid) 
    {
        amountPaid = apiPrices[apiId];
        require(amountPaid > 0, "API not found or price = 0");
        require(balances[user] >= amountPaid, "Insufficient balance");
        
        // Calculate split: 90% publisher, 10% platform
        uint256 platformFee = (amountPaid * PLATFORM_FEE_BPS) / 10000;
        uint256 publisherAmount = amountPaid - platformFee;
        
        // Deduct from user
        balances[user] -= amountPaid;
        
        // Transfer to platform
        balances[platformWallet] += platformFee;
        
        // Transfer to publisher (this contract is the publisher for simplicity)
        // In production, publisher would be a separate address
        balances[msg.sender] += publisherAmount;
        
        emit Payment(user, msg.sender, amountPaid, apiId);
        
        return amountPaid;
    }
    
    /**
     * @dev Set price for an API
     */
    function setApiPrice(string calldata apiId, uint256 priceCents) external onlyPublisher {
        apiPrices[apiId] = priceCents;
    }
    
    /**
     * @dev Add authorized publisher
     */
    function addPublisher(address publisher) external {
        publishers[publisher] = true;
    }
    
    /**
     * @dev Remove publisher
     */
    function removePublisher(address publisher) external {
        publishers[publisher] = false;
    }
    
    /**
     * @dev Withdraw balance
     */
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        
        require(
            IERC20(usdcToken).transfer(msg.sender, amount),
            "USDC transfer failed"
        );
        
        emit Withdrawal(msg.sender, amount);
    }
    
    /**
     * @dev Get balance
     */
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}

/**
 * @dev Interface for USDC
 */
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}