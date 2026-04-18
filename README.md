# ts-starter

[![npm version](https://img.shields.io/npm/v/ts-starter)](https://www.npmjs.com/package/ts-starter)
[![CI](https://github.com/your-username/ts-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/ts-starter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个现代化的 TypeScript 项目脚手架，用于快速创建 TypeScript 库项目。内置完整的开发、构建、测试和发布流程。

## 特性

- 🚀 **TypeScript 5** - 最新的 TypeScript 支持，严格类型检查
- 📦 **双模式构建** - 同时输出 ESM 和 CJS，兼容所有环境
- 🎯 **零配置工具链** - tsdown + Vitest + Biome，开箱即用
- 🔄 **自动化发布** - Changesets + GitHub Actions，一键发布
- 📁 **子路径导出** - 支持 `your-lib/utils` 这样的导入方式
- 🧪 **完整测试** - 单元测试 + 类型测试，覆盖率追踪
- 🎨 **代码规范** - Biome 统一处理 lint 和 format
- 📖 **自动生成文档** - TypeDoc 自动生成 API 文档

## 快速开始

### 使用模板创建项目

```bash
# 克隆模板
git clone https://github.com/your-username/ts-starter.git my-lib
cd my-lib

# 删除 git 历史，初始化新项目
rm -rf .git
git init
git add .
git commit -m "Initial commit"

# 安装依赖
pnpm install
```

### 初始化配置

```bash
# 修改 package.json 中的项目名称、描述等信息
# 修改 LICENSE 文件中的作者信息
# 更新 README.md 为你项目的文档
```

## 可用脚本

| 命令 | 描述 |
|------|------|
| `pnpm dev` | 开发模式，文件变更自动重新构建 |
| `pnpm build` | 生产构建，输出到 `npm/` 目录 |
| `pnpm build:check` | 检查包导出是否正确（attw） |
| `pnpm test` | 运行单元测试和类型测试 |
| `pnpm test:coverage` | 运行测试并生成覆盖率报告 |
| `pnpm typecheck` | TypeScript 类型检查 |
| `pnpm lint` | 运行 Biome 检查代码 |
| `pnpm lint:fix` | 运行 Biome 自动修复问题 |
| `pnpm format` | 使用 Biome 格式化代码 |
| `pnpm docs` | 生成 API 文档 |

## 项目结构

```
my-lib/
├── src/                    # 源代码目录
│   ├── index.ts            # 主入口文件
│   ├── types.ts            # 类型定义
│   └── utils/              # 工具函数目录
│       └── math.ts
├── test/                   # 测试目录
│   ├── index.test.ts       # 单元测试
│   ├── alias.test.ts       # 路径别名测试
│   └── types.test.ts       # 类型测试
├── npm/                    # 构建输出目录（自动生成）
│   ├── index.js            # ESM 构建产物
│   ├── index.cjs           # CJS 构建产物
│   ├── index.d.ts          # ESM 类型声明
│   └── index.d.cts         # CJS 类型声明
├── .github/
│   └── workflows/          # GitHub Actions 工作流
│       ├── ci.yml          # CI 工作流
│       └── release.yml     # 自动发布工作流
├── docs/                   # 文档目录
│   └── api/               # 自动生成的 API 文档
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── tsdown.config.js        # 构建配置
├── vitest.config.js        # 测试配置
├── biome.json              # 代码规范配置
├── typedoc.config.ts       # 文档生成配置
├── .changeset/             # Changeset 配置
├── .husky/                 # Git hooks
└── CONTRIBUTING.md         # 贡献指南
```

## API 示例

### 字符串工具

```typescript
import { capitalize } from 'your-lib';

capitalize("hello") // "Hello"
capitalize("world") // "World"
```

### 数组工具

```typescript
import { chunk } from 'your-lib';

chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3], 1)       // [[1], [2], [3]]
```

### 数字工具

```typescript
import { clamp } from 'your-lib';

clamp(10, 0, 5)  // 5
clamp(-5, 0, 10) // 0
clamp(5, 0, 10)  // 5
```

### 类型工具

```typescript
import type { DeepPartial, DeepReadonly, DeepRequired } from 'your-lib';

interface User {
  name: string;
  address: {
    city: string;
    zip: string;
  };
}

// 所有属性变为可选（递归）
type PartialUser = DeepPartial<User>;
// { name?: string; address?: { city?: string; zip?: string; } }

// 所有属性变为只读（递归）
type ReadonlyUser = DeepReadonly<User>;
// { readonly name: string; readonly address: { readonly city: string; readonly zip: string; } }

// 所有属性变为必填（递归）
type RequiredUser = DeepRequired<PartialUser>;
// { name: string; address: { city: string; zip: string; } }
```

### 异步工具

```typescript
import { sleep } from 'your-lib';

async function example() {
  console.log('开始');
  await sleep(1000); // 等待 1 秒
  console.log('结束');
}
```

## 技术栈

- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- [tsdown](https://github.com/rolldown/tsdown) - 基于 Rolldown 的 TypeScript 打包器
- [Vitest](https://vitest.dev/) - 下一代测试框架
- [Biome](https://biomejs.dev/) - 快速、统一的 linter 和 formatter
- [Changesets](https://github.com/changesets/changesets) - 版本管理和发布工具
- [TypeDoc](https://typedoc.org/) - TypeScript 文档生成器

## 发布流程

本项目使用 Changesets 进行自动化版本管理和发布：

### 手动发布

1. **创建变更集**
   ```bash
   pnpm changeset
   ```

2. **提升版本号**
   ```bash
   pnpm changeset version
   ```

3. **发布到 npm**
   ```bash
   pnpm publish
   ```

### 自动发布（推荐）

1. 创建包含变更集的 PR
2. 合并到 main 分支
3. GitHub Actions 自动创建版本更新 PR
4. 合并版本更新 PR
5. 自动发布到 npm

需要配置 `NPM_TOKEN` 仓库密钥。

## 模块导出

模板已配置好子路径导出，支持以下导入方式：

```typescript
// 主入口
import { foo } from 'your-lib';

// 子路径入口
import { bar } from 'your-lib/utils';
```

在 `package.json` 中配置：

```json
{
  "exports": {
    ".": {
      "import": {
        "types": "./npm/index.d.ts",
        "default": "./npm/index.js"
      },
      "require": {
        "types": "./npm/index.d.cts",
        "default": "./npm/index.cjs"
      }
    },
    "./*": {
      "import": {
        "types": "./npm/*.d.ts",
        "default": "./npm/*.js"
      },
      "require": {
        "types": "./npm/*.d.cts",
        "default": "./npm/*.cjs"
      }
    }
  }
}
```

## 自定义配置

### 添加新的源码文件

1. 在 `src/` 目录下创建新文件，例如 `src/utils.ts`
2. 重新运行 `pnpm build`
3. 构建产物会自动生成到 `npm/utils.js` 等

### 修改构建配置

编辑 `tsdown.config.js`：

```javascript
import { defineConfig } from "tsdown";

export default defineConfig((config) => {
  return [
    // ESM build
    {
      entry: ["./src/index.ts"],
      outDir: "./npm",
      format: "esm",
      dts: true,
      sourcemap: config.sourcemap,
      clean: config.sourcemap,
      treeshake: true,
    },
    // CJS build
    {
      entry: ["./src/index.ts"],
      outDir: "./npm",
      format: "cjs",
      sourcemap: config.sourcemap,
      clean: false,
      treeshake: true,
      shims: true,
    },
  ];
});
```

## 贡献

欢迎提交 Issue 和 PR！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详细信息。

## 许可证

MIT
