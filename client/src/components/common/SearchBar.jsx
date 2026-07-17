import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import Container from "../layout/Container";

function SearchBar({ search, setSearch }) {
  return (
    <section className="mb-4">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl"
        >
          <div className="flex items-center overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/50 backdrop-blur-xl shadow-xl transition-all duration-500 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] dark:border-slate-800 dark:bg-slate-950/40">
            <div className="pl-6 text-slate-400">
              <FaSearch size={18} />
            </div>

            <input
              type="text"
              placeholder="Search workouts, nutrition, health..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-4 px-4 text-base bg-transparent outline-none placeholder:text-slate-400 dark:text-white"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default SearchBar;