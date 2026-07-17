import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";

function ThemeSwitcher() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center h-9 w-16 rounded-full bg-slate-200/50 dark:bg-slate-900/50 border border-slate-300/35 dark:border-slate-800/40 cursor-pointer p-1 transition-colors duration-500 overflow-hidden"
      aria-label="Toggle theme mode"
    >
      {/* Sliding background pill indicator */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute w-7 h-7 rounded-full bg-gradient-to-r from-emerald-450 to-green-500 shadow-md z-10"
        style={{
          left: theme === "dark" ? "calc(100% - 2.1rem)" : "0.25rem"
        }}
      />

      {/* Sun Icon */}
      <div className="flex-1 flex justify-center items-center text-yellow-500 z-20 transition-all duration-300">
        <motion.div
          animate={{
            scale: theme === "light" ? 1.1 : 0.8,
            rotate: theme === "light" ? 0 : -90,
          }}
        >
          <FaSun size={12} />
        </motion.div>
      </div>

      {/* Moon Icon */}
      <div className="flex-1 flex justify-center items-center text-slate-400 dark:text-slate-200 z-20 transition-all duration-300">
        <motion.div
          animate={{
            scale: theme === "dark" ? 1.1 : 0.8,
            rotate: theme === "dark" ? 0 : 90,
          }}
        >
          <FaMoon size={11} />
        </motion.div>
      </div>
    </button>
  );
}

export default ThemeSwitcher;
