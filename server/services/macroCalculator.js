export const calculateMacros = (targetCalories, profile, preferences = {}) => {
  const weight = Number(profile.weight) || 70;
  const goal = preferences.goal || profile.goal || "general fitness";
  
  // 1. Calculate Protein Target (g per kg of bodyweight)
  let proteinPerKg = 1.6; // General baseline
  const cleanGoal = goal.toLowerCase();

  if (cleanGoal === "muscle gain" || cleanGoal === "strength") {
    proteinPerKg = 2.0; // Muscle hypertrophy targets
  } else if (cleanGoal === "fat loss") {
    proteinPerKg = 2.2; // Protect muscle tissue during deficit
  } else if (cleanGoal === "athletic performance") {
    proteinPerKg = 1.8;
  }

  let proteinGrams = Math.round(weight * proteinPerKg);
  // Cap protein bounds between 80g and 220g for safety
  proteinGrams = Math.max(80, Math.min(proteinGrams, 220));

  // 2. Calculate Fat Target (25% of total calories, 1g fat = 9 kcal)
  let fatCalories = targetCalories * 0.25;
  let fatGrams = Math.round(fatCalories / 9);
  // Cap fat bounds between 40g and 100g for safety
  fatGrams = Math.max(40, Math.min(fatGrams, 100));

  // 3. Calculate Carbohydrates (remaining calories, 1g carb = 4 kcal)
  const proteinCalories = proteinGrams * 4;
  const combinedFatCalories = fatGrams * 9;
  const carbCalories = Math.max(0, targetCalories - (proteinCalories + combinedFatCalories));
  const carbGrams = Math.round(carbCalories / 4);

  // 4. Fiber Target (standard guidelines)
  const fiberGrams = Math.round(targetCalories / 1000 * 14); // 14g per 1000 kcal

  return {
    protein: proteinGrams,
    fat: fatGrams,
    carbohydrates: carbGrams,
    fiber: Math.max(25, fiberGrams),
  };
};
