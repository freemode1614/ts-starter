---
"ts-starter": minor
---

Turn the starter into a working template:

- Add `pnpm bootstrap <name>` — one command renames the package, rewrites the README/LICENSE placeholders, deletes the demo code and leaves a tested skeleton behind.
- Make subpath exports real: `tsdown` now builds one chunk per entry (`index`, `math`), so `your-lib/math` actually resolves. `test/pack.test.ts` verifies every built entry against a real `npm install` + `import`.
- Fix `pnpm test:coverage` (missing `@vitest/coverage-istanbul`) and add coverage thresholds as a CI gate.
- Fix the release workflow: it now runs on `push` to `main` so changesets opens the version PR and publishes on merge, instead of only reacting to tags.
- Mark the template itself `private` (the `ts-starter` npm name is taken); `pnpm bootstrap` removes the flag so generated packages publish normally.
- Sync the docs with reality: TypeScript 6, Node >= 24, `.mjs` output, `docs/api` is committed.
