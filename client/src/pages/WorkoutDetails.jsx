import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";
import Container from "../components/layout/Container";
import PageTransition from "../components/common/PageTransition";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import WorkoutTimeline from "../components/workout/WorkoutTimeline";
import WorkoutSummary from "../components/workout/WorkoutSummary";
import { FaEdit, FaCopy, FaPrint, FaArrowLeft, FaTrashAlt, FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [duplicating, setDuplicating] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const fetchWorkoutDetails = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/workouts/${id}`);
      setWorkout(data.workout);
      setNewTitle(data.workout.title);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load workout details");
      navigate("/workouts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkoutDetails();
  }, [id]);

  const handleDuplicate = async () => {
    setDuplicating(true);
    try {
      const { data } = await API.post(`/workouts/${id}/duplicate`);
      toast.success("Workout duplicated successfully!");
      navigate(`/workouts/${data.plan._id}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to duplicate workout");
    } finally {
      setDuplicating(false);
    }
  };

  const handleRename = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const { data } = await API.patch(`/workouts/${id}`, { title: newTitle });
      setWorkout(prev => ({ ...prev, title: data.workout.title }));
      setShowRenameModal(false);
      toast.success("Workout renamed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to rename workout");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this workout routine?")) return;

    try {
      await API.delete(`/workouts/${id}`);
      toast.success("Workout routine deleted successfully");
      navigate("/workouts");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete workout");
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

  if (!workout) return null;

  return (
    <PageTransition>
      <SEO title={`${workout.title} | FitFlowAI`} description="Access full details, sets, reps, and tempos for your custom fitness training program." />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20 print:bg-white print:pb-0">
        <GlowBackground className="print:hidden" />

        <Container className="relative z-10 pt-10 space-y-8 max-w-4xl print:pt-0">
          
          {/* Back button */}
          <button
            onClick={() => navigate("/profile")}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition cursor-pointer print:hidden"
          >
            <FaArrowLeft size={11} />
            <span>Back to Profile</span>
          </button>

          {/* Heading Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-200/50 dark:border-slate-800/40 pb-6 print:border-b-2 print:border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-450 tracking-wider print:text-slate-600">
                {workout.split} split • {workout.difficulty}
              </span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1 print:text-black">
                {workout.title}
              </h1>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2.5 print:hidden">
              <button
                onClick={() => setShowRenameModal(true)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-xs font-extrabold text-slate-700 dark:border-slate-850 dark:bg-slate-900/50 dark:text-slate-200 cursor-pointer"
                title="Rename Routine"
              >
                <FaEdit size={11} />
                <span>Rename</span>
              </button>
              <button
                onClick={handleDuplicate}
                disabled={duplicating}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-xs font-extrabold text-slate-700 dark:border-slate-850 dark:bg-slate-900/50 dark:text-slate-200 cursor-pointer disabled:opacity-50"
                title="Duplicate Routine"
              >
                <FaCopy size={11} />
                <span>Duplicate</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/50 px-4 py-2.5 text-xs font-extrabold text-slate-700 dark:border-slate-850 dark:bg-slate-900/50 dark:text-slate-200 cursor-pointer"
                title="Print Routine"
              >
                <FaPrint size={11} />
                <span>Print</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 rounded-xl border border-red-200/50 bg-red-500/10 px-4 py-2.5 text-xs font-extrabold text-red-500 cursor-pointer"
                title="Delete Routine"
              >
                <FaTrashAlt size={11} />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Metrics summary */}
          <WorkoutSummary workout={workout} />

          {/* Routine days */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight pl-2 print:text-black">
              Exercises split details
            </h3>
            
            {/* Print Friendly View */}
            <div className="hidden print:block space-y-8">
              {workout.days.map((day, dIdx) => (
                <div key={dIdx} className="space-y-4 border-b border-slate-200 pb-6">
                  <h4 className="text-lg font-bold text-black border-l-4 border-emerald-500 pl-3">
                    {day.dayName}
                  </h4>
                  <div className="grid gap-4 grid-cols-2">
                    {day.exercises.map((ex, eIdx) => (
                      <div key={eIdx} className="border border-slate-200 p-4 rounded-xl">
                        <span className="text-sm font-extrabold text-black">{ex.exerciseName}</span>
                        <span className="block text-xs text-slate-500 uppercase mt-0.5">{ex.muscleGroup}</span>
                        <div className="mt-2 text-xs flex gap-4 text-slate-700">
                          <span>Sets: <strong>{ex.sets}</strong></span>
                          <span>Reps: <strong>{ex.reps}</strong></span>
                          <span>Rest: <strong>{ex.restTime}</strong></span>
                          <span>Tempo: <strong>{ex.tempo}</strong></span>
                        </div>
                        {ex.notes && <p className="text-[11px] text-slate-500 italic mt-2">Notes: {ex.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Standard Accordion view */}
            <div className="print:hidden">
              <WorkoutTimeline days={workout.days} />
            </div>
          </div>

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
                    Rename Routine
                  </h3>
                  
                  <form onSubmit={handleRename} className="space-y-4">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      placeholder="e.g. My Heavy Upper Lower Routine"
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
                        className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-md shadow-emerald-500/10 cursor-pointer"
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

export default WorkoutDetails;
