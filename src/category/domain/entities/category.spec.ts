import { omit } from "lodash";
import { CategoriesProps, Category } from "./category";
import UniqueEntityId from "../../../@seedworks/domain/unique-entity-id.vo";

describe("Category Unit Tests", () => {
  test("Constructor of category", () => {
    // TEST - ONLY NAME
    let category = new Category({ name: "Movie" });

    const props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    //TEST - ALL PROPS
    let created_at = new Date();
    category = new Category({
      name: "Movie",
      description: "Movie description",
      is_active: false,
      created_at,
    });

    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "Movie description",
      is_active: false,
      created_at,
    });

    //TEST - NAME AND DESCRIPTION
    category = new Category({
      name: "Movie",
      description: "Other description",
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      description: "Other description",
    });

    //TEST - NAME AND IS_ACTIVE
    category = new Category({
      name: "Movie",
      is_active: false,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: false,
    });

    //TEST - NAME AND CREATED_AT
    category = new Category({
      name: "Movie",
      created_at,
    });

    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("Getter of id prop", () => {
    type CategoriesData = {
      props: CategoriesProps;
      id?: UniqueEntityId;
    };
    const data: CategoriesData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach(({ props, id }) => {
      const category = new Category(props, id);

      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);

      if (id) {
        expect(category.id).toBe(id);
      }
    });
  });

  test("Getter of name prop", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("Getter and setter of description prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "Movie description",
    });
    expect(category.description).toBe("Movie description");

    category = new Category({
      name: "Movie",
    });
    category["description"] = "Other description";
    expect(category.description).toBe("Other description");

    category["description"] = undefined;
    expect(category.description).toBeNull();
  });

  test("Getter and setter of is_active prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: "Movie",
      is_active: false,
    });
    expect(category.is_active).toBeFalsy();
  });

  test("Getter and setter of created_at prop", () => {
    let category = new Category({
      name: "Movie",
    });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.created_at).toBe(created_at);
  });
});
