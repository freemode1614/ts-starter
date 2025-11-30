# TypeScript Starter

A modern, minimal TypeScript project scaffolded with modern tooling for development, testing, and production builds.

This project provides a clean, production-ready foundation for building scalable TypeScript applications with type safety, fast feedback, and efficient workflows.

## Features

- **TypeScript** – Full type checking and IntelliSense support with strict typing, interfaces, and generics
- **Vitest** – Fast, zero-config unit testing with automatic test discovery, browser and Node.js support, and mocking capabilities
- **TSUP** – Bundles TypeScript code into modern formats (ESM, CJS, minified, etc.) with support for optimization, tree-shaking, and production builds
- **Biome** – Automatic code formatting, linting, and code quality enforcement with consistent style across the team
- **ESLint (via Biome)** – Integrated static analysis for catching bugs and enforcing best practices
- **TypeScript configuration (tsconfig.json)** – Modular and well-organized configuration for type resolution and module resolution
- **Vitest configuration (vitest.config.js)** – Supports test isolation, mocking, and environment setup
- **TSUP configuration (tsup.config.js)** – Configurable build settings (output formats, sourcemaps, minification, etc.)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm (or any package manager compatible with JavaScript/TypeScript)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ts-starter.git
cd ts-starter
```

### 2. Install Dependencies

```bash
pnpm install
```

or

```bash
npm install
```

### 3. Run the Project

- **Development Server (with Vitest auto-run)**:
  ```bash
  pnpm dev
  ```
  (or `npm run dev`) – Starts a dev server with live reloading and automatic test runs.

- **Run Tests**:
  ```bash
  pnpm test
  ```
  (or `npm run test`) – Runs all tests with Vitest.

- **Build for Production**:
  ```bash
  pnpm build
  ```
  (or `npm run build`) – Creates optimized, minified, and bundled output using TSUP.

- **Build with sourcemaps**:
  ```bash
  pnpm build --sourcemap
  ```

### 4. Edit Source Code

Edit files in the `src/` directory. All files are auto-detected by the TypeScript compiler.

### 5. Add New Tests

Create new test files in the `test/` directory. Vitest automatically discovers and runs them.

## Project Structure

```
src/
  └── index.ts        # Entry point for the application
test/
  └── unit/           # Unit test files (Vitest)
  └── integration/    # Integration test files (optional)
  └── __mocks__/      # Mocks for testing
```

## Configuration Highlights

### `tsconfig.json`
- Sets module resolution to `Node16` for compatibility
- Enables strict typing with `strict: true`
- Supports `moduleResolution: "bundler"` for modern build workflows

### `vitest.config.js`
- Enables test discovery
- Supports environment variables and mocking
- Runs tests in a clean, isolated environment

### `tsup.config.js`
- Configures output formats (ESM, CJS)
- Enables minification and sourcemaps
- Supports output directory and output file naming

### `biome.json`
- Enforces consistent formatting and code style
- Integrates with editors (VS Code, Vim, etc.) for real-time formatting
- Provides linting rules for TypeScript best practices

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes and push to the branch.
4. Open a pull request.

Please ensure all tests pass before submitting a PR.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/your-username/ts-starter/blob/main/LICENSE) file for details.