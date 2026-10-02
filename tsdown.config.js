import { defineConfig } from "tsdown";

export default defineConfig((config) => {
  return [
    // ESM build
    {
      entry: ["./src/index.ts"],
      outDir: "./npm",
      dts: true,
      format: "esm",
      sourcemap: config.sourcemap,
      clean: config.sourcemap,
      treeshake: true,
      shims: false,
    },
    // CJS build
    // shims: true injects require() / module / exports compatibility so ESM-only
    // dependencies remain consumable from CommonJS output.
    // outExtensions forces .cjs / .d.cts so Node.js loads the file with CJS semantics
    // even though the package is `"type": "module"`.
    // clean: false preserves the ESM build's artifacts from the previous entry.
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
