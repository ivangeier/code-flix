import ValueObject from "../value-object";

class StubValueObject extends ValueObject {}

describe("ValueObject Unit Tests", () => {
  it("Should set value", () => {
    let vo = new StubValueObject("string value");
    expect(vo.value).toBe("string value");

    vo = new StubValueObject({ prop1: "string value" });
    expect(vo.value).toStrictEqual({ prop1: "string value" });
  });
});
