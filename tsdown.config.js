import { defineConfig } from "tsdown";

export default defineConfig(() => ({
  // 每个 entry 生成一个独立的 chunk，并对应 package.json `exports` 里的一个
  // 子路径（`your-lib/math` -> `npm/math.mjs`）。新增子路径 = 在这里加一行。
  entry: {
    index: "./src/index.ts",
    math: "./src/utils/math.ts",
  },
  outDir: "./npm",
  dts: {
    sourcemap: false,
  },
  format: "esm",
  sourcemap: false,
  clean: true,
  treeshake: true,
  shims: false,
  // Lock ESM to ES2024 so output never relies on Node > 24 features,
  // regardless of what `engines.node` happens to be set to.
  target: "es2024",
}));
