import { execFile } from "node:child_process";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);

/**
 * Smoke test for the **published artifact**: pack the package, install it
 * into an isolated pnpm prefix, and `import` it exactly like a real
 * consumer would. This catches regressions that source-level tests miss:
 *
 * - `package.json` `exports` pointing at the wrong filename (e.g. `.js`
 *   when tsdown actually emits `.mjs`) → `ERR_MODULE_NOT_FOUND` at consumer
 *   `import` time, while the library's own tests still pass.
 * - d.ts / d.mts emit mismatches.
 * - `engines` / `type` regressions.
 *
 * Runs after `pnpm build`; CI's `test` job runs build first.
 */

// Read the name from package.json so the test survives `pnpm bootstrap`.
const PACKAGE_NAME = JSON.parse(
  await readFile(path.resolve(import.meta.dirname, "../package.json"), "utf8")
).name;

const PROJECT_ROOT = path.resolve(import.meta.dirname, "..");

interface ConsumerCtx {
  prefix: string;
}

let ctx: ConsumerCtx;

beforeAll(async () => {
  // Isolated pnpm prefix so we don't touch the repo's node_modules.
  ctx = {
    prefix: await mkdtemp(path.join(tmpdir(), "ts-starter-consumer-")),
  };

  // Pack → install into the temp prefix. `file:` deps with `npm` folder
  // install the contents directly without needing a registry publish.
  await execFileAsync("pnpm", ["pack", "--pack-destination", ctx.prefix], {
    cwd: PROJECT_ROOT,
  });

  const tarball = (await execFileAsync("ls", [ctx.prefix])).stdout
    .split("\n")
    .find((f) => f.endsWith(".tgz"));
  if (!tarball) throw new Error("pnpm pack produced no tarball");

  await execFileAsync(
    "npm",
    [
      "install",
      "--silent",
      "--no-audit",
      "--no-fund",
      path.join(ctx.prefix, tarball),
    ],
    { cwd: ctx.prefix }
  );
}, 60_000);

afterAll(async () => {
  if (ctx?.prefix) await rm(ctx.prefix, { recursive: true, force: true });
});

describe("published ESM artifact", () => {
  it("imports via the package name (default condition)", async () => {
    const mod = await import(PACKAGE_NAME);
    expect(Object.keys(mod).length).toBeGreaterThan(0);
  });

  it("resolves every built entry as a subpath export", async () => {
    // The `exports` map uses a `./*` wildcard, so each file tsdown emits
    // must be reachable as `<pkg>/<name>`. This is what used to break:
    // the wildcard pointed at files the build never produced.
    const buildDir = path.join(PROJECT_ROOT, "npm");
    const files = await readdir(buildDir);
    const entries = files.filter((f) => f.endsWith(".mjs"));

    expect(entries.length).toBeGreaterThan(0);

    for (const file of entries) {
      const name = file.replace(/\.mjs$/, "");
      const mod = await import(`${PACKAGE_NAME}/${name}`);
      expect(Object.keys(mod).length).toBeGreaterThan(0);
    }
  });

  it("exports the same API as the source entry", async () => {
    // Compares the built artifact against the source module, so this test
    // keeps working after `pnpm bootstrap` replaced the demo exports.
    const artifact = await import(PACKAGE_NAME);
    const source = await import("@/index");

    expect(Object.keys(artifact).sort()).toEqual(Object.keys(source).sort());
  });
});
