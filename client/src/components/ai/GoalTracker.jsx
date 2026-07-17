import { FaSlidersH } from "react-icons/fa";

function GoalTracker({ goal = "general fitness", current = 70, target = 70, percentage = 100, days = 45 }) {
  // SVG Stroke variables
  const radius = 36;
  const stroke = 5;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 shadow-xl flex items-center gap-5">
      
      {/* Circle indicator */}
      <div className="relative flex items-center justify-center h-20 w-20 flex-shrink-0">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-slate-200 dark:text-slate-800"
          />
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-emerald-500 transition-all duration-500"
          />
        </svg>
        <span className="absolute text-[10px] font-black text-slate-850 dark:text-white">
          {percentage}%
        </span>
      </div>

      {/* Goal Details */}
      <div className="space-y-1">
        <span className="inline-flex items-center gap-1.5 text-[9px] uppercase font-bold text-slate-400 tracking-wider">
          <FaSlidersH size={10} /> Active Target goal
        </span>
        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white capitalize">
          {goal} Goal
        </h4>
        <div className="text-[10px] text-slate-500 dark:text-slate-450 mt-1 font-semibold">
          <span>Current: <strong>{current} kg</strong></span>
          <span className="mx-2 font-light">|</span>
          <span>Target: <strong>{target} kg</strong></span>
        </div>
        <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 font-medium italic">
          Estimated: {days} days remaining
        </p>
      </div>

    </div>
  );
}

export default GoalTracker;
