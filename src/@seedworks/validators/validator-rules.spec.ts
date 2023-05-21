import ValidationError from "../../@seedworks/errors/validation-erro";
import ValidatorRules from "./validator-rules";

type Values = {
  value: any;
  property: string;
};

type ExpectedRules = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
};

function assertIsInvalid({
  value,
  property,
  rule,
  error,
  params = [],
}: ExpectedRules) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule] as (...args: any[]) => ValidatorRules;
    method.apply(validator, params);
  }).toThrow(error);
}

function assertIsValid({
  value,
  property,
  rule,
  error,
  params = [],
}: ExpectedRules) {
  expect(() => {
    const validator = ValidatorRules.values(value, property);
    const method = validator[rule] as (...args: any[]) => ValidatorRules;
    method.apply(validator, params);
  }).not.toThrow(error);
}

describe("ValidatorRules Unit Test", () => {
  test("Values method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  test("Required validation rule", () => {
    //invalid cases
    let arrange: Values[] = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "", property: "field" },
    ];

    arrange.forEach(({ value, property }) => {
      assertIsInvalid({
        value,
        property,
        rule: "required",
        error: new ValidationError("The field is required"),
      });
    });

    //valid cases
    arrange = [
      { value: 5, property: "field" },
      { value: 0, property: "field" },
      { value: false, property: "field" },
    ];

    arrange.forEach(({ value, property }) => {
      assertIsValid({
        value,
        property,
        rule: "required",
        error: new ValidationError("The field is required"),
      });
    });
  });

  test("String validation rule", () => {
    //invalid cases
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },
      { value: false, property: "field" },
    ];

    const error = new ValidationError("The field must be a string");

    arrange.forEach(({ value, property }) => {
      assertIsInvalid({
        value,
        property,
        rule: "string",
        error,
      });
    });

    //valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "test", property: "field" },
    ];

    arrange.forEach(({ value, property }) => {
      assertIsValid({
        value,
        property,
        rule: "string",
        error,
      });
    });
  });

  test("MaxLength validation rule", () => {
    //invalid cases
    let arrange: Values[] = [{ value: "123456", property: "field" }];
    const error = new ValidationError(
      "The field must be less than 5 characters"
    );

    arrange.forEach(({ value, property }) => {
      assertIsInvalid({
        value,
        property,
        rule: "maxLength",
        error,
        params: [5],
      });
    });

    //valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "1234", property: "field" },
    ];

    arrange.forEach(({ value, property }) => {
      assertIsValid({
        value,
        property,
        rule: "maxLength",
        error,
        params: [5],
      });
    });
  });

  test("Boolen validation rule", () => {
    //invalid cases
    let arrange: Values[] = [
      { value: 5, property: "field" },
      { value: "true", property: "field" },
      { value: "false", property: "field" },
    ];
    const error = new ValidationError("The field must be a boolean");

    arrange.forEach(({ value, property }) => {
      assertIsInvalid({
        value,
        property,
        rule: "boolean",
        error,
      });
    });

    //valid cases
    arrange = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: true, property: "field" },
      { value: false, property: "field" },
    ];

    arrange.forEach(({ value, property }) => {
      assertIsValid({
        value,
        property,
        rule: "boolean",
        error,
      });
    });
  });

  it("Should throw an error if combine two or more invalid validation rules", () => {
    let validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError("The field is required")
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError("The field must be a string")
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError("The field must be a string")
    );

    validator = ValidatorRules.values("123456", "field");
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError("The field must be less than 5 characters")
    );

    validator = ValidatorRules.values(null, "field");
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError("The field is required")
    );

    validator = ValidatorRules.values(5, "field");
    expect(() => validator.required().boolean()).toThrow(
      new ValidationError("The field must be a boolean")
    );
  });

  it("Should valid when combine two or more validation rules", () => {
    expect.assertions(0);
    ValidatorRules.values("test", "field").required().string();
    ValidatorRules.values("test", "field").required().string().maxLength(5);

    ValidatorRules.values(true, "field").required().boolean();
    ValidatorRules.values(false, "field").required().boolean();
  });
});
