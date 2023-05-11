import { Category } from "./category"

describe("Category Test", () => {

  test("Constructor of category", () => {
    const category = new Category("test");
    expect(category.name).toBe('test');
  })

})