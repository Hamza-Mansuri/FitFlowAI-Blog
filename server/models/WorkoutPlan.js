import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true,
  },
  muscleGroup: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: String, // can be a range like "8-12" or number
    required: true,
  },
  restTime: {
    type: String, // e.g. "90s" or "2 mins"
    required: true,
  },
  tempo: {
    type: String, // e.g. "3-1-1-0"
    default: "2-0-2-0",
  },
  notes: {
    type: String,
  },
  videoPlaceholder: {
    type: String,
  },
});

const dayPlanSchema = new mongoose.Schema({
  dayName: {
    type: String, // e.g. "Day 1: Chest & Shoulders" or "Day 1"
    required: true,
  },
  exercises: [exerciseSchema],
});

const workoutPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    goal: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    daysPerWeek: {
      type: Number,
      required: true,
    },
    sessionDuration: {
      type: Number, // in minutes
      required: true,
    },
    workoutLocation: {
      type: String,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    split: {
      type: String,
      required: true,
    },
    days: [dayPlanSchema], // List of workout days
    estimatedCalories: {
      type: Number,
      default: 350,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);

export default WorkoutPlan;
