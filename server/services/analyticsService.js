import DailyCheckIn from "../models/DailyCheckIn.js";
import BodyMeasurement from "../models/BodyMeasurement.js";
import WorkoutPlan from "../models/WorkoutPlan.js";
import NutritionPlan from "../models/NutritionPlan.js";

export const compileUserAnalytics = async (userId) => {
  // Fetch past 30 check-ins
  const checkIns = await DailyCheckIn.find({ createdBy: userId }).sort({ date: 1 });
  const measurements = await BodyMeasurement.find({ createdBy: userId }).sort({ date: 1 });
  const workouts = await WorkoutPlan.find({ createdBy: userId });
  const nutrition = await NutritionPlan.find({ createdBy: userId });

  const totalLogs = checkIns.length;

  // 1. Weight trends
  const weightTrend = checkIns.map(c => ({ date: c.date, weight: c.weight }));
  const avgWeight = totalLogs > 0 ? (checkIns.reduce((acc, curr) => acc + curr.weight, 0) / totalLogs).toFixed(1) : null;
  const lowestWeight = weightTrend.length > 0 ? Math.min(...weightTrend.map(w => w.weight)) : null;
  const highestWeight = weightTrend.length > 0 ? Math.max(...weightTrend.map(w => w.weight)) : null;

  // Calculate weekly change (comparing last check-in with check-in 7 logs ago)
  let weeklyChange = 0;
  if (totalLogs >= 7) {
    weeklyChange = (checkIns[totalLogs - 1].weight - checkIns[totalLogs - 7].weight).toFixed(1);
  }

  // 2. Body measurement history
  const measurementHistory = measurements.map(m => ({
    date: m.date,
    chest: m.chest,
    waist: m.waist,
    hips: m.hips,
    neck: m.neck,
    arms: m.arms,
    forearms: m.forearms,
    thighs: m.thighs,
    calves: m.calves,
    bodyFat: m.bodyFat,
    muscleMass: m.muscleMass,
  }));

  // 3. Workout metrics
  const workoutsCompleted = checkIns.filter(c => c.workoutCompleted).length;
  const workoutConsistency = totalLogs > 0 ? Math.round((workoutsCompleted / totalLogs) * 100) : 0;
  
  // 4. Nutrition metrics
  const nutritionAdherenceCount = checkIns.filter(c => c.mealPlanFollowed).length;
  const nutritionAdherence = totalLogs > 0 ? Math.round((nutritionAdherenceCount / totalLogs) * 100) : 0;
  const avgCalories = totalLogs > 0 ? Math.round(checkIns.reduce((acc, curr) => acc + (curr.mealPlanFollowed ? 2000 : 2500), 0) / totalLogs) : 0; // estimate
  const avgWater = totalLogs > 0 ? (checkIns.reduce((acc, curr) => acc + curr.waterIntake, 0) / totalLogs).toFixed(1) : 0;

  // 5. Recovery trends
  const recoveryTrend = checkIns.map(c => ({
    date: c.date,
    sleep: c.sleepHours,
    stress: c.stressLevel,
    energy: c.energyLevel,
    recoveryScore: c.recoveryScore,
  }));

  // 6. Calculate consistency score (0 - 100)
  const sleepTargetPct = totalLogs > 0 ? Math.min(100, (checkIns.reduce((acc, curr) => acc + curr.sleepHours, 0) / totalLogs) / 8 * 100) : 0;
  const waterTargetPct = totalLogs > 0 ? Math.min(100, (checkIns.reduce((acc, curr) => acc + curr.waterIntake, 0) / totalLogs) / 3 * 100) : 0;

  const consistencyScore = Math.round(
    workoutConsistency * 0.35 +
    nutritionAdherence * 0.35 +
    sleepTargetPct * 0.15 +
    waterTargetPct * 0.15
  );

  // 7. Calculate Achievements list
  const achievements = [];
  if (workoutsCompleted >= 1) achievements.push("First Workout");
  if (totalLogs >= 7) achievements.push("7-Day Streak");
  if (totalLogs >= 30) achievements.push("30-Day Streak");
  if (workoutsCompleted >= 10) achievements.push("Consistency King");
  if (avgWater >= 3) achievements.push("Hydration Hero");
  if (nutritionAdherence >= 80) achievements.push("Protein Master");

  return {
    overview: {
      totalLogs,
      consistencyScore: Math.min(100, consistencyScore),
      activeWorkoutsCount: workouts.length,
      activeNutritionCount: nutrition.length,
      workoutConsistency,
      nutritionAdherence,
      avgWeight: Number(avgWeight) || 0,
      lowestWeight: lowestWeight || 0,
      highestWeight: highestWeight || 0,
      weeklyChange: Number(weeklyChange),
      avgSleep: totalLogs > 0 ? (checkIns.reduce((acc, curr) => acc + curr.sleepHours, 0) / totalLogs).toFixed(1) : 0,
      avgWater: Number(avgWater),
    },
    weightTrend,
    measurementHistory,
    recoveryTrend,
    achievements,
  };
};
