import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import MacroCard from "../components/nutrition/MacroCard";
import MealCard from "../components/nutrition/MealCard";
import ShoppingList from "../components/nutrition/ShoppingList";
import { FaAppleAlt, FaSave, FaTrashAlt, FaRedo, FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function NutritionPlanner() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Preference States
  const [preferences, setPreferences] = useState({
    goal: "general fitness",
    dietPreference: "balanced",
    mealCount: 4,
    activityLevel: "moderate",
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedPlan(null);

    try {
      const { data } = await API.post("/nutrition/generate", preferences);
      setGeneratedPlan(data.plan);
      toast.success("AI Nutrition Program generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to generate nutrition plan. Complete your Fitness Profile first!");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedPlan) return;
    setSaving(true);

    try {
      await API.post("/nutrition/save", generatedPlan);
      toast.success("Nutrition plan saved successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save meal plan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageTransition>
      <SEO title="AI Nutrition Planner | FitFlowAI" description="Generate personalized MERN sports nutrition meal plans and grocery lists tailored to your fitness targets." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <Container className="relative z-10 pt-10 space-y-8 max-w-5xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-200/50 dark:border-slate-800/40 pb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
              <FaAppleAlt size={20} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                AI Nutrition Planner
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                Calculate custom macro distributions and generate weekly grocery plans automatically.
              </p>
            </div>
          </div>

          {/* Form Prefs Selection */}
          {!generatedPlan && !loading && (
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleGenerate}
              className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-10 shadow-xl space-y-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Fitness Target</label>
                  <select
                    value={preferences.goal}
                    onChange={(e) => setPreferences(prev => ({ ...prev, goal: e.target.value }))}
                    className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
                  >
                    <option value="fat loss">Fat Loss</option>
                    <option value="muscle gain">Muscle Gain</option>
                    <option value="body recomposition">Body Recomposition</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="strength">Strength</option>
                    <option value="athletic performance">Athletic Performance</option>
                    <option value="general health">General Health</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Diet Style</label>
                  <select
                    value={preferences.dietPreference}
                    onChange={(e) => setPreferences(prev => ({ ...prev, dietPreference: e.target.value }))}
                    className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
                  >
                    <option value="balanced">Balanced</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="non vegetarian">Non-Vegetarian</option>
                    <option value="eggetarian">Eggetarian</option>
                    <option value="high protein">High Protein</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="low carb">Low Carb</option>
                    <option value="keto">Keto</option>
                    <option value="indian diet">Indian Diet</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Meals Per Day</label>
                  <select
                    value={preferences.mealCount}
                    onChange={(e) => setPreferences(prev => ({ ...prev, mealCount: Number(e.target.value) }))}
                    className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
                  >
                    <option value={3}>3 Meals (Breakfast, Lunch, Dinner)</option>
                    <option value={4}>4 Meals (Add Morning Snack)</option>
                    <option value={5}>5 Meals (Add Morning & Afternoon Snacks)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Activity Multiplier</label>
                  <select
                    value={preferences.activityLevel}
                    onChange={(e) => setPreferences(prev => ({ ...prev, activityLevel: e.target.value }))}
                    className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 text-xs outline-none focus:border-emerald-500"
                  >
                    <option value="sedentary">Sedentary (desk job, low activity)</option>
                    <option value="light">Lightly Active (1-3 light walks/wk)</option>
                    <option value="moderate">Moderately Active (3-5 strength sessions/wk)</option>
                    <option value="active">Active (daily training focus)</option>
                    <option value="very active">Very Active (heavy physical labour/athlete)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 text-xs text-slate-450 items-start pt-2">
                <FaInfoCircle className="text-emerald-500 flex-shrink-0 mt-0.5" size={13} />
                <p className="font-light">
                  FitCoach AI automatically reviews your **Fitness Profile** metrics (height, weight, age, allergies, and medical restrictions) to safely compute recommended calories and avoid restricted ingredients.
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200/50 dark:border-slate-800/40">
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3.5 text-xs font-extrabold text-slate-950 shadow-md shadow-emerald-500/15 cursor-pointer"
                >
                  Generate Plan
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
                  FitCoach AI is formulating your meals...
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light max-w-sm mx-auto">
                  Calculating BMR/TDEE ratios, selecting macro thresholds, and checking allergen conflict matrices.
                </p>
              </div>
            </div>
          )}

          {/* Results layout */}
          {generatedPlan && !loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Header preview bar */}
              <div className="rounded-[2.5rem] border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 backdrop-blur-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-450 tracking-wider">
                    Generated Program Preview
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                    {generatedPlan.title}
                  </h2>
                </div>

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
                    <span>{saving ? "Saving..." : "Save Plan"}</span>
                  </button>
                </div>
              </div>

              {/* Macro breakdown summary */}
              <MacroCard
                calories={generatedPlan.dailyCalories}
                protein={generatedPlan.protein}
                carbs={generatedPlan.carbohydrates}
                fat={generatedPlan.fat}
                fiber={generatedPlan.fiber}
                water={generatedPlan.waterGoal}
              />

              {/* Meals list */}
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight pl-2">
                  Daily Meal Splits
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {generatedPlan.mealPlan?.map((meal, mIdx) => (
                    <MealCard key={mIdx} meal={meal} />
                  ))}
                </div>
              </div>

              {/* Grocery List */}
              <ShoppingList list={generatedPlan.shoppingList} />

            </motion.div>
          )}

        </Container>
      </div>
    </PageTransition>
  );
}

export default NutritionPlanner;
