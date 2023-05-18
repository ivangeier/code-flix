import ValueObject from "../value-object";

class StubValueObject extends ValueObject {}

describe("ValueObject Unit Tests", () => {
  it("Should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "string value" });
    expect(vo.value).toStrictEqual({ prop1: "string value" });
  });

  it("Should convert to string", () => {
    const date = new Date();
    let arrange = [
      { received: "string value", expected: "string value" },
      {
        received: { prop1: "string value" },
        expected: JSON.stringify({ prop1: "string value" }),
      },
      { received: 0, expected: "0" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
    ];

    arrange.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(vo.toString()).toBe(value.expected);
    });
  });

  it("Should must be a immutable object", () => {
    const obj = {
      prop1: "value1",
      deep: { prop2: "value2", prop3: new Date() },
    };
    const vo = new StubValueObject(obj);

    expect(() => ((vo as any).value = "test")).toThrow(
      "Cannot set property value of #<ValueObject> which has only a getter"
    );

    expect(() => ((vo as any).value.deep.prop2 = "test")).toThrow(
      "Cannot assign to read only property 'prop2' of object '#<Object>'"
    );

    expect(vo.value.deep.prop3).toBeInstanceOf(Date);
  });
});
