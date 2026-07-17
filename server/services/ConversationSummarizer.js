import { GoogleGenerativeAI } from "@google/generative-ai";
import { getOrCreateMemory, addConversationSummary, updateMemoryFields } from "./MemoryService.js";

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

export const summarizeAndExtractMemory = async (userId, conversationHistory) => {
  try {
    const client = getGenAIClient();
    const model = client.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `You are a data extraction assistant. Analyze this conversation history between a user and their AI fitness coach:

${JSON.stringify(conversationHistory)}

TASK:
1. Write a concise 1-sentence summary of the discussion.
2. Extract any permanent memories (e.g. food dislikes, injuries, preferred gyms).
3. Extract any temporary memories (e.g. traveling, sickness, preparing for a race).

Output strictly as a JSON object matching this schema:
{
  "summary": "1-sentence summary of the conversation",
  "permanentFacts": ["Tag 1", "Tag 2"],
  "temporaryFacts": ["Tag 1", "Tag 2"]
}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);

    // Save summary
    await addConversationSummary(userId, parsed.summary);

    // Merge facts into memory schema
    if (parsed.permanentFacts?.length > 0 || parsed.temporaryFacts?.length > 0) {
      await updateMemoryFields(userId, {
        permanentMemory: parsed.permanentFacts,
        temporaryMemory: parsed.temporaryFacts,
      });
    }

    return parsed;
  } catch (error) {
    console.error("ConversationSummarizer failed:", error.message);
    return null;
  }
};
