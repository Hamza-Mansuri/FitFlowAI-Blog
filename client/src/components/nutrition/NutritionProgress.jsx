import { FaAppleAlt, FaCheck, FaPercentage } from "react-icons/fa";

function NutritionProgress({ percentage = 100 }) {
  return (
    <div className="flex items-center gap-3 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/40 backdrop-blur-xl rounded-2xl px-4 py-3 w-fit shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
        <FaAppleAlt size={15} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-850 dark:text-white leading-tight">
          Nutrition Program
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 uppercase tracking-wider">
          Active Plan loaded
        </span>
      </div>
    </div>
  );
}

export default NutritionProgress;
