function MoodSelector({ selectedMood, onChange }) {
  const moods = [
    { id: "happy", label: "Happy", emoji: "😊", color: "hover:border-emerald-500 hover:bg-emerald-500/5" },
    { id: "focused", label: "Focused", emoji: "🧠", color: "hover:border-blue-500 hover:bg-blue-500/5" },
    { id: "tired", label: "Tired", emoji: "🥱", color: "hover:border-amber-500 hover:bg-amber-500/5" },
    { id: "stressed", label: "Stressed", emoji: "😰", color: "hover:border-rose-500 hover:bg-rose-500/5" },
    { id: "sore", label: "Sore", emoji: "🤕", color: "hover:border-purple-500 hover:bg-purple-500/5" },
  ];

  return (
    <div className="grid gap-3 grid-cols-5 w-full">
      {moods.map((mood) => {
        const isSelected = selectedMood === mood.id;

        return (
          <button
            key={mood.id}
            type="button"
            onClick={() => onChange(mood.id)}
            className={`flex flex-col items-center p-3 rounded-2xl border transition-all duration-300 ${
              isSelected
                ? "border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                : `border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 ${mood.color}`
            } cursor-pointer`}
          >
            <span className="text-2xl leading-none mb-1">{mood.emoji}</span>
            <span className="text-[10px] font-bold text-slate-800 dark:text-white capitalize">
              {mood.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default MoodSelector;
