/**
 * Scientific Calorie calculator using the Mifflin-St Jeor Equation:
 * BMR = 10 * weight (kg) + 6.25 * height (cm) - 5 * age (y) + s
 * (s is +5 for males and -161 for females)
 */
export const calculateCalories = (profile, preferences = {}) => {
  const weight = Number(profile.weight) || 70;
  const height = Number(profile.height) || 170;
  const age = Number(profile.age) || 25;
  const gender = profile.gender || "male";
  
  // 1. Calculate BMR
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  if (gender === "male") {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // 2. Activity Multipliers
  const activityLevel = preferences.activityLevel || profile.activityLevel || "moderate";
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    "very active": 1.9,
  };
  const multiplier = multipliers[activityLevel.toLowerCase()] || 1.55;
  const tdee = Math.round(bmr * multiplier);

  // 3. Recommended Calorie target based on Goal
  const goal = preferences.goal || profile.goal || "general fitness";
  let targetCalories = tdee;

  if (goal.toLowerCase() === "fat loss") {
    targetCalories = Math.round(tdee - 450); // deficit of 450 calories (safe)
  } else if (goal.toLowerCase() === "muscle gain") {
    targetCalories = Math.round(tdee + 250); // lean bulk surplus
  } else if (goal.toLowerCase() === "strength" || goal.toLowerCase() === "athletic performance") {
    targetCalories = Math.round(tdee + 150); // strength adaptations
  }

  // Enforce floor limits for safe baseline metabolic outputs
  const safeFloor = gender === "male" ? 1500 : 1200;
  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories: Math.max(targetCalories, safeFloor),
  };
};
