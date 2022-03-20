const b = require("benny")
const { Uint4Array } = require("../")

const array = new Uint4Array(1)

b.suite(
    "Uint4Array",
    b.add("Set", () => {
        array.set(0, 15)
    }),
    b.add("Get", () => {
        array.get(0)
    }),
    b.cycle()
)
