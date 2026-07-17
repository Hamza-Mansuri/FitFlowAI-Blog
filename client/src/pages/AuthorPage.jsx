import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaBookOpen, FaEye, FaHeart, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import API from "../services/api";
import BlogCard from "../components/blog/BlogCard";
import SEO from "../components/common/SEO";
import GlowBackground from "../components/common/GlowBackground";
import PageTransition from "../components/common/PageTransition";

function AuthorPage() {
  const { authorId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/blogs/author/${authorId}`);
        setData(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load author profile.");
      } finally {
        setLoading(false);
      }
    };

    if (authorId) {
      fetchAuthorData();
    }
  }, [authorId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#05070d]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-[#05070d] p-6 text-center">
        <FaExclamationTriangle className="text-5xl text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Author Not Found</h2>
        <p className="text-slate-550 mb-6">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2.5 font-bold text-white shadow shadow-green-500/20"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { author, stats, blogs } = data;

  return (
    <PageTransition>
      <SEO
        title={`${author.name} - FitFlowAI Author`}
        description={`Explore fitness, nutrition and lifestyle articles written by ${author.name} on FitFlowAI.`}
      />

      <div className="relative min-h-screen bg-slate-50/50 transition-colors duration-500 dark:bg-[#05070d] pb-20">
        <GlowBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-550 hover:text-slate-800 dark:text-slate-450 dark:hover:text-white mb-6 transition"
          >
            <FaArrowLeft /> Go Back
          </button>

          {/* Author Header Card */}
          <div className="rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-xl dark:border-slate-900/40 dark:bg-slate-950/65 p-6 sm:p-8 shadow-xl mb-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-green-500/10 to-emerald-500/20 font-black text-3xl sm:text-4xl text-green-700 dark:from-green-950/40 dark:to-emerald-950/60 dark:text-green-455 border border-green-500/25 shadow-inner">
              {author.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block rounded-full bg-green-500/10 border border-green-500/20 text-green-700 px-3.5 py-1 text-xs font-bold uppercase tracking-wider dark:text-green-400 mb-3">
                Community Publisher
              </span>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
                {author.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-500" />
                  Member since {new Date(author.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
                </span>
              </div>
            </div>
          </div>

          {/* Statistics row */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mb-12">
            {[
              { label: "Articles", val: stats.totalArticles, icon: <FaBookOpen className="text-green-500" /> },
              { label: "Views", val: stats.totalViews, icon: <FaEye className="text-green-500" /> },
              { label: "Likes", val: stats.totalLikesReceived, icon: <FaHeart className="text-red-500" /> },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-205/50 bg-white/60 dark:border-slate-900/30 dark:bg-slate-950/40 p-5 text-center backdrop-blur-md shadow-sm flex flex-col items-center justify-center"
              >
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.val}</div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Published Articles List */}
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
              Published Articles ({blogs.length})
            </h2>

            {blogs.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                This author hasn't published any articles yet.
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default AuthorPage;
