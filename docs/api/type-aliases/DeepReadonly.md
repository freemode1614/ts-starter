[**ts-starter**](../README.md)

***

[ts-starter](../README.md) / DeepReadonly

# Type Alias: DeepReadonly\<T\>

> **DeepReadonly**\<`T`\> = `T` *extends* infer U[] ? `ReadonlyArray`\<`DeepReadonly`\<`U`\>\> : `T` *extends* (...`args`) => `unknown` ? `T` : `T` *extends* `Date` \| `RegExp` ? `T` : `T` *extends* `object` ? \{ readonly \[P in keyof T\]: T\[P\] extends null \| undefined ? T\[P\] : T\[P\] extends Date \| RegExp \| unknown\[\] \| ((args: (...)\[\]) =\> unknown) ? T\[P\] : DeepReadonly\<T\[P\]\> \} : `T`

Defined in: [types.ts:53](https://github.com/freemode1614/ts-starter/blob/main/src/types.ts#L53)

Deep readonly type - makes all properties readonly recursively
Preserves arrays, functions, and built-in objects

## Type Parameters

### T

`T`
