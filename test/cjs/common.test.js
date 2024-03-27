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
    { val: undefined, expected: [null, undefined], val_str: "undefined", expected_str: "[null, undefined]" },
    { val: null, expected: [null, null], val_str: "null", expected_str: "[null, null]" },
    { val: 42, expected: [null, 42], val_str: "42", expected_str: "[null, 42]" },
    { val: error, expected: [error, null], val_str: "new Error()", expected_str: "[Error, null]" },
    { val: () => 42, expected: [null, 42], val_str: "() => 42", expected_str: "[null, 42]" },
    { val: Promise.resolve(42), expected: [null, 42], val_str: "Promise.resolve(42)", expected_str: "[null, 42]" },
    { val: Promise.reject(42), expected: [42, null], val_str: "Promise.reject(42)", expected_str: "[42, null]" },
    // { val: setTimeout(() => 42, 300), expected: [null, 42] },
])("await resolver($val_str)", ({ val, expected, expected_str }) => {
    it(`returns ${expected_str}`, async () => {
        let result = await resolver(val);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(expected[0]);
        expect(result[1]).toBe(expected[1]);
    });
});

/**
 * With timeout/delay
 */
describe.each([
    { val: undefined, timeout: 1000, expected: [null, undefined], val_str: "undefined", expected_str: "[null, undefined]" },
    { val: () => 42, timeout: 1200, expected: [null, 42], val_str: "() => 42", expected_str: "[null, 42]" },
    { val: Promise.resolve(42), timeout: 1100, expected: [null, 42], val_str: "Promise.resolve(42)", expected_str: "[null, 42]" },
    // A promise rejection with timeout will fail, when testing together but succeed in a standolne test - Issue with Jest?
    // { val: Promise.reject(42), timeout: 500, expected: [42, null], val_str: "Promise.reject(42)", expected_str: "[42, null]" },
])("await resolver($val_str, $timeout)", ({ val, timeout, expected, expected_str }) => {
    it(`returns ${expected_str} after a delay of ${timeout}ms`, async () => {
        let start = process.hrtime.bigint();
        let result = await resolver(val, timeout);
        let elapse = process.hrtime.bigint() - start;
        elapse = Math.ceil(Number(elapse) / 1e6);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(expected[0]);
        expect(result[1]).toBe(expected[1]);
        expect(elapse).toBeGreaterThanOrEqual(timeout);
    });

    it(`Can sleep for ${timeout}ms`, async () => {
        let start = process.hrtime.bigint();
        const result = await resolver.sleep(timeout);
        let elapse = process.hrtime.bigint() - start;
        elapse = Math.ceil(Number(elapse) / 1e6);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(elapse).toBeGreaterThanOrEqual(timeout);
    });
});

/**
 * Promise rejection with timeout
 * A promise rejection with timeout will fail, when testing together but succeed in a standolne test
 *
 * Is this behaviour an Jest specific issue?
 */
describe("await resolver(Promise.reject(42), 1000)", () => {
    it(`returns [42, null] after a delay of 1000ms`, async () => {
        let timeout = 1000;
        let start = process.hrtime.bigint();
        let result = await resolver(Promise.reject(42), timeout);
        let elapse = process.hrtime.bigint() - start;
        elapse = Math.ceil(Number(elapse) / 1e6);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(42);
        expect(result[1]).toBe(null);
        expect(elapse).toBeGreaterThanOrEqual(timeout);
    });
});

/**
 *
 */
describe.each([
    { val: x => 21 * x, timeout: 1200, params: [2], expected: [null, 42], val_str: "(x) => 21*x", expected_str: "[null, 42]", params_str: "2" },
    {
        val: Math.max,
        timeout: null,
        params: [2, 11, -3, 42],
        expected: [null, 42],
        val_str: "Math.max",
        expected_str: "[null, 42]",
        params_str: "2, 11, -3, 42",
    },
])("await resolver($val_str, $timeout, params_str)", ({ val, timeout, params, expected, expected_str }) => {
    it(`returns ${expected_str} ${typeof timeout == "number" ? `after a delay of ${timeout}ms` : ""}`, async () => {
        let start = process.hrtime.bigint();
        let result = await resolver(val, timeout, ...params);
        let elapse = process.hrtime.bigint() - start;
        elapse = Math.ceil(Number(elapse) / 1e6);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(expected[0]);
        expect(result[1]).toBe(expected[1]);
        if (typeof timeout == "number") {
            expect(elapse).toBeGreaterThanOrEqual(timeout);
        }
    });
});
