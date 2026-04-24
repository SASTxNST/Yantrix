export interface RegisterUserDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  githubId?: string;
}

export interface LoginUserDto {
  email?: string;
  phone?: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  githubId?: string | null;
  password?: string;
  refreshToken?: string;
}