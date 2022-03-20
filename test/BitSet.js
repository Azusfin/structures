const assert = require("assert/strict")
const { BitSet } = require("../")

describe("BitSet", function() {
    const bitSet = new BitSet(10)
    const bits = "0001000000"

    it("Set 4", function() {
        bitSet.set(3)
    })

    it("Get 4", function() {
        assert.equal(bitSet.get(3), true)
    })

    it("Get 7", function() {
        assert.equal(bitSet.get(6), false)
    })

    it("Clear 4", function() {
        bitSet.clear(3)
    })

    it("Flip 7", function() {
        bitSet.flip(6)
    })

    it("String of Bits", function() {
        assert.equal(bitSet.toString(), bits)
    })
})
