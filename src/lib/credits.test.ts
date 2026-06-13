import { describe, it, expect } from 'vitest';
import {
  calculateCreditsNeeded,
  estimateUSD,
  getModelInfo,
  listModels,
  CREDIT_PACKAGES,
  MODEL_COSTS,
  CREDITS_EXPIRE_DAYS,
} from './credits';

describe('calculateCreditsNeeded', () => {
  it('calculates credits for a known model', () => {
    // claude-3-7-sonnet: 3.50 input, 15.00 output per 1K tokens
    const credits = calculateCreditsNeeded('claude-3-7-sonnet', 1000, 1000);
    expect(credits).toBe(Math.ceil(3.50 + 15.00)); // 19
  });

  it('handles zero tokens', () => {
    expect(calculateCreditsNeeded('claude-3-7-sonnet', 0, 0)).toBe(0);
  });

  it('returns default calculation for unknown model', () => {
    // Default: (inputTokens * 1.0 + outputTokens * 2.0) / 1000
    const credits = calculateCreditsNeeded('unknown-model', 1000, 1000);
    expect(credits).toBe(Math.ceil((1000 * 1.0 + 1000 * 2.0) / 1000)); // 3
  });

  it('rounds up fractional credits', () => {
    // 500 tokens of claude-3-7-sonnet input = 0.5 * 3.50 = 1.75
    const credits = calculateCreditsNeeded('claude-3-7-sonnet', 500, 0);
    expect(credits).toBe(Math.ceil(1.75)); // 2
  });

  it('handles large token counts', () => {
    const credits = calculateCreditsNeeded('gpt-4o', 100000, 50000);
    // gpt-4o: 3.00 input, 12.00 output
    const expected = Math.ceil((100000 / 1000) * 3.0 + (50000 / 1000) * 12.0);
    expect(credits).toBe(expected); // ceil(300 + 600) = 900
  });

  it('works for all defined models', () => {
    for (const modelId of Object.keys(MODEL_COSTS)) {
      const credits = calculateCreditsNeeded(modelId, 1000, 1000);
      expect(credits).toBeGreaterThan(0);
      expect(Number.isInteger(credits)).toBe(true);
    }
  });
});

describe('estimateUSD', () => {
  it('converts credits to USD string', () => {
    // 1 credit = $0.001
    expect(estimateUSD(1000)).toBe('$1.00');
  });

  it('handles zero credits', () => {
    expect(estimateUSD(0)).toBe('$0.00');
  });

  it('handles fractional amounts', () => {
    expect(estimateUSD(1)).toBe('$0.00'); // $0.001 rounds to $0.00 with toFixed(2)
  });

  it('handles large credit amounts', () => {
    expect(estimateUSD(100000)).toBe('$100.00');
  });

  it('formats with 2 decimal places', () => {
    const result = estimateUSD(1234);
    expect(result).toMatch(/^\$\d+\.\d{2}$/);
  });
});

describe('getModelInfo', () => {
  it('returns model info for a known model', () => {
    const info = getModelInfo('claude-3-7-sonnet');
    expect(info).not.toBeNull();
    expect(info!.name).toBe('Claude 3.7 Sonnet');
    expect(info!.provider).toBe('Anthropic');
    expect(info!.inputCredits).toBe(3.50);
    expect(info!.outputCredits).toBe(15.00);
  });

  it('returns null for unknown model', () => {
    expect(getModelInfo('nonexistent-model')).toBeNull();
  });

  it('has correct structure for all models', () => {
    for (const modelId of Object.keys(MODEL_COSTS)) {
      const info = getModelInfo(modelId);
      expect(info).not.toBeNull();
      expect(info!.name).toBeTruthy();
      expect(info!.provider).toBeTruthy();
      expect(typeof info!.inputCredits).toBe('number');
      expect(typeof info!.outputCredits).toBe('number');
      expect(info!.inputCredits).toBeGreaterThanOrEqual(0);
      expect(info!.outputCredits).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('listModels', () => {
  it('returns all models with IDs', () => {
    const models = listModels();
    expect(models.length).toBe(Object.keys(MODEL_COSTS).length);
  });

  it('each model has id, name, provider, and costs', () => {
    const models = listModels();
    for (const model of models) {
      expect(model.id).toBeTruthy();
      expect(model.name).toBeTruthy();
      expect(model.provider).toBeTruthy();
      expect(typeof model.inputCredits).toBe('number');
      expect(typeof model.outputCredits).toBe('number');
    }
  });

  it('includes expected providers', () => {
    const models = listModels();
    const providers = models.map(m => m.provider);
    expect(providers).toContain('Anthropic');
    expect(providers).toContain('OpenAI');
    expect(providers).toContain('Meta');
  });
});

describe('CREDIT_PACKAGES', () => {
  it('has 4 packages', () => {
    expect(CREDIT_PACKAGES).toHaveLength(4);
  });

  it('has correct pricing structure', () => {
    for (const pkg of CREDIT_PACKAGES) {
      expect(pkg.credits).toBeGreaterThan(0);
      expect(pkg.price).toBeGreaterThan(0);
      expect(pkg.bonus).toBeGreaterThanOrEqual(0);
      expect(pkg.description).toBeTruthy();
      expect(pkg.id).toBeTruthy();
    }
  });

  it('only one package is marked popular', () => {
    const popular = CREDIT_PACKAGES.filter(p => p.popular);
    expect(popular).toHaveLength(1);
    expect(popular[0].id).toBe('pro');
  });

  it('larger packages have better per-credit value', () => {
    const starter = CREDIT_PACKAGES[0];
    const elite = CREDIT_PACKAGES[2];
    const starterValue = starter.credits / starter.price;
    const eliteValue = (elite.credits + elite.bonus) / elite.price;
    expect(eliteValue).toBeGreaterThan(starterValue);
  });
});

describe('CREDITS_EXPIRE_DAYS', () => {
  it('is 0 (credits never expire)', () => {
    expect(CREDITS_EXPIRE_DAYS).toBe(0);
  });
});
