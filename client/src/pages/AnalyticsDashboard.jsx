import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import WeightChart from "../components/analytics/WeightChart";
import RecoveryChart from "../components/analytics/RecoveryChart";
import ConsistencyCard from "../components/analytics/ConsistencyCard";
import AchievementCard from "../components/analytics/AchievementCard";
import InsightCard from "../components/analytics/InsightCard";
import RecommendationCard from "../components/analytics/RecommendationCard";
import { FaSlidersH, FaSave, FaChartLine, FaWeight, FaCalendarAlt, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form State for Body Measurements
  const [formData, setFormData] = useState({
    chest: "",
    waist: "",
    hips: "",
    neck: "",
    arms: "",
    bodyFat: "",
    muscleMass: "",
  });

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/analytics");
      setAnalytics(data);

      // Pre-fill metrics from history if available
      if (data.measurementHistory?.length > 0) {
        const last = data.measurementHistory[data.measurementHistory.length - 1];
        setFormData({
          chest: last.chest || "",
          waist: last.waist || "",
          hips: last.hips || "",
          neck: last.neck || "",
          arms: last.arms || "",
          bodyFat: last.bodyFat || "",
          muscleMass: last.muscleMass || "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load progress analytics dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleSaveMeasurements = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formattedData = {
      chest: Number(formData.chest || 0),
      waist: Number(formData.waist || 0),
      hips: Number(formData.hips || 0),
      neck: Number(formData.neck || 0),
      arms: Number(formData.arms || 0),
      bodyFat: Number(formData.bodyFat || 0),
      muscleMass: Number(formData.muscleMass || 0),
    };

    try {
      await API.post("/analytics/measurements", formattedData);
      toast.success("Body measurements logged successfully!");
      setShowLogModal(false);
      fetchAnalytics();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save body measurements");
    } finally {
      setSaving(false);
    }
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
      <SEO title="AI Progress Analytics | FitFlowAI" description="Understand your weight progression, recovery indexes, and body fat percentage averages with charts." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <Container className="relative z-10 pt-10 space-y-8 max-w-5xl">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800/40 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
                <FaChartLine size={20} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  AI Progress Analytics
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                  Sports science metrics showing consistency rates, sleep, and body composition updates.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowLogModal(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-xs font-extrabold text-slate-955 shadow-md shadow-emerald-500/15 cursor-pointer"
            >
              <FaWeight size={11} />
              <span>Log Measurements</span>
            </button>
          </div>

          {/* Fallback if no check-ins logged */}
          {analytics.overview?.totalLogs === 0 ? (
            <div className="rounded-[2.5rem] border border-slate-205 dark:border-slate-850 p-12 text-center space-y-4 bg-white/40 dark:bg-slate-955/40 backdrop-blur-xl">
              <FaExclamationTriangle className="mx-auto text-4xl text-rose-500" />
              <h3 className="text-lg font-bold text-slate-805 dark:text-white">No Analytics Data Found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Log your daily biometrics check-ins (weight, sleep, and workout details) to unlock advanced progress analytics and charts.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              
              {/* Overview Stats Row */}
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <div className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 p-5 shadow-sm">
                  <span className="block text-[10px] uppercase font-bold text-slate-405 tracking-wider">Weight Today</span>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 block">
                    {analytics.weightTrend?.length > 0 ? `${analytics.weightTrend[analytics.weightTrend.length - 1].weight} kg` : "N/A"}
                  </span>
                  <span className="text-[10px] text-slate-450 mt-1 block font-light">
                    Weekly delta: <strong className={analytics.overview.weeklyChange <= 0 ? "text-emerald-500" : "text-rose-500"}>{analytics.overview.weeklyChange} kg</strong>
                  </span>
                </div>

                <div className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 p-5 shadow-sm">
                  <span className="block text-[10px] uppercase font-bold text-slate-405 tracking-wider">Workout Consistency</span>
                  <span className="text-lg font-extrabold text-blue-500 mt-1 block">{analytics.overview.workoutConsistency}%</span>
                  <span className="text-[10px] text-slate-450 mt-1 block font-light">Adherence rate over history</span>
                </div>

                <div className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 p-5 shadow-sm">
                  <span className="block text-[10px] uppercase font-bold text-slate-405 tracking-wider">Sleep Average</span>
                  <span className="text-lg font-extrabold text-purple-500 mt-1 block">{analytics.overview.avgSleep} hrs</span>
                  <span className="text-[10px] text-slate-450 mt-1 block font-light">Target baseline: 8.0 hours</span>
                </div>

                <div className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 p-5 shadow-sm">
                  <span className="block text-[10px] uppercase font-bold text-slate-405 tracking-wider">Water Average</span>
                  <span className="text-lg font-extrabold text-teal-500 mt-1 block">{analytics.overview.avgWater} Liters</span>
                  <span className="text-[10px] text-slate-450 mt-1 block font-light">Hydration benchmark</span>
                </div>
              </div>

              {/* AI observations column */}
              <div className="grid gap-6 md:grid-cols-2">
                <InsightCard insights={analytics.aiInsights} />
                <RecommendationCard recommendations={analytics.aiRecommendations} />
              </div>

              {/* Consistency score radial gauge and Area chart */}
              <div className="grid gap-6 md:grid-cols-3">
                <ConsistencyCard
                  score={analytics.overview.consistencyScore}
                  workoutPct={analytics.overview.workoutConsistency}
                  dietPct={analytics.overview.nutritionAdherence}
                />
                
                <div className="md:col-span-2">
                  <WeightChart data={analytics.weightTrend} />
                </div>
              </div>

              {/* Recovery curves & Achievements Badges */}
              <RecoveryChart data={analytics.recoveryTrend} />

              <AchievementCard achievements={analytics.achievements} />

            </div>
          )}

          {/* Measurements Dialog Modal */}
          <AnimatePresence>
            {showLogModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-[2.5rem] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl overflow-y-auto max-h-[85vh]"
                >
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Log Body Measurements
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-450 font-light mt-0.5">
                      Manually record sizing outputs to generate body composition analytics.
                    </p>
                  </div>

                  <form onSubmit={handleSaveMeasurements} className="space-y-4">
                    <div className="grid gap-4 grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Chest (cm)</label>
                        <input
                          type="number"
                          value={formData.chest}
                          onChange={(e) => setFormData(prev => ({ ...prev, chest: e.target.value }))}
                          placeholder="e.g. 96"
                          className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-transparent text-xs outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Waist (cm)</label>
                        <input
                          type="number"
                          value={formData.waist}
                          onChange={(e) => setFormData(prev => ({ ...prev, waist: e.target.value }))}
                          placeholder="e.g. 82"
                          className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-transparent text-xs outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Hips (cm)</label>
                        <input
                          type="number"
                          value={formData.hips}
                          onChange={(e) => setFormData(prev => ({ ...prev, hips: e.target.value }))}
                          placeholder="e.g. 92"
                          className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-transparent text-xs outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Neck (cm)</label>
                        <input
                          type="number"
                          value={formData.neck}
                          onChange={(e) => setFormData(prev => ({ ...prev, neck: e.target.value }))}
                          placeholder="e.g. 38"
                          className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-transparent text-xs outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 grid-cols-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Body Fat (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.bodyFat}
                          onChange={(e) => setFormData(prev => ({ ...prev, bodyFat: e.target.value }))}
                          placeholder="e.g. 15.5"
                          className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-transparent text-xs outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Muscle Mass (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.muscleMass}
                          onChange={(e) => setFormData(prev => ({ ...prev, muscleMass: e.target.value }))}
                          placeholder="e.g. 42.1"
                          className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-transparent text-xs outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-200/20">
                      <button
                        type="button"
                        onClick={() => setShowLogModal(false)}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-extrabold text-slate-650 dark:border-slate-850 dark:text-slate-400 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2 text-xs font-extrabold text-slate-955 shadow-md shadow-emerald-500/10 cursor-pointer"
                      >
                        <FaSave size={10} />
                        <span>{saving ? "Saving..." : "Save Log"}</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </Container>
      </div>
    </PageTransition>
  );
}

export default AnalyticsDashboard;
