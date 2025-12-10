/**
 * Main Random class with pseudorandom number generation
 */
export class Random {
  private cachedGaussian: number | null = null;

  /**
   * Return a random integer N such that min <= N <= max (inclusive on both ends)
   * @throws {TypeError} If arguments are not integers
   * @throws {RangeError} If min > max or range exceeds safe integer limits
   * @example random.randint(1, 6) // dice roll: 1-6
   */
  randint(min: number, max: number): number {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      throw new TypeError('Both arguments must be integers');
    }
    if (min > max) {
      throw new RangeError('min must be less than or equal to max');
    }
    
    // maintain JS safe integer range 
    const range = max - min + 1;
    if (range > Number.MAX_SAFE_INTEGER) {
      throw new RangeError('Range exceeds maximum safe integer range');
    }

    return Math.floor(Math.random()* range) + min;
  }
  /**
 * Return a randomly selected element from range(start, stop, step)
 * Equivalent to choice(range(start, stop, step)) but more efficient
 * 
 * @param start - Starting value (or stop if only one arg conceptually)
 * @param stop - Stopping value (exclusive)
 * @param step - Step value (default: 1)
 * @throws {TypeError} If arguments are not integers
 * @throws {ValueError} If step is zero or range is empty
 * 
 * @example
 * random.randrange(10)           // 0 to 9
 * random.randrange(1, 10)        // 1 to 9
 * random.randrange(0, 100, 10)   // 0, 10, 20, ..., 90
 * random.randrange(10, 0, -1)    // 10, 9, 8, ..., 1
 */
  randrange(start: number, stop?: number, step: number = 1): number {
    // Handle single argument case: randrange(stop)
    if (stop === undefined) {
      stop = start;
      start = 0;
    }

    if (!Number.isInteger(start) || !Number.isInteger(stop) || !Number.isInteger(step)) {
      throw new TypeError('All arguments must be integers');
    }

    if (step === 0) {
      throw new RangeError('step argument must not be zero');
    }

    // Calculate the number of values in the range
    const width = stop - start;
    
    if (step > 0 && width <= 0) {
      throw new RangeError('empty range for randrange()');
    }
    if (step < 0 && width >= 0) {
      throw new RangeError('empty range for randrange()');
    }

    // Calculate how many steps fit in the range
    const n = Math.floor((width + step - (step > 0 ? 1 : -1)) / step);
    
    if (n <= 0) {
      throw new RangeError('empty range for randrange()');
    }
    // Pick a random step index and calculate the actual value
    const randomStep = Math.floor(Math.random() * n);
    return start + randomStep* step;
  }
  /**
   * Return a random floating point number N such that min <= N < max
   * @throws {TypeError} If arguments are not numbers
   * @throws {RangeError} If min > max or arguments are not finite
   * @example random.uniform(1.5, 10.5) // 1.5 <= N < 10.5
   */
  uniform(min: number, max: number): number {
    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new TypeError('Both arguments must be numbers');
    }
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      throw new RangeError('Arguments must be finite numbers');
    }
    if (min > max) {
      throw new RangeError('min must be less than or equal to max');
    }
    return Math.random() * (max - min) + min;
  }
  /**
   * Return a random element from a non-empty sequence
   * @throws {TypeError} If sequence is not array-like
   * @throws {RangeError} If sequence is empty
   * @example random.choice(['apple', 'banana', 'cherry']) // 'banana'
   */
  choice<T>(seq: ArrayLike<T>): T {
    if (!seq || typeof seq.length !== 'number') {
      throw new TypeError('Argument must be an array-like object');
    }
    if (seq.length === 0) {
      throw new RangeError('Cannot choose from an empty sequence');
    }
    const idx = Math.floor(Math.random() * seq.length);
    return seq[idx];
  }
  /**
   * Return a k length array of unique elements chosen from the population
   * Uses efficient algorithm based on sample size relative to population
   * @throws {TypeError} If population is not an array
   * @throws {RangeError} If k is invalid
   * @example random.sample([1, 2, 3, 4, 5], 3) // [2, 5, 1]
   */
  sample<T>(population: T[], k: number): T[] {
    if (!Array.isArray(population)) {
      throw new TypeError('Population must be an array');
    }
    if (!Number.isInteger(k) || k < 0) {
      throw new RangeError('Sample size must be a non-negative integer');
    }
    if (k > population.length) {
      throw new RangeError('Sample size cannot be larger than population');
    }

    const n = population.length;

    // For large k relative to n, shuffle and slice is faster
    if (k > n / 2) {
      const copied = [...population];
      this.shuffle(copied);
      return copied.slice(0, k);
    }

    // For small k, use set-based selection
    const result: T[] = [];
    const selected = new Set<number>();

    while (result.length < k) {
      const idx = Math.floor(Math.random() * n);
      if (!selected.has(idx)) {
        selected.add(idx);
        result.push(population[idx]);
      }
    }

    return result;
  }
  /**
   * Shuffle array in place using Fisher-Yates algorithm
   * @throws {TypeError} If argument is not an array
   * @example const arr = [1, 2, 3]; random.shuffle(arr); // arr is now shuffled
   */
  shuffle<T>(arr: T[]): void {
    if (!Array.isArray(arr)) {
      throw new TypeError('Argument must be an array');
    }
    // fisher yates algorithm
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  /**
   * Return a k length array of elements chosen from the population with replacement
   * Weights represent the relative probability of each element
   * @throws {TypeError} If population is not an array or weights invalid
   * @throws {RangeError} If weights and population length mismatch or weights invalid
   * @example random.choices(['a', 'b', 'c'], [0.5, 0.3, 0.2], 10)
   */
  choices<T>(population: T[], weights?: number[], k: number = 1): T[] {
    if (!Array.isArray(population)) {
      throw new TypeError('Population must be an array');
    }
    if (population.length === 0) {
      throw new RangeError('Population cannot be empty');
    }
    if (!Number.isInteger(k) || k < 0) {
      throw new RangeError('k must be a non-negative integer');
    }

    if (!weights) {
      // Uniform selection with replacement
      return Array.from({ length: k }, () => this.choice(population));
    }

    if (!Array.isArray(weights)) {
      throw new TypeError('Weights must be an array');
    }
    if (weights.length !== population.length) {
      throw new RangeError('Weights must have the same length as population');
    }
    if (weights.some(w => typeof w !== 'number' || !Number.isFinite(w) || w < 0)) {
      throw new RangeError('All weights must be non-negative finite numbers');
    }

    const sum = weights.reduce((a, b) => a + b, 0);
    if (sum <= 0) {
      throw new RangeError('Weight sum must be positive');
    }

    // Build cumulative distribution
    const cumulative: number[] = [];
    let acc = 0;
    for (const w of weights) {
      acc += w / sum;
      cumulative.push(acc);
    }
    // Ensure last value is exactly 1 to avoid floating point issues
    cumulative[cumulative.length - 1] = 1;

    // Binary search to find in O(log n) time
    const binarySearch = (target: number): number => {
      let left = 0;
      let right = cumulative.length - 1;
      
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (cumulative[mid] < target) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      return left;
    };

    const result: T[] = [];
    for (let i = 0; i < k; i++) {
      const r = Math.random();
      const idx = binarySearch(r);
      result.push(population[idx]);
    }

    return result;
  }
  /**
   * Return a random number from a Gaussian (normal) distribution
   * Uses Box-Muller transform and caches the second value for efficiency
   * @param mu - Mean (default: 0)
   * @param sigma - Standard deviation (default: 1)
   * @throws {TypeError} If arguments are not numbers
   * @throws {RangeError} If sigma is not positive
   * @example random.gauss(0, 1) // standard normal distribution
   */
  gauss(mu: number = 0, sigma: number = 1): number {
    if (typeof mu !== 'number' || typeof sigma !== 'number') {
      throw new TypeError('Both arguments must be numbers');
    }
    if (!Number.isFinite(mu) || !Number.isFinite(sigma)) {
      throw new RangeError('Arguments must be finite numbers');
    }
    if (sigma <= 0) {
      throw new RangeError('Standard deviation must be positive');
    }

    // Use cached value if available
    if (this.cachedGaussian !== null) {
      const value = this.cachedGaussian;
      this.cachedGaussian = null;
      return value * sigma + mu;
    }

    // Box-Muller transform generates two independent standard normal values
    let u1: number, u2: number;
    do {
      u1 = Math.random();
      u2 = Math.random();
    } while (u1 === 0); // Ensure u1 is not zero for log

    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

    // Cache the second value
    this.cachedGaussian = z1;

    return z0 * sigma + mu;
  }
  /**
   * Return a random floating point number in the range [0.0, 1.0)
   * @example random.random() // 0.123456789
   */
  random(): number {
    return Math.random();
  }
  /**
   * Clear any cached values (useful for testing or memory management)
   */
  clearCache(): void {
    this.cachedGaussian = null;
  }
}

