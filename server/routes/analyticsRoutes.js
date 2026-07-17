import express from "express";
import {
  getAnalyticsDashboard,
  updateMeasurements,
} from "../controllers/analyticsController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all progress analytics routes
router.use(protect);

router.get("/", getAnalyticsDashboard);
router.post("/measurements", updateMeasurements);

export default router;
