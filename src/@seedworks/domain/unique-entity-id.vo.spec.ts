import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";
import { validate as uuidValidade } from "uuid";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityId Unit Tests", () => {
  it("Shoud throw an error when UUID is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("invalid-uuid")).toThrow(
      new InvalidUuidError()
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  it("Shoud accept a valid UUID passed in constructor", () => {
    const uuid = "4f4238c4-5f15-419b-83b8-21fa3f73d139";
    const vo = new UniqueEntityId(uuid);
    const validateSpy = spyValidateMethod();

    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("Shoud create a valid UUID without passing UUID", () => {
    const vo = new UniqueEntityId();
    const validateSpy = spyValidateMethod();

    expect(uuidValidade(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
