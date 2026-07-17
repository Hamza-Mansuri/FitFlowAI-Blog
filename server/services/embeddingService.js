import { GoogleGenerativeAI } from "@google/generative-ai";

let genAIClient = null;

const getGenAIClient = () => {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("⚠️ GEMINI_API_KEY is not defined. Embedding generation will be bypassed.");
      return null;
    }
    genAIClient = new GoogleGenerativeAI(apiKey);
  }
  return genAIClient;
};

export const generateEmbedding = async (text) => {
  if (!text || text.trim() === "") return [];

  const client = getGenAIClient();
  if (!client) return [];

  try {
    const model = client.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("Gemini Embedding generation failed:", error);
    throw error;
  }
};
