import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * HeroControls Component
 * Displays elegant left/right navigation arrows with glassmorphism style,
 * and dot pagination indicators at the bottom.
 */
export function HeroControls({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
  onSelect
}) {
  return (
    <>
      {/* Navigation Arrows */}
      <div className="absolute inset-x-4 md:inset-x-8 top-[60%] md:top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30">
        <button
          onClick={onPrev}
          className="group pointer-events-auto flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 bg-white/70 backdrop-blur-md text-slate-800 transition-all duration-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/50 active:scale-95 shadow-sm"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        <button
          onClick={onNext}
          className="group pointer-events-auto flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 bg-white/70 backdrop-blur-md text-slate-800 transition-all duration-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/50 active:scale-95 shadow-sm"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none ${
                isActive 
                  ? "w-8 bg-slate-900 opacity-100" 
                  : "w-2.5 bg-slate-900/30 hover:bg-slate-900/50 opacity-60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={isActive ? "true" : "false"}
            />
          );
        })}
      </div>
    </>
  );
}

export default HeroControls;
