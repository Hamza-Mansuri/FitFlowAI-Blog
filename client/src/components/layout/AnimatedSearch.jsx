import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function AnimatedSearch() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/categories?search=${encodeURIComponent(query)}`);
      setExpanded(false);
      setQuery("");
    }
  };

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  return (
    <form onSubmit={handleSearchSubmit} className="relative flex items-center">
      <AnimatePresence>
        {expanded && (
          <motion.input
            ref={inputRef}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 180, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            type="text"
            placeholder="Search guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 pr-8 pl-4 rounded-full border border-slate-200 bg-white/40 backdrop-blur-md outline-none text-xs font-medium dark:border-slate-800 dark:bg-slate-950/40 text-slate-900 dark:text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300"
          />
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-500 dark:border-slate-800/80 dark:bg-slate-900/50 dark:text-slate-350 transition-colors duration-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/30 ${
          expanded ? "absolute right-0" : ""
        }`}
      >
        <FaSearch size={12} className="transition-transform duration-300 group-hover:rotate-12" />
      </motion.button>
    </form>
  );
}

export default AnimatedSearch;
