import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../../application/services/Auth.service.js";
import { AppResponse } from "../../shared/response/AppResponse.js";
import { AppError } from "../../shared/error/AppError.js";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { name, email, phone, password, githubId } = req.body;

      const { user, tokens } = await this.authService.register({
        name,
        email,
        phone,
        password,
        githubId,
      });

      res
        .cookie("accessToken", tokens.accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .status(201)
        .json(new AppResponse(201, user, "User registered successfully"));
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      const { user, tokens } = await this.authService.login({
        email,
        password,
      });

      res
        .cookie("accessToken", tokens.accessToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .status(200)
        .json(new AppResponse(200, user, "User logged in successfully"));
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .status(200)
        .json(new AppResponse(200, null, "User logged out successfully"));
    } catch (error) {
      next(error);
    }
  };

  getMe = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new AppError("Unauthorized", 401);
      }

      res
        .status(200)
        .json(new AppResponse(200, req.user, "User fetched successfully"));
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new AppError("Unauthorized", 401);
      }

      const { oldPassword, newPassword } = req.body;

      await this.authService.changePassword(
        req.user,
        oldPassword,
        newPassword,
      );

      res
        .status(200)
        .json(new AppResponse(200, null, "Password changed successfully"));
    } catch (error) {
      next(error);
    }
  };
}