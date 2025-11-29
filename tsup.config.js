import { defineConfig } from "tsup";

export default defineConfig((config) => {
  return [
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
  ];
});
