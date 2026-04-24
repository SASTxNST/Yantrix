import dotenv from "dotenv";
import type { Config } from "../shared/types/config/index.js";
import { StringValue } from "ms";

// Load environment variables
dotenv.config();

export const config: Config = {
  // Server
  port: parseInt(process.env.PORT || "8000", 10),
  nodeEnv: process.env.NODE_ENV || "development",

  // Database
  databaseUrl: process.env.DATABASE_URL!,

  // CORS
  cors: {
    origin:
      process.env.CORS_ORIGIN ||
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET!,
    accessTokenExpiry:
      (process.env.ACCESS_TOKEN_EXPIRY as StringValue) || "15m",
    refreshTokenExpiry:
      (process.env.REFRESH_TOKEN_EXPIRY as StringValue) || "7d",
  },
};

// Validate required environment variables
export function validateEnv() {
  const requiredEnvVars = [
    "DATABASE_URL",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "JWT_SECRET",
    "ACCESS_TOKEN_EXPIRY",
    "REFRESH_TOKEN_EXPIRY",
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(
        `Missing required environment variable: ${envVar}`,
      );
    }
  }
}

validateEnv();