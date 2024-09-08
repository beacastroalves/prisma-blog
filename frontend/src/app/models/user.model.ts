export interface User {
  id: string,
  username: string;
  role: 'admin' | 'standard';
}