import { FaFire, FaHeartbeat, FaWeight, FaRunning } from "react-icons/fa";

function GoalSelector({ selectedGoal, onChange, disabled = false }) {
  const goals = [
    { id: "fat loss", name: "Fat Loss", desc: "Burn fat & lean down", icon: FaFire, color: "text-rose-500 bg-rose-500/10" },
    { id: "muscle gain", name: "Muscle Gain", desc: "Build size & hypertrophy", icon: FaRunning, color: "text-emerald-500 bg-emerald-500/10" },
    { id: "maintenance", name: "Maintenance", desc: "Hold body recomp", icon: FaWeight, color: "text-blue-500 bg-blue-500/10" },
    { id: "strength", name: "Strength Focus", desc: "Lift heavy & gain power", icon: FaHeartbeat, color: "text-amber-500 bg-amber-500/10" },
    { id: "general fitness", name: "General Fitness", desc: "Stay healthy & active", icon: FaHeartbeat, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full">
      {goals.map((goal) => {
        const Icon = goal.icon;
        const isSelected = selectedGoal === goal.id;

        return (
          <button
            key={goal.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(goal.id)}
            className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-300 ${
              isSelected
                ? "border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                : "border-slate-200 bg-white/40 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-slate-700"
            } cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${goal.color} mb-3`}>
              <Icon size={18} />
            </div>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
              {goal.name}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight mt-1">
              {goal.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default GoalSelector;
