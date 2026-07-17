import BodyMeasurement from "../models/BodyMeasurement.js";
import { compileUserAnalytics } from "../services/analyticsService.js";
import { generateAIAnalyticsInsights } from "../services/reportGenerator.js";

// Helper to get formatted local date (YYYY-MM-DD)
const getLocalDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getAnalyticsDashboard = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    
    // 1. Compile biometrics statistics
    const stats = await compileUserAnalytics(userId);

    // 2. Generate AI-powered insights
    const aiInsight = await generateAIAnalyticsInsights(stats);

    return res.status(200).json({
      overview: stats.overview,
      weightTrend: stats.weightTrend,
      measurementHistory: stats.measurementHistory,
      recoveryTrend: stats.recoveryTrend,
      achievements: stats.achievements,
      aiInsights: aiInsight.insights,
      aiRecommendations: aiInsight.recommendations,
    });
  } catch (error) {
    console.error("Get analytics dashboard error:", error);
    return res.status(500).json({ message: error.message || "Failed to compile progress analytics" });
  }
};

export const updateMeasurements = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const dateStr = req.body.date || getLocalDateString();

    const measurement = await BodyMeasurement.findOneAndUpdate(
      { date: dateStr, createdBy: userId },
      { $set: req.body },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(200).json({ message: "Body measurements logged successfully!", measurement });
  } catch (error) {
    console.error("Update measurements error:", error);
    return res.status(500).json({ message: "Failed to save body measurements" });
  }
};
