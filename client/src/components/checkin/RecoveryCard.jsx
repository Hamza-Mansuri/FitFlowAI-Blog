import { FaHeartbeat, FaInfoCircle, FaDumbbell, FaAppleAlt, FaBed, FaLightbulb } from "react-icons/fa";

function RecoveryCard({ score, recommendations }) {
  // SVG Stroke variables for progress ring
  const radius = 60;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine recovery color category
  const getColorClass = () => {
    if (score >= 80) return "text-emerald-500 stroke-emerald-500";
    if (score >= 55) return "text-amber-500 stroke-amber-500";
    return "text-rose-500 stroke-rose-500";
  };

  const colorStyle = getColorClass();

  const adviceSections = [
    { label: "Workout", val: recommendations?.workout, icon: FaDumbbell, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Nutrition", val: recommendations?.nutrition, icon: FaAppleAlt, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    { label: "Recovery", val: recommendations?.recovery, icon: FaBed, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    { label: "Motivation", val: recommendations?.motivation, icon: FaLightbulb, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
  ];

  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl grid gap-8 md:grid-cols-3 items-center">
      
      {/* Recovery Ring Indicator */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative flex items-center justify-center h-32 w-32">
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
            {/* Foreground circle */}
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
              className={`${colorStyle} transition-all duration-500`}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
              {score}%
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mt-1">
              Recovery
            </span>
          </div>
        </div>

        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-4">
          {score >= 80 ? "Excellent Condition" : score >= 55 ? "Moderate Fatigue" : "Critical Rest Needed"}
        </h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-450 font-light mt-1 max-w-[180px] leading-relaxed">
          {score >= 80 ? "Your body is primed for high intensity output today." : score >= 55 ? "Consider a minor load reduction to prevent joint overload." : "We recommend active stretching or a full rest day."}
        </p>
      </div>

      {/* AI Coaching Tips list */}
      <div className="md:col-span-2 space-y-4">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5 border-b border-slate-200/20 pb-3 mb-1">
          <FaHeartbeat className="text-emerald-500" />
          <span>FitCoach AI Daily Recommendations</span>
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          {adviceSections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div key={idx} className="flex gap-3 items-start">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${sec.color} border flex-shrink-0 mt-0.5`}>
                  <Icon size={13} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-455 tracking-wider">
                    {sec.label} Action
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-350 font-medium leading-relaxed mt-0.5">
                    {sec.val || "Adjusting according to logs..."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default RecoveryCard;
