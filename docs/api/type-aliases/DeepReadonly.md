[**ts-starter**](../README.md)

---

[ts-starter](../README.md) / DeepReadonly

# Type Alias: DeepReadonly\<T\>

> **DeepReadonly**\<`T`\> = `T` _extends_ infer U[] ? `ReadonlyArray`\<`DeepReadonly`\<`U`\>\> : `T` _extends_ (...`args`) => `unknown` ? `T` : `T` _extends_ `Date` \| `RegExp` ? `T` : `T` _extends_ `object` ? \{ readonly \[P in keyof T\]: T\[P\] extends null \| undefined ? T\[P\] : T\[P\] extends Date \| RegExp \| unknown\[\] \| ((args: (...)\[\]) =\> unknown) ? T\[P\] : DeepReadonly\<T\[P\]\> \} : `T`

Defined in: [types.ts:49](https://github.com/freemode1614/ts-starter/blob/main/src/types.ts#L49)

Deep readonly type - makes all properties readonly recursively
Preserves arrays, functions, and built-in objects

## Type Parameters

### T

`T`
