import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import CoachCard from "../components/ai/CoachCard";
import MemoryTimeline from "../components/ai/MemoryTimeline";
import InsightCard from "../components/ai/InsightCard";
import RecommendationCard from "../components/ai/RecommendationCard";
import QuickActionPanel from "../components/ai/QuickActionPanel";
import GoalTracker from "../components/ai/GoalTracker";
import ConversationSidebar from "../components/ai/ConversationSidebar";
import { FaPaperPlane, FaRobot, FaUser, FaCompass } from "react-icons/fa";
import { motion } from "framer-motion";

function AICoachWorkspace() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatting, setChatting] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const fetchWorkspaceData = async () => {
    try {
      setLoading(true);
      const { data: resData } = await API.get("/ai-coach/dashboard");
      setData(resData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load AI Coach dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaceData();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text || text.trim() === "") return;

    if (!textToSend) setInputMsg("");

    // Append user message
    const userMsg = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setChatting(true);

    try {
      // Map history format to match API expectations
      const historyPayload = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const { data: chatRes } = await API.post("/ai-coach/chat", {
        message: text,
        history: historyPayload,
      });

      const replyMsg = { role: "model", text: chatRes.reply };
      setMessages(prev => [...prev, replyMsg]);
      
      // Refresh dashboard data in background to reload memories
      API.get("/ai-coach/dashboard").then(({ data: resData }) => {
        setData(resData);
      }).catch(console.error);

    } catch (error) {
      console.error(error);
      toast.error("AI Coach offline. Try again.");
    } finally {
      setChatting(false);
    }
  };

  const handleQuickAction = (promptText) => {
    sendMessage(promptText);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[75vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <PageTransition>
      <SEO title="FitCoach AI Workspace | FitFlowAI" description="Interact with your personalized AI Coach. Track goals, recovery suggestions, and review memory logs." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <Container className="relative z-10 pt-10 space-y-8 max-w-6xl">
          
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-800/40 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
              <FaRobot size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                AI Coach Workspace
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                FitCoach AI is your adaptive personal training assistant, tracking memory constraints and check-in averages.
              </p>
            </div>
          </div>

          {/* Coach stats card */}
          {data && (
            <CoachCard
              score={data.recoveryScore}
              workout={data.workoutStatus}
              water={data.waterIntake}
              calories={580}
              message={data.recommendations[0]}
            />
          )}

          {/* Core Analytics Details Row */}
          {data && (
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <GoalTracker
                  goal={data.goalMetrics.currentGoal}
                  current={data.goalMetrics.weight}
                  target={data.goalMetrics.targetWeight}
                  percentage={data.goalMetrics.completionPercentage}
                  days={data.goalMetrics.estimatedDaysRemaining}
                />
              </div>
              <RecommendationCard recommendations={data.recommendations} />
            </div>
          )}

          {/* Interactive Chat and Panel Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Left side Chat panel */}
            <div className="lg:col-span-2 flex flex-col rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl h-[560px] overflow-hidden shadow-xl">
              
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                    <FaRobot className="text-4xl text-slate-300 dark:text-slate-700 animate-bounce" />
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">Chat with FitCoach AI</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-450 max-w-xs font-light leading-relaxed">
                      Ask details about target workouts, adjust daily calories, explain eccentric tempos, or log injuries.
                    </p>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl border flex-shrink-0 ${msg.role === "user" ? "bg-slate-200 border-slate-300 text-slate-800" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"}`}>
                      {msg.role === "user" ? <FaUser size={10} /> : <FaRobot size={11} />}
                    </div>
                    <div className={`rounded-2xl p-4 text-xs font-medium leading-relaxed border ${msg.role === "user" ? "bg-slate-100/50 border-slate-200 text-slate-800 dark:bg-slate-900/50 dark:border-slate-800 dark:text-slate-200" : "bg-emerald-500/5 border-emerald-500/10 text-slate-800 dark:bg-emerald-500/10 dark:text-white"}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {chatting && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex-shrink-0">
                      <FaRobot size={11} className="animate-spin" />
                    </div>
                    <span className="text-[10px] text-slate-450 font-bold">FitCoach is typing...</span>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input field */}
              <div className="p-4 border-t border-slate-200/30 dark:border-slate-800/30 bg-slate-50/20 dark:bg-slate-950/20">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    disabled={chatting}
                    placeholder="Ask FitCoach AI..."
                    className="flex-1 h-11 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-955/40 text-xs outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={chatting}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-slate-955 shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-50 flex-shrink-0"
                  >
                    <FaPaperPlane size={11} />
                  </button>
                </form>
              </div>

            </div>

            {/* Right side actions and logs panels */}
            <div className="space-y-6">
              <QuickActionPanel onActionClick={handleQuickAction} />
              {data && (
                <>
                  <ConversationSidebar summaries={data.memory.conversationSummaries} />
                  <MemoryTimeline permanent={data.memory.permanentMemory} temporary={data.memory.temporaryMemory} />
                </>
              )}
            </div>

          </div>

        </Container>
      </div>
    </PageTransition>
  );
}

export default AICoachWorkspace;
