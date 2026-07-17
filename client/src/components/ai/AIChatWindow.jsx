import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaPaperclip } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AIMessage from "./AIMessage";
import TypingIndicator from "./TypingIndicator";
import { sendChatMessage } from "../../services/ai";

function AIChatWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: `👋 Hi!

I'm your FitFlowAI Assistant. I can help you with:
*   🏋️ **Workout plans** & exercises
*   🥗 **Nutrition** & macro advice
*   🔥 **Fat loss** & metabolism
*   💪 **Muscle gain** protocols
*   🛌 **Recovery** & stretching
*   💊 **Supplements** science
*   💤 **Healthy habits** & sleep

Ask me anything!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom of chat area when messages load
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Auto-resize textarea input height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Map history format for API consumption
      const history = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const data = await sendChatMessage(userMessage.text, history);
      
      // Simulate typing/streaming delay for premium organic feel
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "assistant", text: data.reply },
        ]);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "⚠️ Sorry, I encountered an issue connecting to the servers. Please try again.",
        },
      ]);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 right-6 w-[340px] sm:w-[400px] h-[500px] sm:h-[580px] rounded-[2.5rem] border border-slate-200 bg-white/70 dark:border-slate-800/40 dark:bg-slate-950/70 backdrop-blur-2xl shadow-2xl flex flex-col justify-between z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-250/50 dark:border-slate-850/40 relative bg-slate-900/10 dark:bg-slate-950/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500/20 to-green-500/25 text-emerald-450 border border-emerald-500/25 shadow-inner">
                <FaRobot size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-slate-950 dark:text-slate-100 tracking-tight leading-tight">
                  FitFlowAI Assistant
                </span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-450 mt-0.5 leading-tight font-bold">
                  Powered by AI
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-450 dark:hover:text-white transition-colors cursor-pointer"
            >
              <FaTimes size={14} />
            </button>
          </div>

          {/* Chat Messages List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m, idx) => (
              <AIMessage key={idx} message={m} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-250/50 dark:border-slate-850/40">
            <div className="flex items-end gap-2 bg-slate-100 dark:bg-slate-900 rounded-2xl p-2 border border-slate-200/50 dark:border-slate-800/40 focus-within:border-emerald-500/50 transition-all duration-300">
              {/* Attach File Button Placeholder */}
              <button
                type="button"
                className="p-2.5 text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-450 cursor-pointer"
                title="Attach resource (coming soon)"
              >
                <FaPaperclip size={13} />
              </button>

              {/* Message Input Textarea */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about workouts, nutrition or fitness..."
                className="flex-1 bg-transparent border-none outline-none resize-none max-h-[120px] py-2 px-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
              />

              {/* Send Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white dark:text-slate-950 font-bold transition-all duration-300 shadow-md shadow-emerald-500/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FaPaperPlane size={12} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AIChatWindow;
