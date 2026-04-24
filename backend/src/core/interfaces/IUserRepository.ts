import { UserEntity } from "../entities/User.entity.js";
import type { UserRole } from "../entities/User.entity.js";
import type {
  RegisterUserDto,
  UpdateUserDto,
} from "../../application/dtos/User.dto.js";

export interface IUserRepository {
  findById(id: string): Promise<UserEntity | null>;
  delete(id: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  createUser(
    user: RegisterUserDto & { refreshToken: string }
  ): Promise<UserEntity | null>;
  update(id: string, data: UpdateUserDto): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByPhone(phoneNumber: string): Promise<UserEntity | null>;
  findAuthByEmail(
    email: string
  ): Promise<{ user: UserEntity; hashedPassword: string } | null>;
  findAuthByPhone(
    phoneNumber: string
  ): Promise<{ user: UserEntity; hashedPassword: string } | null>;
  getRefreshTokenById(id: string): Promise<string | null>;
}