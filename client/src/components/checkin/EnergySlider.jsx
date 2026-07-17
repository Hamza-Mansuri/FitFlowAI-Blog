function EnergySlider({ label, value, onChange, min = 1, max = 10 }) {
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center text-xs font-bold text-slate-800 dark:text-slate-200">
        <span className="uppercase tracking-wider">{label}</span>
        <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20 text-[10px]">
          {value} / {max}
        </span>
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
      </div>

      <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider pl-0.5">
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
      </div>
    </div>
  );
}

export default EnergySlider;
