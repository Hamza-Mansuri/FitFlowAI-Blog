import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

function TestimonialCard({ item }) {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[360px] p-6 rounded-2xl border border-slate-200 bg-white/75 dark:border-white/5 dark:bg-slate-900/40 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-emerald-500/30 hover:shadow-emerald-500/5 hover:-translate-y-2 hover:scale-[1.01] group whitespace-normal">
      {/* Header Profile Row */}
      <div className="flex items-center gap-4">
        <img
          src={item.avatar}
          alt={item.name}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-white/10"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">
            {item.name}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {item.country}
          </span>
        </div>

        {/* Goal Badge (Right Aligned) */}
        <span className="ml-auto text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border border-emerald-500/20">
          {item.tag}
        </span>
      </div>

      {/* Star Rating Section */}
      <div className="flex items-center gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          >
            <FaStar className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]" size={14} />
          </motion.div>
        ))}
      </div>

      {/* Testimonial Quote */}
      <p className="mt-4 text-sm leading-relaxed text-slate-650 dark:text-slate-450 font-light italic">
        "{item.text}"
      </p>
    </div>
  );
}

export default TestimonialCard;
