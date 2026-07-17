import NutritionPlan from "../models/NutritionPlan.js";
import UserFitnessProfile from "../models/UserFitnessProfile.js";
import { calculateCalories } from "../services/calorieCalculator.js";
import { calculateMacros } from "../services/macroCalculator.js";
import { generateNutritionPlanAI } from "../services/nutritionGenerator.js";

export const generateNutrition = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    // Load fitness profile
    const profile = await UserFitnessProfile.findOne({ user: userId });
    if (!profile) {
      return res.status(400).json({ message: "Please complete your Fitness Profile first to generate a meal plan." });
    }

    // 1. Calculate calories based on Mifflin-St Jeor equation
    const { targetCalories } = calculateCalories(profile, req.body);

    // 2. Calculate macros
    const macros = calculateMacros(targetCalories, profile, req.body);

    // 3. Call AI to generate meals and shopping items
    const aiPlan = await generateNutritionPlanAI(targetCalories, macros, profile, req.body);

    // 4. Inject targets into final output
    const plan = {
      ...aiPlan,
      dailyCalories: targetCalories,
      protein: macros.protein,
      carbohydrates: macros.carbohydrates,
      fat: macros.fat,
      fiber: macros.fiber,
      waterGoal: profile.waterIntake || 3,
      mealCount: Number(req.body.mealCount || 4),
    };

    return res.status(200).json({ plan });
  } catch (error) {
    console.error("Generate nutrition error:", error);
    return res.status(500).json({ message: error.message || "Failed to generate nutrition plan" });
  }
};

export const saveNutrition = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { title, goal, dailyCalories, protein, carbohydrates, fat, fiber, waterGoal, mealCount, dietPreference, planType, mealPlan, shoppingList } = req.body;

    const plan = new NutritionPlan({
      title,
      goal,
      dailyCalories: Number(dailyCalories),
      protein: Number(protein),
      carbohydrates: Number(carbohydrates),
      fat: Number(fat),
      fiber: Number(fiber),
      waterGoal: Number(waterGoal || 3),
      mealCount: Number(mealCount || 4),
      dietPreference,
      planType,
      mealPlan,
      shoppingList,
      createdBy: userId,
    });

    await plan.save();
    return res.status(201).json({ message: "Nutrition plan saved successfully", plan });
  } catch (error) {
    console.error("Save nutrition error:", error);
    return res.status(500).json({ message: error.message || "Failed to save nutrition plan" });
  }
};

export const getNutritionPlans = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const plans = await NutritionPlan.find({ createdBy: userId }).sort({ createdAt: -1 });
    return res.status(200).json({ plans });
  } catch (error) {
    console.error("Get nutrition plans error:", error);
    return res.status(500).json({ message: "Failed to load nutrition plans" });
  }
};

export const getNutritionById = async (req, res) => {
  try {
    const plan = await NutritionPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Nutrition plan not found" });
    }
    return res.status(200).json({ plan });
  } catch (error) {
    console.error("Get nutrition details error:", error);
    return res.status(500).json({ message: "Failed to load nutrition plan details" });
  }
};

export const deleteNutrition = async (req, res) => {
  try {
    const plan = await NutritionPlan.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id || req.user.id });
    if (!plan) {
      return res.status(404).json({ message: "Nutrition plan not found or unauthorized" });
    }
    return res.status(200).json({ message: "Nutrition plan deleted successfully" });
  } catch (error) {
    console.error("Delete nutrition error:", error);
    return res.status(500).json({ message: "Failed to delete nutrition plan" });
  }
};

export const renameNutrition = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    const plan = await NutritionPlan.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id || req.user.id },
      { $set: { title: title.trim() } },
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ message: "Nutrition plan not found or unauthorized" });
    }

    return res.status(200).json({ message: "Nutrition plan renamed successfully", plan });
  } catch (error) {
    console.error("Rename nutrition error:", error);
    return res.status(500).json({ message: "Failed to rename nutrition plan" });
  }
};
export const duplicateNutrition = async (req, res) => {
  try {
    const original = await NutritionPlan.findById(req.params.id);
    if (!original) {
      return res.status(404).json({ message: "Original nutrition plan not found" });
    }

    const copy = new NutritionPlan({
      title: `${original.title} (Copy)`,
      goal: original.goal,
      dailyCalories: original.dailyCalories,
      protein: original.protein,
      carbohydrates: original.carbohydrates,
      fat: original.fat,
      fiber: original.fiber,
      waterGoal: original.waterGoal,
      mealCount: original.mealCount,
      dietPreference: original.dietPreference,
      planType: original.planType,
      mealPlan: original.mealPlan,
      shoppingList: original.shoppingList,
      createdBy: req.user._id || req.user.id,
    });

    await copy.save();
    return res.status(201).json({ message: "Meal plan duplicated successfully", plan: copy });
  } catch (error) {
    console.error("Duplicate nutrition error:", error);
    return res.status(500).json({ message: "Failed to duplicate meal plan" });
  }
};
