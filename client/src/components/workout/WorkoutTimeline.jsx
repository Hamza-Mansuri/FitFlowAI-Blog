import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaCalendarWeek } from "react-icons/fa";
import ExerciseCard from "./ExerciseCard";

function WorkoutTimeline({ days }) {
  const [openDay, setOpenDay] = useState(0);

  if (!days || days.length === 0) return null;

  return (
    <div className="space-y-4">
      {days.map((day, idx) => {
        const isOpen = openDay === idx;

        return (
          <div
            key={idx}
            className="rounded-[2rem] border border-slate-200 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl overflow-hidden transition-all duration-300 shadow-sm"
          >
            {/* Header Accordion Bar */}
            <button
              onClick={() => setOpenDay(isOpen ? -1 : idx)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <FaCalendarWeek size={14} />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                    {day.dayName}
                  </h4>
                  <span className="text-[10px] text-slate-450 mt-0.5 block">
                    {day.exercises?.length || 0} Exercises planned
                  </span>
                </div>
              </div>

              <div>
                {isOpen ? (
                  <FaChevronUp className="text-slate-400" size={13} />
                ) : (
                  <FaChevronDown className="text-slate-400" size={13} />
                )}
              </div>
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="px-5 pb-6 border-t border-slate-100 dark:border-slate-900 pt-5 bg-slate-50/20 dark:bg-slate-950/20">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {day.exercises?.map((exercise, eIdx) => (
                    <ExerciseCard key={eIdx} exercise={exercise} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default WorkoutTimeline;
