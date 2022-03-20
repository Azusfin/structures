const assert = require("assert/strict")
const { Int4Array } = require("../")

describe("Int4Array", function() {
    const array = new Int4Array(4)

    const second = 4
    const fourth = -5
    const numbers = "0,4,0,-5"

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
