export class BitSet {
    public readonly bytes: Uint8Array
    public readonly size: number

    constructor(bits: number) {
        if (bits < 1) {
            throw new RangeError("Bitset size must be atleast 1")
        }

        this.bytes = new Uint8Array(Math.ceil(bits / 8))
        this.size = bits
    }

    public get byteLength(): number {
        return this.bytes.byteLength
    }

    public set(bit: number): void {
        if (bit >= this.size) {
            throw new RangeError("Bit index exceeds bitset size")
        }

        const index = this.#bitIndex(bit)
        const value = this.#bitValue(bit)

        this.bytes[index] |= value
    }

    public get(bit: number): boolean {
        if (bit >= this.size) {
            throw new RangeError("Bit index exceeds bitset size")
        }

        const index = this.#bitIndex(bit)
        const value = this.#bitValue(bit)

        return (this.bytes[index] & value) !== 0
    }

    public flip(bit: number): void {
        if (bit >= this.size) {
            throw new RangeError("Bit index exceeds bitset size")
        }

        const index = this.#bitIndex(bit)
        const value = this.#bitValue(bit)

        this.bytes[index] ^= value
    }

    public clear(bit: number): void {
        if (bit >= this.size) {
            throw new RangeError("Bit index exceeds bitset size")
        }

        const index = this.#bitIndex(bit)
        const value = this.#bitValue(bit)

        if ((this.bytes[index] & value) !== 0) {
            this.bytes[index] ^= value
        }
    }

    public clone(): BitSet {
        const bitSet = new (this.constructor as typeof BitSet)(this.size)
        bitSet.bytes.set(this.bytes)

        return bitSet
    }

    public slice(start: number, end = this.size): BitSet {
        const size = end - start
        const bitSet = new (this.constructor as typeof BitSet)(size)

        for (let i = start; i < end; i++) {
            if (this.get(i)) {
                bitSet.set(i - start)
            }
        }

        return bitSet
    }

    public toString(): string {
        const bits: number[] = []

        for (const bit of this) {
            bits.push(bit ? 1 : 0)
        }

        return bits.reverse().join("")
    }

    public * [Symbol.iterator](): Generator<boolean> {
        for (let i = 0; i < this.size; i++) {
            yield this.get(i)
        }
    }

    #bitIndex(bit: number): number {
        return Math.floor(bit / 8)
    }

    #bitValue(bit: number): number {
        return 1 << bit % 8
    }
}
