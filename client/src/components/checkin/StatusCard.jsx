import { FaBed, FaRunning, FaWeight, FaListOl, FaExclamationTriangle } from "react-icons/fa";

function StatusCard({ checkIn }) {
  const items = [
    { label: "Sleep Logged", val: `${checkIn.sleepHours} hrs`, sub: "Night recovery", icon: FaBed, color: "text-blue-500 bg-blue-500/10" },
    { label: "Today's Weight", val: `${checkIn.weight} kg`, sub: "Daily weight", icon: FaWeight, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Steps Logged", val: `${checkIn.steps?.toLocaleString() || 0} steps`, sub: "Cardio output", icon: FaRunning, color: "text-amber-500 bg-amber-500/10" },
    { label: "Hydration", val: `${checkIn.waterIntake} Liters`, sub: "Daily water target", icon: FaRunning, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight pl-2">
        Today's Logged Metrics
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-5 shadow-sm"
            >
              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${item.color}`}>
                <Icon size={14} />
              </div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {item.label}
              </span>
              <span className="text-sm font-extrabold text-slate-850 dark:text-white mt-1 block">
                {item.val}
              </span>
              <span className="text-[10px] text-slate-450 mt-0.5 block leading-tight font-light">
                {item.sub}
              </span>
            </div>
          );
        })}
      </div>

      {(checkIn.injuryPain !== "None" && checkIn.injuryPain !== "") && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 flex gap-3 items-start">
          <FaExclamationTriangle className="text-rose-500 mt-0.5 flex-shrink-0" size={14} />
          <div>
            <span className="block text-[10px] uppercase font-bold text-rose-500 tracking-wider">Active Injury Pain Safeguard</span>
            <p className="text-xs text-slate-700 dark:text-slate-350 font-medium mt-0.5">
              FitCoach AI has registered active pain: &ldquo;{checkIn.injuryPain}&rdquo;. Training targets are adjusted to protect this area.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusCard;
