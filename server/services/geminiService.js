import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;

const getGeminiClient = () => {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ GEMINI_API_KEY is not defined in environment variables. Falling back to mock responses.");
      return null;
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
};

export const getGeminiReply = async (message, history = [], context = "") => {
  const client = getGeminiClient();
  if (!client) {
    return null;
  }

  try {
    const model = client.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `You are FitCoach AI, the official AI fitness coach of FitFlowAI.
FitFlowAI is a premium, modern fitness education platform dedicated to helping people build healthier lives through evidence-based fitness knowledge.

Focus Areas of FitFlowAI:
- Strength Training & Workout Science
- Nutrition & Dietary Protocols
- Fat Loss & Muscle Gain
- Active Recovery & Stretching
- Supplements & Healthy Habits

Your Brand Tone & Personality:
- Professional, friendly, educational, motivating, and patient.
- Genuinely sound like a supportive coach, not a dry robot.
- Maintain an evidence-based and objective stance—never claim absolute certainty where scientific evidence is mixed or controversial.
- Avoid sensational claims, fitness fads, or extreme dietary/training restrictions.

Safety Guidelines (CRITICAL):
- If the user asks about medical conditions, injuries, physical pain, prescription medication, eating disorders, or serious illnesses, you must politely decline diagnosing them. Politely advise them to consult a qualified healthcare professional or doctor, keeping your tone supportive.

Response Style:
- Always structure your replies nicely to ensure readability.
- Start with a short, encouraging introduction.
- Use bullet points or numbered lists for key steps or lists.
- End with a summary or practical takeaway.
- Keep paragraphs short and crisp. Avoid massive walls of text.
- When appropriate and natural, mention the website (e.g., "You can also explore more evidence-based articles on FitFlowAI"). Do not overuse this mention.`,
    });

    // Format history structure to match Gemini API: role must be 'user' or 'model'
    const formattedHistory = history.map((msg) => {
      const role = msg.role === "assistant" ? "model" : "user";
      return {
        role,
        parts: [{ text: msg.content || "" }],
      };
    });

    const chat = model.startChat({
      history: formattedHistory,
    });

    // Prepend retrieved context if available (Future RAG injection point)
    const promptMessage = context 
      ? `Context from FitFlowAI Articles:\n${context}\n\nUser Question: ${message}` 
      : message;

    const result = await chat.sendMessage(promptMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API service error:", error);
    throw error;
  }
};
