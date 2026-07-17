import express from "express";
import {
  generateWorkout,
  saveWorkout,
  getWorkouts,
  getWorkoutById,
  deleteWorkout,
  duplicateWorkout,
  renameWorkout,
} from "../controllers/workoutController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All workout routes require user authentication
router.use(protect);

router.post("/generate", generateWorkout);
router.post("/save", saveWorkout);
router.route("/")
  .get(getWorkouts);

router.route("/:id")
  .get(getWorkoutById)
  .delete(deleteWorkout)
  .patch(renameWorkout);

router.post("/:id/duplicate", duplicateWorkout);

export default router;
