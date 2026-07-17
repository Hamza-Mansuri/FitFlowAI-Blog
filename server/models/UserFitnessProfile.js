import mongoose from "mongoose";

const userFitnessProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    goal: {
      type: String,
      enum: ["fat loss", "muscle gain", "maintenance", "strength", "general fitness"],
      default: "general fitness",
    },
    experience: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    age: {
      type: Number,
      required: true,
      min: 10,
      max: 120,
    },
    height: {
      type: Number, // in cm
      required: true,
      min: 50,
      max: 270,
    },
    weight: {
      type: Number, // in kg
      required: true,
      min: 20,
      max: 300,
    },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very active"],
      default: "moderate",
    },
    preferredWorkout: {
      type: String,
      enum: ["gym", "home", "both"],
      default: "gym",
    },
    preferredDiet: {
      type: String,
      enum: ["vegetarian", "vegan", "non vegetarian", "keto", "high protein", "none"],
      default: "none",
    },
    injuries: {
      type: [String],
      default: [],
    },
    medicalConditions: {
      type: [String],
      default: [],
    },
    allergies: {
      type: [String],
      default: [],
    },
    sleepHours: {
      type: Number,
      default: 8,
      min: 2,
      max: 20,
    },
    waterIntake: {
      type: Number, // in liters
      default: 3,
      min: 1,
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

const UserFitnessProfile = mongoose.model("UserFitnessProfile", userFitnessProfileSchema);

export default UserFitnessProfile;
