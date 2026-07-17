import express from "express";
import {
  submitCheckIn,
  getTodayCheckIn,
  getCheckInHistory,
  getWeeklySummaryReport,
  getStreaks,
} from "../controllers/checkInController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require user protection
router.use(protect);

router.post("/", submitCheckIn);
router.get("/today", getTodayCheckIn);
router.get("/history", getCheckInHistory);
router.get("/report", getWeeklySummaryReport);
router.get("/streaks", getStreaks);

export default router;
