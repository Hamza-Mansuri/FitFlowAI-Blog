import { FaHeartbeat, FaInfoCircle, FaCheck } from "react-icons/fa";

function InsightCard({ insights = [] }) {
  return (
    <div className="rounded-[2.5rem] border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-500/10 p-6 sm:p-8 space-y-4">
      
      <div className="flex items-center gap-3 border-b border-emerald-500/10 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <FaHeartbeat size={15} />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            FitCoach AI Progress Observations
          </h3>
          <p className="text-[10px] text-slate-500 dark:text-slate-450 mt-0.5">
            AI-generated observations comparing recovery averages, sleep drops, and meal target trends.
          </p>
        </div>
      </div>

      <div className="space-y-3.5">
        {insights.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-450 italic pl-1">
            Calculating insights... Log check-ins daily to generate adaptive observations.
          </p>
        ) : (
          insights.map((ins, idx) => (
            <div key={idx} className="flex gap-3 items-start text-xs font-semibold text-slate-700 dark:text-slate-350">
              <span className="w-4 h-4 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 flex-shrink-0 mt-0.5">
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
