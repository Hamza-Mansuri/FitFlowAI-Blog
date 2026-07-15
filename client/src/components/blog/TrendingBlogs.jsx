import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BlogCard from "./BlogCard";
import Container from "../layout/Container";
import BlogCardSkeleton from "./BlogCardSkeleton";

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
    <section id="blogs-grid-section" className="py-6 scroll-mt-20">
      <Container>

        {/* Section Header */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-400">
              📚 Latest Articles
            </span>

            <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
              Learn From Fitness Experts
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 md:text-base dark:text-slate-400">
              Explore practical guides on strength training, nutrition,
              fat loss, recovery, and healthy living.
            </p>

          </div>

          <button className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium transition hover:border-green-600 hover:bg-green-600 hover:text-white dark:border-slate-800 dark:text-slate-300 dark:hover:border-green-600 dark:hover:bg-green-600">
            View All Articles
          </button>

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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {currentBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-green-500"
                >
                  <FaChevronLeft size={10} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-green-600 text-white shadow-lg shadow-green-500/20"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-green-500 hover:text-green-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-green-500"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-green-500 hover:text-green-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-green-500"
                >
                  <FaChevronRight size={10} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-800">

            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
              No Articles Found
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try another keyword or browse a different category.
            </p>

          </div>
        )}

      </Container>
    </section>
  );
}

export default TrendingBlogs;