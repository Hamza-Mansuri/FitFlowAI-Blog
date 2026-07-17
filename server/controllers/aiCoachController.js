import { buildCoachingContext } from "../services/AIContextBuilder.js";
import { getOrCreateMemory } from "../services/MemoryService.js";
import { getGoalMetrics } from "../services/GoalManager.js";
import { getAIInsights } from "../services/InsightGenerator.js";
import { getProactiveRecommendations } from "../services/RecommendationEngine.js";
import { summarizeAndExtractMemory } from "../services/ConversationSummarizer.js";
import { getGeminiReply } from "../services/geminiService.js";
import UserFitnessProfile from "../models/UserFitnessProfile.js";
import DailyCheckIn from "../models/DailyCheckIn.js";

// Helper to get formatted local date (YYYY-MM-DD)
const getLocalDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getCoachDashboard = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    // Load components in parallel
    const [memory, goalMetrics, insights, recommendations, checkIn] = await Promise.all([
      getOrCreateMemory(userId),
      getGoalMetrics(userId),
      getAIInsights(userId),
      getProactiveRecommendations(userId),
      DailyCheckIn.findOne({ date: getLocalDateString(), createdBy: userId }),
    ]);

    return res.status(200).json({
      memory,
      goalMetrics,
      insights,
      recommendations,
      recoveryScore: checkIn ? checkIn.recoveryScore : 75,
      sleepHours: checkIn ? checkIn.sleepHours : 8,
      waterIntake: checkIn ? checkIn.waterIntake : 3,
      workoutStatus: checkIn ? (checkIn.workoutCompleted ? "Completed" : "Skipped") : "Pending Check-in",
    });
  } catch (error) {
    console.error("Get coach dashboard error:", error);
    return res.status(500).json({ message: "Failed to compile AI Coach workspace details" });
  }
};

export const handleCoachChat = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { message, history } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message content cannot be empty" });
    }

    // 1. Compile long-term context (memory + check-ins + profiles)
    const contextStr = await buildCoachingContext(userId);

    // 2. Format custom instructions prepending context
    const prependedInstructions = `You are FitCoach AI, the official flag-ship personal fitness coach of FitFlowAI.
Act as a certified strength coach and evidence-based sports nutritionist.

${contextStr}

CRITICAL RULES:
- Tailor suggestions to the user's goals, preferred workouts, and injuries.
- NEVER suggest crash diets or high training volumes if recovery score is low.
- Encorage the user and celebrate their wins.
`;

    // 3. Request Gemini reply
    const reply = await getGeminiReply(message, history, prependedInstructions);

    // 4. Summarize conversation and extract memory in background (non-blocking)
    const updatedHistory = [...(history || []), { role: "user", parts: [{ text: message }] }, { role: "model", parts: [{ text: reply }] }];
    summarizeAndExtractMemory(userId, updatedHistory).catch((err) => {
      console.error("Background summarization error:", err);
    });

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Coach chat error:", error);
    return res.status(500).json({ error: "Coaching server is offline. Try again later." });
  }
};
