import type { NextFunction, Request, Response } from "express";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { AppError } from "../../shared/error/AppError.js";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error("Error:", error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      statusCode: error.statusCode,
    });
    return;
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      res.status(409).json({
        success: false,
        error: "Unique constraint violation",
        field: error.meta?.target,
      });
      return;
    }

    if (error.code === "P2025") {
      res.status(404).json({
        success: false,
        error: "Record not found",
      });
      return;
    }
  }

  if (error instanceof PrismaClientValidationError) {
    res.status(400).json({
      success: false,
      error: "Invalid data provided",
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};