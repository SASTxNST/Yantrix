import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { config } from "./config/env.config.js";
import { errorHandler } from "./presentation/middleware/error.middleware.js";
import { AppResponse } from "./shared/response/AppResponse.js";
import authRoutes from "./presentation/routes/auth.routes.js";
import userRoutes from "./presentation/routes/user.routes.js";

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    const corsOptions = {
      origin: config.cors.origin,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    };

    this.app.use(cors(corsOptions));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(): void {
    this.app.get("/api/health", (_req: Request, res: Response) => {
      res.status(200).json(
        new AppResponse(
          200,
          {
            timestamp: new Date().toISOString(),
            environment: config.nodeEnv,
          },
          "API is healthy",
        ),
      );
    });

    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/user", userRoutes);

    this.app.use((_req: Request, res: Response) => {
      res.status(404).json(new AppResponse(404, null, "No such Route found"));
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }
}