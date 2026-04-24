export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  githubId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}