/**
 * Cryptographically secure random number generator
 * Uses Web Crypto API in browsers and Node.js crypto module in Node
 */
export class SecureRandom {
  private crypto: Crypto | null = null;

  constructor() {
    // Detect crypto environment once during initialization
    try {
      if (typeof globalThis !== 'undefined' && globalThis.crypto && typeof globalThis.crypto.getRandomValues === 'function') {
        this.crypto = globalThis.crypto;
      } else if (typeof window !== 'undefined' && window.crypto && typeof window.crypto.getRandomValues === 'function') {
        this.crypto = window.crypto;
      }
    } catch (e) {
      // Crypto not available, will fall back to Node.js crypto
    }
  }

  private getRandomBytes(size: number): Uint8Array {
    if (this.crypto) {
      return this.crypto.getRandomValues(new Uint8Array(size));
    }

    // Try Node.js crypto as fallback
    try {
      // Dynamic require to avoid bundler issues
      const nodeCrypto = eval('require')('crypto');
      return new Uint8Array(nodeCrypto.randomBytes(size));
    } catch (e) {
      throw new Error('Secure random not available in this environment');
    }
  }


  private getRandomUint32(): number {
    const bytes = this.getRandomBytes(4);
     return ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) >>> 0;
  }

  /**
   * Return a cryptographically secure random integer N such that min <= N <= max
   * Uses unbiased rejection sampling to avoid modulo bias
   * @throws {TypeError} If arguments are not integers
   * @throws {RangeError} If min > max or range too large
   * @example secure.randint(1, 6) // cryptographically secure dice roll
   */
  randint(min: number, max: number): number {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      throw new TypeError('Both arguments must be integers');
    }
    if (min > max) {
      throw new RangeError('min must be less than or equal to max');
    }

    const range = max - min + 1;
    
    // For very large ranges, we need multiple bytes
    if (range > 0xFFFFFFFF) {
      throw new RangeError('Range too large for secure random generation');
    }

    // Calculate the largest multiple of range that fits in uint32
    const maxValid = Math.floor(0x100000000 / range) * range;

    let randomValue: number;
    do {
      randomValue = this.getRandomUint32();
    } while (randomValue >= maxValid);

    return min + (randomValue % range);
  }

  /**
   * Return a cryptographically secure random element from a sequence
   * @throws {TypeError} If sequence is not array-like
   * @throws {RangeError} If sequence is empty
   * @example secure.choice(['a', 'b', 'c']) // cryptographically secure choice
   */
  choice<T>(seq: ArrayLike<T>): T {
    if (!seq || typeof seq.length !== 'number') {
      throw new TypeError('Argument must be an array-like object');
    }
    if (seq.length === 0) {
      throw new RangeError('Cannot choose from an empty sequence');
    }
    const idx = this.randint(0, seq.length - 1);
    return seq[idx];
  }

  /**
   * Generate cryptographically secure random bytes
   * @param length - Number of bytes to generate
   * @throws {TypeError} If length is not a positive integer
   * @example secure.bytes(16) // 16 random bytes
   */
  bytes(length: number): Uint8Array {
    if (!Number.isInteger(length) || length < 0) {
      throw new TypeError('Length must be a non-negative integer');
    }
    return this.getRandomBytes(length);
  }
}

// Default instances
export const random = new Random();
export const secure = new SecureRandom();

// Named exports for convenience
export const { randint, uniform, choice, sample, shuffle, choices, gauss } = random;

export default random;