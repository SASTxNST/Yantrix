import { Router } from "express";
import { ResearchPaperController } from "../controllers/ResearchPaper.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

const researchPaperController = new ResearchPaperController();

/**
 * Protected Routes
 */
router.post("/papers", authenticate, researchPaperController.createPaper);

router.get("/my-papers", authenticate, researchPaperController.listMyPapers);

router.get("/papers/:id", authenticate, researchPaperController.getPaperById);

router.patch("/papers/:id", authenticate, researchPaperController.updatePaper);

router.delete("/papers/:id", authenticate, researchPaperController.deletePaper);

router.patch(
  "/papers/:id/visibility",
  authenticate,
  researchPaperController.updateVisibility,
);

/**
 * Public Routes
 */
router.get("/public", researchPaperController.listPublicPapers);

router.get(
  "/shared/:shareToken",
  researchPaperController.getPaperByShareToken,
);

export default router;