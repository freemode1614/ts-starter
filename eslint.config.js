import prettierConfig from "@moccona/eslint-config/extra/prettier";
import typescriptConfig from "@moccona/eslint-config/extra/typescript";
import vitestConfig from "@moccona/eslint-config/extra/vitest";
import baseConfig from "@moccona/eslint-config/flat";

export default [
  ...baseConfig,
  ...typescriptConfig,
  ...vitestConfig,
  ...prettierConfig,
];
