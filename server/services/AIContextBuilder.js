import { getOrCreateMemory } from "./MemoryService.js";
import UserFitnessProfile from "../models/UserFitnessProfile.js";
import WorkoutPlan from "../models/WorkoutPlan.js";
import NutritionPlan from "../models/NutritionPlan.js";
import DailyCheckIn from "../models/DailyCheckIn.js";

export const buildCoachingContext = async (userId) => {
  const memory = await getOrCreateMemory(userId);
  const profile = await UserFitnessProfile.findOne({ user: userId });
  
  // Get recent 3 check-ins
  const checkIns = await DailyCheckIn.find({ createdBy: userId }).sort({ date: -1 }).limit(3);
  const latestCheckIn = checkIns[0] || null;

  // Get active workout and meal plan
  const workout = await WorkoutPlan.findOne({ createdBy: userId }).sort({ createdAt: -1 });
  const nutrition = await NutritionPlan.findOne({ createdBy: userId }).sort({ createdAt: -1 });

  const recentLogsStr = checkIns.map(c => `Date: ${c.date}, Recovery: ${c.recoveryScore}%, Sleep: ${c.sleepHours}h, Steps: ${c.steps}, Workout Completed: ${c.workoutCompleted}`).join("\n");

  return `
--- AI Intelligence Core memory context ---
Goal: ${memory.currentGoal || profile?.goal || "General Fitness"}
Injuries: ${(memory.injuries || []).join(", ") || "None"}
Allergies: ${(memory.foodsAvoided || []).join(", ") || "None"}
Workout Location: ${profile?.preferredWorkout || "gym"}
Equipments: ${memory.equipmentAvailability || "Mixed gym equipment"}
Gym Frequency: ${memory.gymAvailability || "3-4x/week"}

Permanent Memory Tags:
${(memory.permanentMemory || []).map(m => `- ${m}`).join("\n")}

Temporary Memory Tags:
${(memory.temporaryMemory || []).map(m => `- ${m}`).join("\n")}

Active Workout Routine:
${workout ? `- Title: ${workout.title}, Split: ${workout.split}, Duration: ${workout.sessionDuration} mins` : "None active"}

Active Nutrition Meal Plan:
${nutrition ? `- Title: ${nutrition.title}, Diet Style: ${nutrition.dietPreference}, Target Calories: ${nutrition.dailyCalories} kcal` : "None active"}

Recent Daily Logs:
${recentLogsStr || "No daily logs recorded yet."}

Calculated Recovery Score: ${latestCheckIn ? latestCheckIn.recoveryScore : 75}%

Conversation Summaries:
${(memory.conversationSummaries || []).map(s => `- ${s}`).join("\n")}
`;
};
