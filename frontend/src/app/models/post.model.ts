export interface PostUser {
  username: string;
}

export class PostComment {
  createdAt: Date;
  username: string;
  text: string;

  constructor(res: any) {
    this.createdAt = new Date(res.createdAt);
    this.username = res.username;
    this.text = res.text;
  }
}

export class Post {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  title: string;
  description: string;
  user: PostUser;
  comments: PostComment[];

  constructor(res: any) {
    this.createdAt = new Date(res.createdAt);
    this.updatedAt = new Date(res.updatedAt);
    this.id = res.id
    this.title = res.title;
    this.description = res.description;
    this.user = res.user;

    if (res.comments) {
      this.comments = (res.comments as any[]).map(comment => {
        return new PostComment(comment);
      });
    } else {
      this.comments = [];
    }
  }
}