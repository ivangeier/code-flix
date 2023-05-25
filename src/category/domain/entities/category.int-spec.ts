import ValidationError from "../../../@seedworks/errors/validation-erro";
import { Category } from "./category";

describe("Category Integration Tests", () => {
  describe("create method", () => {
    it("Should throw an error when usng a invalid name category", () => {
      expect(() => new Category({ name: null })).toThrow(
        new ValidationError("The name is required")
      );

      expect(() => new Category({ name: "" })).toThrow(
        new ValidationError("The name is required")
      );

      expect(() => new Category({ name: 5 as any })).toThrow(
        new ValidationError("The name must be a string")
      );

      expect(() => new Category({ name: "a".repeat(256) })).toThrow(
        new ValidationError("The name must be less than 255 characters")
      );
    });

    it("Should throw an error when usng a invalid description category", () => {
      expect(
        () => new Category({ name: "Test", description: 1 as any })
      ).toThrow(new ValidationError("The description must be a string"));
    });

    it("Should throw an error when usng a invalid is_active category", () => {
      expect(() => new Category({ name: "Test", is_active: 1 as any })).toThrow(
        new ValidationError("The is_active must be a boolean")
      );
    });

    it("Should create a category", () => {
      expect.assertions(0);
      new Category({ name: "Test" });
      new Category({ name: "Test", description: "some description" });
      new Category({ name: "Test", description: null });
      new Category({
        name: "Test",
        description: "some description",
        is_active: false,
      });
      new Category({
        name: "Test",
        description: "some description",
        is_active: true,
      });
    });
  });

  describe("update method", () => {
    it("Should throw an error when usng a invalid name category", () => {
      const category = new Category({ name: "Test" });

      expect(() => category.update(null, null)).toThrow(
        new ValidationError("The name is required")
      );

      expect(() => category.update("", null)).toThrow(
        new ValidationError("The name is required")
      );

      expect(() => category.update(5 as any, null)).toThrow(
        new ValidationError("The name must be a string")
      );

      expect(() => category.update("a".repeat(256), null)).toThrow(
        new ValidationError("The name must be less than 255 characters")
      );
    });

    it("Should throw an error when usng a invalid description category", () => {
      const category = new Category({ name: "Test" });

      expect(() => category.update(" Test", 5 as any)).toThrow(
        new ValidationError("The description must be a string")
      );
    });

    it("Should create a category", () => {
      expect.assertions(0);
      const category = new Category({ name: "Test" });
      category.update("Test", "some description");
      category.update("Test", null);
    });
  });
});
