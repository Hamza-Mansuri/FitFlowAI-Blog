import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -12,
  },
};

const pageTransition = {
  type: "tween",
  ease: [0.25, 1, 0.5, 1], // easeOutQuart
  duration: 0.5,
};

function PageTransition({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
