import DailyCheckIn from "../models/DailyCheckIn.js";

export const getProactiveRecommendations = async (userId) => {
  const checkIns = await DailyCheckIn.find({ createdBy: userId }).sort({ date: -1 }).limit(3);
  const latest = checkIns[0] || null;

  if (!latest) {
    return [
      "Complete your first daily check-in to compute suggestions.",
      "Track your protein metrics post-workout."
    ];
  }

  const recommendations = [];

  if (latest.sleepHours < 6.5) {
    recommendations.push("Sleep is below optimal threshold. Reduce training volume by 15% today.");
  } else {
    recommendations.push("Sleep duration is solid. Ready for progressive overload sessions.");
  }

  if (latest.waterIntake < 2.5) {
    recommendations.push("Hydration levels are low today. Drink an extra 1L water.");
  }

  if (latest.stressLevel > 6) {
    recommendations.push("Stress is elevated today. Schedule 10 minutes of active mobility stretching.");
  }

  return recommendations;
};
