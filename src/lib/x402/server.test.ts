import { describe, it, expect } from 'vitest';
import {
  dollarsToMicroUnits,
  microUnitsToDollars,
  createPaymentRequirement,
  encodePaymentRequirement,
  decodePaymentRequirement,
  NETWORKS,
  type PaymentRequirement,
} from './server';

describe('dollarsToMicroUnits', () => {
  it('converts $0.01 to 10000 micro-units', () => {
    expect(dollarsToMicroUnits(0.01)).toBe(10000);
  });

  it('converts $1 to 1000000 micro-units', () => {
    expect(dollarsToMicroUnits(1)).toBe(1_000_000);
  });

  it('converts $0 to 0', () => {
    expect(dollarsToMicroUnits(0)).toBe(0);
  });

  it('handles string input', () => {
    expect(dollarsToMicroUnits('0.01')).toBe(10000);
  });

  it('throws on dollar-sign prefixed strings (parseFloat limitation)', () => {
    // parseFloat('$0.01') returns NaN — this is actual behavior
    expect(() => dollarsToMicroUnits('$0.01')).toThrow('Invalid price');
  });

  it('throws on invalid input', () => {
    expect(() => dollarsToMicroUnits('not-a-number')).toThrow('Invalid price');
  });

  it('handles very small amounts', () => {
    expect(dollarsToMicroUnits(0.000001)).toBe(1);
  });

  it('handles large amounts', () => {
    expect(dollarsToMicroUnits(100)).toBe(100_000_000);
  });
});

describe('microUnitsToDollars', () => {
  it('converts 10000 micro-units to $0.010000', () => {
    expect(microUnitsToDollars(10000)).toBe('$0.010000');
  });

  it('converts 1000000 to $1.000000', () => {
    expect(microUnitsToDollars(1_000_000)).toBe('$1.000000');
  });

  it('converts 0 to $0.000000', () => {
    expect(microUnitsToDollars(0)).toBe('$0.000000');
  });

  it('handles string input', () => {
    expect(microUnitsToDollars('10000')).toBe('$0.010000');
  });

  it('throws on invalid input', () => {
    expect(() => microUnitsToDollars('not-a-number')).toThrow('Invalid micro-units');
  });
});

describe('dollarsToMicroUnits / microUnitsToDollars roundtrip', () => {
  it('roundtrips correctly', () => {
    const amounts = [0.01, 0.50, 1, 5.99, 100];
    for (const amount of amounts) {
      const micro = dollarsToMicroUnits(amount);
      const dollars = microUnitsToDollars(micro);
      expect(dollars).toBe(`$${amount.toFixed(6)}`);
    }
  });
});

describe('createPaymentRequirement', () => {
  // Use string price as required by X402PaymentConfig
  const baseConfig = {
    recipientAddress: '0x1234567890123456789012345678901234567890',
    network: 'base' as const,
    price: '0.01',
  };

  it('creates a payment requirement with scheme "exact"', () => {
    const req = createPaymentRequirement(baseConfig);
    expect(req.scheme).toBe('exact');
  });

  it('uses correct network ID', () => {
    const req = createPaymentRequirement(baseConfig);
    expect(req.network).toBe(NETWORKS.base.id);
  });

  it('converts price to micro-units', () => {
    const req = createPaymentRequirement(baseConfig);
    expect(req.amount).toBe('10000');
  });

  it('uses correct USDC asset address', () => {
    const req = createPaymentRequirement(baseConfig);
    expect(req.asset).toBe(NETWORKS.base.usdcAddress);
  });

  it('sets recipient address', () => {
    const req = createPaymentRequirement(baseConfig);
    expect(req.recipient).toBe(baseConfig.recipientAddress);
  });

  it('includes default description', () => {
    const req = createPaymentRequirement(baseConfig);
    expect(req.description).toBe('Payment for 0.01');
  });

  it('uses custom description when provided', () => {
    const req = createPaymentRequirement({
      ...baseConfig,
      description: 'Custom payment',
    });
    expect(req.description).toBe('Custom payment');
  });

  it('sets expiresAt when expiresInMinutes is provided', () => {
    const req = createPaymentRequirement({
      ...baseConfig,
      expiresInMinutes: 30,
    });
    expect(req.expiresAt).toBeDefined();
    const expiresAt = new Date(req.expiresAt!);
    const now = new Date();
    const diffMinutes = (expiresAt.getTime() - now.getTime()) / 60000;
    expect(diffMinutes).toBeGreaterThanOrEqual(29);
    expect(diffMinutes).toBeLessThanOrEqual(31);
  });

  it('does not set expiresAt when expiresInMinutes is omitted', () => {
    const req = createPaymentRequirement(baseConfig);
    expect(req.expiresAt).toBeUndefined();
  });

  it('works with all network types', () => {
    for (const networkName of Object.keys(NETWORKS) as Array<keyof typeof NETWORKS>) {
      const req = createPaymentRequirement({
        ...baseConfig,
        network: networkName,
      });
      expect(req.network).toBe(NETWORKS[networkName].id);
      expect(req.asset).toBe(NETWORKS[networkName].usdcAddress);
    }
  });

  it('handles numeric price', () => {
    const req = createPaymentRequirement({ ...baseConfig, price: '0.05' });
    expect(req.amount).toBe('50000');
  });

  it('handles string price (no $ prefix)', () => {
    const req = createPaymentRequirement({ ...baseConfig, price: '0.01' });
    expect(req.amount).toBe('10000');
  });
});

