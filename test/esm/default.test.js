import randomName from "../../wrapper.mjs";

describe("Import default module", () => {
    it("is a function", () => {
        expect(typeof randomName).toBe("function");
    });

    it("returns an (error first) array of length 2.", async () => {
        let result = await randomName(function () {
            return 42;
        });
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(null);
        expect(result[1]).toBe(42);
    });
});
