import { FaArrowRight, FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function FeaturedButtons({ blogId }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4 w-full">
      {/* Primary Action Link */}
      <Link to={blogId ? `/blog/${blogId}` : "/categories"} className="w-full sm:w-auto flex-1 sm:flex-initial">
        <motion.button
          whileHover={{ scale: 1.025, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full relative group overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 text-sm font-extrabold text-slate-950 transition-all duration-300 shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/25 border border-emerald-400/20 cursor-pointer"
        >
          <span>Read Article</span>
          <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </Link>

      {/* Secondary Action Bookmark */}
      <motion.button
        whileHover={{ scale: 1.025, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-transparent px-8 py-4 text-sm font-bold text-slate-350 transition-all duration-300 hover:text-white hover:bg-slate-900/60 hover:border-slate-700 cursor-pointer"
      >
        <FaRegBookmark className="text-xs text-emerald-400" />
        <span>Bookmark</span>
      </motion.button>
    </div>
  );
}

export default FeaturedButtons;
