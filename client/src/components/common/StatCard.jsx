import { motion } from "framer-motion";

function StatCard({ icon: Icon, value, label, color = "from-emerald-500/10 to-teal-500/10 text-emerald-500 dark:text-emerald-400" }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="group rounded-[1.75rem] border border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 sm:p-7 shadow-sm transition-all duration-300"
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr ${color} transition-all duration-300 group-hover:scale-105 shadow-inner`}>
        {Icon && <Icon size={20} />}
      </div>
      <h3 className="mt-5 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {value}
      </h3>
      <p className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
}

export default StatCard;
