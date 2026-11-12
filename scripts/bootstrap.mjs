#!/usr/bin/env node
/**
 * Scaffold a new project from this template.
 *
 * Usage:
 *   pnpm bootstrap <package-name> [--description "..."] [--author "..."]
 *
 * Rewrites the identity of the template (package name, README, LICENSE),
 * removes the demo code, and leaves a minimal, tested skeleton behind.
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

const ROOT = process.cwd();

/** @param {string} name */
function assertName(name) {
  if (!/^[a-z0-9][a-z0-9-._]*$/.test(name)) {
    console.error(
      `Invalid package name "${name}". Use lowercase letters, digits, "-", "." or "_".`
    );
    process.exit(1);
  }
}

/**
 * @param {string} file
 * @param {string} content
 */
function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content, "utf8");
}

/**
 * @param {string} file
 */
function read(file) {
  return readFileSync(file, "utf8");
}

/**
 * Replace the content between two markers. Missing markers are a no-op.
 * @param {string} text
 * @param {string} startMarker
 * @param {string} endMarker
 * @param {string} replacement
 */
function replaceSection(text, startMarker, endMarker, replacement) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) return text;
  return text.slice(0, start) + replacement + text.slice(end);
}

const SRC_INDEX = `/**
 * Say hello
 * @param name - The name to greet
 * @returns The greeting
 * @example
 * \`\`\`ts
 * hello("world") // "Hello, world!"
 * \`\`\`
 */
export function hello(name: string): string {
  return \`Hello, \${name}!\`;
}
`;

const TEST_INDEX = `import { describe, expect, it } from "vitest";
import { hello } from "@/index";

describe("hello", () => {
  it("should greet the given name", () => {
    expect(hello("world")).toBe("Hello, world!");
  });
});
`;

const TEST_ALIAS = `import { describe, expect, it } from "vitest";
import { hello } from "@/index";

describe("path alias imports", () => {
  it("should import from @/index", () => {
    expect(hello("alias")).toBe("Hello, alias!");
  });
});
`;

function main() {
  const args = process.argv.slice(2);
  const name = args.find((a) => !a.startsWith("--"));
  const flag = (key, fallback) => {
    const i = args.indexOf(key);
    return i === -1 ? fallback : args[i + 1];
  };

  if (!name) {
    console.error(
      'Usage: pnpm bootstrap <package-name> [--description "..."] [--author "..."]'
    );
    process.exit(1);
  }
  assertName(name);

  const description = flag("--description", `${name} - A TypeScript library`);
  const author = flag("--author", name);

  // 1. package.json: identity + publishable
  const pkg = JSON.parse(read(join(ROOT, "package.json")));
  pkg.name = name;
  pkg.description = description;
  pkg.version = "0.1.0";
  delete pkg.private;
  if (Array.isArray(pkg.keywords)) {
    pkg.keywords = pkg.keywords.filter((k) => k !== "ts-starter");
  }
  delete pkg.scripts.bootstrap;
  write(join(ROOT, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);

  // 2. LICENSE: copyright holder
  const licensePath = join(ROOT, "LICENSE");
  if (existsSync(licensePath)) {
    write(
      licensePath,
      read(licensePath).replace(
        /Copyright \(c\) \d{4}.*/,
        `Copyright (c) ${new Date().getFullYear()} ${author}`
      )
    );
  }

  // 3. README: tokens, quick start and API examples
  const readmePath = join(ROOT, "README.md");
  if (existsSync(readmePath)) {
    let readme = read(readmePath).replaceAll("your-lib", name);
    readme = readme.replace(/^# ts-starter$/m, `# ${name}`);
    readme = replaceSection(
      readme,
      "### 使用模板创建项目",
      "## 可用脚本",
      `\`\`\`bash\nnpm install ${name}\n\`\`\`\n\n\`\`\`typescript\nimport { hello } from "${name}";\n\nhello("world"); // "Hello, world!"\n\`\`\`\n\n`
    );
    readme = replaceSection(
      readme,
      "## API 示例",
      "## 技术栈",
      `## API 示例\n\n\`\`\`typescript\nimport { hello } from "${name}";\n\nhello("world"); // "Hello, world!"\n\`\`\`\n\n`
    );
    write(readmePath, readme);
  }

  // 4. Remove the demo code, leave a tested skeleton behind
  rmSync(join(ROOT, "src/types.ts"), { force: true });
  rmSync(join(ROOT, "src/utils"), { recursive: true, force: true });
  rmSync(join(ROOT, "test/types.test.ts"), { force: true });
  rmSync(join(ROOT, "test/bootstrap.test.ts"), { force: true });
  rmSync(join(ROOT, "scripts/bootstrap.mjs"), { force: true });
  write(join(ROOT, "src/index.ts"), SRC_INDEX);
  write(join(ROOT, "test/index.test.ts"), TEST_INDEX);
  write(join(ROOT, "test/alias.test.ts"), TEST_ALIAS);

  // 5. Drop stale generated docs and pending changesets
  rmSync(join(ROOT, "docs"), { recursive: true, force: true });
  const changesetDir = join(ROOT, ".changeset");
  if (existsSync(changesetDir)) {
    for (const file of readdirSync(changesetDir)) {
      // Keep config.json and README.md, drop the pending changeset entries.
      if (file.endsWith(".md") && file !== "README.md") {
        rmSync(join(changesetDir, file), { force: true });
      }
    }
  }

  // 6. tsdown.config.js: drop the demo subpath entry
  const tsdownPath = join(ROOT, "tsdown.config.js");
  if (existsSync(tsdownPath)) {
    write(
      tsdownPath,
      read(tsdownPath).replace(
        /entry:\s*\{[^}]*\}/,
        'entry: {\n    index: "./src/index.ts",\n  }'
      )
    );
  }

  console.log(`\n✔ Scaffolded "${name}"\n`);
  console.log("Next steps:");
  console.log("  1. pnpm install && pnpm test");
  console.log('  2. git init && git commit -m "chore: initial commit"');
}

main();
