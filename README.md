# ts-starter

一个现代化的 TypeScript 项目脚手架，用于快速创建 TypeScript 库项目。内置完整的开发、构建、测试和发布流程。

## 特性

- 🚀 **TypeScript 5** - 最新的 TypeScript 支持，严格类型检查
- 📦 **双模式构建** - 同时输出 ESM 和 CommonJS 格式
- 🎯 **零配置工具链** - tsup + Vitest + Biome，开箱即用
- 🔄 **Changesets 集成** - 自动化版本管理和发布
- 📁 **子路径导出** - 支持 `your-lib/utils` 这样的导入方式
- 🧪 **Vitest 测试** - 快速、现代的测试框架
- 🎨 **Biome 统一工具** - 一个工具处理 lint 和 format

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
| `pnpm test` | 运行单元测试 |
| `pnpm lint` | 运行 Biome 检查代码 |
| `pnpm lint:fix` | 运行 Biome 自动修复问题 |
| `pnpm format` | 使用 Biome 格式化代码 |

## 项目结构

```
my-lib/
├── src/                    # 源代码目录
│   └── index.ts            # 入口文件
├── test/                   # 测试目录
│   └── index.test.ts       # 单元测试文件
├── npm/                    # 构建输出目录（自动生成）
│   ├── index.js            # ESM 构建产物
│   ├── index.cjs           # CJS 构建产物
│   └── index.d.ts          # 类型声明文件
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── tsup.config.js          # 构建配置
├── vitest.config.js        # 测试配置
├── biome.json              # 代码规范配置
└── .changeset/             # Changeset 配置
```

## 技术栈

- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript
- [tsup](https://github.com/egoist/tsup) - 零配置 TypeScript 打包器
- [Vitest](https://vitest.dev/) - 下一代测试框架
- [Biome](https://biomejs.dev/) - 快速、统一的 linter 和 formatter
- [Changesets](https://github.com/changesets/changesets) - 版本管理和发布工具

## 发布流程

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
      "types": "./npm/index.d.ts",
      "import": "./npm/index.js",
      "require": "./npm/index.cjs"
    },
    "./*": {
      "types": "./npm/*.d.ts",
      "import": "./npm/*.js",
      "require": "./npm/*.cjs"
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

编辑 `tsup.config.js`：

```javascript
export default {
  entry: ['src/index.ts', 'src/utils.ts'],  // 添加新的入口
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  outDir: 'npm',
};
```

## 许可证

MIT
