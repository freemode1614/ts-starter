[**ts-starter**](../README.md)

***

[ts-starter](../README.md) / isDefined

# Function: isDefined()

> **isDefined**\<`T`\>(`value`): `value is T`

Defined in: [index.ts:78](https://github.com/freemode1614/ts-starter/blob/main/src/index.ts#L78)

Check if a value is not null or undefined

## Type Parameters

### T

`T`

## Parameters

### value

`T` \| `null` \| `undefined`

The value to check

## Returns

`value is T`

True if the value is not null or undefined

## Example

```ts
isDefined(null) // false
isDefined(undefined) // false
isDefined(0) // true
isDefined("") // true
```
