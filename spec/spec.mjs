import {getKey} from "../index.mjs";

describe("api-key", function () {
  it("returns a promise to a string", async function () {
    expect(typeof await getKey("croquet")).toBe('string');
  });
});
