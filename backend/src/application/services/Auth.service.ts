import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { AppError } from "../../shared/error/AppError.js";
import type {
  RegisterUserDto,
  LoginUserDto,
} from "../dtos/User.dto.js";
import type { IUserRepository } from "../../core/interfaces/IUserRepository.js";
import { RepositoryFactory } from "../../infrastructure/factories/Repository.factory.js";
import { config } from "../../config/env.config.js";
import type { UserEntity } from "../../core/entities/User.entity.js";

export class AuthService {
  private userRepository: IUserRepository;
  private readonly SALT_ROUNDS = 10;

  constructor() {
    this.userRepository =
      RepositoryFactory.getUserRepository() as IUserRepository;
  }

  async register(registerUserDto: RegisterUserDto): Promise<{
    user: UserEntity;
    tokens: { accessToken: string; refreshToken: string };
  }> {
    if (registerUserDto.email) {
      const emailExists = await this.userRepository.findByEmail(
        registerUserDto.email,
      );

      if (emailExists) {
        throw new AppError("Email already in use", 400);
      }
    }

    if (registerUserDto.phone) {
      const phoneExists = await this.userRepository.findByPhone(
        registerUserDto.phone,
      );

      if (phoneExists) {
        throw new AppError("Phone number already in use", 400);
      }
    }

    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      this.SALT_ROUNDS,
    );

    const newUser = await this.userRepository.createUser({
      ...registerUserDto,
      password: hashedPassword,
      refreshToken: "",
    });

    if (!newUser) {
      throw new AppError("Failed to create user", 500);
    }

    const tokens = await this.generateTokens(newUser.user_id);

    return { user: newUser, tokens };
  }

  private async generateTokens(userId: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const accessToken = jwt.sign({ user_id: userId }, this.getJwtSecret(), {
        expiresIn: config.jwt.accessTokenExpiry,
      });

      const refreshToken = jwt.sign({ user_id: userId }, this.getJwtSecret(), {
        expiresIn: config.jwt.refreshTokenExpiry,
      });

      await this.userRepository.update(userId, { refreshToken });

      return { accessToken, refreshToken };
    } catch {
      throw new AppError("Failed to generate tokens", 500);
    }
  }

  private getJwtSecret(): string {
    const secret = config.jwt.secret;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    return secret;
  }

  async login(loginUserDto: LoginUserDto): Promise<{
    user: UserEntity;
    tokens: { accessToken: string; refreshToken: string };
  }> {
    const { email, phone, password } = loginUserDto;

    let result: { user: UserEntity; hashedPassword: string } | null = null;

    if (email) {
      result = await this.userRepository.findAuthByEmail(email);
    } else if (phone) {
      result = await this.userRepository.findAuthByPhone(phone);
    }

    if (!result) {
      throw new AppError("No user with the provided credentials", 404);
    }

    const passwordMatch = await bcrypt.compare(password, result.hashedPassword);

    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const tokens = await this.generateTokens(result.user.user_id);

    const user = await this.userRepository.findById(result.user.user_id);

    if (!user) {
      throw new AppError("User not found after authentication", 404);
    }

    return { user, tokens };
  }

  async logout(user: UserEntity): Promise<void> {
    await this.userRepository.update(String(user.user_id), {
      refreshToken: "",
    });
  }

  async changePassword(
    user: UserEntity,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const userData: { user: UserEntity; hashedPassword: string } | null =
      user.hasEmail()
        ? await this.userRepository.findAuthByEmail(user.email!)
        : user.hasPhone()
          ? await this.userRepository.findAuthByPhone(user.phone_number!)
          : null;

    if (!userData) {
      throw new AppError("User not found", 404);
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      userData.hashedPassword,
    );

    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const hashedNewPassword = await bcrypt.hash(
      newPassword,
      this.SALT_ROUNDS,
    );

    await this.userRepository.update(userData.user.user_id, {
      password: hashedNewPassword,
    });

    await this.logout(userData.user);
  }
}