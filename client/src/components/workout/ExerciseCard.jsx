import { FaListUl, FaInfoCircle, FaDumbbell } from "react-icons/fa";

function ExerciseCard({ exercise }) {
  return (
    <div className="rounded-2xl border border-slate-200/50 bg-white/30 dark:border-slate-800/40 dark:bg-slate-950/30 p-5 shadow-sm space-y-3.5 hover:border-emerald-500/20 transition-all duration-300">
      
      {/* Exercise title & muscle group */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex-shrink-0">
            <FaDumbbell size={14} />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
              {exercise.exerciseName}
            </h4>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold mt-0.5 block">
              {exercise.muscleGroup}
            </span>
          </div>
        </div>
      </div>

      {/* Target parameters */}
      <div className="grid grid-cols-4 gap-2 bg-slate-100/50 dark:bg-slate-900/30 rounded-xl p-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
        <div>
          <span className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Sets</span>
          <span className="text-slate-800 dark:text-white font-extrabold">{exercise.sets}</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Reps</span>
          <span className="text-slate-800 dark:text-white font-extrabold">{exercise.reps}</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Rest</span>
          <span className="text-slate-800 dark:text-white font-extrabold">{exercise.restTime}</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Tempo</span>
          <span className="text-slate-800 dark:text-white font-extrabold">{exercise.tempo || "2-0-2-0"}</span>
        </div>
      </div>

      {/* Coach Notes */}
      {exercise.notes && (
        <div className="flex gap-2 text-xs text-slate-500 dark:text-slate-450 pl-1">
          <FaInfoCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={11} />
          <p className="font-light italic leading-normal">
            {exercise.notes}
          </p>
        </div>
      )}

    </div>
  );
}

export default ExerciseCard;
