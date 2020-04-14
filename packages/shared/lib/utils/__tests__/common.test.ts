import { omit } from "../common";

describe("common test", () => {
  test("omit test", () => {
    const data = { a: 1, b: 2, c: 3 };
    const res = omit(data, "a", "b");
    expect(res.c).toEqual(3);
  });
});
