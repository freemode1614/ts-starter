import { add, multiply } from "@/utils/math.js";
import { describe, expect, it } from "vitest";

describe("path alias imports", () => {
  it("should import add from @/utils/math", () => {
    expect(add(2, 3)).toEqual(5);
    expect(add(-1, 1)).toEqual(0);
  });

  it("should import multiply from @/utils/math", () => {
    expect(multiply(2, 3)).toEqual(6);
    expect(multiply(4, 5)).toEqual(20);
  });
});
