export interface PostUser {
  username: string;
}

export class Post {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  title: string;
  description: string;
  user: PostUser;

  constructor(res: any) {
    this.createdAt = new Date(res.createdAt);
    this.updatedAt = new Date(res.updatedAt);
    this.id = res.id
    this.title = res.title;
    this.description = res.description;
    this.user = res.user;
  }
}