/**
 * String utilities
 */
/**
 * Capitalize the first letter of a string
 * @param str - The input string
 * @returns The capitalized string
 * @example
 * ```ts
 * capitalize("hello") // "Hello"
 * ```
 */
declare function capitalize(str: string): string;
/**
 * Array utilities
 */
/**
 * Split an array into chunks of specified size
 * @param arr - The input array
 * @param size - The chunk size
 * @returns An array of chunks
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * ```
 */
declare function chunk<T>(arr: T[], size: number): T[][];
/**
 * Number utilities
 */
/**
 * Clamp a number between min and max values
 * @param value - The input value
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns The clamped value
 * @example
 * ```ts
 * clamp(10, 0, 5) // 5
 * clamp(-5, 0, 10) // 0
 * ```
 */
declare function clamp(value: number, min: number, max: number): number;
/**
 * Type utilities
 */
/**
 * Check if a value is not null or undefined
 * @param value - The value to check
 * @returns True if the value is not null or undefined
 * @example
 * ```ts
 * isDefined(null) // false
 * isDefined(undefined) // false
 * isDefined(0) // true
 * isDefined("") // true
 * ```
 */
declare function isDefined<T>(value: T | null | undefined): value is T;
/**
 * Sleep for a specified duration
 * @param ms - The duration in milliseconds
 * @returns A promise that resolves after the duration
 * @example
 * ```ts
 * await sleep(1000) // waits 1 second
 * ```
 */
declare function sleep(ms: number): Promise<void>;

export { capitalize, chunk, clamp, isDefined, sleep };
