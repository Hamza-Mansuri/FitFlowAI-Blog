import UserMemory from "../models/UserMemory.js";

export const getOrCreateMemory = async (userId) => {
  let memory = await UserMemory.findOne({ user: userId });
  if (!memory) {
    memory = new UserMemory({
      user: userId,
      currentGoal: "",
      previousGoals: [],
      workoutPreferences: [],
      favoriteExercises: [],
      exercisesHated: [],
      favoriteFoods: [],
      foodsAvoided: [],
      gymAvailability: "",
      equipmentAvailability: "",
      injuries: [],
      medicalConditions: [],
      permanentMemory: [],
      temporaryMemory: [],
      conversationSummaries: [],
      achievements: [],
    });
    await memory.save();
  }
  return memory;
};

export const updateMemoryFields = async (userId, updateData) => {
  const memory = await getOrCreateMemory(userId);
  Object.keys(updateData).forEach((key) => {
    if (Array.isArray(memory[key]) && Array.isArray(updateData[key])) {
      // Merge arrays or replace
      memory[key] = Array.from(new Set([...memory[key], ...updateData[key]]));
    } else {
      memory[key] = updateData[key];
    }
  });
  await memory.save();
  return memory;
};

export const addConversationSummary = async (userId, summary) => {
  const memory = await getOrCreateMemory(userId);
  memory.conversationSummaries.push(summary);
  if (memory.conversationSummaries.length > 5) {
    memory.conversationSummaries.shift(); // Keep only 5 most recent
  }
  await memory.save();
  return memory;
};
