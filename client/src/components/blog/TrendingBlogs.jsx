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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardRevealVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="blogs-grid-section" className="py-8 md:py-12 scroll-mt-20 relative overflow-hidden">
      {/* Background glow layers */}
      <div className="absolute left-[-10%] top-[40%] w-[40vw] h-[40vw] rounded-full bg-emerald-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute right-[-10%] bottom-[10%] w-[35vw] h-[35vw] rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-xs font-bold text-emerald-450 backdrop-blur-md">
              📚 Latest Articles
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Learn From Fitness Experts
            </h2>

            <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-slate-500 dark:text-slate-400 font-light">
              Explore practical guides on strength training, nutrition,
              fat loss, recovery, and healthy living.
            </p>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className="self-start md:self-end rounded-full border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-950/40 px-6 py-3.5 text-xs font-bold text-slate-700 dark:text-slate-350 transition duration-300 hover:border-emerald-500 hover:text-emerald-500"
          >
            View All Articles
          </motion.button>
        </div>

        {/* Blog Grid or Skeletons */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, idx) => (
              <BlogCardSkeleton key={idx} />
            ))}
          </div>
        ) : currentBlogs.length ? (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {currentBlogs.map((blog) => (
                  <motion.div
                    layout
                    key={blog._id}
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-20 flex items-center justify-center gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-600 transition shadow-sm hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-45 disabled:hover:border-slate-200 disabled:hover:text-slate-650 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400 dark:hover:border-emerald-500"
                >
                  <FaChevronLeft size={10} />
                </motion.button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold transition shadow-sm ${
                      currentPage === page
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/20"
                        : "border border-slate-200 bg-white/60 text-slate-600 hover:border-emerald-500 hover:text-emerald-500 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-450 dark:hover:border-emerald-500"
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
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-600 transition shadow-sm hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-45 disabled:hover:border-slate-200 disabled:hover:text-slate-650 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400 dark:hover:border-emerald-500"
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
            className="rounded-[2rem] border border-dashed border-slate-200 py-20 text-center dark:border-slate-800 bg-white/20 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              No Articles Found
            </h3>

            <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400 font-light">
              Try another keyword or browse a different category.
            </p>
          </motion.div>
        )}

      </Container>
    </section>
  );
}

export default TrendingBlogs;