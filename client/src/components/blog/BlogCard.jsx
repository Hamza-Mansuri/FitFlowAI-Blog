import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
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
import { transitions } from "../../hooks/useAnimationConfig";

/**
 * Premium BlogCard component.
 * Features:
 * - Magnetic cursor attraction (tilts and shifts toward mouse)
 * - Glass reflection sweep on hover
 * - Smooth spring scaling & Y-lifting
 * - Custom animated gradient border
 * - Image zoom
 */
export function BlogCard({ blog }) {
  const cardRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for magnetic card attraction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for translation (subtle displacement)
  const springTranslationX = useSpring(mouseX, transitions.magnetic);
  const springTranslationY = useSpring(mouseY, transitions.magnetic);

  // Map mouse movement to subtle 3D tilt rotations
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), transitions.magnetic);
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), transitions.magnetic);

  useEffect(() => {
    const likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
    const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
    setLiked(likedBlogs.includes(blog._id));
    setSaved(savedBlogs.includes(blog._id));
  }, [blog._id]);

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let likedBlogs = JSON.parse(localStorage.getItem("likedBlogs")) || [];
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
    e.stopPropagation();
    let savedBlogs = JSON.parse(localStorage.getItem("savedBlogs")) || [];
    if (savedBlogs.includes(blog._id)) {
      savedBlogs = savedBlogs.filter((id) => id !== blog._id);
      setSaved(false);
    } else {
      savedBlogs.push(blog._id);
      setSaved(true);
    }
    localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalized distance from center
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Subtle attraction factor (0.1 means 10% translation follow)
    mouseX.set(x * 0.1);
    mouseY.set(y * 0.1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Return smoothly to center
    mouseX.set(0);
    mouseY.set(0);
  };

  const fakeViews = `${
    Math.floor((blog._id ? blog._id.charCodeAt(blog._id.length - 1) : 45) * 8.5) + 850
  } views`;

  return (
    <Link
      to={`/blog/${blog._id}`}
      className="group block h-full select-none outline-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1px padding wrapper that lights up with a gradient border on hover */}
      <motion.div
        ref={cardRef}
        style={{
          x: springTranslationX,
          y: springTranslationY,
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative h-full rounded-[2rem] p-[1.5px] transition-all duration-500 overflow-hidden bg-slate-200/50 dark:bg-slate-800/40 ${
          isHovered
            ? "bg-gradient-to-tr from-emerald-500 via-cyan-400 to-emerald-500 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35),0_0_35px_rgba(16,185,129,0.06)]"
            : "shadow-sm"
        }`}
      >
        <article className="relative flex h-full flex-col overflow-hidden rounded-[1.95rem] bg-white dark:bg-[#0c0f17] transition-all duration-300">
          {/* Glass shine element */}
          <div
            className={`absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -skew-x-25 -translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none z-30 ${
              isHovered ? "translate-x-[120%]" : ""
            }`}
          />

          {/* Image Container */}
          <div className="relative overflow-hidden aspect-[16/10] rounded-t-[1.95rem] w-full z-10">
            <SkeletonImage
              src={blog.image}
              alt={blog.title}
              className="transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
              aspectClass="aspect-[16/10]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none z-10" />

            {/* Category Badge */}
            <span className="absolute left-6 top-6 rounded-full bg-emerald-500/90 dark:bg-emerald-500/80 backdrop-blur-sm px-4 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-md z-20">
              {blog.category}
            </span>
          </div>

          {/* Content Wrapper */}
          <div className="flex flex-col justify-between flex-grow p-6 sm:p-7 space-y-5 z-20">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-emerald-500 dark:text-white dark:group-hover:text-emerald-450 line-clamp-2">
                {blog.title}
              </h2>

              <p className="line-clamp-3 text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-light">
                {blog.description}
              </p>
            </div>

            {/* Metadata Footer */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-450 font-medium border-t border-slate-100 dark:border-slate-900/60 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20 text-[9px]">
                  {blog.author ? blog.author.charAt(0).toUpperCase() : "A"}
                </div>
                <span className="font-semibold text-slate-700 dark:text-slate-350">
                  {blog.author}
                </span>
              </div>

              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />

              <div className="flex items-center gap-1.5">
                <FaClock size={10} className="text-emerald-500/70" />
                <span>{blog.readTime}</span>
              </div>

              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />

              <div className="flex items-center gap-1.5">
                <FaEye size={10} className="text-emerald-500/70" />
                <span>{fakeViews}</span>
              </div>
            </div>

            {/* Actions Row */}
            <div className="flex items-center justify-between pt-1">
              <div className="relative overflow-hidden rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 transition-all duration-300 shadow-md shadow-emerald-500/5 group-hover:bg-emerald-400 flex items-center gap-1.5 border border-emerald-400/20">
                <span>Read Article</span>
                <FaArrowRight size={9} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              <div className="flex items-center gap-2">
                {/* Like Button */}
                <button
                  onClick={toggleLike}
                  className="transition duration-300 hover:scale-110 p-2 rounded-full bg-slate-100 hover:bg-red-500/10 text-slate-400 hover:text-red-500 dark:bg-slate-900"
                >
                  {liked ? (
                    <FaHeart className="text-xs text-red-500" />
                  ) : (
                    <FaRegHeart className="text-xs" />
                  )}
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={toggleSave}
                  className="transition duration-300 hover:scale-110 p-2 rounded-full bg-slate-100 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-500 dark:bg-slate-900"
                >
                  {saved ? (
                    <FaBookmark className="text-xs text-emerald-500 dark:text-emerald-400" />
                  ) : (
                    <FaRegBookmark className="text-xs" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </article>
      </motion.div>
    </Link>
  );
}

export default BlogCard;