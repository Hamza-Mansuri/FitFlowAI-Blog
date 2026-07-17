import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import MacroCard from "../components/nutrition/MacroCard";
import MealCard from "../components/nutrition/MealCard";
import ShoppingList from "../components/nutrition/ShoppingList";
import { FaEdit, FaCopy, FaPrint, FaArrowLeft, FaTrashAlt, FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function NutritionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duplicating, setDuplicating] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const fetchPlanDetails = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/nutrition/${id}`);
      setPlan(data.plan);
      setNewTitle(data.plan.title);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load nutrition plan details");
      navigate("/nutrition");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanDetails();
  }, [id]);

  const handleDuplicate = async () => {
    setDuplicating(true);
    try {
      const { data } = await API.post(`/nutrition/${id}/duplicate`);
      toast.success("Meal plan duplicated successfully!");
      navigate(`/nutrition/${data.plan._id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to duplicate meal plan");
    } finally {
      setDuplicating(false);
    }
  };

  const handleRename = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const { data } = await API.patch(`/nutrition/${id}`, { title: newTitle });
      setPlan(prev => ({ ...prev, title: data.plan.title }));
      setShowRenameModal(false);
      toast.success("Meal plan renamed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to rename meal plan");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this meal plan?")) return;

    try {
      await API.delete(`/nutrition/${id}`);
      toast.success("Meal plan deleted successfully");
      navigate("/nutrition");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete meal plan");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!plan) return null;

  return (
    <PageTransition>
      <SEO title={`${plan.title} | FitFlowAI`} description="Access full details, calorie targets, macros split, and grocery list for your fitness nutrition meal program." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20 print:bg-white print:pb-0">
        <GlowBackground className="print:hidden" />

        <Container className="relative z-10 pt-10 space-y-8 max-w-4xl print:pt-0">
          
          {/* Back link */}
          <button
            onClick={() => navigate("/profile")}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition cursor-pointer print:hidden"
          >
            <FaArrowLeft size={11} />
            <span>Back to Profile</span>
          </button>

          {/* Title Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-200/50 dark:border-slate-800/40 pb-6 print:border-b-2 print:border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-450 tracking-wider print:text-slate-600">
                {plan.planType} • {plan.dietPreference} Diet
              </span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1 print:text-black">
                {plan.title}
              </h1>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2.5 print:hidden">
              <button
                onClick={() => setShowRenameModal(true)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-xs font-extrabold text-slate-700 dark:border-slate-850 dark:bg-slate-900/50 dark:text-slate-200 cursor-pointer"
                title="Rename Plan"
              >
                <FaEdit size={11} />
                <span>Rename</span>
              </button>
              <button
                onClick={handleDuplicate}
                disabled={duplicating}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-xs font-extrabold text-slate-700 dark:border-slate-850 dark:bg-slate-900/50 dark:text-slate-200 cursor-pointer disabled:opacity-50"
                title="Duplicate Plan"
              >
                <FaCopy size={11} />
                <span>Duplicate</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-xs font-extrabold text-slate-700 dark:border-slate-850 dark:bg-slate-900/50 dark:text-slate-200 cursor-pointer"
                title="Print Plan"
              >
                <FaPrint size={11} />
                <span>Print</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 rounded-xl border border-red-200/50 bg-red-500/10 px-4 py-2.5 text-xs font-extrabold text-red-500 cursor-pointer"
                title="Delete Plan"
              >
                <FaTrashAlt size={11} />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Macro breakdown */}
          <MacroCard
            calories={plan.dailyCalories}
            protein={plan.protein}
            carbs={plan.carbohydrates}
            fat={plan.fat}
            fiber={plan.fiber}
            water={plan.waterGoal}
          />

          {/* Meals split */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight pl-2 print:text-black">
              Daily Meal Layout
            </h3>

            {/* Print friendly list */}
            <div className="hidden print:block space-y-6">
              {plan.mealPlan?.map((meal, mIdx) => (
                <div key={mIdx} className="border border-slate-200 p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-base font-extrabold text-black">{meal.mealName} ({meal.time})</span>
                    <span className="text-sm font-bold text-black">{meal.calories} kcal</span>
                  </div>
                  <div className="space-y-2">
                    {meal.foods?.map((f, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-slate-800">
                        <span>{f.name} ({f.portion})</span>
                        <span>{f.protein}g Protein / {f.carbs}g Carbs / {f.fat}g Fat</span>
                      </div>
                    ))}
                  </div>
                  {meal.notes && <p className="text-xs italic text-slate-500">Note: {meal.notes}</p>}
                </div>
              ))}
            </div>

            {/* Grid layout */}
            <div className="grid gap-6 sm:grid-cols-2 print:hidden">
              {plan.mealPlan?.map((meal, mIdx) => (
                <MealCard key={mIdx} meal={meal} />
              ))}
            </div>
          </div>

          {/* Grocery Shopping list */}
          <ShoppingList list={plan.shoppingList} />

          {/* Rename Modal */}
          <AnimatePresence>
            {showRenameModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 p-6 max-w-sm w-full space-y-4 shadow-2xl"
                >
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Rename Meal Plan
                  </h3>
                  
                  <form onSubmit={handleRename} className="space-y-4">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      placeholder="e.g. My High Protein Veg Plan"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-transparent text-sm outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                    />

                    <div className="flex justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setShowRenameModal(false)}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-extrabold text-slate-600 dark:border-slate-850 dark:text-slate-400 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-xs font-extrabold text-slate-955 shadow-md shadow-emerald-500/10 cursor-pointer"
                      >
                        <FaCheck size={9} />
                        <span>Save</span>
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

export default NutritionDetails;
