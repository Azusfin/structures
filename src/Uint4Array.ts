import { BitSet } from "./BitSet"

export class Uint4Array {
    public readonly bitSet: BitSet

    constructor(lengthOrBitSet: number | BitSet) {
        if (lengthOrBitSet instanceof BitSet) {
            this.bitSet = lengthOrBitSet
            return
        }

        this.bitSet = new BitSet(lengthOrBitSet * 4)
    }

    public get bitLength(): number {
        return this.bitSet.size
    }

    public get byteLength(): number {
        return this.bitSet.byteLength
    }

    public get length(): number {
        return Math.floor(this.bitLength / 4)
    }

    public set(offset: number, uint4: number): void {
        if (offset >= this.length) {
            throw new RangeError("Offset exceeds array length")
        }

        const index = offset * 4

        const bit0 = (uint4 & (1 << 0)) !== 0
        const bit1 = (uint4 & (1 << 1)) !== 0
        const bit2 = (uint4 & (1 << 2)) !== 0
        const bit3 = (uint4 & (1 << 3)) !== 0

        if (bit0) {
            this.bitSet.set(index)
        } else {
            this.bitSet.clear(index)
        }

        if (bit1) {
            this.bitSet.set(index + 1)
        } else {
            this.bitSet.clear(index + 1)
        }

        if (bit2) {
            this.bitSet.set(index + 2)
        } else {
            this.bitSet.clear(index + 2)
        }

        if (bit3) {
            this.bitSet.set(index + 3)
        } else {
            this.bitSet.clear(index + 3)
        }
    }

    public get(offset: number): number {
        if (offset >= this.length) {
            throw new RangeError("Offset exceeds array length")
        }

        const index = offset * 4

        const bit0 = this.bitSet.get(index)
        const bit1 = this.bitSet.get(index + 1)
        const bit2 = this.bitSet.get(index + 2)
        const bit3 = this.bitSet.get(index + 3)

        let uint4 = bit0 ? 1 << 0 : 0

        if (bit1) uint4 |= 1 << 1
        if (bit2) uint4 |= 1 << 2
        if (bit3) uint4 |= 1 << 3

        return uint4
    }

    public clone(): Uint4Array {
        return new (this.constructor as typeof Uint4Array)(this.bitSet.clone())
    }

    public slice(start: number, end = this.length): Uint4Array {
        return new (this.constructor as typeof Uint4Array)(this.bitSet.slice(start * 4, end * 4))
    }

    public array(): Uint8Array {
        const arr = new Uint8Array(this.bitSet.byteLength)
        arr.set(this.bitSet.bytes)

        return arr
    }

    public toString(): string {
        return [...this].join(",")
    }

    public * [Symbol.iterator](): Generator<number> {
        for (let i = 0; i < this.length; i++) {
            yield this.get(i)
        }
    }
}
