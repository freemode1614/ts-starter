[**ts-starter**](../README.md)

---

[ts-starter](../README.md) / DeepRequired

# Type Alias: DeepRequired\<T\>

> **DeepRequired**\<`T`\> = `T` _extends_ infer U[] ? `DeepRequired`\<`U`\>[] : `T` _extends_ (...`args`) => `unknown` ? `T` : `T` _extends_ `Date` \| `RegExp` ? `T` : `T` _extends_ `object` ? \{ \[P in keyof T\]-?: T\[P\] extends null \| undefined ? NonNullable\<T\[P\]\> : T\[P\] extends Date \| RegExp \| unknown\[\] \| ((args: (...)\[\]) =\> unknown) ? T\[P\] : DeepRequired\<T\[P\]\> \} : `T`

Defined in: [types.ts:69](https://github.com/freemode1614/ts-starter/blob/main/src/types.ts#L69)

Deep required type - makes all properties required recursively
Preserves arrays, functions, and built-in objects

## Type Parameters

### T

`T`
