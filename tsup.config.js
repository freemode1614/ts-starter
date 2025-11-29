import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["./src/index.ts"],
    outDir: "./npm",
    dts: true,
    format: "esm",
    sourcemap: process.env.NODE_ENV !== "production",
    clean: process.env.NODE_ENV === "production",
    treeshake: true,
    shims: false,
  },
]);
