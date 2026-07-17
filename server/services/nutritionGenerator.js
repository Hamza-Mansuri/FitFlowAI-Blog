import { GoogleGenerativeAI } from "@google/generative-ai";

let genAIClient = null;

const getGenAIClient = () => {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Cannot generate nutrition program.");
    }
    genAIClient = new GoogleGenerativeAI(apiKey);
  }
  return genAIClient;
};

export const generateNutritionPlanAI = async (calories, macros, profile, preferences) => {
  const client = getGenAIClient();
  const model = client.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const dietPreference = preferences.dietPreference || profile.preferredDiet || "balanced";
  const allergies = (profile.allergies || []).join(", ") || "None";
  const medicalConditions = (profile.medicalConditions || []).join(", ") || "None";
  const mealCount = Number(preferences.mealCount) || 4;

  const prompt = `You are a certified sports nutritionist and dietitian.
Generate a structured, evidence-based meal plan and grocery list matching these targets:

- **Daily Calorie Target:** ${calories} kcal
- **Protein Target:** ${macros.protein} grams
- **Carbohydrates Target:** ${macros.carbohydrates} grams
- **Fat Target:** ${macros.fat} grams
- **Fiber Target:** ${macros.fiber} grams
- **Water Goal:** ${profile.waterIntake || 3} liters
- **Meals Per Day:** ${mealCount}
- **Diet Style:** ${dietPreference}
- **User Allergies:** ${allergies}
- **Medical Conditions:** ${medicalConditions}

CRITICAL RULES:
- Respect ALL dietary constraints. If vegetarian/vegan, do NOT recommend meat, fish, or poultry.
- Avoid ALL allergens completely (e.g. if peanut allergy, do not recommend peanuts, peanut butter, or nut oils).
- Ensure meal portions and calories are realistic and mathematically align with the daily targets.

Output the plan strictly as a JSON object matching this schema:
{
  "title": "A motivating name for this meal plan",
  "goal": "${profile.goal || "general fitness"}",
  "dietPreference": "${dietPreference}",
  "planType": "Balanced / High Protein / Keto / Low Carb based on inputs",
  "mealPlan": [
    {
      "mealName": "Breakfast",
      "time": "08:30 AM",
      "notes": "Rich in protein to stimulate protein synthesis.",
      "calories": 450,
      "protein": 30,
      "carbs": 50,
      "fat": 12,
      "fiber": 8,
      "foods": [
        {
          "name": "Oatmeal with whey protein and banana slices",
          "portion": "1 bowl (60g oats, 30g scoop whey)",
          "calories": 380,
          "protein": 26,
          "carbs": 44,
          "fat": 8
        }
      ]
    }
  ],
  "shoppingList": [
    {
      "item": "Rolled Oats",
      "quantity": "500g",
      "category": "Grains"
    },
    {
      "item": "Whey Protein",
      "quantity": "1 tub",
      "category": "Protein Sources"
    }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini nutrition generator failed:", error);
    throw error;
  }
};
