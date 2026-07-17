import express from "express";
import {
  generateNutrition,
  saveNutrition,
  getNutritionPlans,
  getNutritionById,
  deleteNutrition,
  renameNutrition,
  duplicateNutrition,
} from "../controllers/nutritionController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All nutrition routes require user authentication
router.use(protect);

router.post("/generate", generateNutrition);
router.post("/save", saveNutrition);
router.route("/")
  .get(getNutritionPlans);

router.route("/:id")
  .get(getNutritionById)
  .delete(deleteNutrition)
  .patch(renameNutrition);

router.post("/:id/duplicate", duplicateNutrition);

export default router;
