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
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep readonly type - makes all properties readonly recursively
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
