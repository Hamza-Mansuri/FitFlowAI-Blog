import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaInbox } from "react-icons/fa";

function EmptyState({
  title = "No Content Found",
  description = "It looks like there's nothing to display here right now.",
  actionText,
  actionPath,
  icon: Icon = FaInbox,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center p-12 rounded-[2rem] border border-dashed border-slate-200 bg-white/20 dark:border-slate-800 dark:bg-slate-950/20 backdrop-blur-sm max-w-xl mx-auto my-8"
    >
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 mb-6 border border-emerald-500/25">
        <Icon size={24} className="animate-pulse" />
      </div>

      <h3 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
        {title}
      </h3>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
        {description}
      </p>

      {actionText && actionPath && (
        <motion.div
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.975 }}
          className="mt-8"
        >
          <Link
            to={actionPath}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-emerald-500/10 hover:shadow-lg"
          >
            {actionText}
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

export default EmptyState;
