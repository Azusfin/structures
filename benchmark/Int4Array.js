const b = require("benny")
const { Int4Array } = require("../")

const array = new Int4Array(1)

b.suite(
    "Int4Array",
    b.add("Set", () => {
        array.set(0, -8)
    }),
    b.add("Get", () => {
        array.get(0)
    }),
    b.cycle()
)
