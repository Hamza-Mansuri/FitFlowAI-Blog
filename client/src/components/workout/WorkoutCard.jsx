import { FaCalendarAlt, FaFire, FaClock, FaTrashAlt, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function WorkoutCard({ workout, onDelete }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      className="group rounded-3xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 shadow-md transition-all duration-300 hover:border-emerald-500/30"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-flex rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            {workout.split} Split
          </span>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-2 group-hover:text-emerald-500 transition-colors duration-300 line-clamp-1">
            {workout.title}
          </h3>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete(workout._id);
          }}
          className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
          title="Delete Workout"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 border-y border-slate-200/40 dark:border-slate-800/30 py-3.5 mb-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <FaCalendarAlt className="text-emerald-500" />
          <span>{workout.daysPerWeek} Days/Wk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FaClock className="text-emerald-500" />
          <span>{workout.sessionDuration} Mins</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FaFire className="text-emerald-500" />
          <span>{workout.estimatedCalories} kcal</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-slate-450">
        <span>Goal: <strong className="text-slate-800 dark:text-slate-200 capitalize">{workout.goal}</strong></span>
        <Link
          to={`/workouts/${workout._id}`}
          className="inline-flex items-center gap-1.5 font-bold text-emerald-500 hover:underline"
        >
          <span>View Routine</span>
          <FaEye size={12} />
        </Link>
      </div>
    </motion.div>
  );
}

export default WorkoutCard;
