const resolver = require("../../index.js");

describe("Import default commonjs", () => {
    it("is a function", () => {
        expect(typeof resolver).toBe("function");
    });

    it("returns an (error first) array of length 2.", async () => {
        let result = await resolver(function () {
            return 42;
        });
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(null);
        expect(result[1]).toBe(42);
    });
});

let error = new Error();
describe.each([
    { val: undefined, expected: [null, undefined] },
    { val: 42, expected: [null, 42] },
    { val: null, expected: [null, null] },
    { val: error, expected: [error, null] },
    { val: () => 42, expected: [null, 42] },
    { val: Promise.resolve(42), expected: [null, 42] },
    { val: Promise.reject(42), expected: [42, null] },
])("await resolver($val)", ({ val, expected }) => {
    it(`returns ${JSON.stringify(expected)}`, async () => {
        let result = await resolver(val);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(expected[0]);
        expect(result[1]).toBe(expected[1]);
    });
});
