import { motion } from "framer-motion";

function Badge({ text }) {
  const cleanText = (text || "").trim().toLowerCase();
  
  // Custom theme profiles for different categories/tags
  const badges = {
    workout: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    nutrition: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    recovery: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    health: "bg-rose-500/10 text-rose-600 dark:text-rose-450 border-rose-500/20",
    lifestyle: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    "editor's pick": "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-500 dark:text-emerald-400 border-emerald-500/30",
    trending: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
    new: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    science: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  };

  const currentStyle = badges[cleanText] || "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md transition-all duration-300 ${currentStyle}`}
    >
      {cleanText === "editor's pick" && <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />}
      {cleanText === "trending" && <span className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />}
      <span>{text}</span>
    </motion.span>
  );
}

export default Badge;
