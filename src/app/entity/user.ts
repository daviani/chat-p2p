export class User{
  private _id: number;
  private _nickname: string;
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

  get nickname(): string {
    return this._nickname;
  }

  set nickname(value: string) {
    this._nickname = value;
  }
}
