import { useState } from "react";
import { FaComments } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AIChatWindow from "./AIChatWindow";

function AIButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3 pointer-events-none">
        
        {/* Animated Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="bg-slate-900 text-slate-100 text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/10 shadow-lg select-none whitespace-nowrap pointer-events-auto"
            >
              Ask FitFlowAI
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating circular button with breathing animation */}
        <motion.button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: isOpen
              ? "0 0 25px rgba(16, 185, 129, 0.4)"
              : [
                  "0 0 15px rgba(16, 185, 129, 0.15)",
                  "0 0 25px rgba(16, 185, 129, 0.35)",
                  "0 0 15px rgba(16, 185, 129, 0.15)"
                ]
          }}
          transition={{
            boxShadow: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white dark:text-slate-950 font-bold shadow-2xl cursor-pointer border border-emerald-450/20 pointer-events-auto relative"
          aria-label="Toggle FitFlowAI Assistant"
        >
          <FaComments size={20} className="relative z-10" />
        </motion.button>
      </div>

      {/* Embedded Chat Dialog Viewport */}
      <AIChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default AIButton;
