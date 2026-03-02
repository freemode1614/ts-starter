<<<<<<< HEAD
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
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

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
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

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
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Sleep for a specified duration
 * @param ms - The duration in milliseconds
 * @returns A promise that resolves after the duration
 * @example
 * ```ts
 * await sleep(1000) // waits 1 second
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
=======
import fs from "node:fs";
import nodePath from "node:path";

const from_file = nodePath.resolve(process.cwd(), "./package.json");
const target_file = nodePath.resolve(process.cwd(), "./src/a.json");

const w_s = fs.createReadStream(from_file, "utf-8");
const r_s = fs.createWriteStream(target_file);

w_s.pipe(r_s);
>>>>>>> 1e861090e35e8ad596b4d345a41bd68fe6975129
