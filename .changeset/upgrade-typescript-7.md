---
"ts-starter": major
---

升级到 TypeScript 7.0（原生 Go 编译器，约 10x 提速）。

- 类型检查（`pnpm typecheck`）改用 `@typescript/native`（TS 7.0.2 原生编译器）
- 构建与文档（`pnpm build`、`pnpm typedoc`）暂保留 `typescript` 6.0.x——TS 7.0 暂未暴露编译器 API，待 TS 7.1 或工具链适配后切换
- 通过 npm alias 实现两版本并存，无需任何额外脚本