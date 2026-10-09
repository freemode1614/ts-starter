import { execFile } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
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

const PACKAGE_NAME = "ts-starter";
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
    expect(typeof mod.add).toBe("function");
    expect(typeof mod.capitalize).toBe("function");
    expect(typeof mod.chunk).toBe("function");
    expect(typeof mod.clamp).toBe("function");
    expect(typeof mod.isDefined).toBe("function");
    expect(typeof mod.multiply).toBe("function");
    expect(typeof mod.sleep).toBe("function");
  });

  it("exported functions behave like the source", async () => {
    const { add, capitalize, chunk, clamp, isDefined, multiply } = await import(
      PACKAGE_NAME
    );
    expect(add(2, 3)).toBe(5);
    expect(capitalize("hello")).toBe("Hello");
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(clamp(10, 0, 5)).toBe(5);
    expect(isDefined(0)).toBe(true);
    expect(isDefined(null)).toBe(false);
    expect(multiply(4, 5)).toBe(20);
  });
});
