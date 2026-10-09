# Contributing to ts-starter

感谢你对 ts-starter 的兴趣！以下是参与贡献的指南。

## 目录

- [开发环境](#开发环境)
- [提交代码](#提交代码)
- [编码规范](#编码规范)
- [测试](#测试)
- [文档](#文档)
- [创建变更集](#创建变更集)
- [发布流程](#发布流程)
- [问题反馈](#问题反馈)
- [行为准则](#行为准则)
- [许可证](#许可证)

## 开发环境

### 环境要求

- **Node.js** >= 20（与 `package.json` 中的 `engines` 字段一致）
- **pnpm** 11.x（仓库通过 `packageManager` 锁定）

### 本地启动

```bash
# 克隆仓库
git clone https://github.com/freemode1614/ts-starter.git
cd ts-starter

# 安装依赖
pnpm install

# 启动开发模式（文件变更自动重建）
pnpm dev
```

## 提交代码

### 分支命名

- `feat/*` - 新功能
- `fix/*` - Bug 修复
- `docs/*` - 文档更新
- `refactor/*` - 代码重构
- `test/*` - 测试相关
- `chore/*` - 构建过程或辅助工具的变动

### 提交信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
类型(可选的作用域): 描述

[可选的正文]

[可选的脚注]
```

类型包括：

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

> **重要**：影响外部行为的提交（`feat`、`fix`、`BREAKING CHANGE` 脚注）必须配套一个 changeset。
> 见 [创建变更集](#创建变更集)。

### 提交流程

1. 从最新的 `main` 创建特性分支
2. 在该分支上提交你的修改
3. 确保 `pnpm lint`、`pnpm typecheck`、`pnpm test` 全部通过
4. 如果修改了公共 API，添加 changeset：`pnpm changeset`
5. 推送到你的 fork 并创建 Pull Request

提交前会自动运行 `lint-staged` 检查（见 `package.json`）。

## 编码规范

`pnpm lint` 会自动捕获大部分问题，但以下规则需要人工理解并遵守：

### TypeScript

- **严格模式**：`tsconfig.json` 已开启 `strict`、`noUnusedLocals`、
  `noUnusedParameters`、`noImplicitReturns`、`noFallthroughCasesInSwitch`。
  不要试图通过 `@ts-ignore` 或 `@ts-expect-error` 绕过它们。
- **避免 `any`**：必要时用 `unknown` 并在边界处收窄类型。
- **优先类型而非接口**作为公共 API 的返回值（`type` 字段在错误信息中更易读），
  接口用于描述对象的形状。
- **类型导入**：仅类型导入使用 `import type { ... }`，便于打包器 tree-shaking。
- **导入路径**：源码内部统一使用 `@/` 别名（`vitest.config.js` 与 `tsconfig.json`
  中已配置），不要混用相对路径。

### 代码风格

- **缩进**：2 个空格（Biome 已强制）
- **引号**：双引号（Biome 已强制）
- **尾逗号**：ES5 风格（数组、对象最后一个元素后保留逗号）
- **分号**：Biome 默认强制，**不要省略分号**
- **行宽**：建议不超过 100 字符，超出时优先重构而非换行

### 文件组织

- **`src/index.ts`**：唯一对外导出口，按功能分组（String / Array / Number /
  Async / Math / Types），每组前用 JSDoc 注释标注 `// <Group> utilities`
- **类型定义**：放在 `src/types.ts`，不要把类型与函数混在同一个文件里
- **工具函数**：按领域拆分到 `src/utils/<name>.ts`，每个文件导出一个或多个
  同主题的函数
- **避免循环依赖**：`src/index.ts` 是叶子节点，导入 `types.ts` 和 `utils/`
  而非反过来

### 命名约定

- 函数与变量：`camelCase`
- 类型与接口：`PascalCase`
- 常量：`UPPER_SNAKE_CASE`（仅用于模块级不可变值，如配置项）
- 文件名：`kebab-case.ts` 或 `camelCase.ts`（视模块复杂度而定，工具类优先 `camelCase`）
- 测试文件：与被测文件同名，后缀 `.test.ts`

### JSDoc

所有**对外导出**必须有 JSDoc，包含：

- 一句话功能描述
- 每个 `@param` 的说明
- `@returns` 的说明
- 至少一个 `@example` 代码块

JSDoc 同时是 TypeDoc 的数据源——它会被 `pnpm typedoc` 自动收集到 `docs/api/`。

示例：

````ts
/**
 * Capitalize the first letter of a string
 * @param str - The input string
 * @returns The capitalized string
 * @example
 * ```ts
 * capitalize("hello") // "Hello"
 * ```
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
````

### 函数设计

- **纯函数优先**：避免副作用，让函数易于测试和组合
- **不可变**：不要修改入参，返回新值
- **小而专一**：单个函数只做一件事，超过 ~40 行时考虑拆分
- **类型守卫**（`value is T`）：在过滤 `null` / `undefined` 的函数上使用，
  让调用方获得窄化后的类型

### 错误处理

- 抛出 `Error` 子类时附带可读的 `message`，包含失败原因与上下文
- 预期会失败的 API 使用 `Result<T, E>` 或显式抛错，**不要**返回 `null | undefined` 来表示错误
- `sleep` 这类边界工具除外

## 测试

### 运行测试

```bash
# 单元测试 + 类型测试（一次性运行）
pnpm test

# 监听模式（开发时）
pnpm vitest

# 覆盖率报告
pnpm test:coverage

# 类型检查
pnpm typecheck
```

### 编写测试

- **每个公共导出至少一个测试用例**
- 测试结构遵循 AAA（Arrange / Act / Assert）
- 每个 `describe` 块聚焦一个函数或一个主题
- 同时覆盖正常路径与边界情况（空数组、零值、`null` / `undefined`、负数等）
- 使用 `expectTypeOf`（Vitest 内置）编写类型测试，不要把类型断言写进运行时测试

### 覆盖率目标

- 目标 **>= 90%** 行覆盖率
- 100% 覆盖所有公共 API

## 文档

- **README.md**：面向用户的快速上手、API 示例、技术栈说明
- **AGENTS.md**：面向 AI Agent 的项目背景与命令清单
- **CONTRIBUTING.md**：本文档，面向贡献者
- **CODE_OF_CONDUCT.md**：行为准则
- **docs/api/**：由 `pnpm typedoc` 自动生成，不要手工编辑

修改公共 API 后，请同时更新：

1. `src/` 中的 JSDoc
2. `README.md` 中的 API 示例
3. 重新生成 API 文档：`pnpm typedoc`

## 创建变更集

如果修改会影响版本号或公共 API，请创建变更集：

```bash
pnpm changeset
```

按照提示选择变更类型（major / minor / patch）并填写描述：

- `major`：破坏性变更
- `minor`：向后兼容的新功能
- `patch`：向后兼容的 Bug 修复

变更集文件位于 `.changeset/` 下，文件名随机生成。**不要**手工编辑已经发布的 changeset。

## 发布流程

1. 合并包含 changeset 的 PR 到 `main` 分支
2. Changesets Action 自动创建版本更新 PR
3. 合并版本更新 PR
4. Release workflow 自动发布到 npm（需要 `NPM_TOKEN` 仓库密钥）

手动发布的命令：

```bash
pnpm changeset version   # 提升版本号
pnpm build               # 重新构建
pnpm changeset publish   # 发布到 npm
```

## 问题反馈

如果发现了 bug 或有功能建议，请
[创建 Issue](https://github.com/freemode1614/ts-starter/issues/new)。

提交 Issue 时请包含：

- 复现步骤
- 预期行为
- 实际行为
- Node.js 版本、`pnpm` 版本、操作系统
- 相关日志或截图

## 行为准则

参与本项目即表示你同意遵守 [Code of Conduct](./CODE_OF_CONDUCT.md)。
所有社区成员均有责任维护一个友好、包容的环境。

## 许可证

提交代码即表示你同意将代码授权给项目使用（[MIT](./LICENSE) 许可证）。
