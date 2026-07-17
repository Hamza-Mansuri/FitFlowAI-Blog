import express from "express";
import {
  getFitnessProfile,
  createFitnessProfile,
  updateFitnessProfile,
} from "../controllers/profileController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Profile endpoints (protected)
router.route("/")
  .get(protect, getFitnessProfile)
  .post(protect, createFitnessProfile)
  .patch(protect, updateFitnessProfile);

export default router;
