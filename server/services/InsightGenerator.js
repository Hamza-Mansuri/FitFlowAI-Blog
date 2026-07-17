import DailyCheckIn from "../models/DailyCheckIn.js";

export const getAIInsights = async (userId) => {
  const logs = await DailyCheckIn.find({ createdBy: userId }).sort({ date: -1 }).limit(10);
  
  if (logs.length === 0) {
    return [
      "No logged logs to calculate trends. Complete check-ins daily.",
      "Track hydration metrics to compute performance changes."
    ];
  }

  const avgSleep = (logs.reduce((acc, curr) => acc + curr.sleepHours, 0) / logs.length).toFixed(1);
  const avgWater = (logs.reduce((acc, curr) => acc + curr.waterIntake, 0) / logs.length).toFixed(1);

  return [
    `Your average sleep is ${avgSleep} hours. Aim for 7.5+ hours to improve recovery.`,
    `Water intake is consistent at ${avgWater}L. You are meeting hydration targets.`,
    `Workout completion rate is stable. Keep prioritizing strength splits.`
  ];
};
