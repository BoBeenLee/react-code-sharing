import { omit, once } from "../common";

describe("common test", () => {
  test("omit test", () => {
    const data = { a: 1, b: 2, c: 3 };
    const res = omit(data, "a", "b");
    expect(res.c).toEqual(3);
  });

  test("once test", () => {
    const add = (a: number, b: number) => {
      return a + b;
    };
    const res = once(add);
    expect(res(1, 2)).toEqual(3);
    expect(res(1, 2)).toEqual(3);
  });
});
