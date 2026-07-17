import { FaAward, FaFire, FaWater, FaCheckDouble, FaHourglassStart } from "react-icons/fa";

function AchievementCard({ achievements = [] }) {
  const allAchievements = [
    { name: "First Workout", desc: "Completed your first active routine session.", icon: FaHourglassStart, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    { name: "7-Day Streak", desc: "Logged biometrics check-ins for 7 days in a row.", icon: FaFire, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    { name: "30-Day Streak", desc: "Logged biometrics check-ins for 30 days in a row.", icon: FaAward, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
    { name: "Consistency King", desc: "Logged 10+ completed workouts in your log history.", icon: FaCheckDouble, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    { name: "Hydration Hero", desc: "Maintained an average of 3+ Liters daily water intake.", icon: FaWater, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20" },
    { name: "Protein Master", desc: "Maintained 80%+ diet split compliance across logs.", icon: FaAward, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
  ];

  const unlockedSet = new Set(achievements);

  return (
    <div className="rounded-[2.5rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-6">
      <div>
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
          Fitness Milestones & Achievements
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-450 font-light mt-0.5">
          Unlock badges as you hit consistency targets and weight changes.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {allAchievements.map((ach, idx) => {
          const Icon = ach.icon;
          const isUnlocked = unlockedSet.has(ach.name);

          return (
            <div
              key={idx}
              className={`rounded-2xl border p-5 transition-all duration-300 flex gap-3.5 items-start ${
                isUnlocked
                  ? "border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/10"
                  : "border-slate-200 bg-white/20 dark:border-slate-850 dark:bg-slate-955/20 opacity-40 grayscale"
              }`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl border flex-shrink-0 mt-0.5 ${isUnlocked ? ach.color : "text-slate-400 bg-slate-100 border-slate-200"}`}>
                <Icon size={14} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  {ach.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-450 mt-1 font-light leading-relaxed">
                  {ach.desc}
                </p>
                {isUnlocked && (
                  <span className="inline-block text-[9px] font-extrabold text-emerald-500 mt-1.5 uppercase tracking-widest">
                    Unlocked
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default AchievementCard;
