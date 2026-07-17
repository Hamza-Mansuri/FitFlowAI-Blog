import mongoose from "mongoose";

const dailyCheckInSchema = new mongoose.Schema(
  {
    date: {
      type: String, // format YYYY-MM-DD to simplify query matches
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    sleepHours: {
      type: Number,
      required: true,
    },
    energyLevel: {
      type: Number, // 1 - 10
      required: true,
      min: 1,
      max: 10,
    },
    motivationLevel: {
      type: Number, // 1 - 10
      required: true,
      min: 1,
      max: 10,
    },
    stressLevel: {
      type: Number, // 1 - 10
      required: true,
      min: 1,
      max: 10,
    },
    hungerLevel: {
      type: Number, // 1 - 10
      required: true,
      min: 1,
      max: 10,
    },
    waterIntake: {
      type: Number, // Liters
      required: true,
    },
    steps: {
      type: Number,
      default: 0,
    },
    workoutCompleted: {
      type: Boolean,
      default: false,
    },
    cardioCompleted: {
      type: Boolean,
      default: false,
    },
    mealPlanFollowed: {
      type: Boolean,
      default: true,
    },
    cheatMeal: {
      type: Boolean,
      default: false,
    },
    injuryPain: {
      type: String, // e.g. "None" or "shoulder pain"
      default: "None",
    },
    mood: {
      type: String, // e.g. "happy", "tired", "stressed", "focused"
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    recoveryScore: {
      type: Number, // 0 - 100
      required: true,
    },
    aiRecommendations: {
      workout: { type: String },
      nutrition: { type: String },
      recovery: { type: String },
      motivation: { type: String },
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

// Compound index to guarantee one check-in per user per date
dailyCheckInSchema.index({ date: 1, createdBy: 1 }, { unique: true });

const DailyCheckIn = mongoose.model("DailyCheckIn", dailyCheckInSchema);

export default DailyCheckIn;
