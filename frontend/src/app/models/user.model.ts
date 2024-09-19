export class User {
  id: string;
  username: string;
  role: 'admin' | 'standard';

  constructor(res: any) {
    this.id = res.id;
    this.username = res.username;
    this.role = res.role;
  }
}