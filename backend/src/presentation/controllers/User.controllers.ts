import type { Request, Response, NextFunction } from "express";
import { UserService } from "../../application/services/User.service.js";
import type { UpdateUserDto } from "../../application/dtos/User.dto.js";
import { AppError } from "../../shared/error/AppError.js";
import { AppResponse } from "../../shared/response/AppResponse.js";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name, email, phone, githubId } = req.body;

      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new AppError("Invalid email format");
      }

      if (phone && !/^\d{10}$/.test(phone)) {
        throw new AppError("Phone number must be 10 digits");
      }

      if (
        name &&
        (!name.trim().length || name.trim().length < 3 || name.trim().length > 50)
      ) {
        throw new AppError("Name must be between 3 and 50 characters");
      }

      const updateUserDto: Omit<UpdateUserDto, "password" | "refreshToken"> = {
        name,
        email,
        phone,
        githubId,
      };

      const user = req.user;

      if (!user) {
        throw new AppError("Unauthorized", 401);
      }

      const updatedUser = await this.userService.updateProfile(
        user,
        updateUserDto,
      );

      res
        .status(200)
        .json(new AppResponse(200, updatedUser, "Profile updated successfully"));
    } catch (error) {
      next(error);
    }
  };
}