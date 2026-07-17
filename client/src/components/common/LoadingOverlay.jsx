import { motion } from "framer-motion";
import gomziLogo from "../../assets/images/gomzi-logo.png";

function LoadingOverlay({ text = "Loading your fitness journey..." }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-[#030708] transition-colors duration-500 overflow-hidden select-none">
      {/* Floating background glows */}
      <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[45vw] h-[45vw] rounded-full bg-green-500/5 blur-[110px] pointer-events-none" />

      {/* Center card wrapper */}
      <div className="relative flex flex-col items-center space-y-6 max-w-sm px-4">
        {/* Brand logo scale pulse */}
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: [0.95, 1, 0.95], opacity: 1 }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 0.5 }
          }}
          src={gomziLogo}
          alt="FitFlowAI Brand Logo"
          className="h-10 w-auto filter drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        />

        {/* Dynamic sliding progress bar */}
        <div className="w-48 h-[3px] bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div
            animate={{
              x: ["-100%", "100%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute left-0 top-0 h-full w-[60%] bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          />
        </div>

        {/* Loading text details */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-bold"
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
