import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import { FaPrint, FaArrowLeft, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

function WeeklyReport() {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/checkin/report");
        setReport(data.report);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load report.");
      } finally {
        setLoading(false);
      }
    };
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
      <SEO title="Weekly Analytics Report | FitFlowAI" description="Weekly progress evaluation details." />

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

          {error ? (
            <div className="rounded-[2.5rem] border border-slate-205 dark:border-slate-850 p-10 text-center space-y-4">
              <FaExclamationTriangle className="mx-auto text-4xl text-rose-500" />
              <h3 className="text-lg font-bold text-slate-805 dark:text-white">No Report Generated</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                {error} Keep logging check-ins daily.
              </p>
            </div>
          ) : (
            report && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-6 print:border-b-2 print:border-black">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-450 tracking-wider print:text-slate-650">
                      Weekly Performance Report
                    </span>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1 print:text-black">
                      AI Sports Science Evaluation
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

                {/* Metrics */}
                <div className="grid gap-4 grid-cols-4 border-b border-slate-200/20 pb-6 print:border-b-2 print:border-slate-800">
                  <div className="text-center">
                    <span className="block text-[9px] uppercase font-bold text-slate-400">Avg Weight</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white print:text-black mt-1 block">{report.avgWeight} kg</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[9px] uppercase font-bold text-slate-400">Sleep average</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white print:text-black mt-1 block">{report.avgSleep} hrs</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[9px] uppercase font-bold text-slate-400">Workout rate</span>
                    <span className="text-base font-extrabold text-emerald-500 mt-1 block">{report.workoutCompletion}%</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[9px] uppercase font-bold text-slate-400">Diet Adherence</span>
                    <span className="text-base font-extrabold text-blue-500 mt-1 block">{report.mealAdherence}%</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-4 print:text-black">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight border-l-4 border-emerald-500 pl-3">
                    Coaching Feedback & Review
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
                    {report.aiReview?.summary}
                  </p>
                  <p className="text-xs text-slate-750 dark:text-slate-350 italic pl-1">
                    {report.aiReview?.consistencyFeedback}
                  </p>
                </div>

                {/* Advice list */}
                <div className="space-y-4 print:text-black">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight border-l-4 border-emerald-500 pl-3">
                    Recommendations for next week
                  </h3>
                  <ul className="space-y-3 pl-1">
                    {report.aiReview?.nextWeekAdvice?.map((adv, idx) => (
                      <li key={idx} className="flex gap-3 items-start text-xs font-semibold text-slate-650 dark:text-slate-400 print:text-slate-800">
                        <span className="w-3.5 h-3.5 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 flex-shrink-0 mt-0.5 print:border-none">
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

export default WeeklyReport;
