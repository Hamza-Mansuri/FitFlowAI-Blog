import { FaUtensils, FaClock, FaInfoCircle } from "react-icons/fa";

function MealCard({ meal }) {
  return (
    <div className="rounded-[2rem] border border-slate-200/50 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 shadow-sm space-y-4 hover:border-emerald-500/20 transition-all duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <FaUtensils size={14} />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
              {meal.mealName}
            </h4>
            <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-semibold uppercase tracking-wider">
              <FaClock size={8} />
              <span>{meal.time}</span>
            </div>
          </div>
        </div>

        <span className="text-sm font-extrabold text-slate-850 dark:text-white">
          {meal.calories} kcal
        </span>
      </div>

      {/* Foods list */}
      <div className="space-y-2 border-t border-slate-200/30 dark:border-slate-800/20 pt-3">
        {meal.foods?.map((food, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs">
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-800 dark:text-slate-200">{food.name}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">{food.portion}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-450 font-bold">
              <span>{food.protein}g P</span>
              <span>{food.carbs}g C</span>
              <span>{food.fat}g F</span>
            </div>
          </div>
        ))}
      </div>

      {/* Meal macros footer progress bar splits */}
      <div className="grid grid-cols-3 gap-2 bg-slate-100/50 dark:bg-slate-900/30 rounded-xl p-2.5 text-center text-[10px] font-bold text-slate-550">
        <div>Protein: <strong className="text-slate-850 dark:text-white">{meal.protein}g</strong></div>
        <div>Carbs: <strong className="text-slate-850 dark:text-white">{meal.carbs}g</strong></div>
        <div>Fat: <strong className="text-slate-850 dark:text-white">{meal.fat}g</strong></div>
      </div>

      {/* Notes */}
      {meal.notes && (
        <div className="flex gap-2 text-xs text-slate-500 pl-1 border-t border-slate-205/30 pt-3">
          <FaInfoCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={11} />
          <p className="font-light italic leading-normal">
            {meal.notes}
          </p>
        </div>
      )}

    </div>
  );
}

export default MealCard;
