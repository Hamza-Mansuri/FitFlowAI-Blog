import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import EmptyState from "../components/common/EmptyState";
import { FaAppleAlt, FaPlus as FaPlusIcon, FaTrashAlt as FaTrashIcon, FaEye as FaEyeIcon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function NutritionHistory() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/nutrition");
      setPlans(data.plans || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load nutrition plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this nutrition plan?")) return;

    try {
      await API.delete(`/nutrition/${id}`);
      toast.success("Nutrition plan deleted successfully");
      fetchPlans();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete nutrition plan");
    }
  };

  return (
    <PageTransition>
      <SEO title="Nutrition Programs | FitFlowAI" description="View and manage your saved sports nutrition programs." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <Container className="relative z-10 pt-10 space-y-8 max-w-5xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800/40 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
                <FaAppleAlt className="text-xl text-emerald-500" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  My Meal Plans
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                  Browse your previously generated sport nutrition programs.
                </p>
              </div>
            </div>

            {plans.length > 0 && (
              <Link to="/nutrition/build">
                <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-xs font-extrabold text-slate-950 shadow-md shadow-emerald-500/15 cursor-pointer">
                  <FaPlusIcon size={10} />
                  <span>Build Meal Plan</span>
                </button>
              </Link>
            )}
          </div>

          {/* List plans */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            </div>
          ) : plans.length === 0 ? (
            <EmptyState
              title="No Meal Plans"
              description="You haven't generated any nutrition plans yet. Setup one now using BMR and TDEE math."
              actionText="Generate Nutrition Program"
              actionPath="/nutrition/build"
              icon={FaAppleAlt}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <motion.div
                  key={plan._id}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="group rounded-3xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 shadow-md transition-all duration-300 hover:border-emerald-500/30 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-flex rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                        {plan.planType}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-2 group-hover:text-emerald-500 transition-colors duration-300 line-clamp-1">
                        {plan.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="p-2 text-slate-450 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Plan"
                    >
                      <FaTrashIcon size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-y border-slate-200/45 dark:border-slate-800/30 py-3.5 mb-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <div>Energy: <strong className="text-slate-850 dark:text-white">{plan.dailyCalories} kcal</strong></div>
                    <div>Split: <strong className="text-slate-850 dark:text-white">{plan.mealCount} meals/day</strong></div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-450">
                    <span className="capitalize">{plan.dietPreference} Diet</span>
                    <Link
                      to={`/nutrition/${plan._id}`}
                      className="inline-flex items-center gap-1.5 font-bold text-emerald-500 hover:underline"
                    >
                      <span>View Program</span>
                      <FaEyeIcon size={12} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </Container>
      </div>
    </PageTransition>
  );
}

export default NutritionHistory;
