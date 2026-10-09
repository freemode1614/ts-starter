import { defineConfig } from "tsdown";

export default defineConfig((config) => ({
  entry: ["./src/index.ts"],
  outDir: "./npm",
  dts: true,
  format: "esm",
  sourcemap: config.sourcemap,
  clean: true,
  treeshake: true,
  shims: false,
  // Lock ESM to ES2024 so output never relies on Node > 24 features,
  // regardless of what `engines.node` happens to be set to.
  target: "es2024",
}));
