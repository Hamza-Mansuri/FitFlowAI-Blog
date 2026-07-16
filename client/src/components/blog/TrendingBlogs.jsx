import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BlogCard from "./BlogCard";
import Container from "../layout/Container";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";

function TrendingBlogs({ blogs, loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [blogs]);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.getElementById("blogs-grid-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="blogs-grid-section" className="py-12 scroll-mt-20">
      <Container>

        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="rounded-full bg-green-50 px-3.5 py-1.5 text-xs font-bold text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-200/40 dark:border-green-900/30">
              📚 Latest Articles
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Learn From Fitness Experts
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
              Explore practical guides on strength training, nutrition,
              fat loss, recovery, and healthy living.
            </p>
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-slate-200 bg-white/50 px-6 py-2.5 text-xs font-bold text-slate-650 transition duration-300 hover:border-green-600 hover:bg-green-600 hover:text-white dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300 dark:hover:border-green-600 dark:hover:bg-green-600"
          >
            View All Articles
          </motion.button>
        </div>

        {/* Blog Grid or Skeletons */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <BlogCardSkeleton key={idx} />
            ))}
          </div>
        ) : currentBlogs.length ? (
          <>
            <motion.div 
              layout
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {currentBlogs.map((blog) => (
                  <motion.div
                    layout
                    key={blog._id}
                    initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                    transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-600 transition shadow-sm hover:border-green-500 hover:text-green-600 disabled:opacity-45 disabled:hover:border-slate-200 disabled:hover:text-slate-650 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-green-500"
                >
                  <FaChevronLeft size={10} />
                </motion.button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold transition shadow-sm ${
                      currentPage === page
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/20"
                        : "border border-slate-200 bg-white/60 text-slate-600 hover:border-green-500 hover:text-green-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-green-500"
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-600 transition shadow-sm hover:border-green-500 hover:text-green-600 disabled:opacity-45 disabled:hover:border-slate-200 disabled:hover:text-slate-650 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-green-500"
                >
                  <FaChevronRight size={10} />
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-dashed border-slate-350 py-16 text-center dark:border-slate-800 bg-white/20 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-slate-850 dark:text-white">
              No Articles Found
            </h3>

            <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 font-medium">
              Try another keyword or browse a different category.
            </p>
          </motion.div>
        )}

      </Container>
    </section>
  );
}

export default TrendingBlogs;