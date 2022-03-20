# @azusfin/structures
> Implementations of Data Structures

# API Documentation
https://azusfin.github.io/structures

# Table Of Contents
- [BitSet](#bitset)

## BitSet
A static-length array to work with bytes in bit-level

- [Init BitSet](#init-bitset)
- [Set Bit](#set-bit)
- [Get Bit](#get-bit)
- [Flip Bit](#flip-bit)
- [Clear Bit](#clear-bit)

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
