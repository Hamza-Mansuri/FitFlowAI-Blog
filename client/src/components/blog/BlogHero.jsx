import {
  FaUser,
  FaClock,
  FaCalendarAlt,
  FaEye,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark
} from "react-icons/fa";
import { Link } from "react-router-dom";

function BlogHero({ blog, liked, saved, likesCount, onLike, onSave }) {
  return (
    <>
      {/* Hero Image */}
      <div className="flex justify-center overflow-hidden rounded-3xl shadow-xl bg-transparent">
        <img
          src={blog.image}
          alt={blog.title}
          className="max-h-[480px] w-auto object-contain"
        />
      </div>

      {/* Category */}
      <span className="mt-8 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400">
        {blog.category}
      </span>

      {/* Title */}
      <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-5xl">
        {blog.title}
      </h1>

      {/* Description */}
      <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-600 dark:text-slate-300">
        {blog.description}
      </p>

      {/* Meta Bar */}
      <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-slate-200 dark:border-slate-800 py-5 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <FaUser className="text-green-600 dark:text-green-400" />
          {blog.authorId ? (
            <Link
              to={`/author/${blog.authorId}`}
              className="font-bold text-slate-800 dark:text-slate-200 hover:text-green-500 transition"
            >
              {blog.author}
            </Link>
          ) : (
            <span className="font-semibold text-slate-805 dark:text-slate-200">{blog.author}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-green-600 dark:text-green-400" />
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2">
          <FaClock className="text-green-600 dark:text-green-400" />
          {blog.readTime}
        </div>

        <div className="flex items-center gap-2">
          <FaEye className="text-green-600 dark:text-green-400" />
          {blog.views} Views
        </div>

        {/* Like & Save Actions */}
        <div className="flex items-center gap-3 sm:ml-auto">
          <button
            onClick={onLike}
            className="flex items-center gap-1.5 transition duration-300 hover:scale-105 bg-red-500/10 hover:bg-red-500/20 px-4 py-1.5 rounded-full text-red-600 font-bold border border-red-500/10"
          >
            {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            <span>{likesCount}</span>
          </button>
          <button
            onClick={onSave}
            className="flex items-center gap-1.5 transition duration-300 hover:scale-105 bg-green-500/10 hover:bg-green-500/20 px-4 py-1.5 rounded-full text-green-700 dark:text-green-400 font-bold border border-green-500/10"
          >
            {saved ? <FaBookmark /> : <FaRegBookmark />}
            <span>{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default BlogHero;