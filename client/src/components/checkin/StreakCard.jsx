import { FaCheckCircle, FaFire, FaCalendarCheck } from "react-icons/fa";

function StreakCard({ streaks }) {
  const stats = [
    { label: "Check-in Streak", val: `${streaks.checkInStreak || 0} Days`, sub: `Longest: ${streaks.longestStreak || 0}d`, icon: FaCalendarCheck, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Workout Streak", val: `${streaks.workoutStreak || 0} Days`, sub: "Consecutive sessions", icon: FaFire, color: "text-amber-500 bg-amber-500/10" },
    { label: "Nutrition Streak", val: `${streaks.nutritionStreak || 0} Days`, sub: "Diet splits followed", icon: FaCheckCircle, color: "text-rose-500 bg-rose-500/10" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3 w-full">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-5 shadow-sm flex items-center gap-4"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color} border border-slate-200/10 flex-shrink-0`}>
              <Icon size={16} />
            </div>
            <div>
              <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                {stat.label}
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5 block leading-tight">
                {stat.val}
              </span>
              <span className="text-[10px] text-slate-450 mt-0.5 block">
                {stat.sub}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StreakCard;
