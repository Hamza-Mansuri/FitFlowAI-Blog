import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Container from "../components/layout/Container";
import GlowBackground from "../components/common/GlowBackground";

function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center py-20 text-slate-800 dark:text-slate-100 overflow-hidden">
      {/* Animated glows background */}
      <GlowBackground />

      <Container className="relative z-10 text-center max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          {/* Giant Animated 404 */}
          <h1 className="text-8xl sm:text-9xl font-extrabold bg-gradient-to-r from-emerald-500 via-green-550 to-teal-500 bg-clip-text text-transparent select-none tracking-tighter drop-shadow-lg">
            404
          </h1>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Lost in Space?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              We couldn't find the page you were looking for. Perhaps it took a rest day, or it's currently hydrating. Let's get you back on track.
            </p>
          </div>

          {/* Action Button */}
          <motion.div
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.975 }}
            className="inline-block"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/25 border border-emerald-400/20"
            >
              <FaHome size={14} />
              <span>Return Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}

export default NotFound;