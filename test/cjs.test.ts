import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

/**
 * Smoke test for the built CJS artifact in `npm/`.
 * Exercises the `require()` path that real consumers use, catching
 * regressions in `shims`, `outExtensions`, and the CJS entrypoint
 * that source-only tests cannot detect.
 *
 * Runs after `pnpm build`; in CI the build job runs first.
 */
const require = createRequire(import.meta.url);
const cjsEntry = "../npm/index.cjs" as const;

interface CjsModule {
  add: (a: number, b: number) => number;
  capitalize: (s: string) => string;
  chunk: <T>(arr: T[], size: number) => T[][];
  clamp: (value: number, min: number, max: number) => number;
  isDefined: <T>(value: T | null | undefined) => value is T;
  multiply: (a: number, b: number) => number;
  sleep: (ms: number) => Promise<void>;
}

describe("cjs build artifact", () => {
  it("loads via require()", () => {
    const mod = require(cjsEntry) as CjsModule;
    expect(typeof mod.add).toBe("function");
    expect(typeof mod.capitalize).toBe("function");
    expect(typeof mod.chunk).toBe("function");
    expect(typeof mod.clamp).toBe("function");
    expect(typeof mod.isDefined).toBe("function");
    expect(typeof mod.multiply).toBe("function");
    expect(typeof mod.sleep).toBe("function");
  });

  it("exports behave like the source", () => {
    const mod = require(cjsEntry) as CjsModule;
    expect(mod.add(2, 3)).toBe(5);
    expect(mod.capitalize("hello")).toBe("Hello");
    expect(mod.chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
    expect(mod.clamp(10, 0, 5)).toBe(5);
    expect(mod.isDefined(0)).toBe(true);
    expect(mod.isDefined(null)).toBe(false);
    expect(mod.multiply(4, 5)).toBe(20);
  });
});
