import { describe, it, expect } from 'vitest';
import { random, secure } from './index';

describe('Random', () => {
  it('randint generates integers in range', () => {
    for (let i = 0; i < 1000; i++) {
      const n = random.randint(1, 6);
      expect(Number.isInteger(n)).toBe(true);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(6);
    }
  });

  it('randint throws on invalid inputs', () => {
    expect(() => random.randint(1.5, 6)).toThrow(TypeError);
    expect(() => random.randint(10, 5)).toThrow(RangeError);
  });

  it('sample returns correct length without duplicates', () => {
    const pop = [1, 2, 3, 4, 5];
    const result = random.sample(pop, 3);
    expect(result).toHaveLength(3);
    expect(new Set(result).size).toBe(3);
  });

  it('choices respects weights', () => {
    const results = random.choices(['a', 'b'], [0.9, 0.1], 1000);
    const aCount = results.filter(x => x === 'a').length;
    expect(aCount).toBeGreaterThan(800); // should be ~900
  });

  it('gauss generates normal distribution', () => {
    const samples = Array.from({ length: 10000 }, () => random.gauss(0, 1));
    const mean = samples.reduce((a, b) => a + b) / samples.length;
    expect(mean).toBeCloseTo(0, 1);
  });
});

describe('SecureRandom', () => {
  it('generates secure random integers', () => {
    for (let i = 0; i < 100; i++) {
      const n = secure.randint(1, 100);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(100);
    }
  });

  it('generates random bytes', () => {
    const bytes = secure.bytes(16);
    expect(bytes).toHaveLength(16);
    expect(bytes instanceof Uint8Array).toBe(true);
  });
});