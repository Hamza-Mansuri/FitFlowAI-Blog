import { FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

function ExpertTipCard({ tip }) {
  if (!tip || tip.trim() === "") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden mx-auto mt-14 max-w-4xl rounded-[2.5rem] border border-emerald-500/25 bg-white/40 dark:bg-slate-950/40 backdrop-blur-2xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-emerald-500/40"
    >
      {/* Decorative grid pattern in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />

      {/* Decorative subtle flow waves in background */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,70 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor" className="text-emerald-500" />
        </svg>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-550 dark:text-emerald-400 border border-emerald-500/30 shadow-inner">
          <FaLightbulb className="text-xl animate-pulse" />
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Expert Recommendation
        </h3>
      </div>

      <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-800 dark:text-slate-200 font-light italic relative z-10 pl-4 border-l-4 border-emerald-500/40">
        "{tip}"
      </p>
    </motion.div>
  );
}

export default ExpertTipCard;