import mongoose from "mongoose";

const userMemorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    currentGoal: { type: String, default: "" },
    previousGoals: [{ type: String }],
    workoutPreferences: [{ type: String }],
    favoriteExercises: [{ type: String }],
    exercisesHated: [{ type: String }],
    favoriteFoods: [{ type: String }],
    foodsAvoided: [{ type: String }],
    gymAvailability: { type: String, default: "" },
    equipmentAvailability: { type: String, default: "" },
    injuries: [{ type: String }],
    medicalConditions: [{ type: String }],
    permanentMemory: [{ type: String }],
    temporaryMemory: [{ type: String }],
    conversationSummaries: [{ type: String }],
    achievements: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const UserMemory = mongoose.model("UserMemory", userMemorySchema);

export default UserMemory;
