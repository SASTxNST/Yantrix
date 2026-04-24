import type { IUserRepository } from "../../core/interfaces/IUserRepository.js";
import DatabaseClient from "../database/prisma.client.js";
import { UserEntity } from "../../core/entities/User.entity.js";
import type {
  RegisterUserDto,
  UpdateUserDto,
} from "../../application/dtos/User.dto.js";

type PrismaUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  githubId: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserRepository implements IUserRepository {
  private prisma = DatabaseClient.getInstance();

  private toUserEntity(user: PrismaUser): UserEntity {
    return new UserEntity(
      user.id,
      user.name,
      null,
      user.email,
      user.phone,
      null,
      user.createdAt,
      user.updatedAt,
    );
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return this.toUserEntity(user);
  }

  async delete(id: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    return this.toUserEntity(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user: PrismaUser): UserEntity => this.toUserEntity(user));
  }

  async createUser(data: RegisterUserDto): Promise<UserEntity | null> {
    const fullName = [data.name].filter(Boolean).join(" ");

    const newUser = await this.prisma.user.create({
      data: {
        name: fullName,
        email: data.email ?? "",
        phone: data.phone ?? "",
        password: data.password,
      },
    });

    return this.toUserEntity(newUser);
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity | null> {
    const fullName = [data.name].filter(Boolean).join(" ");

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(fullName && { name: fullName }),
        ...(data.email && { email: data.email }),
        ...(data.phone && { phone: data.phone }),
      },
    });

    return this.toUserEntity(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return this.toUserEntity(user);
  }

  async findByPhone(phoneNumber: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { phone: phoneNumber },
    });

    if (!user) return null;

    return this.toUserEntity(user);
  }

  async findAuthByEmail(
    email: string,
  ): Promise<{ user: UserEntity; hashedPassword: string } | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return {
      user: this.toUserEntity(user),
      hashedPassword: user.password,
    };
  }

  async findAuthByPhone(
    phoneNumber: string,
  ): Promise<{ user: UserEntity; hashedPassword: string } | null> {
    const user = await this.prisma.user.findUnique({
      where: { phone: phoneNumber },
    });

    if (!user) return null;

    return {
      user: this.toUserEntity(user),
      hashedPassword: user.password,
    };
  }

  async getRefreshTokenById(_id: string): Promise<string | null> {
    return null;
  }
}