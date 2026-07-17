import { FaDumbbell, FaAppleAlt, FaCalculator, FaBookOpen, FaChartLine, FaTasks } from "react-icons/fa";

function QuickActionPanel({ onActionClick }) {
  const actions = [
    { label: "Generate Workout", prompt: "Generate a custom workout routine based on my active goal and preferences.", icon: FaDumbbell, color: "hover:border-emerald-500/30 hover:bg-emerald-500/5 text-emerald-500 bg-emerald-500/10 border-emerald-500/10" },
    { label: "Generate Meal Plan", prompt: "Draft a personalized nutrition plan matching my diet preferences and calorie targets.", icon: FaAppleAlt, color: "hover:border-rose-500/30 hover:bg-rose-500/5 text-rose-500 bg-rose-500/10 border-rose-500/10" },
    { label: "Adjust Calories Today", prompt: "My energy levels are low today, should I adjust my target daily calories?", icon: FaCalculator, color: "hover:border-blue-500/30 hover:bg-blue-500/5 text-blue-500 bg-blue-500/10 border-blue-500/10" },
    { label: "Explain Exercise", prompt: "Explain how to safely execute barbell squats with correct eccentric tempo.", icon: FaBookOpen, color: "hover:border-purple-500/30 hover:bg-purple-500/5 text-purple-500 bg-purple-500/10 border-purple-500/10" },
    { label: "Review My Progress", prompt: "Review my weight trends and consistency rates over the past weeks.", icon: FaChartLine, color: "hover:border-amber-500/30 hover:bg-amber-500/5 text-amber-500 bg-amber-500/10 border-amber-500/10" },
    { label: "Create Grocery List", prompt: "Compile a weekly grocery shopping list matching my active meal plan.", icon: FaTasks, color: "hover:border-cyan-500/30 hover:bg-cyan-500/5 text-cyan-500 bg-cyan-500/10 border-cyan-500/10" },
  ];

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
      {actions.map((act, idx) => {
        const Icon = act.icon;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onActionClick(act.prompt)}
            className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-300 ${act.color} cursor-pointer`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 border border-white/10 flex-shrink-0">
              <Icon size={13} />
            </div>
            <span className="text-[11px] font-black text-slate-800 dark:text-white leading-tight">
              {act.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default QuickActionPanel;
