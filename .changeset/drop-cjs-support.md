---
"ts-starter": minor
---

Drop CommonJS support: remove CJS build from `tsdown.config.js`, delete `test/cjs.test.ts`, and simplify `package.json` `exports` to ESM-only (`types` + `default`). Update README, CONTRIBUTING, AGENTS, and CI accordingly.