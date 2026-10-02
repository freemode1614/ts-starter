---
"ts-starter": patch
---

Polish toolchain and CI: sync README type extensions (`d.ts` → `d.mts`), rename `pnpm docs` → `pnpm typedoc`, fix CI typecheck gate so it runs on PRs, add `engines` and `prepublishOnly` to `package.json`, migrate `tsdown` `outExtension` → `outExtensions` (drops deprecation warning), group Dependabot PRs, trim `.gitignore`, add CJS smoke test for the built artifact, clarify `tsdown.config.js` comments, replace duplicate "Type utilities" group with "Types" in TypeDoc categories.
