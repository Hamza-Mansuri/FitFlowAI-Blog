import { FaAppleAlt, FaFire, FaWater } from "react-icons/fa";

function MacroCard({ calories, protein, carbs, fat, fiber, water }) {
  const macros = [
    { name: "Protein", val: `${protein}g`, color: "bg-emerald-500", pct: 100 },
    { name: "Carbs", val: `${carbs}g`, color: "bg-blue-500", pct: 100 },
    { name: "Fat", val: `${fat}g`, color: "bg-rose-500", pct: 100 },
    { name: "Fiber", val: `${fiber}g`, color: "bg-amber-500", pct: 100 },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-6 w-full">
      {/* Calories */}
      <div className="col-span-1 rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-5 shadow-sm text-center">
        <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
          <FaFire size={15} />
        </div>
        <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Daily Target</span>
        <span className="text-base font-extrabold text-slate-850 dark:text-white mt-1 block">{calories} kcal</span>
      </div>

      {/* Macros */}
      {macros.map((macro, idx) => (
        <div
          key={idx}
          className="col-span-1 rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-5 shadow-sm text-center"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{macro.name}</span>
            <span className="text-xs font-black text-slate-800 dark:text-white">{macro.val}</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-850 rounded-full overflow-hidden">
            <div className={`h-full ${macro.color}`} style={{ width: `${macro.pct}%` }} />
          </div>
        </div>
      ))}

      {/* Water Intake */}
      <div className="col-span-1 rounded-2xl border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-5 shadow-sm text-center">
        <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/25">
          <FaWater size={15} className="animate-pulse" />
        </div>
        <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Water Goal</span>
        <span className="text-base font-extrabold text-slate-850 dark:text-white mt-1 block">{water} Liters</span>
      </div>
    </div>
  );
}

export default MacroCard;
