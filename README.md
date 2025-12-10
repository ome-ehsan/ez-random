## 📄 README.md

```markdown
# simplified-random 🎲

Python-style random utilities for TypeScript/JavaScript. Clean, intuitive API that feels like Python's `random` module.

## Why?

JavaScript's `Math.random()` is painful to use:

```javascript
// JavaScript way 
const dice = Math.floor(Math.random() * 6) + 1;
const item = array[Math.floor(Math.random() * array.length)];
// Python way (with random-py) 😊
const dice = random.randint(1, 6);
const item = random.choice(array);
```

## Installation

```bash
npm install random-py
```

## Quick Start

```typescript
import { random, secure } from 'random-py';

// Random integer (inclusive on both ends)
random.randint(1, 6);  // 1, 2, 3, 4, 5, or 6

// Random choice from array
random.choice(['apple', 'banana', 'cherry']);  // 'banana'

// Shuffle array in place
const deck = [1, 2, 3, 4, 5];
random.shuffle(deck);  // deck is now shuffled

// Random sample without replacement
random.sample([1, 2, 3, 4, 5], 3);  // [2, 5, 1]

// Weighted random choice
random.choices(['a', 'b', 'c'], [0.5, 0.3, 0.2], 10);

// Random float
random.uniform(1.5, 10.5);  // 7.234891...

// Gaussian/normal distribution
random.gauss(0, 1);  // Standard normal

// Cryptographically secure (for tokens, passwords, etc.)
secure.randint(100000, 999999);  // Secure 6-digit code
secure.choice(['a', 'b', 'c']);  // Cryptographically secure choice
```

## API Reference

### `random.randint(min, max)`
Return random integer N such that `min <= N <= max` (inclusive on both ends).

### `random.randrange(stop)` / `random.randrange(start, stop, step?)`
Random integer from `range(start, stop, step)`. Like Python's `randrange()`.

### `random.choice(sequence)`
Return random element from non-empty sequence.

### `random.sample(population, k)`
Return k-length array of unique elements from population.

### `random.shuffle(array)`
Shuffle array in place using Fisher-Yates algorithm.

### `random.choices(population, weights?, k)`
Return k-length array with replacement. Optional weights for probability.

### `random.uniform(min, max)`
Return random float N such that `min <= N < max`.

### `random.gauss(mu, sigma)`
Random number from Gaussian distribution. Default: `mu=0`, `sigma=1`.

### `random.random()`
Random float in [0.0, 1.0).

### `secure.*`
Cryptographically secure versions of `randint()`, `choice()`, and `bytes()`.

## When to Use `secure`?

Use **`secure`** for security-sensitive randomness:
- Session tokens, API keys
- Password reset codes
- Lottery/gambling systems
- Authentication tokens
- Cryptographic operations

Use **`random`** for everything else:
- Games, simulations
- Random UI effects
- Shuffling playlists
- Non-security random selection

## TypeScript Support

Full TypeScript support with generics:

```typescript
const nums: number[] = random.sample([1, 2, 3], 2);
const str: string = random.choice(['a', 'b', 'c']);
```

## Contributing

PRs welcome! Please ensure tests pass:

```bash
npm test
```

## License

MIT © ome-ehsan
```

---

## 📄 LICENSE

```
MIT License

Copyright (c) 2025 ome-ehsan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📄 CHANGELOG.md

```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-09

### Added
- Initial release
- `randint()`, `uniform()`, `choice()`, `sample()`, `shuffle()`, `choices()`, `gauss()`, `random()`
- `SecureRandom` class with cryptographically secure methods
- Full TypeScript support
- Comprehensive test coverage
- Zero dependencies
```
