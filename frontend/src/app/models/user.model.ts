export class AuthUser {
  username: string;
  token: string;
  role: 'admin' | 'standard';


  constructor(res: any) {
    this.username = res.username;
    this.token = res.token;
    this.role = res.role.toLowerCase();
  }
}

export class User {
  id: number;
  username: string;
  role: 'admin' | 'standard';

  constructor(res: any) {
    this.id = res.id;
    this.username = res.username;
    this.role = res.role.toLowerCase();
  }
}