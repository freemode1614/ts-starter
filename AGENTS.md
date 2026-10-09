# AGENTS.md

## 项目概述

这是一个 TypeScript 库项目模板（ts-starter），用于快速创建 TypeScript 库项目。

## 技术栈

- **包管理**: pnpm 11.x
- **运行时**: Node.js >= 20（由 `engines` 字段强制）
- **构建工具**: tsdown（基于 Rolldown）
- **测试框架**: Vitest（含 `expectTypeOf` 类型测试）
- **代码规范**: Biome (lint + format) + tsc --noEmit (type check)
- **文档生成**: TypeDoc + typedoc-plugin-markdown
- **版本发布**: Changesets
- **包验证**: attw（`@arethetypeswrong/cli`）

## 开发命令

| 命令                  | 描述                            |
| --------------------- | ------------------------------- |
| `pnpm dev`            | 开发模式，文件变更自动重新构建  |
| `pnpm build`          | 生产构建，输出到 `npm/` 目录    |
| `pnpm build:check`    | 检查包导出是否正确（attw）      |
| `pnpm test`           | 运行单元测试和类型测试          |
| `pnpm test:coverage`  | 运行测试并生成覆盖率报告        |
| `pnpm lint`           | 运行 biome check 检查代码       |
| `pnpm lint:fix`       | 运行 biome check 自动修复问题   |
| `pnpm format`         | 使用 biome format 格式化代码    |
| `pnpm typecheck`      | 使用 tsc --noEmit 检查类型      |
| `pnpm typedoc`        | 生成 API 文档到 `docs/api/`     |
| `pnpm changeset`     | 创建变更集（发布前必备）        |

## 项目结构

```
src/
├── index.ts             # 主入口，按功能分组导出
├── types.ts             # 类型定义（DeepPartial, DeepReadonly 等）
└── utils/
    └── math.ts          # 数学工具函数

test/
├── index.test.ts        # 单元测试
├── alias.test.ts        # 路径别名测试（@/ 别名解析）
└── types.test.ts        # 类型测试（expectTypeOf）

npm/                     # 构建产物（自动生成，gitignored）
docs/api/                # API 文档（自动生成）

.github/
├── workflows/
│   ├── ci.yml           # CI：lint / test / build / typecheck
│   └── release.yml      # Release：tag 触发 changesets publish
├── dependabot.yml       # Dependabot：分组 dev-dependencies
└── ...

.changeset/              # Changeset 配置 + 待发布变更集
.husky/                   # Git hooks（pre-commit → lint-staged）
```

## 代码规范

- 使用 Biome 进行 lint 和 format，tsc --noEmit 进行类型检查
- TypeScript 严格模式（`strict`、`noUnusedLocals`、`noImplicitReturns` 等）
- 路径别名：`@/...` 指向 `src/...`，源码内部统一使用别名
- 所有公共导出必须有 JSDoc（`@param` / `@returns` / `@example`）
- 类型导入使用 `import type { ... }`
- 所有新增代码必须通过 `pnpm lint` 与 `pnpm typecheck`

详细的编码规范见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 提交流程

> ⚠️ **`main` 分支受保护**：不能直接 push 到 main，必须通过 PR 合并，且必须 CI 全部通过。

### 修改代码的标准流程

1. **从最新 main 创建特性分支**

   ```bash
   git checkout main
   git pull --ff-only
   git checkout -b <type>/<scope>   # 例如 feat/utils-debounce、fix/empty-array
   ```

2. **修改后本地验证**（合并前必跑）

   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   pnpm build              # 修改公共 API 时
   pnpm build:check        # 修改导出配置时
   ```

3. **如果修改影响公共 API，创建 changeset**

   ```bash
   pnpm changeset
   # 按提示选择 major / minor / patch 并填写描述
   ```

4. **提交并推送**

   ```bash
   git add <files>                  # 不要 add npm/、docs/、coverage/、pnpm-lock.yaml 之外的自动产物
   git commit -m "<type>(scope): description"   # Conventional Commits
   git push -u origin <branch>
   ```

5. **创建 PR 等待 CI 通过后合并**

   ```bash
   gh pr create --base main
   # 等待 GitHub 上 Lint / Test / Build / Type Check 4 个 check 全部 ✓
   gh pr merge --squash --delete-branch
   ```

### 提交信息规范（Conventional Commits）

```
feat(scope): add new function
fix(scope): correct edge case
chore(deps): bump package
docs: update README
refactor(scope): simplify logic
test: add coverage
```

类型包括：`feat` / `fix` / `docs` / `style` / `refactor` / `perf` / `test` / `chore` / `build` / `ci`

## 注意事项

- `pnpm docs` 与 pnpm 官方命令冲突，请使用 `pnpm typedoc`
- 构建产物输出到 `npm/` 目录（gitignored），仅 ESM（`.js` / `.d.mts`）
- 文档通过 TypeDoc 自动生成 Markdown 文件到 `docs/api/`
- `npm/`、`docs/`、`coverage/`、`*.tsbuildinfo` 都不应提交
- **不要**手动编辑 `.changeset/` 下已发布的 changeset
- **不要**直接 push 到 `main`（分支保护会拒绝），必须通过 PR
- **不要**强制 push 到 `main`（保护规则禁止 force-push 到 main）

## 参考文档

- [README.md](./README.md) — 用户视角的快速上手、API 示例
- [CONTRIBUTING.md](./CONTRIBUTING.md) — 完整的贡献指南（编码规范、测试、发布）
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) — 社区行为准则（Contributor Covenant v2.1）
