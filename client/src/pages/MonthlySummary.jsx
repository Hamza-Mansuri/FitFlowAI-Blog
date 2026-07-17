import { useEffect, useState } from "react";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import { FaAward, FaCalendarAlt, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

function MonthlySummary() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/checkin/history");
      setLogs(data.history || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const totalLogs = logs.length;
  const avgSleep = totalLogs > 0 ? (logs.reduce((acc, curr) => acc + curr.sleepHours, 0) / totalLogs).toFixed(1) : 0;
  const avgRecovery = totalLogs > 0 ? Math.round(logs.reduce((acc, curr) => acc + curr.recoveryScore, 0) / totalLogs) : 0;
  const workoutsCompleted = totalLogs > 0 ? logs.filter(l => l.workoutCompleted).length : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <PageTransition>
      <SEO title="Monthly Summary Report | FitFlowAI" description="Review monthly achievement summaries and recommended goals." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <Container className="relative z-10 pt-10 space-y-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-800/40 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
              <FaAward size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Monthly Performance Report
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                Evaluates long-term compliance trends and details areas of improvements.
              </p>
            </div>
          </div>

          {totalLogs < 3 ? (
            <div className="rounded-[2.5rem] border border-slate-205 dark:border-slate-850 p-10 text-center space-y-4">
              <FaExclamationTriangle className="mx-auto text-4xl text-rose-500" />
              <h3 className="text-lg font-bold text-slate-805 dark:text-white">Monthly Report In Progress</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Please log at least 3 daily check-ins to unlock monthly trend evaluations.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Monthly stats card */}
              <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 p-6 sm:p-8 shadow-xl grid gap-6 sm:grid-cols-3">
                <div className="text-center">
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Logged Logs</span>
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">{totalLogs} / 30 Days</span>
                </div>
                <div className="text-center border-t sm:border-t-0 sm:border-x border-slate-200/30 dark:border-slate-800/20 py-4 sm:py-0">
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Average Recovery</span>
                  <span className="text-xl font-extrabold text-emerald-500 mt-1 block">{avgRecovery}%</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sessions Executed</span>
                  <span className="text-xl font-extrabold text-blue-500 mt-1 block">{workoutsCompleted} Workouts</span>
                </div>
              </div>

              {/* Achievements banner */}
              <div className="rounded-[2.5rem] border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 p-6 sm:p-8 space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-200/20 pb-3">
                  <FaAward className="text-emerald-500" />
                  <span>Key Monthly Achievements</span>
                </h3>
                
                <ul className="space-y-3.5 text-xs font-semibold text-slate-650 dark:text-slate-400 pl-1">
                  <li className="flex gap-3 items-start">
                    <span className="w-4 h-4 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 flex-shrink-0 mt-0.5">
                      <FaCheck size={7} />
                    </span>
                    <span>High Sleep Quality: Maintained an average of {avgSleep} hours sleep per night.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-4 h-4 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 flex-shrink-0 mt-0.5">
                      <FaCheck size={7} />
                    </span>
                    <span>Log Compliance: Logged {totalLogs} out of 30 days of biometric entries.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}

        </Container>
      </div>
    </PageTransition>
  );
}

export default MonthlySummary;
