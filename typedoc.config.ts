/**
 * TypeDoc configuration for ts-starter
 * @see https://typedoc.org/options/
 */
export default {
  entryPoints: ["./src/index.ts"],
  out: "./docs/api",
  plugin: ["typedoc-plugin-markdown"],
  theme: "markdown",
  readme: "none",
  gitRevision: "main",
  githubPages: false,
  hideGenerator: true,
  sortEntryPoints: true,
  categorizeByGroup: true,
  categoryOrder: [
    "String utilities",
    "Array utilities",
    "Number utilities",
    "Type utilities",
    "Async utilities",
    "Math utilities",
    "*",
  ],
};
