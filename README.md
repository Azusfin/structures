# @azusfin/structures
> Implementations of Data Structures

# API Documentation
https://azusfin.github.io/structures

# Table Of Contents
- [BitSet](#bitset)
- [Uint4Array](#uint4array)

## BitSet
A static-length array to work with bytes in bit-level

- [Init](#init-bitset)
- [Set](#set-bit)
- [Get](#get-bit)
- [Flip](#flip-bit)
- [Clear](#clear-bit)

### Init BitSet
```js
import { BitSet } from "@azusfin/structures"

const bitsAmount = 64
const bitSet = new BitSet(bitsAmount)
```

### Set Bit
```js
const index = 31
bitSet.set(index)
```

### Get Bit
```js
bitSet.get(31) // true
bitSet.get(4) // false
```

### Flip BIt
```js
bitSet.flip(31)
bitSet.flip(4)

bitSet.get(31) // false
bitSet.get(4) // true
```

### Clear Bit
```js
bitSet.clear(31)
bitSet.clear(4)

bitSet.get(31) // false
bitSet.get(4) // false
```

## Uint4Array
An array where each element occupies 4 bits

- [Init](#init-uint4array)
- [Set](#set-uint4array)
- [Get](#get-uint4array)

### Init Uint4Array
```js
import { Uint4Array } from "@azusfin/structures"

const length = 8
const array = new Uint4Array(length)
```

### Set Uint4Array
```js
const offset = 3
array.set(offset, 12)
array.set(1, 6)
array.set(5, 3)
```

### Get Uint4Array
```js
array.get(offset) // 12
array.get(1) // 6
array.get(5) // 3
```
