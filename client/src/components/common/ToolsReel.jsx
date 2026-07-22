import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Container from "../layout/Container";

function ToolsReel() {
  const reelRef = useRef(null);

  const scrollLeft = () => {
    if (reelRef.current) {
      reelRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (reelRef.current) {
      reelRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const tools = useMemo(() => [
    {
      id: 1,
      title: "Macro Calculator",
      description: "Calculate your optimal calorie intake and personalized macronutrient splits in seconds.",
      bg: "radial-gradient(120% 75% at 50% 15%, rgba(16, 185, 129, 0.22) 0%, transparent 80%)",
      icon: (
        <svg className="w-6 h-6 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      mockup: (
        <div className="w-full flex flex-col gap-3 p-4 bg-slate-100/60 dark:bg-slate-950/45 rounded-2xl border border-slate-200/50 dark:border-white/5 relative overflow-hidden h-[180px]">
          <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <span>Macro Targets</span>
            <span className="text-emerald-500 dark:text-emerald-400">Active Mode</span>
          </div>
          {/* Circular donut chart simulation */}
          <div className="flex gap-4 items-center flex-grow">
            <div className="relative w-18 h-18 rounded-full border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-teal-500 border-b-cyan-500 border-l-transparent animate-spin-slow" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-500 font-bold">Protein</span>
                <span className="text-xs font-black text-slate-800 dark:text-white">35%</span>
              </div>
            </div>
            {/* Progress Bars */}
            <div className="flex-grow flex flex-col gap-2">
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[10px] text-slate-650 dark:text-slate-400">
                  <span>Carbs</span>
                  <span className="font-semibold text-slate-850 dark:text-white">180g</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-cyan-400" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[10px] text-slate-650 dark:text-slate-400">
                  <span>Protein</span>
                  <span className="font-semibold text-slate-850 dark:text-white">160g</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-emerald-450" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between text-[10px] text-slate-655 dark:text-slate-400">
                  <span>Fats</span>
                  <span className="font-semibold text-slate-850 dark:text-white">65g</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[30%] h-full bg-teal-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Workout Builder",
      description: "Build custom strength splits, track workouts, and monitor lifting volume progression.",
      bg: "radial-gradient(120% 75% at 50% 15%, rgba(20, 184, 166, 0.22) 0%, transparent 80%)",
      icon: (
        <svg className="w-6 h-6 text-teal-550 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      mockup: (
        <div className="w-full flex flex-col gap-2 p-3.5 bg-slate-100/60 dark:bg-slate-950/45 rounded-2xl border border-slate-200/50 dark:border-white/5 h-[180px] overflow-hidden text-[11px]">
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
            <span>Push Day Schedule</span>
            <span className="text-teal-500 dark:text-teal-400">Week 2</span>
          </div>
          {/* Exercise items */}
          <div className="flex flex-col gap-1.5 flex-grow">
            <div className="flex justify-between items-center p-2 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200/60 dark:border-white/5">
              <span className="text-slate-800 dark:text-slate-200 font-semibold">1. Barbell Bench Press</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">4 sets x 8 reps</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200/60 dark:border-white/5">
              <span className="text-slate-800 dark:text-slate-200 font-semibold">2. Overhead Press</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">3 sets x 10 reps</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-white/40 dark:bg-slate-900/20 border border-slate-200/40 dark:border-white/5 opacity-50">
              <span className="text-slate-600 dark:text-slate-400 font-medium">3. Lateral Raises</span>
              <span className="text-[9px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500">3 sets x 12 reps</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Water Tracker",
      description: "Monitor daily hydration, set water alerts, and maintain daily liquid goals.",
      bg: "radial-gradient(120% 75% at 50% 15%, rgba(6, 182, 212, 0.22) 0%, transparent 80%)",
      icon: (
        <svg className="w-6 h-6 text-cyan-550 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      mockup: (
        <div className="w-full flex flex-col gap-3 p-4 bg-slate-100/60 dark:bg-slate-950/45 rounded-2xl border border-slate-200/50 dark:border-white/5 h-[180px] justify-between">
          <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <span>Hydration Logs</span>
            <span className="text-cyan-650 dark:text-cyan-400">Target: 3.5L</span>
          </div>
          {/* Progress bar wave */}
          <div className="flex flex-col items-center gap-1.5 flex-grow justify-center">
            <span className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">2.5 Liters</span>
            <span className="text-[10px] text-slate-500">71% of daily target reached</span>
            <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 relative overflow-hidden border border-slate-200 dark:border-white/5">
              <div className="w-[71%] h-full bg-gradient-to-r from-cyan-500 to-teal-400 absolute left-0 top-0 rounded-full flex items-center justify-end pr-2">
                <span className="text-[8px] font-black text-slate-950 dark:text-slate-900">✓</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "BMR & TDEE Gauge",
      description: "Estimate metabolic rates and active calorie burn based on activity thresholds.",
      bg: "radial-gradient(120% 75% at 50% 15%, rgba(34, 197, 94, 0.22) 0%, transparent 80%)",
      icon: (
        <svg className="w-6 h-6 text-green-550 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      mockup: (
        <div className="w-full flex flex-col gap-3 p-4 bg-slate-100/60 dark:bg-slate-950/45 rounded-2xl border border-slate-200/50 dark:border-white/5 h-[180px] justify-between">
          <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <span>Metabolic Budget</span>
            <span className="text-green-550 dark:text-green-400">Maintain</span>
          </div>
          <div className="flex flex-col gap-2 flex-grow justify-center">
            <div className="flex justify-between items-end border-b border-slate-250 dark:border-white/5 pb-2">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 uppercase font-bold">BMR</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">1,780 kcal</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[9px] text-slate-500 uppercase font-bold">TDEE</span>
                <span className="text-base font-black text-emerald-600 dark:text-emerald-400">2,450 kcal</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span>Based on Moderately Active exercise</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "One-Rep Max Estimator",
      description: "Estimate lifting peaks safely using compound sub-maximal weight and repetition logs.",
      bg: "radial-gradient(120% 75% at 50% 15%, rgba(20, 184, 166, 0.2) 0%, transparent 80%)",
      icon: (
        <svg className="w-6 h-6 text-teal-550 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      mockup: (
        <div className="w-full flex flex-col gap-2 p-4 bg-slate-100/60 dark:bg-slate-950/45 rounded-2xl border border-slate-200/50 dark:border-white/5 h-[180px] justify-between">
          <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
            <span>Peak Calculator</span>
            <span className="text-teal-500 dark:text-teal-400">Deadlift</span>
          </div>
          {/* Barbell visual mockup */}
          <div className="flex items-center justify-center gap-1 my-1">
            <div className="w-1.5 h-7 rounded bg-slate-400 dark:bg-slate-700" />
            <div className="w-2.5 h-10 rounded bg-slate-500 dark:bg-slate-600" />
            <div className="w-2.5 h-12 rounded bg-slate-600 dark:bg-slate-500" />
            <div className="w-20 h-2 bg-slate-300 dark:bg-slate-700 rounded-sm relative flex items-center justify-center">
              <span className="text-[8px] font-black text-slate-600 dark:text-slate-400">225 LBS</span>
            </div>
            <div className="w-2.5 h-12 rounded bg-slate-600 dark:bg-slate-500" />
            <div className="w-2.5 h-10 rounded bg-slate-505 dark:bg-slate-600" />
            <div className="w-1.5 h-7 rounded bg-slate-400 dark:bg-slate-700" />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/5 pt-2">
            <span>Submax: 225 lbs x 5 reps</span>
            <span className="font-bold text-slate-700 dark:text-white">Est. 1RM: 253 lbs</span>
          </div>
        </div>
      )
    }
  ], []);

  return (
    <section className="py-10 md:py-16 relative overflow-hidden bg-transparent transition-colors duration-500">
      {/* Background radial glow */}
      <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-emerald-500/[0.015] blur-[150px] pointer-events-none z-0" />

      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 relative z-10 gap-6">
          <div className="text-left max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[10px] uppercase font-bold tracking-[0.25em] text-emerald-600 dark:text-emerald-450"
            >
              FitFlowAI Calculators
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-2"
            >
              There's a tool for that.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-slate-600 dark:text-slate-400 text-sm md:text-base font-light leading-relaxed"
            >
              Use our evidence-based calculator suite to instantly map caloric targets, macronutrients, strength milestones, and workout splits.
            </motion.p>
          </div>

          {/* Laptop Scroll controls */}
          <div className="flex items-center gap-3 mb-1">
            <button
              onClick={scrollLeft}
              className="w-11 h-11 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
            >
              <FaChevronLeft size={11} />
            </button>
            <button
              onClick={scrollRight}
              className="w-11 h-11 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
            >
              <FaChevronRight size={11} />
            </button>
          </div>
        </div>

        {/* Horizontal Drag/Scroll Reel Container */}
        <div ref={reelRef} className="w-full overflow-x-auto select-none mask-gradient-horizontal pb-8 relative z-10 scrollbar-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-6 min-w-full px-2"
          >
            {tools.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{
                  y: -6,
                  boxShadow: "0px 20px 40px -10px rgba(0, 0, 0, 0.15), 0px 0px 25px 2px rgba(16, 185, 129, 0.06)"
                }}
                transition={{ duration: 0.4 }}
                className="w-[325px] shrink-0 rounded-[2rem] p-6.5 flex flex-col gap-6 relative overflow-hidden border border-slate-200/80 dark:border-white/5 shadow-lg dark:shadow-2xl bg-white/80 dark:bg-slate-950/45 backdrop-blur-3xl group cursor-pointer"
              >
                {/* Glow Overlay inside Card */}
                <div
                  style={{ background: t.bg }}
                  className="absolute inset-0 opacity-[0.5] dark:opacity-100 pointer-events-none z-0"
                />

                {/* Card Header */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-905/60 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-inner">
                      {t.icon}
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white tracking-tight">{t.title}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/5 transition-all duration-300">
                    <FaChevronRight size={10} />
                  </div>
                </div>

                {/* Card Description */}
                <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-light text-left min-h-[36px] relative z-10">
                  {t.description}
                </p>

                {/* Card Separator */}
                <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-800/60 relative z-10" />

                {/* Card Interactive Mockup */}
                <div className="relative z-10 w-full">
                  {t.mockup}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* CSS Styles for Horizontal Mask and Spin Animation */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-gradient-horizontal {
          mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 4%, black 96%, transparent);
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

export default ToolsReel;
