import { FaCalendarAlt, FaClock, FaEye } from "react-icons/fa";

function FeaturedMetadata() {
  const meta = {
    author: "Gautam Jani",
    role: "Founder & Head Coach",
    date: "July 17, 2026",
    readTime: "8 min read",
    views: "14.2K views",
  };

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium py-1">
      {/* Author Profile */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500/20 to-green-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30 text-xs shadow-inner">
          GJ
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-slate-200 leading-tight">
            {meta.author}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-550 leading-tight">
            {meta.role}
          </span>
        </div>
      </div>

      {/* Divider */}
      <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />

      {/* Date */}
      <div className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
        <FaCalendarAlt size={12} className="text-emerald-600 dark:text-emerald-500/80" />
        <span>{meta.date}</span>
      </div>

      {/* Divider */}
      <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />

      {/* Read Time */}
      <div className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
        <FaClock size={12} className="text-emerald-600 dark:text-emerald-500/80" />
        <span>{meta.readTime}</span>
      </div>

      {/* Divider */}
      <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />

      {/* Views */}
      <div className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-slate-300 transition-colors">
        <FaEye size={12} className="text-emerald-600 dark:text-emerald-500/80" />
        <span>{meta.views}</span>
      </div>
    </div>
  );
}

export default FeaturedMetadata;
