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

export const generateWeeklyReport = async (checkIns) => {
  if (!checkIns || checkIns.length === 0) {
    throw new Error("No check-in history found for this week.");
  }

  // 1. Calculate statistical summaries
  const count = checkIns.length;
  const weights = checkIns.map(c => c.weight).filter(w => w > 0);
  const avgWeight = weights.length > 0 ? (weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(1) : 70;
  
  const sleeps = checkIns.map(c => c.sleepHours);
  const avgSleep = (sleeps.reduce((a, b) => a + b, 0) / count).toFixed(1);

  const recoveries = checkIns.map(c => c.recoveryScore);
  const avgRecovery = Math.round(recoveries.reduce((a, b) => a + b, 0) / count);

  const workouts = checkIns.filter(c => c.workoutCompleted).length;
  const workoutCompletion = Math.round((workouts / count) * 100);

  const meals = checkIns.filter(c => c.mealPlanFollowed).length;
  const mealAdherence = Math.round((meals / count) * 100);

  // Find best and weakest day based on recovery score
  let bestDay = checkIns[0];
  let weakestDay = checkIns[0];
  for (const c of checkIns) {
    if (c.recoveryScore > bestDay.recoveryScore) bestDay = c;
    if (c.recoveryScore < weakestDay.recoveryScore) weakestDay = c;
  }

  // 2. Call Gemini for qualitative review
  const client = getGenAIClient();
  const model = client.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `You are a certified fitness sports nutritionist and strength coach.
Review this user's weekly check-in statistics and generate a weekly report:

- **Check-ins logged:** ${count} days out of 7
- **Average Weight:** ${avgWeight} kg
- **Average Sleep:** ${avgSleep} hours
- **Average Recovery Score:** ${avgRecovery} / 100
- **Workout Completion Rate:** ${workoutCompletion}%
- **Nutrition Plan Adherence:** ${mealAdherence}%
- **Best Day Recovery:** ${bestDay.recoveryScore}% (logged on ${bestDay.date}, mood: ${bestDay.mood})
- **Weakest Day Recovery:** ${weakestDay.recoveryScore}% (logged on ${weakestDay.date}, mood: ${weakestDay.mood})

Write a brief review detailing:
- Summarized progress (evaluate weight trends and fatigue)
- Consistency review (praise compliance or offer troubleshooting advice if workouts/meals were skipped)
- Core focus/actionable instructions for next week

Output strictly as a JSON object matching this schema:
{
  "summary": "Detailed 2-3 sentence overview of this week's progress",
  "consistencyFeedback": "1-2 sentences reviewing workout and nutrition consistency",
  "nextWeekAdvice": "3 bullet points outlining specific target metrics or adjustments for next week"
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);

    return {
      loggedDays: count,
      avgWeight: Number(avgWeight),
      avgSleep: Number(avgSleep),
      avgRecovery,
      workoutCompletion,
      mealAdherence,
      bestDay: { date: bestDay.date, score: bestDay.recoveryScore, mood: bestDay.mood },
      weakestDay: { date: weakestDay.date, score: weakestDay.recoveryScore, mood: weakestDay.mood },
      aiReview: parsed,
    };
  } catch (error) {
    console.error("Gemini weekly summary failed:", error);
    return {
      loggedDays: count,
      avgWeight: Number(avgWeight),
      avgSleep: Number(avgSleep),
      avgRecovery,
      workoutCompletion,
      mealAdherence,
      bestDay: { date: bestDay.date, score: bestDay.recoveryScore, mood: bestDay.mood },
      weakestDay: { date: weakestDay.date, score: weakestDay.recoveryScore, mood: weakestDay.mood },
      aiReview: {
        summary: "Weekly metrics processed successfully. Keep staying consistent with your logging.",
        consistencyFeedback: "Continue executing your plan. Consistency is the key to hypertrophy and conditioning adaptations.",
        nextWeekAdvice: [
          "Target an average of 7.5 hours of sleep nightly.",
          "Keep hydration levels high by drinking 3+ Liters daily.",
          "Progressively overload workout volumes incrementally."
        ],
      },
    };
  }
};
