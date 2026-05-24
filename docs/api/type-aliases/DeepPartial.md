[**ts-starter**](../README.md)

---

[ts-starter](../README.md) / DeepPartial

# Type Alias: DeepPartial\<T\>

> **DeepPartial**\<`T`\> = `T` _extends_ infer U[] ? `DeepPartial`\<`U`\>[] : `T` _extends_ (...`args`) => `unknown` ? `T` : `T` _extends_ `Date` \| `RegExp` ? `T` : `T` _extends_ `object` ? \{ \[P in keyof T\]?: T\[P\] extends null \| undefined ? T\[P\] : T\[P\] extends Date \| RegExp \| unknown\[\] \| ((args: (...)\[\]) =\> unknown) ? T\[P\] : DeepPartial\<T\[P\]\> \} : `T`

Defined in: [types.ts:29](https://github.com/freemode1614/ts-starter/blob/main/src/types.ts#L29)

Deep partial type - makes all properties optional recursively
Preserves arrays, functions, and built-in objects

## Type Parameters

### T

`T`
