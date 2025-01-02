export interface PostUser {
  username: string;
}

export class PostComment {
  id: number;
  updatedAt: Date;
  username: string;
  text: string;

  constructor(res: any) {
    this.id = res.id;
    this.updatedAt = new Date(res.updatedAt);
    this.username = res.username;
    this.text = res.text;
  }
}

export class Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  user: PostUser;

  constructor(res: any) {
    this.id = res.id
    this.createdAt = new Date(res.createdAt);
    this.updatedAt = new Date(res.updatedAt);
    this.title = res.title;
    this.description = res.description;
    this.user = res.user;
  }
}