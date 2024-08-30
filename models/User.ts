export default class User {
  id: number;
  name: string;
  avatar: string;

  constructor(id: number, name: string, avatar: string) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
  }
}
