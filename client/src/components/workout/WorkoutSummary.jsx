import { FaCalendarAlt, FaClock, FaFire, FaMapMarkerAlt, FaSlidersH } from "react-icons/fa";

function WorkoutSummary({ workout }) {
  const stats = [
    { label: "Target Goal", val: workout.goal, icon: FaSlidersH, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Frequency", val: `${workout.daysPerWeek} Days/Wk`, icon: FaCalendarAlt, color: "text-blue-500 bg-blue-500/10" },
    { label: "Duration", val: `${workout.sessionDuration} Mins`, icon: FaClock, color: "text-amber-500 bg-amber-500/10" },
    { label: "Est. Energy", val: `${workout.estimatedCalories} kcal`, icon: FaFire, color: "text-rose-500 bg-rose-500/10" },
    { label: "Location", val: workout.workoutLocation, icon: FaMapMarkerAlt, color: "text-purple-500 bg-purple-500/10" },
  ];

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-5 w-full">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-5 shadow-sm text-center"
          >
            <div className={`mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${stat.color} border border-slate-200/10`}>
              <Icon size={14} />
            </div>
            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {stat.label}
            </span>
            <span className="text-sm font-extrabold text-slate-800 dark:text-white mt-1 block capitalize">
              {stat.val}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default WorkoutSummary;
