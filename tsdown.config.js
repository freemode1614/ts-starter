import { defineConfig } from "tsdown";

export default defineConfig((config) => {
  return [
    // ESM build
    {
      entry: ["./src/index.ts"],
      outDir: "./npm",
      dts: true,
      format: "esm",
      outExtensions() {
        return { js: ".js", dts: ".d.ts" };
      },
      sourcemap: config.sourcemap,
      clean: config.sourcemap,
      treeshake: true,
      shims: false,
    },
    // CJS build
    {
      entry: ["./src/index.ts"],
      outDir: "./npm",
      dts: {
        compilerOptions: {
          outDir: "./npm",
        },
      },
      format: "cjs",
      sourcemap: config.sourcemap,
      clean: false,
      treeshake: true,
      shims: true,
      outExtensions({ format }) {
        return format === "cjs" ? { js: ".cjs", dts: ".d.cts" } : { js: ".js" };
      },
    },
  ];
});
