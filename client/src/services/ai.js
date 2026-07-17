import API from "./api";

export const sendChatMessage = async (message, history) => {
  const { data } = await API.post("/ai/chat", { message, history });
  return data;
};
