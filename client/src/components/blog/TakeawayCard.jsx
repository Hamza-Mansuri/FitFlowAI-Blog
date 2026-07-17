import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

function TakeawayCard({ takeaways }) {
  if (!takeaways || takeaways.length === 0) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="mx-auto mt-14 max-w-4xl space-y-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Key Takeaways
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {takeaways.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className="flex items-start gap-4 rounded-[2rem] border border-slate-200 bg-white/40 dark:border-slate-800/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 shadow-sm hover:border-emerald-500/30 hover:shadow-emerald-500/5 transition-all duration-300"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-550 dark:text-emerald-400 border border-emerald-500/25 mt-0.5 flex-shrink-0">
              <FaCheck size={11} />
            </div>

            <span className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-light">
              {item}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default TakeawayCard;