[**ts-starter**](../README.md)

***

[ts-starter](../README.md) / clamp

# Function: clamp()

> **clamp**(`value`, `min`, `max`): `number`

Defined in: [index.ts:58](https://github.com/freemode1614/ts-starter/blob/main/src/index.ts#L58)

Clamp a number between min and max values

## Parameters

### value

`number`

The input value

### min

`number`

The minimum value

### max

`number`

The maximum value

## Returns

`number`

The clamped value

## Example

```ts
clamp(10, 0, 5) // 5
clamp(-5, 0, 10) // 0
```
