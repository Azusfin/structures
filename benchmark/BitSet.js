const b = require("benny")
const { BitSet } = require("../")

const bitSet = new BitSet(1)

b.suite(
    "BitSet",
    b.add("Set", () => {
        bitSet.set(0)
    }),
    b.add("Get", () => {
        bitSet.get(0)
    }),
    b.add("Flip", () => {
        bitSet.flip(0)
    }),
    b.add("Clear", () => {
        bitSet.clear(0)
    }),
    b.cycle()
)
