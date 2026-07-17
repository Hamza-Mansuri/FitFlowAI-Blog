import { FaAppleAlt, FaCheck, FaExclamationCircle } from "react-icons/fa";

function RecommendationCard({ recommendations = [] }) {
  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-4">
      
      <div className="flex items-center gap-3 border-b border-slate-200/20 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
          <FaExclamationCircle size={14} />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Today's Training Recommendations
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-455 mt-0.5">
            Key actionable offsets for active workouts and diet targets today.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-450 italic pl-1">
            Reviewing logs to compile daily recommendations...
          </p>
        ) : (
          recommendations.map((rec, idx) => (
            <div key={idx} className="flex gap-3 items-start text-xs font-semibold text-slate-650 dark:text-slate-400">
              <span className="w-4 h-4 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 flex-shrink-0 mt-0.5">
                <FaCheck size={7} />
              </span>
              <span className="leading-relaxed">{rec}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default RecommendationCard;
