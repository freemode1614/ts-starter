[**ts-starter**](../README.md)

***

[ts-starter](../README.md) / DeepPartial

# Type Alias: DeepPartial\<T\>

> **DeepPartial**\<`T`\> = `T` *extends* infer U[] ? `DeepPartial`\<`U`\>[] : `T` *extends* (...`args`) => `unknown` ? `T` : `T` *extends* `Date` \| `RegExp` ? `T` : `T` *extends* `object` ? \{ \[P in keyof T\]?: T\[P\] extends null \| undefined ? T\[P\] : T\[P\] extends Date \| RegExp \| unknown\[\] \| ((args: (...)\[\]) =\> unknown) ? T\[P\] : DeepPartial\<T\[P\]\> \} : `T`

Defined in: [types.ts:29](https://github.com/freemode1614/ts-starter/blob/main/src/types.ts#L29)

Deep partial type - makes all properties optional recursively
Preserves arrays, functions, and built-in objects

## Type Parameters

### T

`T`