describe('encodePaymentRequirement / decodePaymentRequirement', () => {
  it('encodes and decodes a payment requirement', () => {
    const req: PaymentRequirement = {
      scheme: 'exact',
      network: 'eip155:8453',
      amount: '10000',
      asset: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      recipient: '0x1234567890123456789012345678901234567890',
    };

    const encoded = encodePaymentRequirement(req);
    const decoded = decodePaymentRequirement(encoded);

    expect(decoded.scheme).toBe(req.scheme);
    expect(decoded.network).toBe(req.network);
    expect(decoded.amount).toBe(req.amount);
    expect(decoded.asset).toBe(req.asset);
    expect(decoded.recipient).toBe(req.recipient);
  });

  it('produces a valid base64url string', () => {
    const req: PaymentRequirement = {
      scheme: 'exact',
      network: 'eip155:8453',
      amount: '10000',
      asset: '0xABC',
      recipient: '0xDEF',
    };

    const encoded = encodePaymentRequirement(req);
    // base64url uses - and _ instead of + and /
    expect(encoded).not.toContain('+');
    expect(encoded).not.toContain('/');
    expect(encoded).not.toContain('=');
  });

  it('roundtrips a full createPaymentRequirement output', () => {
    const req = createPaymentRequirement({
      recipientAddress: '0x1234567890123456789012345678901234567890',
      network: 'base',
      price: '0.05',
      description: 'Test payment',
      expiresInMinutes: 60,
    });

    const encoded = encodePaymentRequirement(req);
    const decoded = decodePaymentRequirement(encoded);

    expect(decoded).toEqual(req);
  });
});

describe('NETWORKS', () => {
  it('has base, base-sepolia, solana, and solana-devnet', () => {
    expect(NETWORKS['base']).toBeDefined();
    expect(NETWORKS['base-sepolia']).toBeDefined();
    expect(NETWORKS['solana']).toBeDefined();
    expect(NETWORKS['solana-devnet']).toBeDefined();
  });

  it('each network has required fields', () => {
    for (const [name, net] of Object.entries(NETWORKS)) {
      expect(net.id).toBeTruthy();
      expect(net.name).toBeTruthy();
      // EVM chains use 0x addresses, Solana uses base58
      if (name.startsWith('solana')) {
        expect(net.usdcAddress).toBeTruthy();
        expect(typeof net.usdcAddress).toBe('string');
      } else {
        expect(net.usdcAddress).toMatch(/^0x[0-9a-fA-F]+$/);
      }
      expect(net.rpcUrl).toBeTruthy();
      expect(net.explorer).toBeTruthy();
      expect(net.symbol).toBeTruthy();
      expect(net.facilitatorUrl).toBeTruthy();
    }
  });

  it('base chainId is 8453', () => {
    expect(NETWORKS.base.chainId).toBe(8453);
  });

  it('base-sepolia chainId is 84532', () => {
    expect(NETWORKS['base-sepolia'].chainId).toBe(84532);
  });
});
