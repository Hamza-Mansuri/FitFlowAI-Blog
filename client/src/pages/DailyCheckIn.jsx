import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import MoodSelector from "../components/checkin/MoodSelector";
import EnergySlider from "../components/checkin/EnergySlider";
import RecoveryCard from "../components/checkin/RecoveryCard";
import StatusCard from "../components/checkin/StatusCard";
import StreakCard from "../components/checkin/StreakCard";
import { FaCalendarCheck, FaHeartbeat, FaArrowRight, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function DailyCheckIn() {
  const [todayCheckIn, setTodayCheckIn] = useState(null);
  const [streaks, setStreaks] = useState({ checkInStreak: 0, longestStreak: 0, workoutStreak: 0, nutritionStreak: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    weight: "",
    sleepHours: 8,
    energyLevel: 7,
    motivationLevel: 7,
    stressLevel: 4,
    hungerLevel: 5,
    waterIntake: 2,
    steps: 6000,
    workoutCompleted: false,
    cardioCompleted: false,
    mealPlanFollowed: true,
    cheatMeal: false,
    injuryPain: "",
    mood: "happy",
    notes: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 1. Get today's check-in
      const todayRes = await API.get("/checkin/today");
      if (todayRes.data.checkIn) {
        setTodayCheckIn(todayRes.data.checkIn);
      }

      // 2. Get streaks
      const streakRes = await API.get("/checkin/streaks");
      setStreaks(streakRes.data);

      // Pre-fill weight from profile if available
      const profileRes = await API.get("/profile");
      if (profileRes.data.profile) {
        setFormData(prev => ({
          ...prev,
          weight: profileRes.data.profile.weight || "",
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.weight || !formData.sleepHours) {
      toast.error("Please complete all basic fields");
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await API.post("/checkin", {
        ...formData,
        weight: Number(formData.weight),
        sleepHours: Number(formData.sleepHours),
        waterIntake: Number(formData.waterIntake),
        steps: Number(formData.steps),
        injuryPain: formData.injuryPain || "None",
      });
      setTodayCheckIn(data.checkIn);
      toast.success("Daily check-in logged successfully!");
      
      // Reload streaks
      const streakRes = await API.get("/checkin/streaks");
      setStreaks(streakRes.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit check-in");
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  return (
    <PageTransition>
      <SEO title="Daily Adaptive Check-in | FitFlowAI" description="Log your daily recovery markers, sleep cycles, steps, and injuries to receive customized FitCoach AI coaching feedback." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <Container className="relative z-10 pt-10 space-y-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-800/40 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
              <FaCalendarCheck size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Daily Check-in
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                Log daily parameters so FitCoach AI can adjust exercise volume and dietary pacing in real-time.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            </div>
          ) : todayCheckIn ? (
            /* Completed view - Recovery Score Dashboard */
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <StreakCard streaks={streaks} />

              <RecoveryCard
                score={todayCheckIn.recoveryScore}
                recommendations={todayCheckIn.aiRecommendations}
              />

              <StatusCard checkIn={todayCheckIn} />
            </motion.div>
          ) : (
            /* Form wizard view */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-10 shadow-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Metrics */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-extrabold text-slate-905 dark:text-white tracking-tight">
                      Step 1: Daily Biometrics & Sleep
                    </h3>
                    
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Weight Today (kg) *</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.weight}
                          onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                          placeholder="e.g. 74.5"
                          required
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-sm outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Sleep Duration (Hours) *</label>
                        <input
                          type="number"
                          step="0.5"
                          value={formData.sleepHours}
                          onChange={(e) => setFormData(prev => ({ ...prev, sleepHours: e.target.value }))}
                          placeholder="e.g. 7.5"
                          required
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-sm outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Water Intake (Liters)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={formData.waterIntake}
                          onChange={(e) => setFormData(prev => ({ ...prev, waterIntake: e.target.value }))}
                          placeholder="e.g. 3"
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-sm outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Daily Steps</label>
                        <input
                          type="number"
                          value={formData.steps}
                          onChange={(e) => setFormData(prev => ({ ...prev, steps: e.target.value }))}
                          placeholder="e.g. 8000"
                          className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-sm outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-200/50 dark:border-slate-800/40">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-xs font-extrabold text-slate-955 shadow-md shadow-emerald-500/10 cursor-pointer"
                      >
                        <span>Next Step</span>
                        <FaChevronRight size={9} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Subjective Status */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-extrabold text-slate-905 dark:text-white tracking-tight">
                      Step 2: Subjective Condition Markers
                    </h3>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block">How is your mood today?</label>
                      <MoodSelector
                        selectedMood={formData.mood}
                        onChange={(mood) => setFormData(prev => ({ ...prev, mood }))}
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 border-t border-slate-200/30 dark:border-slate-800/20 pt-4">
                      <EnergySlider
                        label="Energy Level"
                        value={formData.energyLevel}
                        onChange={(energyLevel) => setFormData(prev => ({ ...prev, energyLevel }))}
                      />
                      <EnergySlider
                        label="Motivation Level"
                        value={formData.motivationLevel}
                        onChange={(motivationLevel) => setFormData(prev => ({ ...prev, motivationLevel }))}
                      />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 border-t border-slate-200/30 dark:border-slate-800/20 pt-4">
                      <EnergySlider
                        label="Stress Level"
                        value={formData.stressLevel}
                        onChange={(stressLevel) => setFormData(prev => ({ ...prev, stressLevel }))}
                      />
                      <EnergySlider
                        label="Hunger Level"
                        value={formData.hungerLevel}
                        onChange={(hungerLevel) => setFormData(prev => ({ ...prev, hungerLevel }))}
                      />
                    </div>

                    <div className="flex justify-between pt-4 border-t border-slate-200/50 dark:border-slate-800/40">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-extrabold text-slate-600 dark:border-slate-800 dark:text-slate-400 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-xs font-extrabold text-slate-955 shadow-md shadow-emerald-500/10 cursor-pointer"
                      >
                        <span>Next Step</span>
                        <FaChevronRight size={9} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Logs Adherence */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-extrabold text-slate-905 dark:text-white tracking-tight">
                      Step 3: Adherence & Restrictions
                    </h3>

                    {/* Checkboxes */}
                    <div className="grid gap-4 sm:grid-cols-2 bg-slate-100/50 dark:bg-slate-900/30 rounded-2xl p-5 border border-slate-200/30 dark:border-slate-800/30 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.workoutCompleted}
                          onChange={(e) => setFormData(prev => ({ ...prev, workoutCompleted: e.target.checked }))}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                        />
                        <span>Completed Workout Yesterday</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.mealPlanFollowed}
                          onChange={(e) => setFormData(prev => ({ ...prev, mealPlanFollowed: e.target.checked }))}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                        />
                        <span>Followed Meal Plan Yesterday</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer mt-2 sm:mt-0">
                        <input
                          type="checkbox"
                          checked={formData.cardioCompleted}
                          onChange={(e) => setFormData(prev => ({ ...prev, cardioCompleted: e.target.checked }))}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                        />
                        <span>Completed Cardio Yesterday</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer mt-2 sm:mt-0">
                        <input
                          type="checkbox"
                          checked={formData.cheatMeal}
                          onChange={(e) => setFormData(prev => ({ ...prev, cheatMeal: e.target.checked }))}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                        />
                        <span>Logged Cheat Meal Yesterday</span>
                      </label>
                    </div>

                    <div className="space-y-1.5 border-t border-slate-200/30 dark:border-slate-800/20 pt-4">
                      <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Any Active Injury Pain?</label>
                      <input
                        type="text"
                        value={formData.injuryPain}
                        onChange={(e) => setFormData(prev => ({ ...prev, injuryPain: e.target.value }))}
                        placeholder="e.g. minor knee strain, lower back stiffness (leave blank if none)"
                        className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-sm outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Additional Notes</label>
                      <textarea
                        rows="3"
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Share details about stress, fatigue, or session accomplishments..."
                        className="w-full p-4 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-sm outline-none focus:border-emerald-500 text-slate-900 dark:text-white resize-none"
                      />
                    </div>

                    <div className="flex justify-between pt-4 border-t border-slate-200/50 dark:border-slate-800/40">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-extrabold text-slate-600 dark:border-slate-800 dark:text-slate-400 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 text-xs font-extrabold text-slate-955 shadow-md shadow-emerald-500/15 cursor-pointer disabled:opacity-50"
                      >
                        {submitting ? "Analyzing..." : "Submit Log"}
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </motion.div>
          )}

        </Container>
      </div>
    </PageTransition>
  );
}

export default DailyCheckIn;
