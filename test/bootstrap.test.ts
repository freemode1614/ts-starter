import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");
const SCRIPT = path.join(PROJECT_ROOT, "scripts/bootstrap.mjs");

let workdir: string;

/**
 * Copy just enough of the template for the script to work on it.
 */
async function fixture() {
  await mkdir(path.join(workdir, "src/utils"), { recursive: true });
  await mkdir(path.join(workdir, "test"), { recursive: true });

  await writeFile(
    path.join(workdir, "package.json"),
    JSON.stringify({
      name: "ts-starter",
      version: "0.1.0",
      private: true,
      keywords: ["ts-starter", "typescript library"],
      scripts: { bootstrap: "node scripts/bootstrap.mjs" },
    })
  );
  await writeFile(
    path.join(workdir, "LICENSE"),
    "MIT License\n\nCopyright (c) 2024 FREEMODE1614\n\nPermission is hereby granted...\n"
  );
  await writeFile(
    path.join(workdir, "src/index.ts"),
    "export const demo = 1;\n"
  );
  await writeFile(
    path.join(workdir, "src/types.ts"),
    "export type Demo = 1;\n"
  );
  await writeFile(
    path.join(workdir, "src/utils/math.ts"),
    "export const x = 1;\n"
  );
  await writeFile(
    path.join(workdir, "test/types.test.ts"),
    "it('x', () => {});\n"
  );
  await writeFile(
    path.join(workdir, "README.md"),
    '# ts-starter\n\n## 快速开始\n\n### 使用模板创建项目\n\n```bash\ngit clone https://github.com/freemode1614/ts-starter.git my-lib\n```\n\n### 初始化配置\n\n手动改。\n\n## 可用脚本\n\n| 命令 |\n| --- |\n\n## API 示例\n\n```ts\nimport { capitalize } from "your-lib";\n```\n\n## 技术栈\n\n- TS\n'
  );
  await writeFile(
    path.join(workdir, "tsdown.config.js"),
    'export default defineConfig(() => ({\n  entry: {\n    index: "./src/index.ts",\n    math: "./src/utils/math.ts",\n  },\n}));\n'
  );
}

beforeEach(async () => {
  workdir = await mkdtemp(path.join(tmpdir(), "ts-starter-bootstrap-"));
  await fixture();
});

afterEach(async () => {
  await rm(workdir, { recursive: true, force: true });
});

async function run(args: string[]) {
  await execFileAsync("node", [SCRIPT, ...args], { cwd: workdir });
}

describe("bootstrap", () => {
  it("rewrites the package identity and makes it publishable", async () => {
    await run(["my-lib", "--description", "我的库", "--author", "张三"]);

    const pkg = JSON.parse(
      await readFile(path.join(workdir, "package.json"), "utf8")
    );
    expect(pkg.name).toBe("my-lib");
    expect(pkg.description).toBe("我的库");
    expect(pkg.version).toBe("0.1.0");
    expect(pkg.private).toBeUndefined();
  });

  it("rewrites the LICENSE holder", async () => {
    await run(["my-lib", "--author", "张三"]);

    const license = await readFile(path.join(workdir, "LICENSE"), "utf8");
    expect(license).toContain("Copyright (c) ");
    expect(license).toContain("张三");
    expect(license).not.toContain("FREEMODE1614");
  });

  it("replaces README placeholders", async () => {
    await run(["my-lib"]);

    const readme = await readFile(path.join(workdir, "README.md"), "utf8");
    expect(readme).toContain("# my-lib");
    expect(readme).toContain("npm install my-lib");
    expect(readme).toContain('import { hello } from "my-lib"');
    expect(readme).not.toContain("your-lib");
  });

  it("removes demo code and leaves a tested skeleton", async () => {
    await run(["my-lib"]);

    await expect(
      readFile(path.join(workdir, "src/types.ts"), "utf8")
    ).rejects.toThrow();
    await expect(
      readFile(path.join(workdir, "src/utils/math.ts"), "utf8")
    ).rejects.toThrow();

    const index = await readFile(path.join(workdir, "src/index.ts"), "utf8");
    expect(index).toContain("export function hello");

    const test = await readFile(
      path.join(workdir, "test/index.test.ts"),
      "utf8"
    );
    expect(test).toContain('import { hello } from "@/index"');
  });

  it("drops the demo subpath from the build config", async () => {
    await run(["my-lib"]);

    const config = await readFile(
      path.join(workdir, "tsdown.config.js"),
      "utf8"
    );
    expect(config).not.toContain("math");
    expect(config).toContain("index");
  });

  it("removes the scaffold script and its npm script", async () => {
    await run(["my-lib"]);

    await expect(
      readFile(path.join(workdir, "scripts/bootstrap.mjs"), "utf8")
    ).rejects.toThrow();

    const pkg = JSON.parse(
      await readFile(path.join(workdir, "package.json"), "utf8")
    );
    expect(pkg.scripts.bootstrap).toBeUndefined();
    expect(pkg.keywords).not.toContain("ts-starter");
  });

  it("drops stale generated docs and pending changesets", async () => {
    await mkdir(path.join(workdir, "docs/api"), { recursive: true });
    await mkdir(path.join(workdir, ".changeset"), { recursive: true });
    await writeFile(path.join(workdir, "docs/api/README.md"), "stale");
    await writeFile(path.join(workdir, ".changeset/config.json"), "{}");
    await writeFile(path.join(workdir, ".changeset/README.md"), "keep");
    await writeFile(path.join(workdir, ".changeset/pending.md"), "drop");

    await run(["my-lib"]);

    await expect(
      readFile(path.join(workdir, "docs/api/README.md"), "utf8")
    ).rejects.toThrow();
    await expect(
      readFile(path.join(workdir, ".changeset/config.json"), "utf8")
    ).resolves.toBeTruthy();
    await expect(
      readFile(path.join(workdir, ".changeset/pending.md"), "utf8")
    ).rejects.toThrow();
  });

  it("rejects invalid package names", async () => {
    await expect(run(["My Lib"])).rejects.toThrow();
  });
});
