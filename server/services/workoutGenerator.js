import { GoogleGenerativeAI } from "@google/generative-ai";

let genAIClient = null;

const getGenAIClient = () => {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Cannot generate workout program.");
    }
    genAIClient = new GoogleGenerativeAI(apiKey);
  }
  return genAIClient;
};

export const generateWorkoutPlanAI = async (profile, preferences) => {
  const client = getGenAIClient();
  const model = client.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const goal = preferences.goal || profile.goal || "general fitness";
  const experience = preferences.experience || profile.experience || "beginner";
  const workoutLocation = preferences.workoutLocation || profile.preferredWorkout || "gym";
  const equipment = preferences.equipment || "mixed";
  const daysPerWeek = Number(preferences.daysPerWeek) || 3;
  const sessionDuration = Number(preferences.sessionDuration) || 45;
  const split = preferences.split || "Full Body";
  const injuries = (profile.injuries || []).join(", ") || "None";
  const allergies = (profile.allergies || []).join(", ") || "None";

  const prompt = `You are a certified strength and conditioning coach.
Generate a structured, scientifically sound fitness workout plan tailored to this profile:

- **Goal:** ${goal}
- **Experience Level:** ${experience}
- **Training Frequency:** ${daysPerWeek} days per week
- **Session Duration:** ${sessionDuration} minutes
- **Workout Location:** ${workoutLocation}
- **Available Equipment:** ${equipment}
- **Preferred Split:** ${split}
- **User Injuries:** ${injuries}
- **User Allergies:** ${allergies}

CRITICAL TRAINING SAFETY RULES:
- If injuries are listed (e.g. knee strain/back pain/shoulder injury), DO NOT suggest exercises that aggravate them. If shoulder pain, avoid heavy barbell overhead presses or behind-neck presses. If knee pain, avoid heavy squats, squats beyond parallel, or leg extensions. Provide safer alternatives.
- Keep training volume balanced (no excessive sets, avoid junk volume). Ensure sufficient rest periods.

Output the plan strictly as a JSON object matching this schema:
{
  "title": "A motivating title for the workout plan",
  "goal": "${goal}",
  "experience": "${experience}",
  "difficulty": "Beginner, Intermediate, or Advanced based on experience",
  "split": "${split}",
  "estimatedCalories": 350, // a reasonable estimate of calories burned per session
  "days": [
    {
      "dayName": "Day 1: Chest & Triceps (example name)",
      "exercises": [
        {
          "exerciseName": "Bench Press",
          "muscleGroup": "Chest",
          "sets": 3,
          "reps": "8-10",
          "restTime": "90s",
          "tempo": "2-1-1-0",
          "notes": "Focus on controlled eccentric contractions."
        }
      ]
    }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini workout generator failed:", error);
    throw error;
  }
};
