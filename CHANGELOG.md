# ts-starter

## 0.2.0

### Minor Changes

- 109fd20: Drop CommonJS support: remove CJS build from `tsdown.config.js`, delete `test/cjs.test.ts`, and simplify `package.json` `exports` to ESM-only (`types` + `default`). Update README, CONTRIBUTING, AGENTS, and CI accordingly.
- afb4bc7: Turn the starter into a working template:
  
  - Add `pnpm bootstrap <name>` — one command renames the package, rewrites the README/LICENSE placeholders, deletes the demo code and leaves a tested skeleton behind.
  - Make subpath exports real: `tsdown` now builds one chunk per entry (`index`, `math`), so `your-lib/math` actually resolves. `test/pack.test.ts` verifies every built entry against a real `npm install` + `import`.
  - Fix `pnpm test:coverage` (missing `@vitest/coverage-istanbul`) and add coverage thresholds as a CI gate.
  - Fix the release workflow: it now runs on `push` to `main` so changesets opens the version PR and publishes on merge, instead of only reacting to tags.
  - Mark the template itself `private` (the `ts-starter` npm name is taken); `pnpm bootstrap` removes the flag so generated packages publish normally.
  - Sync the docs with reality: TypeScript 6, Node >= 24, `.mjs` output, `docs/api` is committed.

### Patch Changes

- fb552c5: Add community governance documentation: `CODE_OF_CONDUCT.md` (Contributor Covenant v2.1, bilingual) and an expanded `CONTRIBUTING.md` with detailed coding standards, JSDoc conventions, and testing guidelines. Link both from the README's project structure section.
- fb552c5: Polish toolchain and CI: sync README type extensions (`d.ts` → `d.mts`), rename `pnpm docs` → `pnpm typedoc`, fix CI typecheck gate so it runs on PRs, add `engines` and `prepublishOnly` to `package.json`, migrate `tsdown` `outExtension` → `outExtensions` (drops deprecation warning), group Dependabot PRs, trim `.gitignore`, add CJS smoke test for the built artifact, clarify `tsdown.config.js` comments, replace duplicate "Type utilities" group with "Types" in TypeDoc categories.

## 0.1.0

### Patch Changes

- 初始版本发布
