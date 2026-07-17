import express from "express";
import {
  getCoachDashboard,
  handleCoachChat,
} from "../controllers/aiCoachController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected AI coach routes
router.use(protect);

router.get("/dashboard", getCoachDashboard);
router.post("/chat", handleCoachChat);

export default router;
