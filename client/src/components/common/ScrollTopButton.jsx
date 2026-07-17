import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/70 backdrop-blur-md text-emerald-500 shadow-xl transition-colors duration-300 hover:border-emerald-500/30 hover:bg-white/95 dark:border-slate-800/80 dark:bg-slate-950/75 dark:text-emerald-450 dark:hover:bg-slate-950 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={14} className="animate-bounce mt-[2px]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollTopButton;
