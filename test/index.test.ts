import { capitalize, chunk, clamp, isDefined, sleep } from "@/index";
import { describe, expect, it } from "vitest";

describe("string utils", () => {
  it("capitalize should uppercase first letter", () => {
    expect(capitalize("hello")).toEqual("Hello");
    expect(capitalize("world")).toEqual("World");
  });

  it("capitalize should handle edge cases", () => {
    expect(capitalize("")).toEqual("");
    expect(capitalize("a")).toEqual("A");
    expect(capitalize("Hello")).toEqual("Hello");
    expect(capitalize("123")).toEqual("123");
  });
});

describe("array utils", () => {
  it("chunk should split array into groups", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    expect(chunk([], 3)).toEqual([]);
  });

  it("chunk should handle edge cases", () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
    expect(chunk([1, 2, 3], -1)).toEqual([]);
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });
});

describe("number utils", () => {
  it("clamp should restrict value within range", () => {
    expect(clamp(10, 0, 5)).toEqual(5);
    expect(clamp(-5, 0, 10)).toEqual(0);
    expect(clamp(5, 0, 10)).toEqual(5);
  });

  it("clamp should handle edge cases", () => {
    expect(clamp(0, 0, 10)).toEqual(0);
    expect(clamp(10, 0, 10)).toEqual(10);
    expect(clamp(5, 5, 5)).toEqual(5);
  });
});

describe("type utils", () => {
  it("isDefined should return true for defined values", () => {
    expect(isDefined(0)).toBe(true);
    expect(isDefined("")).toBe(true);
    expect(isDefined(false)).toBe(true);
    expect(isDefined([])).toBe(true);
    expect(isDefined({})).toBe(true);
  });

  it("isDefined should return false for null and undefined", () => {
    expect(isDefined(null)).toBe(false);
    expect(isDefined(undefined)).toBe(false);
  });
});

describe("async utils", () => {
  it("sleep should wait for specified duration", async () => {
    const start = Date.now();
    await sleep(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(45);
  });

  it("sleep should resolve immediately for 0ms", async () => {
    const start = Date.now();
    await sleep(0);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(50);
  });
});
