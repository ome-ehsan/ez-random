# simplified-random

[![npm version](https://img.shields.io/npm/v/simplified-random.svg)](https://www.npmjs.com/package/simplified-random)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Python-style random utilities for TypeScript/JavaScript. Stop writing `Math.floor(Math.random() * ...)` everywhere.

## Installation

```bash
npm install simplified-random
```

## Quick Start

```typescript
import { random, secure } from 'simplified-random';

// Random integer (inclusive)
random.randint(1, 6);  // 1-6

// Random choice
random.choice(['red', 'green', 'blue']);  // 'green'

// Shuffle array in-place
const cards = [1, 2, 3, 4, 5];
random.shuffle(cards);  // cards is now shuffled

// Random sample (no duplicates)
random.sample([1, 2, 3, 4, 5], 3);  // [4, 1, 5]

// Weighted random
random.choices(['a', 'b', 'c'], [0.5, 0.3, 0.2], 10);

// Random float
random.uniform(1.5, 10.5);  // 7.234...

// Normal distribution
random.gauss(0, 1);  // standard normal

// Cryptographically secure (for tokens, passwords, etc)
secure.randint(100000, 999999);  // 6-digit code
```

## API

### `random.randint(min, max)`
Random integer where `min ≤ N ≤ max` (both inclusive).

### `random.randrange(stop)` | `random.randrange(start, stop, step?)`
Like Python's `range()`. Examples:
- `randrange(10)` → 0-9
- `randrange(1, 10)` → 1-9
- `randrange(0, 100, 10)` → 0, 10, 20, ..., 90

### `random.choice(array)`
Random element from array.

### `random.sample(array, k)`
Select `k` unique elements.

### `random.shuffle(array)`
Shuffle array in-place (Fisher-Yates).

### `random.choices(array, weights?, k)`
Select `k` elements with replacement. Optional weights for probability distribution.

### `random.uniform(min, max)`
Random float where `min ≤ N < max`.

### `random.gauss(mu?, sigma?)`
Random number from normal distribution. Defaults: `mu=0`, `sigma=1`.

### `random.random()`
Random float in `[0.0, 1.0)`.

## Secure Random

Use `secure.*` for security-sensitive operations:

```typescript
import { secure } from 'simplified-random';

secure.randint(1, 1000000);     // Cryptographically secure
secure.choice(['a', 'b', 'c']); // Unpredictable selection
secure.bytes(32);                // 32 random bytes
```

**When to use `secure`:**
- Authentication tokens
- Session IDs
- Password reset codes
- Cryptographic keys
- Lottery/gambling systems

**When to use `random`:**
- Games and simulations
- UI randomness
- Non-security applications

## TypeScript

Full TypeScript support with type inference:

```typescript
const nums: number[] = random.sample([1, 2, 3, 4, 5], 3);
const color: string = random.choice(['red', 'green', 'blue']);
```

## License

MIT © [ome-ehsan](https://github.com/ome-ehsan)
