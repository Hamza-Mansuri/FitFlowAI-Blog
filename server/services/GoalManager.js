import { getOrCreateMemory } from "./MemoryService.js";
import UserFitnessProfile from "../models/UserFitnessProfile.js";

export const getGoalMetrics = async (userId) => {
  const profile = await UserFitnessProfile.findOne({ user: userId });
  const memory = await getOrCreateMemory(userId);

  const goal = profile?.goal || "general fitness";
  const weight = profile?.weight || 70;
  
  // Set default targets based on goals
  let targetWeight = weight;
  if (goal === "fat loss") targetWeight = Math.round(weight - 5);
  else if (goal === "muscle gain") targetWeight = Math.round(weight + 4);

  const pct = Math.abs(weight - targetWeight) === 0 ? 100 : 65; // placeholder calculation

  return {
    currentGoal: goal,
    weight,
    targetWeight,
    completionPercentage: pct,
    estimatedDaysRemaining: 45,
    previousGoals: memory.previousGoals || [],
  };
};
