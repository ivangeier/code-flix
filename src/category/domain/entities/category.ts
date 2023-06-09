import ValidatorRules from "../../../@seedworks/validators/validator-rules";
import Entity from "../../../@seedworks/domain/entity/entity";
import UniqueEntityId from "../../../@seedworks/domain/value-objects/unique-entity-id.vo";

export type CategoriesProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoriesProps> {
  constructor(public readonly props: CategoriesProps, id?: UniqueEntityId) {
    Category.validate(props);
    super(props, id);
    this.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }
  update(name: string, description: string): void {
    Category.validate({ name, description });
    this.name = name;
    this.description = description;
  }

  static validate(props: Omit<CategoriesProps, "created_at">) {
    ValidatorRules.values(props.name, "name")
      .required()
      .string()
      .maxLength(255);
    ValidatorRules.values(props.description, "description").string();
    ValidatorRules.values(props.is_active, "is_active").boolean();
  }

  activate(): void {
    this.props.is_active = true;
  }

  deactivate(): void {
    this.props.is_active = false;
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }
}
