import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaClock,
  FaArrowRight,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaEye,
} from "react-icons/fa";
import SkeletonImage from "../common/SkeletonImage";

function BlogCard({ blog }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const likedBlogs =
      JSON.parse(localStorage.getItem("likedBlogs")) || [];

    const savedBlogs =
      JSON.parse(localStorage.getItem("savedBlogs")) || [];

    setLiked(likedBlogs.includes(blog._id));
    setSaved(savedBlogs.includes(blog._id));
  }, [blog._id]);

  const toggleLike = (e) => {
    e.preventDefault();
    let likedBlogs =
      JSON.parse(localStorage.getItem("likedBlogs")) || [];

    if (likedBlogs.includes(blog._id)) {
      likedBlogs = likedBlogs.filter((id) => id !== blog._id);
      setLiked(false);
    } else {
      likedBlogs.push(blog._id);
      setLiked(true);
    }
    localStorage.setItem("likedBlogs", JSON.stringify(likedBlogs));
  };

  const toggleSave = (e) => {
    e.preventDefault();
    let savedBlogs =
      JSON.parse(localStorage.getItem("savedBlogs")) || [];

    if (savedBlogs.includes(blog._id)) {
      savedBlogs = savedBlogs.filter((id) => id !== blog._id);
      setSaved(false);
    } else {
      savedBlogs.push(blog._id);
      setSaved(true);
    }
    localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
  };

  // Generate deterministic views or default values if views not present
  const fakeViews = `${Math.floor((blog._id ? blog._id.charCodeAt(blog._id.length - 1) : 45) * 8.5) + 850} views`;

  return (
    <Link to={`/blog/${blog._id}`} className="group block h-full">
      <motion.article
        whileHover={{ 
          y: -10, 
          scale: 1.015,
          boxShadow: "0 30px 50px -15px rgba(0, 0, 0, 0.4), 0 0 35px -5px rgba(16, 185, 129, 0.08)"
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-slate-200/50 bg-white/40 backdrop-blur-xl dark:border-slate-800/40 dark:bg-slate-950/40 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300"
      >
        {/* 16:9 Image wrapper */}
        <div className="relative overflow-hidden aspect-[16/9] rounded-t-[2.25rem] w-full">
          <SkeletonImage
            src={blog.image}
            alt={blog.title}
            className="transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
            aspectClass="aspect-[16/9]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>

          {/* Category Badges */}
          <span className="absolute left-6 top-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-1.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-md shadow-emerald-500/20">
            {blog.category}
          </span>
        </div>

        {/* Content details */}
        <div className="flex flex-col justify-between flex-grow p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-emerald-500 dark:text-white dark:group-hover:text-emerald-400 line-clamp-2">
              {blog.title}
            </h2>

            <p className="line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-light">
              {blog.description}
            </p>
          </div>

          {/* Metadata details */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-550 dark:text-slate-400 font-medium border-t border-slate-200/50 pt-5 dark:border-slate-900/60 group-hover:text-slate-350 transition-colors">
            {/* Author avatar */}
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500/20 to-green-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-[10px]">
                {blog.author ? blog.author.charAt(0).toUpperCase() : "A"}
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {blog.author}
              </span>
            </div>

            <span className="w-1 h-1 rounded-full bg-slate-700" />

            {/* Reading Time */}
            <div className="flex items-center gap-1.5">
              <FaClock size={11} className="text-emerald-500/80" />
              <span>{blog.readTime}</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-slate-700" />

            {/* Views */}
            <div className="flex items-center gap-1.5">
              <FaEye size={11} className="text-emerald-500/80" />
              <span>{fakeViews}</span>
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex items-center justify-between pt-2">
            {/* Read Article Button */}
            <div className="relative group/btn overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-xs font-bold text-slate-950 transition-all duration-300 shadow-md shadow-emerald-500/5 hover:shadow-lg hover:shadow-emerald-500/15 hover:-translate-y-0.5 flex items-center gap-2 border border-emerald-400/25">
              <span>Read Article</span>
              <FaArrowRight size={10} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </div>

            {/* Social / Action tools */}
            <div className="flex items-center gap-3">
              {/* Like */}
              <button
                onClick={toggleLike}
                className="transition duration-300 hover:scale-115 p-2 rounded-xl bg-slate-200/30 hover:bg-red-500/10 text-slate-400 hover:text-red-500 dark:bg-slate-900/30"
              >
                {liked ? (
                  <FaHeart className="text-sm text-red-500" />
                ) : (
                  <FaRegHeart className="text-sm" />
                )}
              </button>

              {/* Bookmark */}
              <button
                onClick={toggleSave}
                className="transition duration-300 hover:scale-115 p-2 rounded-xl bg-slate-200/30 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-500 dark:bg-slate-900/30"
              >
                {saved ? (
                  <FaBookmark className="text-sm text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <FaRegBookmark className="text-sm" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default BlogCard;