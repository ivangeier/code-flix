import { deepFreeze } from "./objects";

describe("Objects Unit Tests", () => {
  it("Should not freeze a scalar value", () => {
    const str = deepFreeze("a");
    expect(typeof str).toBe("string");

    let boolean = deepFreeze(true);
    expect(typeof boolean).toBe("boolean");
    boolean = deepFreeze(false);
    expect(typeof boolean).toBe("boolean");

    const number = deepFreeze(8);
    expect(typeof number).toBe("number");
  });

  it("Should must be a immutable object", () => {
    const obj = deepFreeze({
      prop1: "a",
      deep: { prop2: "b", prop3: new Date() },
    });

    expect(() => ((obj as any).prop1 = "aaa")).toThrow(
      "Cannot assign to read only property 'prop1' of object '#<Object>'"
    );

    expect(() => ((obj as any).prop2 = "bbb")).toThrow(
      "Cannot add property prop2, object is not extensible"
    );

    expect(() => ((obj as any).deep.prop2 = "bbb")).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(obj.deep.prop3).toBeInstanceOf(Date);
  });
});
