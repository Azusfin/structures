const assert = require("assert/strict")
const { Uint4Array } = require("../dist")

describe("Uint4Array", function() {
    const array = new Uint4Array(4)

    const second = 7
    const fourth = 12
    const numbers = "0,7,0,12"

    it("Set 2", function() {
        array.set(1, second)
    })

    it("Set 4", function() {
        array.set(3, fourth)
    })

    it("Get 2", function() {
        assert.equal(array.get(1), second)
    })

    it("Get 4", function() {
        assert.equal(array.get(3), fourth)
    })

    it("Numbers", function() {
        assert.equal(array.toString(), numbers)
    })
})
