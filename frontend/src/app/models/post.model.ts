export interface PostUser {
  username: string;
}

export interface Post {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  title: string;
  description: string;
  user: PostUser;
}