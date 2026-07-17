import { FaComments, FaHistory, FaCheck } from "react-icons/fa";

function ConversationSidebar({ summaries = [] }) {
  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-5">
      
      <div className="flex items-center gap-3 border-b border-slate-200/20 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          <FaComments size={16} />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Recent Chat Summaries
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Key takeaways from previous conversations.
          </p>
        </div>
      </div>

      <div className="space-y-3.5">
        {summaries.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-450 italic pl-1">
            No previous discussions summarized yet.
          </p>
        ) : (
          summaries.map((sum, idx) => (
            <div key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-650 dark:text-slate-400 py-2 border-b border-slate-200/10 last:border-0">
              <FaHistory className="text-emerald-500 flex-shrink-0 mt-0.5" size={11} />
              <p className="leading-normal font-light">
                {sum}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default ConversationSidebar;
