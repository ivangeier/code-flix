import InvalidUuidError from "../../@seedworks/errors/invalid-uuid.error";
import { v4 as uuidv4, validate as uuidValidade } from "uuid";

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id ?? uuidv4();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidade(this.id);
    if (!isValid) {
      console.log(this.id);
      throw new InvalidUuidError();
    }
  }
}
