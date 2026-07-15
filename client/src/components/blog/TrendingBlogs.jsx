import BlogCard from "./BlogCard";
import Container from "../layout/Container";

function TrendingBlogs({ blogs }) {
  return (
    <section className="py-6">
      <Container>

        {/* Section Header */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              📚 Latest Articles
            </span>

            <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
              Learn From Fitness Experts
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
              Explore practical guides on strength training, nutrition,
              fat loss, recovery, and healthy living.
            </p>

          </div>

          <button className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium transition hover:border-green-600 hover:bg-green-600 hover:text-white">
            View All Articles
          </button>

        </div>

        {/* Blog Grid */}

        {blogs.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}

          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center">

            <h3 className="text-xl font-semibold text-slate-800">
              No Articles Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try another keyword or browse a different category.
            </p>

          </div>
        )}

      </Container>
    </section>
  );
}

export default TrendingBlogs;