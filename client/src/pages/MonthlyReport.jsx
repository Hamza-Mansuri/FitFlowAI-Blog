import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import { FaPrint, FaArrowLeft, FaAward, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

function MonthlyReport() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <SEO title="Monthly Performance Report | FitFlowAI" description="Monthly achievement evaluations." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20 print:bg-white print:pb-0">
        <GlowBackground className="print:hidden" />

        <Container className="relative z-10 pt-10 space-y-8 max-w-3xl print:pt-0">
          
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition cursor-pointer print:hidden"
          >
            <FaArrowLeft size={11} />
            <span>Go Back</span>
          </button>

          {totalLogs < 3 ? (
            <div className="rounded-[2.5rem] border border-slate-205 dark:border-slate-850 p-10 text-center space-y-4">
              <FaExclamationTriangle className="mx-auto text-4xl text-rose-500" />
              <h3 className="text-lg font-bold text-slate-805 dark:text-white">Monthly Review Unavailable</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Log at least 3 daily check-in sessions to compile monthly statistics.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-6 print:border-b-2 print:border-black">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-450 tracking-wider print:text-slate-650">
                    Monthly Performance Summary
                  </span>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1 print:text-black">
                    AI Monthly Compliance Report
                  </h1>
                </div>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-250 bg-white/50 px-4 py-2.5 text-xs font-extrabold text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 cursor-pointer print:hidden"
                >
                  <FaPrint size={11} />
                  <span>Print Report</span>
                </button>
              </div>

              {/* Summary stats */}
              <div className="grid gap-6 grid-cols-3 border-b border-slate-200/20 pb-6 print:border-b-2 print:border-slate-800">
                <div className="text-center">
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Total logs logged</span>
                  <span className="text-base font-extrabold text-slate-905 dark:text-white print:text-black mt-1 block">{totalLogs} Days</span>
                </div>
                <div className="text-center">
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Avg Recovery score</span>
                  <span className="text-base font-extrabold text-emerald-500 mt-1 block">{avgRecovery}%</span>
                </div>
                <div className="text-center">
                  <span className="block text-[9px] uppercase font-bold text-slate-400">Workouts completed</span>
                  <span className="text-base font-extrabold text-blue-500 mt-1 block">{workoutsCompleted} Workouts</span>
                </div>
              </div>

              {/* Achievements details */}
              <div className="space-y-4 print:text-black">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight border-l-4 border-emerald-500 pl-3">
                  Key Monthly Accomplishments
                </h3>
                
                <ul className="space-y-3 text-xs font-semibold text-slate-650 dark:text-slate-400 pl-1 print:text-slate-800">
                  <li className="flex gap-3 items-start">
                    <span className="w-3.5 h-3.5 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 flex-shrink-0 mt-0.5 print:border-none">
                      <FaCheck size={7} />
                    </span>
                    <span>Logged sleep cycles averaged {avgSleep} hours per night.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-3.5 h-3.5 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 flex-shrink-0 mt-0.5 print:border-none">
                      <FaCheck size={7} />
                    </span>
                    <span>Consistently recorded check-in metrics on {totalLogs} days.</span>
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

export default MonthlyReport;
