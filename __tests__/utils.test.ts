import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/formatters';

describe('Utility Functions', () => {
  describe('cn()', () => {
    it('should merge class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
    });
  });

  describe('formatPrice()', () => {
    it('should format prices correctly', () => {
      expect(formatPrice(100)).toBe('$100.00');
      expect(formatPrice(1000)).toBe('$1,000.00');
    });
  });
});
