import { GoogleGenerativeAI } from "@google/generative-ai";

let genAIClient = null;

const getGenAIClient = () => {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Cannot call AI coach.");
    }
    genAIClient = new GoogleGenerativeAI(apiKey);
  }
  return genAIClient;
};

// Calculate recovery score mathematically
export const calculateRecoveryScore = (checkIn) => {
  const sleepHours = Number(checkIn.sleepHours) || 8;
  const stressLevel = Number(checkIn.stressLevel) || 5;
  const energyLevel = Number(checkIn.energyLevel) || 5;
  const mealPlanFollowed = checkIn.mealPlanFollowed;
  const cheatMeal = checkIn.cheatMeal;

  // 1. Sleep: optimal is 8 hours
  const sleepPct = Math.min(100, (sleepHours / 8) * 100);
  
  // 2. Stress: 1 is best, 10 is worst
  const stressPct = ((11 - stressLevel) / 10) * 100;

  // 3. Energy: 10 is best, 1 is worst
  const energyPct = (energyLevel / 10) * 100;

  // 4. Nutrition Adherence
  const nutritionPct = mealPlanFollowed ? 100 : (cheatMeal ? 40 : 70);

  // Weighted recovery score
  const score = Math.round(
    sleepPct * 0.35 +
    stressPct * 0.25 +
    energyPct * 0.25 +
    nutritionPct * 0.15
  );

  return Math.min(100, Math.max(0, score));
};

export const generateCoachingFeedback = async (checkIn, score) => {
  try {
    const client = getGenAIClient();
    const model = client.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const goal = checkIn.goal || "general fitness";
    const experience = checkIn.experience || "beginner";
    const workoutLocation = checkIn.workoutLocation || "gym";
    const equipment = checkIn.equipment || "mixed";
    const daysPerWeek = Number(checkIn.daysPerWeek) || 3;
    const sessionDuration = Number(checkIn.sessionDuration) || 45;
    const split = checkIn.split || "Full Body";
    const injuries = checkIn.injuryPain || "None";
    const allergies = checkIn.allergies || "None";

    const prompt = `You are a certified strength and sports nutrition coach.
Based on today's user check-in data and calculated recovery score:

- **Recovery Score:** ${score} / 100
- **Sleep Duration:** ${checkIn.sleepHours} hours
- **Energy Level (1-10):** ${checkIn.energyLevel}
- **Stress Level (1-10):** ${checkIn.stressLevel}
- **Motivation Level (1-10):** ${checkIn.motivationLevel}
- **Hunger Level (1-10):** ${checkIn.hungerLevel}
- **Water Intake:** ${checkIn.waterIntake} Liters
- **Workout Yesterday:** ${checkIn.workoutCompleted ? "Completed" : "Skipped"}
- **Meal Plan Adherence:** ${checkIn.mealPlanFollowed ? "Followed" : "Not followed"}
- **Injuries/Pain:** ${checkIn.injuryPain}
- **User Mood:** ${checkIn.mood}
- **User Notes:** ${checkIn.notes || "None"}

Provide adaptive fitness, nutrition, and recovery advice.
- If sleep is <6 hours or recovery score is <65, suggest lowering training intensity/volume (deloading by 15-20%).
- If stress is high, suggest active recovery, stretching, or breathing exercises.
- If motivation is low, provide highly encouraging, confident words.
- Respect injuries and pain points.

Output strictly as a JSON object matching this schema:
{
  "workout": "Short, specific advice on how to structure training today (e.g. lift heavy, deload by 15%, or do active recovery)",
  "nutrition": "Short, specific tips on hydration, protein, or caloric adjustment for today",
  "recovery": "Actionable recovery suggestions (e.g. stretch, sleep early, or mobility drills)",
  "motivation": "A short, motivating message to keep consistency high"
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini coaching feedback generator failed:", error);
    // Return friendly fallbacks
    return {
      workout: "Keep consistency high. Focus on progressive overload.",
      nutrition: "Maintain hydration and hit your protein target.",
      recovery: "Aim for 8 hours of sleep and target key muscle groups with stretching.",
      motivation: "Every day counts. Focus on your goals today!",
    };
  }
};
