export class User{
  private _id: number;
  private _email: string;
  public relations: Array<number>;


  constructor() {
    this.relations = [];
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
