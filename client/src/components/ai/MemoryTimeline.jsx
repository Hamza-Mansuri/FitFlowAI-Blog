import { FaUserShield, FaClock, FaCheck } from "react-icons/fa";

function MemoryTimeline({ permanent = [], temporary = [] }) {
  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200/20 pb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <FaUserShield size={16} />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            FitCoach AI Memory Logs
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-light mt-0.5">
            Facts extracted asynchronously during conversations to personalize guidance.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Permanent memories */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-slate-905 dark:text-white border-l-3 border-emerald-500 pl-2.5">
            Permanent Memory
          </h4>
          {permanent.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-450 italic pl-1">
              No permanent memory recorded yet. Share preferences during chat logs.
            </p>
          ) : (
            <ul className="space-y-2.5 text-xs text-slate-650 dark:text-slate-400 pl-1">
              {permanent.map((tag, idx) => (
                <li key={idx} className="flex gap-2 items-center">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 flex-shrink-0">
                    <FaCheck size={7} />
                  </span>
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Temporary memories */}
        <div className="space-y-3">
          <h4 className="text-sm font-extrabold text-slate-905 dark:text-white border-l-3 border-blue-500 pl-2.5">
            Temporary Memory Context
          </h4>
          {temporary.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-450 italic pl-1">
              No active temporary constraints.
            </p>
          ) : (
            <ul className="space-y-2.5 text-xs text-slate-650 dark:text-slate-400 pl-1">
              {temporary.map((tag, idx) => (
                <li key={idx} className="flex gap-2 items-center">
                  <span className="w-3.5 h-3.5 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20 flex-shrink-0">
                    <FaClock size={7} />
                  </span>
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

    </div>
  );
}

export default MemoryTimeline;
