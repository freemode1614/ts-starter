# ts-starter

<!--toc:start-->

- [ts-starter](#ts-starter)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Scripts](#scripts)
  - [API Reference](#api-reference)
    - [String Utilities](#string-utilities)
    - [Array Utilities](#array-utilities)
    - [Number Utilities](#number-utilities)
    - [Type Utilities](#type-utilities)
    - [Async Utilities](#async-utilities)
  <!--toc:end-->

A lightweight TypeScript utility library with common helper functions for strings, arrays, numbers, and more.

## Features

- 🚀 **TypeScript First** - Written in TypeScript with full type definitions
- 📦 **Zero Dependencies** - No runtime dependencies
- 🎯 **ESM & CJS** - Supports both module formats
- 🔧 **Tree Shaking** - Import only what you need
- ⚡ **Fast & Light** - Minimal footprint

## Installation

```bash
npm install ts-starter
# or
yarn add ts-starter
# or
pnpm add ts-starter
```

## Usage

```typescript
import { capitalize, chunk, clamp } from "ts-starter";

// String utilities
capitalize("hello"); // "Hello"

// Array utilities
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Number utilities
clamp(10, 0, 5); // 5
```

## Scripts

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Start development mode with watch    |
| `pnpm build`  | Build the project for production     |
| `pnpm test`   | Run test cases                       |
| `pnpm lint`   | Run Biome linter to check code       |
| `pnpm lint:fix` | Run Biome linter and auto-fix issues |
| `pnpm format` | Format code with Biome               |

## API Reference

### String Utilities

#### `capitalize(str: string): string`

Capitalize the first letter of a string.

```typescript
import { capitalize } from "ts-starter";

capitalize("hello"); // "Hello"
capitalize("world"); // "World"
capitalize(""); // ""
```

### Array Utilities

#### `chunk<T>(arr: T[], size: number): T[][]`

Split an array into chunks of specified size.

```typescript
import { chunk } from "ts-starter";

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3], 1); // [[1], [2], [3]]
chunk([], 3); // []
```

### Number Utilities

#### `clamp(value: number, min: number, max: number): number`

Clamp a number between min and max values.

```typescript
import { clamp } from "ts-starter";

clamp(10, 0, 5); // 5 (clamped to max)
clamp(-5, 0, 10); // 0 (clamped to min)
clamp(5, 0, 10); // 5 (within range)
```

### Type Utilities

#### `isDefined<T>(value: T | null | undefined): value is T`

Check if a value is not null or undefined.

```typescript
import { isDefined } from "ts-starter";

isDefined(null); // false
isDefined(undefined); // false
isDefined(0); // true
isDefined(""); // true
isDefined(false); // true

// Useful with array filter
[1, null, 2, undefined, 3].filter(isDefined); // [1, 2, 3]
```

### Async Utilities

#### `sleep(ms: number): Promise<void>`

Sleep for a specified duration.

```typescript
import { sleep } from "ts-starter";

async function example() {
  console.log("Start");
  await sleep(1000); // Wait 1 second
  console.log("End");
}
```

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [tsup](https://github.com/egoist/tsup) - TypeScript bundler
- [Biome](https://biomejs.dev/) - Fast linter and formatter
- [Vitest](https://vitest.dev/) - Testing framework
- [Changesets](https://github.com/changesets/changesets) - Version management

## License

MIT
