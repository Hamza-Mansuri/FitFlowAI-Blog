import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import WorkoutTimeline from "../components/workout/WorkoutTimeline";
import WorkoutSummary from "../components/workout/WorkoutSummary";
import { FaSlidersH, FaDumbbell, FaSave, FaTrashAlt, FaRedo, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function WorkoutBuilder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Preference Form States
  const [preferences, setPreferences] = useState({
    goal: "general fitness",
    split: "Full Body",
    daysPerWeek: 3,
    sessionDuration: 45,
    workoutLocation: "gym",
    equipment: "mixed",
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedPlan(null);

    try {
      const { data } = await API.post("/workouts/generate", preferences);
      setGeneratedPlan(data.plan);
      toast.success("AI Workout Program generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to generate workout plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedPlan) return;
    setSaving(true);

    try {
      await API.post("/workouts/save", {
        ...generatedPlan,
        daysPerWeek: preferences.daysPerWeek,
        sessionDuration: preferences.sessionDuration,
        workoutLocation: preferences.workoutLocation,
        equipment: preferences.equipment,
      });
      toast.success("Workout plan saved to your history!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save workout plan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageTransition>
      <SEO title="AI Workout Builder | FitFlowAI" description="Generate evidence-based fitness routines tailored to your target goals, split preferences, and location availability." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <Container className="relative z-10 pt-10 space-y-8 max-w-5xl">
          {/* Header block */}
          <div className="flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-800/40 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
              <FaDumbbell size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                AI Workout Builder
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                Powered by Gemini to build personalized, scientifically sound strength routines.
              </p>
            </div>
          </div>

          {/* Form and results view */}
          {!generatedPlan && !loading && (
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleGenerate}
              className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-10 shadow-xl space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Fitness Goal</label>
                  <select
                    value={preferences.goal}
                    onChange={(e) => setPreferences(prev => ({ ...prev, goal: e.target.value }))}
                    className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
                  >
                    <option value="fat loss">Fat Loss</option>
                    <option value="muscle gain">Muscle Gain</option>
                    <option value="strength">Strength</option>
                    <option value="endurance">Endurance</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="athletic performance">Athletic Performance</option>
                    <option value="general fitness">General Fitness</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Preferred Split</label>
                  <select
                    value={preferences.split}
                    onChange={(e) => setPreferences(prev => ({ ...prev, split: e.target.value }))}
                    className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
                  >
                    <option value="Full Body">Full Body</option>
                    <option value="Upper Lower">Upper Lower Split</option>
                    <option value="Push Pull Legs">Push Pull Legs (PPL)</option>
                    <option value="Bro Split">Bro Split (Individual Muscle Groups)</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Days Per Week</label>
                  <select
                    value={preferences.daysPerWeek}
                    onChange={(e) => setPreferences(prev => ({ ...prev, daysPerWeek: Number(e.target.value) }))}
                    className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
                  >
                    <option value={2}>2 Days</option>
                    <option value={3}>3 Days</option>
                    <option value={4}>4 Days</option>
                    <option value={5}>5 Days</option>
                    <option value={6}>6 Days</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Session Duration (Mins)</label>
                  <select
                    value={preferences.sessionDuration}
                    onChange={(e) => setPreferences(prev => ({ ...prev, sessionDuration: Number(e.target.value) }))}
                    className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
                  >
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60 Minutes</option>
                    <option value={90}>90 Minutes</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Workout Location</label>
                  <select
                    value={preferences.workoutLocation}
                    onChange={(e) => setPreferences(prev => ({ ...prev, workoutLocation: e.target.value }))}
                    className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
                  >
                    <option value="gym">Gym</option>
                    <option value="home">Home</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Available Equipment</label>
                <select
                  value={preferences.equipment}
                  onChange={(e) => setPreferences(prev => ({ ...prev, equipment: e.target.value }))}
                  className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
                >
                  <option value="No Equipment">Bodyweight / No Equipment</option>
                  <option value="Resistance Bands">Resistance Bands</option>
                  <option value="Dumbbells">Dumbbells Only</option>
                  <option value="Barbell">Barbell Focus</option>
                  <option value="Machine">Machines Focus</option>
                  <option value="mixed">Mixed Gym Equipment</option>
                </select>
              </div>

              <div className="flex gap-3 text-xs text-slate-450 items-start pt-2">
                <FaInfoCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={13} />
                <p className="font-light">
                  FitCoach AI will automatically review your **Fitness Profile** (including injuries and diet) to ensure all exercises are safe and customized to your requirements.
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200/50 dark:border-slate-800/40">
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3.5 text-xs font-extrabold text-slate-950 shadow-md shadow-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer"
                >
                  Generate Program
                </button>
              </div>
            </motion.form>
          )}

          {/* Loading layout */}
          {loading && (
            <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-12 text-center shadow-xl space-y-6">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  FitCoach AI is building your routine...
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light max-w-sm mx-auto">
                  Calculating volume thresholds, balancing eccentric tempos, and evaluating injury safeguards.
                </p>
              </div>
            </div>
          )}

          {/* Generated Result View */}
          {generatedPlan && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Top Banner details */}
              <div className="rounded-[2.5rem] border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-450 tracking-wider">
                    Generated Routine Preview
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                    {generatedPlan.title}
                  </h2>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGeneratedPlan(null)}
                    disabled={saving}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-xs font-extrabold text-slate-700 dark:border-slate-850 dark:bg-slate-900/50 dark:text-slate-200 cursor-pointer disabled:opacity-50"
                  >
                    <FaTrashAlt size={11} />
                    <span>Discard</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-xs font-extrabold text-slate-950 shadow-md shadow-emerald-500/15 cursor-pointer disabled:opacity-50"
                  >
                    <FaSave size={11} />
                    <span>{saving ? "Saving..." : "Save Workout"}</span>
                  </button>
                </div>
              </div>

              {/* Metrics Summary */}
              <WorkoutSummary workout={{ ...generatedPlan, daysPerWeek: preferences.daysPerWeek, sessionDuration: preferences.sessionDuration, workoutLocation: preferences.workoutLocation }} />

              {/* Timeline days accordion */}
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight pl-2">
                  Training Split Timeline
                </h3>
                <WorkoutTimeline days={generatedPlan.days} />
              </div>
            </motion.div>
          )}

        </Container>
      </div>
    </PageTransition>
  );
}

export default WorkoutBuilder;
