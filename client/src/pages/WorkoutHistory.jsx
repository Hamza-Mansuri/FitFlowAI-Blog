import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import WorkoutCard from "../components/workout/WorkoutCard";
import EmptyState from "../components/common/EmptyState";
import { FaDumbbell, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/workouts");
      setWorkouts(data.workouts || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load workouts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout plan?")) return;

    try {
      await API.delete(`/workouts/${id}`);
      toast.success("Workout plan deleted successfully");
      fetchWorkouts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete workout");
    }
  };

  return (
    <PageTransition>
      <SEO title="Workout Routines | FitFlowAI" description="Browse your saved AI generated workout splits and routines." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <Container className="relative z-10 pt-10 space-y-8 max-w-5xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/50 dark:border-slate-800/40 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
                <FaDumbbell size={20} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  My Workout Routines
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
                  Access your saved evidence-based training split routines.
                </p>
              </div>
            </div>

            {workouts.length > 0 && (
              <Link to="/workouts/build">
                <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-xs font-extrabold text-slate-950 shadow-md shadow-emerald-500/15 cursor-pointer">
                  <FaPlus size={10} />
                  <span>Build Routine</span>
                </button>
              </Link>
            )}
          </div>

          {/* List display */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            </div>
          ) : workouts.length === 0 ? (
            <EmptyState
              title="No Saved Routines"
              description="You haven't generated any custom workouts yet. Build one now with FitCoach AI."
              actionText="Build Workout Routine"
              actionPath="/workouts/build"
              icon={FaDumbbell}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <WorkoutCard
                  key={workout._id}
                  workout={workout}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

        </Container>
      </div>
    </PageTransition>
  );
}

export default WorkoutHistory;
