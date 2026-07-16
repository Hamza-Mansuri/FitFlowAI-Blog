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
} from "react-icons/fa";

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

    localStorage.setItem(
      "likedBlogs",
      JSON.stringify(likedBlogs)
    );
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

    localStorage.setItem(
      "savedBlogs",
      JSON.stringify(savedBlogs)
    );
  };

  return (
    <Link to={`/blog/${blog._id}`} className="group block h-full">
      <motion.article
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/60 premium-glass-card hover:shadow-2xl transition-all duration-300 hover:border-green-400 dark:border-slate-800/40 dark:hover:border-green-500/60"
      >
        {/* Image wrapper */}
        <div className="relative overflow-hidden bg-slate-100/50 dark:bg-slate-900/40 aspect-[16/10]">
          <motion.img
            src={blog.image}
            alt={blog.title}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>

          <span className="absolute left-4 top-4 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-bold text-slate-850 backdrop-blur-md dark:bg-slate-950/70 dark:text-slate-200 border border-white/20 dark:border-slate-800/20">
            {blog.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-grow p-5 space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold leading-snug text-slate-900 transition-colors duration-250 group-hover:text-green-500 dark:text-white dark:group-hover:text-green-400">
              {blog.title}
            </h2>

            <p className="line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
              {blog.description}
            </p>
          </div>

          {/* Footer details */}
          <div className="flex items-center justify-between border-t border-slate-100/80 pt-4 dark:border-slate-900/60">
            <div>
              <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                {blog.author}
              </p>

              <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <FaClock className="text-green-500 dark:text-green-400" size={10} />
                <span>{blog.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              {/* Like */}
              <button
                onClick={toggleLike}
                className="transition duration-300 hover:scale-115 p-1 text-slate-400 hover:text-red-500"
              >
                {liked ? (
                  <FaHeart className="text-md text-red-500" />
                ) : (
                  <FaRegHeart className="text-md" />
                )}
              </button>

              {/* Bookmark */}
              <button
                onClick={toggleSave}
                className="transition duration-300 hover:scale-115 p-1 text-slate-400 hover:text-green-500"
              >
                {saved ? (
                  <FaBookmark className="text-md text-green-500 dark:text-green-400" />
                ) : (
                  <FaRegBookmark className="text-md" />
                )}
              </button>

              {/* Read button link indicator */}
              <div className="flex items-center gap-1 text-sm font-bold text-green-500 transition-all duration-300 group-hover:gap-2 dark:text-green-400">
                Read
                <FaArrowRight size={10} className="transition-transform duration-250" />
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default BlogCard;