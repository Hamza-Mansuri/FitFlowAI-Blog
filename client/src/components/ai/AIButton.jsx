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

        {/* Button Wrapper with Floating Revolving Border */}
        <div className="relative flex items-center justify-center h-20 w-20 pointer-events-auto">
          
          {/* Revolving Outer SVG Dashed Ring */}
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="50"
              cy="50"
              r="43"
              stroke="rgba(16, 185, 129, 0.45)"
              strokeWidth="2.5"
              fill="transparent"
              strokeDasharray="14 12"
            />
          </motion.svg>
          
          {/* Outer Pulsing Ring */}
          <motion.div
            className="absolute inset-2 rounded-full border border-emerald-500/20 pointer-events-none"
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating circular button with breathing animation */}
          <motion.button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
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
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white dark:text-slate-950 font-bold shadow-2xl cursor-pointer border border-emerald-450/20 relative z-10"
            aria-label="Toggle FitFlowAI Assistant"
          >
            <FaComments size={20} className="relative z-10" />
          </motion.button>
        </div>
      </div>

      {/* Embedded Chat Dialog Viewport */}
      <AIChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default AIButton;
