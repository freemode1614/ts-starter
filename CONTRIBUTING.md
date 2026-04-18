# Contributing to ts-starter

感谢你对 ts-starter 的兴趣！以下是参与贡献的指南。

## 开发环境

```bash
# 克隆仓库
git clone https://github.com/your-username/ts-starter.git
cd ts-starter

# 安装依赖
pnpm install

# 启动开发模式
pnpm dev
```

## 提交代码

### 分支命名

- `feat/*` - 新功能
- `fix/*` - Bug 修复
- `docs/*` - 文档更新
- `refactor/*` - 代码重构
- `test/*` - 测试相关

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

### 代码规范

项目使用 Biome 进行代码格式化和检查：

```bash
# 检查代码
pnpm lint

# 自动修复
pnpm lint:fix

# 格式化
pnpm format
```

提交前会自动运行 lint-staged 检查。

## 测试

```bash
# 运行测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage

# 类型检查
pnpm typecheck
```

## 创建变更集

如果修改会影响版本号，请创建变更集：

```bash
pnpm changeset
```

按照提示选择变更类型（major/minor/patch）并填写描述。

## 发布流程

1. 合并包含变更集的 PR 到 main 分支
2. Changesets 会创建版本更新 PR
3. 合并版本更新 PR
4. 自动发布到 npm

## 问题反馈

如果你发现了 bug 或有功能建议，请 [创建 Issue](https://github.com/your-username/ts-starter/issues/new)。

## 许可证

提交代码即表示你同意将代码授权给项目使用（MIT 许可证）。
