import { FaCalendarCheck, FaDumbbell, FaFire, FaWater, FaQuoteLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function CoachCard({ score = 75, workout = "None active", calories = "N/A", water = 3, message = "" }) {
  return (
    <div className="rounded-[2.5rem] border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 backdrop-blur-xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row gap-6 justify-between items-stretch">
      
      {/* Recovery indicators and active items */}
      <div className="space-y-5 flex-1">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-500 dark:text-emerald-450 tracking-wider">
            Today's AI Coach Overview
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Let's execute your plan today.
          </h2>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="rounded-2xl bg-white/40 dark:bg-slate-950/40 p-4 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Recovery Index</span>
            <span className="text-lg font-black text-emerald-500 mt-2 block">{score}%</span>
          </div>

          <div className="rounded-2xl bg-white/40 dark:bg-slate-950/40 p-4 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Today's Split</span>
            <span className="text-sm font-black text-slate-850 dark:text-white mt-2 block truncate capitalize">{workout}</span>
          </div>

          <div className="rounded-2xl bg-white/40 dark:bg-slate-950/40 p-4 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Water Target</span>
            <span className="text-lg font-black text-blue-500 mt-2 block">{water}L</span>
          </div>

          <div className="rounded-2xl bg-white/40 dark:bg-slate-950/40 p-4 border border-slate-200/30 dark:border-slate-800/30 flex flex-col justify-between">
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Calorie budget</span>
            <span className="text-lg font-black text-rose-500 mt-2 block">{calories} kcal</span>
          </div>
        </div>
      </div>

      {/* Motivational insight quote */}
      <div className="md:w-72 bg-white/30 dark:bg-slate-950/30 rounded-3xl p-5 border border-slate-200/20 dark:border-slate-800/20 flex flex-col justify-center gap-3 relative overflow-hidden">
        <FaQuoteLeft className="absolute -top-3 -right-3 text-5xl text-emerald-500/10" />
        <p className="text-xs text-slate-700 dark:text-slate-350 italic font-medium leading-relaxed z-10">
          &ldquo;{message || "Consistency beats intensity. Focus on executing today's target sets and hit your recovery milestones."}&rdquo;
        </p>
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          - FitCoach AI
        </span>
      </div>

    </div>
  );
}

export default CoachCard;
