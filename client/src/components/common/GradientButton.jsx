import { motion } from "framer-motion";

function GradientButton({ children, onClick, type = "button", disabled = false, className = "" }) {
  return (
    <motion.button
      whileHover={{ scale: 1.025, y: -2 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`relative group overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3.5 text-sm font-extrabold text-white dark:text-slate-950 transition-all duration-300 shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/25 border border-emerald-450/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

export default GradientButton;
