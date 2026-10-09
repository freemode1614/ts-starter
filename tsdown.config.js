import { defineConfig } from "tsdown";

export default defineConfig(() => ({
  entry: ["./src/index.ts"],
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
