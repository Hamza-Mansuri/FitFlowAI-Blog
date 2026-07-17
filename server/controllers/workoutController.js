import WorkoutPlan from "../models/WorkoutPlan.js";
import UserFitnessProfile from "../models/UserFitnessProfile.js";
import { generateWorkoutPlanAI } from "../services/workoutGenerator.js";

export const generateWorkout = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    // Load fitness profile
    const profile = await UserFitnessProfile.findOne({ user: userId });
    
    // Call AI service to generate plan
    const aiPlan = await generateWorkoutPlanAI(profile || {}, req.body);
    
    return res.status(200).json({ plan: aiPlan });
  } catch (error) {
    console.error("AI Workout generation controller error:", error);
    return res.status(500).json({ message: error.message || "Failed to generate workout plan" });
  }
};

export const saveWorkout = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { title, goal, experience, daysPerWeek, sessionDuration, workoutLocation, equipment, difficulty, split, days, estimatedCalories } = req.body;

    const plan = new WorkoutPlan({
      title,
      goal,
      experience,
      daysPerWeek: Number(daysPerWeek),
      sessionDuration: Number(sessionDuration),
      workoutLocation,
      equipment,
      difficulty,
      split,
      days,
      estimatedCalories: Number(estimatedCalories || 350),
      createdBy: userId,
    });

    await plan.save();
    return res.status(201).json({ message: "Workout plan saved successfully", plan });
  } catch (error) {
    console.error("Save workout controller error:", error);
    return res.status(500).json({ message: error.message || "Failed to save workout plan" });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const workouts = await WorkoutPlan.find({ createdBy: userId }).sort({ createdAt: -1 });
    return res.status(200).json({ workouts });
  } catch (error) {
    console.error("Get workouts error:", error);
    return res.status(500).json({ message: "Failed to load workouts" });
  }
};

export const getWorkoutById = async (req, res) => {
  try {
    const workout = await WorkoutPlan.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout plan not found" });
    }
    return res.status(200).json({ workout });
  } catch (error) {
    console.error("Get workout by id error:", error);
    return res.status(500).json({ message: "Failed to load workout details" });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const workout = await WorkoutPlan.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id || req.user.id });
    if (!workout) {
      return res.status(404).json({ message: "Workout plan not found or unauthorized" });
    }
    return res.status(200).json({ message: "Workout plan deleted successfully" });
  } catch (error) {
    console.error("Delete workout error:", error);
    return res.status(500).json({ message: "Failed to delete workout plan" });
  }
};

export const duplicateWorkout = async (req, res) => {
  try {
    const original = await WorkoutPlan.findById(req.params.id);
    if (!original) {
      return res.status(404).json({ message: "Original workout plan not found" });
    }

    const copy = new WorkoutPlan({
      title: `${original.title} (Copy)`,
      goal: original.goal,
      experience: original.experience,
      daysPerWeek: original.daysPerWeek,
      sessionDuration: original.sessionDuration,
      workoutLocation: original.workoutLocation,
      equipment: original.equipment,
      difficulty: original.difficulty,
      split: original.split,
      days: original.days,
      estimatedCalories: original.estimatedCalories,
      createdBy: req.user._id || req.user.id,
    });

    await copy.save();
    return res.status(201).json({ message: "Workout duplicated successfully", plan: copy });
  } catch (error) {
    console.error("Duplicate workout error:", error);
    return res.status(500).json({ message: "Failed to duplicate workout" });
  }
};

export const renameWorkout = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    const workout = await WorkoutPlan.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id || req.user.id },
      { $set: { title: title.trim() } },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: "Workout plan not found or unauthorized" });
    }

    return res.status(200).json({ message: "Workout renamed successfully", workout });
  } catch (error) {
    console.error("Rename workout error:", error);
    return res.status(500).json({ message: "Failed to rename workout" });
  }
};
