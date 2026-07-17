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

export const generateAIAnalyticsInsights = async (analyticsData) => {
  const client = getGenAIClient();
  const model = client.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `You are a senior sports science analyst and personal coach.
Review this user's fitness progress statistics and generate personalized insights:

- **Workout Consistency Rate:** ${analyticsData.overview.workoutConsistency}%
- **Nutrition Adherence Rate:** ${analyticsData.overview.nutritionAdherence}%
- **Average Recovery Score:** ${analyticsData.overview.consistencyScore}%
- **Weekly Weight Delta:** ${analyticsData.overview.weeklyChange} kg
- **Average Sleep Duration:** ${analyticsData.overview.avgSleep} hours
- **Average Daily Water Intake:** ${analyticsData.overview.avgWater} Liters
- **Logged Days Count:** ${analyticsData.overview.totalLogs}

TASK:
- Generate 3-4 bulleted progress observations (AI Insights). Make them extremely analytical. If sleep is low, notice it. If water intake is high, praise it.
- Generate 3 actionable recommendations (AI Recommendations) for next week.

Output strictly as a JSON object matching this schema:
{
  "insights": [
    "Your sleep duration averages 6.5 hours, which limits muscle repair speed.",
    "Your weekly weight change is down by 0.4 kg, showing a sustainable caloric deficit."
  ],
  "recommendations": [
    "Aim to increase protein intake by 15g on workout days.",
    "Target 8 hours of sleep to improve recovery indicators."
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini analytics insights generator failed:", error);
    // Return friendly fallbacks
    return {
      insights: [
        "Workout consistency is pacing steadily. Keep executing your routines.",
        "Maintain water intake targets of 3+ Liters daily.",
        "Aim for regular sleep targets of 7.5 to 8.5 hours."
      ],
      recommendations: [
        "Hydrate early in the morning to increase alertness.",
        "Add 15 minutes of dynamic stretching post-workout.",
        "Track calories daily to ensure nutrition goals are met."
      ],
    };
  }
};
