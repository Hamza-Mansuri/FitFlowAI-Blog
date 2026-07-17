function ProfileProgress({ percentage = 0 }) {
  // SVG Stroke variables
  const radius = 24;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-3 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/40 backdrop-blur-xl rounded-2xl px-4 py-3 w-fit shadow-sm">
      <div className="relative flex items-center justify-center h-12 w-12">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-slate-200 dark:text-slate-800"
          />
          {/* Foreground progress circle */}
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
        <span className="absolute text-[10px] font-black text-slate-800 dark:text-white">
          {percentage}%
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-slate-800 dark:text-white leading-tight">
          Fitness Profile
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 uppercase tracking-wider">
          {percentage === 100 ? "Complete" : "Incomplete"}
        </span>
      </div>
    </div>
  );
}

export default ProfileProgress;
