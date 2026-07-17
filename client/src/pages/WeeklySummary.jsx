import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import { FaHeartbeat, FaCalendarAlt, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

function WeeklySummary() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await API.get("/checkin/report");
      setReport(data.report);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load weekly report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <PageTransition>
      <SEO title="Weekly Review | FitFlowAI" description="Review your weekly biometrics, sleep averages, workout compliance rates, and sports nutritional updates." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <Container className="relative z-10 pt-10 space-y-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-800/40 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
              <FaCalendarAlt size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Weekly AI Coach Review
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                Automatically compiles your past 7 days of biometrics and recovery scores to generate next week's advice.
              </p>
            </div>
          </div>

          {error ? (
            <div className="rounded-[2.5rem] border border-slate-205 dark:border-slate-850 p-10 text-center space-y-4">
              <FaExclamationTriangle className="mx-auto text-4xl text-rose-500" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Weekly Report Available</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                {error} Keep logging your daily metrics to compile a complete summary.
              </p>
            </div>
          ) : (
            report && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Stats grid */}
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                  <div className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 p-5 shadow-sm text-center">
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average Weight</span>
                    <span className="text-lg font-extrabold text-slate-850 dark:text-white mt-1.5 block">{report.avgWeight} kg</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 p-5 shadow-sm text-center">
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average Sleep</span>
                    <span className="text-lg font-extrabold text-slate-850 dark:text-white mt-1.5 block">{report.avgSleep} hrs</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 p-5 shadow-sm text-center">
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Workout Rate</span>
                    <span className="text-lg font-extrabold text-emerald-500 mt-1.5 block">{report.workoutCompletion}%</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 p-5 shadow-sm text-center">
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Meal Adherence</span>
                    <span className="text-lg font-extrabold text-blue-500 mt-1.5 block">{report.mealAdherence}%</span>
                  </div>
                </div>

                {/* AI Review Summary panel */}
                <div className="rounded-[2.5rem] border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 p-6 sm:p-8 space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-200/20 pb-3">
                    <FaHeartbeat className="text-emerald-500" />
                    <span>FitCoach AI Weekly Evaluation</span>
                  </h3>
                  
                  <div className="space-y-3 text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
                    <p>{report.aiReview?.summary}</p>
                    <p className="italic border-t border-emerald-500/10 pt-3">{report.aiReview?.consistencyFeedback}</p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 p-6 sm:p-8 shadow-xl space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight border-b border-slate-200/20 pb-3">
                    Actionable Adjustments for Next Week
                  </h3>
                  
                  <ul className="space-y-3.5 pl-1">
                    {report.aiReview?.nextWeekAdvice?.map((adv, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-xs font-semibold text-slate-650 dark:text-slate-400">
                        <span className="w-4 h-4 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 flex-shrink-0 mt-0.5">
                          <FaCheck size={7} />
                        </span>
                        <span className="leading-normal">{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          )}

        </Container>
      </div>
    </PageTransition>
  );
}

export default WeeklySummary;
