import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  portion: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
});

const mealSchema = new mongoose.Schema({
  mealName: { type: String, required: true }, // e.g. Breakfast, Snack
  time: { type: String, required: true }, // e.g. "08:00 AM"
  foods: [foodItemSchema],
  notes: { type: String },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  fiber: { type: Number, default: 0 },
});

const shoppingItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Vegetables, Protein Sources
});

const nutritionPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    goal: {
      type: String,
      required: true,
    },
    dailyCalories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number, // in grams
      required: true,
    },
    carbohydrates: {
      type: Number, // in grams
      required: true,
    },
    fat: {
      type: Number, // in grams
      required: true,
    },
    fiber: {
      type: Number, // in grams
      default: 30,
    },
    waterGoal: {
      type: Number, // in liters
      default: 3,
    },
    mealCount: {
      type: Number,
      default: 4,
    },
    dietPreference: {
      type: String,
      required: true,
    },
    planType: {
      type: String, // e.g. "Balanced", "High Protein"
      required: true,
    },
    mealPlan: [mealSchema],
    shoppingList: [shoppingItemSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NutritionPlan = mongoose.model("NutritionPlan", nutritionPlanSchema);

export default NutritionPlan;
