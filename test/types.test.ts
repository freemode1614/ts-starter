import type { DeepPartial, DeepReadonly, DeepRequired } from "@/types";
import { describe, expectTypeOf, it } from "vitest";

interface TestUser {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
    zip: {
      code: string;
      prefix?: string;
    };
  };
  hobbies: string[];
  metadata: {
    created: Date;
    tags: string[];
  };
  callback: () => void;
}

describe("DeepPartial type", () => {
  it("should make all properties optional recursively", () => {
    type PartialUser = DeepPartial<TestUser>;

    // Top-level should be optional
    expectTypeOf<PartialUser>()
      .toHaveProperty("name")
      .toEqualTypeOf<string | undefined>();
    expectTypeOf<PartialUser>()
      .toHaveProperty("age")
      .toEqualTypeOf<number | undefined>();

    // Nested should be optional
    expectTypeOf<PartialUser>().toHaveProperty("address").toEqualTypeOf<
      | {
          street?: string;
          city?: string;
          zip?: {
            code?: string;
            prefix?: string;
          };
        }
      | undefined
    >();
  });

  it("should preserve arrays", () => {
    type PartialUser = DeepPartial<TestUser>;
    expectTypeOf<PartialUser["hobbies"]>().toEqualTypeOf<
      string[] | undefined
    >();
  });

  it("should preserve functions", () => {
    type PartialUser = DeepPartial<TestUser>;
    expectTypeOf<PartialUser["callback"]>().toEqualTypeOf<
      (() => void) | undefined
    >();
  });

  it("should preserve Date objects", () => {
    type PartialUser = DeepPartial<TestUser>;
    expectTypeOf<PartialUser>().toHaveProperty("metadata").toEqualTypeOf<
      | {
          created?: Date;
          tags?: string[];
        }
      | undefined
    >();
  });
});

describe("DeepReadonly type", () => {
  it("should make all properties readonly recursively", () => {
    type ReadonlyUser = DeepReadonly<TestUser>;

    // Top-level should be readonly
    expectTypeOf<ReadonlyUser>().toHaveProperty("name").toEqualTypeOf<string>();
  });

  it("should make arrays readonly", () => {
    type ReadonlyUser = DeepReadonly<TestUser>;
    expectTypeOf<ReadonlyUser["hobbies"]>().toMatchTypeOf<readonly string[]>();
    expectTypeOf<ReadonlyUser["metadata"]["tags"]>().toMatchTypeOf<
      readonly string[]
    >();
  });

  it("should preserve functions", () => {
    type ReadonlyUser = DeepReadonly<TestUser>;
    expectTypeOf<ReadonlyUser["callback"]>().toEqualTypeOf<() => void>();
  });
});

describe("DeepRequired type", () => {
  it("should make all properties required recursively", () => {
    type PartialUser = {
      name?: string;
      address?: {
        street?: string;
        city?: string;
      };
    };

    type RequiredUser = DeepRequired<PartialUser>;

    // Check that properties are required and have correct types
    expectTypeOf<RequiredUser>().toHaveProperty("name").toEqualTypeOf<string>();
    expectTypeOf<RequiredUser>().toHaveProperty("address").toBeObject();
    expectTypeOf<RequiredUser["address"]>()
      .toHaveProperty("street")
      .toEqualTypeOf<string>();
    expectTypeOf<RequiredUser["address"]>()
      .toHaveProperty("city")
      .toEqualTypeOf<string>();
  });
});
