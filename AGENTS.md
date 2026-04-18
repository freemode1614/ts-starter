# AGENTS.md

## 项目概述

这是一个 TypeScript 库项目模板（ts-starter），用于快速创建 TypeScript 库项目。

## 技术栈

- **包管理**: pnpm
- **构建工具**: tsdown
- **测试框架**: Vitest
- **代码规范**: Biome
- **文档生成**: TypeDoc + typedoc-plugin-markdown
- **版本发布**: Changesets

## 开发命令

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
| `pnpm typedoc` | 生成 API 文档到 `docs/api/` |

## 项目结构

```
src/
├── index.ts          # 主入口，导出所有工具函数和类型
├── types.ts          # 类型定义（DeepPartial, DeepReadonly 等）
└── utils/
    └── math.ts       # 数学工具函数

test/
├── index.test.ts     # 单元测试
├── alias.test.ts     # 路径别名测试
└── types.test.ts     # 类型测试

npm/                   # 构建产物（自动生成）
docs/api/             # API 文档（自动生成）
```

## 代码规范

- 使用 Biome 进行 lint 和 format
- TypeScript 严格模式
- 遵循现有代码风格和模式
- 所有新增代码必须通过 `pnpm lint` 和 `pnpm typecheck`

## 提交流程

1. 运行 `pnpm typecheck` 确保类型正确
2. 运行 `pnpm lint` 确保代码规范
3. 运行 `pnpm test` 确保测试通过
4. 提交时只提交必要的文件（避免提交 `npm/`、`docs/` 等自动生成目录，除非是首次添加配置）
5. 使用 `pnpm changeset` 创建变更集

## 注意事项

- `pnpm docs` 与 pnpm 官方命令冲突，请使用 `pnpm typedoc`
- 构建产物输出到 `npm/` 目录，包括 ESM (.js/.d.ts) 和 CJS (.cjs/.d.cts)
- 文档通过 TypeDoc 自动生成 Markdown 文件到 `docs/api/`
