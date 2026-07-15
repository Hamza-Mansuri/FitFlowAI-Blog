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
    <Link to={`/blog/${blog._id}`}>
      <motion.article
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-green-200 hover:shadow-xl"
      >
        {/* Image */}

        <div className="relative overflow-hidden bg-slate-100">

          <motion.img
            src={blog.image}
            alt={blog.title}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="h-52 w-full object-contain"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
            {blog.category}
          </span>

        </div>

        {/* Content */}

        <div className="space-y-3 p-4">
          <h2 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-green-600">
            {blog.title}
          </h2>

          <p className="line-clamp-3 text-sm leading-6 text-slate-500">
            Learn science-backed strategies for fitness, nutrition,
            muscle building, fat loss, and long-term healthy living.
          </p>

          {/* Footer */}

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {blog.author}
              </p>

              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <FaClock className="text-green-600" />
                <span>{blog.readTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Like */}

              <button
                onClick={toggleLike}
                className="transition duration-300 hover:scale-110"
              >
                {liked ? (
                  <FaHeart className="text-lg text-red-500" />
                ) : (
                  <FaRegHeart className="text-lg text-slate-500 hover:text-red-500" />
                )}
              </button>

              {/* Bookmark */}

              <button
                onClick={toggleSave}
                className="transition duration-300 hover:scale-110"
              >
                {saved ? (
                  <FaBookmark className="text-lg text-green-600" />
                ) : (
                  <FaRegBookmark className="text-lg text-slate-500 hover:text-green-600" />
                )}
              </button>

              {/* Read */}

              <div className="flex items-center gap-2 text-sm font-semibold text-green-600 transition-all duration-300 group-hover:gap-3">
                Read
                <FaArrowRight className="text-xs" />
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default BlogCard;