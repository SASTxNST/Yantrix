import { Router } from "express";
import { AuthController } from "../controllers/Auth.controllers.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.getMe);
router.post("/change-password", authenticate, authController.changePassword);

export default router;