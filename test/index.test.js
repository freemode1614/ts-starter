import { describe, expect, it } from "vitest";
import { capitalize, chunk, clamp } from "../src/index";

describe("string utils", () => {
  it("capitalize should uppercase first letter", () => {
    expect(capitalize("hello")).toEqual("Hello");
    expect(capitalize("world")).toEqual("World");
    expect(capitalize("")).toEqual("");
  });
});

describe("array utils", () => {
  it("chunk should split array into groups", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    expect(chunk([], 3)).toEqual([]);
  });
});

describe("number utils", () => {
  it("clamp should restrict value within range", () => {
    expect(clamp(10, 0, 5)).toEqual(5);
    expect(clamp(-5, 0, 10)).toEqual(0);
    expect(clamp(5, 0, 10)).toEqual(5);
  });
});
