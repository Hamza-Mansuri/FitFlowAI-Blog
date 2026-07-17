import { motion } from "framer-motion";

function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -4 },
  };

  const dotTransition = (delay) => ({
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    delay,
  });

  return (
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 w-fit">
      {[0, 1, 2].map((idx) => (
        <motion.div
          key={idx}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={dotTransition(idx * 0.15)}
          className="w-1.5 h-1.5 rounded-full bg-emerald-500"
        />
      ))}
    </div>
  );
}

export default TypingIndicator;
