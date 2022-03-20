"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BitSet_instances, _BitSet_bitIndex, _BitSet_bitValue;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitSet = void 0;
class BitSet {
    constructor(bits) {
        _BitSet_instances.add(this);
        if (bits < 1) {
            throw new RangeError("Bitset size must be atleast 1");
        }
        this.bytes = new Uint8Array(Math.ceil(bits / 8));
        this.size = bits;
    }
    get byteLength() {
        return this.bytes.byteLength;
    }
    set(bit) {
        if (bit >= this.size) {
            throw new RangeError("Bit index exceeds bitset size");
        }
        const index = __classPrivateFieldGet(this, _BitSet_instances, "m", _BitSet_bitIndex).call(this, bit);
        const value = __classPrivateFieldGet(this, _BitSet_instances, "m", _BitSet_bitValue).call(this, bit);
        this.bytes[index] |= value;
    }
    get(bit) {
        if (bit >= this.size) {
            throw new RangeError("Bit index exceeds bitset size");
        }
        const index = __classPrivateFieldGet(this, _BitSet_instances, "m", _BitSet_bitIndex).call(this, bit);
        const value = __classPrivateFieldGet(this, _BitSet_instances, "m", _BitSet_bitValue).call(this, bit);
        return (this.bytes[index] & value) !== 0;
    }
    flip(bit) {
        if (bit >= this.size) {
            throw new RangeError("Bit index exceeds bitset size");
        }
        const index = __classPrivateFieldGet(this, _BitSet_instances, "m", _BitSet_bitIndex).call(this, bit);
        const value = __classPrivateFieldGet(this, _BitSet_instances, "m", _BitSet_bitValue).call(this, bit);
        this.bytes[index] ^= value;
    }
    clear(bit) {
        if (bit >= this.size) {
            throw new RangeError("Bit index exceeds bitset size");
        }
        const index = __classPrivateFieldGet(this, _BitSet_instances, "m", _BitSet_bitIndex).call(this, bit);
        const value = __classPrivateFieldGet(this, _BitSet_instances, "m", _BitSet_bitValue).call(this, bit);
        if ((this.bytes[index] & value) !== 0) {
            this.bytes[index] ^= value;
        }
    }
    clone() {
        const bitSet = new this.constructor(this.size);
        bitSet.bytes.set(this.bytes);
        return bitSet;
    }
    toString() {
        const bits = [];
        let counter = 0;
        for (const byte of this.bytes) {
            for (let i = 0; i < 8 && counter < this.size; i++) {
                const value = __classPrivateFieldGet(this, _BitSet_instances, "m", _BitSet_bitValue).call(this, i);
                bits.push((byte & value) !== 0 ? 1 : 0);
                counter++;
            }
            if (counter >= this.size)
                break;
        }
        return bits.reverse().join("");
    }
}
exports.BitSet = BitSet;
_BitSet_instances = new WeakSet(), _BitSet_bitIndex = function _BitSet_bitIndex(bit) {
    return Math.floor(bit / 8);
}, _BitSet_bitValue = function _BitSet_bitValue(bit) {
    return 1 << bit % 8;
};
