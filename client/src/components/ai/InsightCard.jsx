import { FaLightbulb, FaCheck } from "react-icons/fa";

function InsightCard({ insights = [] }) {
  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-4">
      
      <div className="flex items-center gap-3 border-b border-slate-200/20 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
          <FaLightbulb size={14} />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Trend Observations
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-450 mt-0.5">
            Data insights evaluated based on check-ins, sleep, and workouts.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-450 italic pl-1">
            Analyzing statistics to calculate trends...
          </p>
        ) : (
          insights.map((ins, idx) => (
            <div key={idx} className="flex gap-3 items-start text-xs font-semibold text-slate-700 dark:text-slate-350">
              <span className="w-4 h-4 rounded bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20 flex-shrink-0 mt-0.5">
                <FaCheck size={7} />
              </span>
              <span className="leading-relaxed">{ins}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default InsightCard;
