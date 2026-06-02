/**
 * Type definitions for ts-starter
 */

/**
 * Represents a value that can be null or undefined
 */
export type Nullable<T> = T | null | undefined;

/**
 * Represents a function that takes arguments of type TArgs and returns a value of type TReturn
 */
export type Fn<TArgs extends unknown[] = unknown[], TReturn = unknown> = (
  ...args: TArgs
) => TReturn;

/**
 * Represents an asynchronous function
 */
export type AsyncFn<
  TArgs extends unknown[] = unknown[],
  TReturn = unknown,
> = Fn<TArgs, Promise<TReturn>>;

/**
 * Deep partial type - makes all properties optional recursively
 * Preserves arrays, functions, and built-in objects
 */
export type DeepPartial<T> = T extends (infer U)[]
  ? DeepPartial<U>[]
  : T extends (...args: unknown[]) => unknown
    ? T
    : T extends Date | RegExp
      ? T
      : T extends object
        ? {
            [P in keyof T]?: T[P] extends null | undefined
              ? T[P]
              : T[P] extends
                    | Date
                    | RegExp
                    | Array<unknown>
                    | ((...args: unknown[]) => unknown)
                ? T[P]
                : DeepPartial<T[P]>;
          }
        : T;

/**
 * Deep readonly type - makes all properties readonly recursively
 * Preserves arrays, functions, and built-in objects
 */
export type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends (...args: unknown[]) => unknown
    ? T
    : T extends Date | RegExp
      ? T
      : T extends object
        ? {
            readonly [P in keyof T]: T[P] extends null | undefined
              ? T[P]
              : T[P] extends
                    | Date
                    | RegExp
                    | Array<unknown>
                    | ((...args: unknown[]) => unknown)
                ? T[P]
                : DeepReadonly<T[P]>;
          }
        : T;

/**
 * Deep required type - makes all properties required recursively
 * Preserves arrays, functions, and built-in objects
 */
export type DeepRequired<T> = T extends (infer U)[]
  ? DeepRequired<U>[]
  : T extends (...args: unknown[]) => unknown
    ? T
    : T extends Date | RegExp
      ? T
      : T extends object
        ? {
            [P in keyof T]-?: T[P] extends null | undefined
              ? NonNullable<T[P]>
              : T[P] extends
                    | Date
                    | RegExp
                    | Array<unknown>
                    | ((...args: unknown[]) => unknown)
                ? T[P]
                : DeepRequired<T[P]>;
          }
        : T;
