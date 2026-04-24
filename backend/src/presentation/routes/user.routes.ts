import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';
import { UserController } from '../controllers/User.controllers.js';

const router = Router();
const userController = new UserController();

// Account update Routes
router.patch('/update-profile', authenticate, userController.updateProfile);

export default router;