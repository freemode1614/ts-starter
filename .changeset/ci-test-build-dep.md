---
"ts-starter": patch
---

Fix CI: run `pnpm build` in the `test` job before `pnpm test`. The CJS smoke test (`test/cjs.test.ts`) requires the artifact in `npm/`, which is gitignored and produced by the build.
